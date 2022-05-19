import { LoginStepsService } from './../../services/login-steps.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Alerts from 'src/app/core/utils/alerts';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  /**
   * Este objeto servirá para controlar los inicios y fin de animacion del contenedor
   */
  @ViewChild('main__form', { static: false }) rawMainForm: any;
  mainForm!: HTMLElement;

  /**
   *  Este objeto contendrá los datos del formulario.
   */
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loginSteps: LoginStepsService,
    private loadingService: LoadingService
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.mainForm = this.rawMainForm.nativeElement;

    this.mainForm.addEventListener('animationend', (e: any) => {
      if (e.animationName === 'appear') {
        this.mainForm.classList.remove('appear_animation');
      }
      if (e.animationName === 'disappear') {
        this.loginSteps.step.next(2);
      }
    });
  }

  /**
   * Este metodo se encarga de verificar que los datos del
   * formulario esten presentes
   */
  prepareLogin() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loadingService.isLoading.next(true);
      this.validateLogin();
    } else {
      this.errorToast();
    }
  }

  /**
   * Este metodo se encarga de verificar que
   * las credenciales brindadas sean validas.
   */
  private validateLogin() {
    this.authService.loginUser(this.form.value.email, this.form.value.password);

    /* Simula una peticion al servidor */
    setTimeout(() => {
      if (this.authService.isLogged()) {
        this.mainForm.classList.add('disappear_animation');
        this.loadingService.isLoading.next(false);
      } else {
        this.loadingService.isLoading.next(false);
        this.errorToast();
      }
    }, 1000);
  }

  /**
   * Este método imprime un mensaje de error predeterminado.
   */
  private errorToast() {
    Alerts.simpleToast('Credenciales no válidas', 'error');
  }

  /**
   * Este metodo crea el objeto a utilizar para el formulario.
   * @returns FormGroup Con las validaciones necesarias
   */
  private createForm(): FormGroup {
    return this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(8),
        ],
      ],
    });
  }
}
