import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LoginStepsService } from '../../services/login-steps.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('waves', { static: false }) rawWaves: any;

  waves!: HTMLElement;

  observers: Subscription[] = [];

  constructor(public loginSteps: LoginStepsService, private router: Router) {}
  ngOnDestroy(): void {
    this.observers.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    // Cada vez que carga este componente inicia en el paso 1
    this.loginSteps.step.next(1);

    this.observers.push(
      this.loginSteps.step.subscribe((step) => {
        if (step === 3) {
          this.waves.classList.add('disappear__waves');
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.waves = this.rawWaves.nativeElement;

    this.waves.addEventListener('animationend', (e: any) => {
      if (e.animationName === 'disappear__waves') {
        this.router.navigate(['/']);
      }
    });
  }
}
