import { LoadingService } from '@core/services/loading.service';

import { LoginStepsService } from './../../services/login-steps.service';
import Alerts from 'src/app/core/utils/alerts';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-secret-form',
  templateUrl: './secret-form.component.html',
  styleUrls: ['./secret-form.component.scss'],
})
export class SecretFormComponent implements OnInit, AfterViewInit {
  /**
   * Este objeto servirá para controlar los inicios y fin de animacion del contenedor
   */
  @ViewChild('secret__form', { static: false }) rawSecretForm: any;
  secretForm!: HTMLElement;

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
    this.form = this.formBuilder.group({
      secret: [
        '',
        [Validators.required, Validators.min(1), Validators.max(999999)],
      ],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.secretForm = this.rawSecretForm.nativeElement;

    this.secretForm.addEventListener('animationend', (e: any) => {
      if (e.animationName === 'appear') {
        this.secretForm.classList.remove('appear_animation');
      }

      if (e.animationName === 'goBack') {
        this.secretForm.classList.remove('goBack');
        this.loginSteps.step.next(1);
      }

      if (e.animationName === 'disappear') {
        this.loginSteps.step.next(3);
      }
    });
  }

  /**
   * Este metodo se encarga de verificar que los datos del
   * formulario esten presentes
   */
  prepareAuth() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.validateLogin();
    } else {
      this.errorToast();
    }
  }

  /**
   * Este metodo se encarga de verificar que
   * el secret brindado sea válido.
   */
  async validateLogin() {
    this.loadingService.isLoading.next(true);

    //TODO: ACTIVAR ESTO NUEVAMENTE
    if (await this.authService.doubleAuth(this.form.value.secret)) {
      this.secretForm.classList.add('disappear_animation');
      this.loadingService.isLoading.next(false);
    } else {
      this.loadingService.isLoading.next(false);
      this.errorToast();
    }
  }

  /**
   * Este método se encarga de activar la animacion de regresar
   */
  goBack() {
    this.secretForm.classList.add('goBack');
    this.authService.destroyUser();
  }

  /**
   * Este método imprime un mensaje de error predeterminado.
   */
  private errorToast() {
    Alerts.simpleToast('Código no válido', 'error');
  }
}
