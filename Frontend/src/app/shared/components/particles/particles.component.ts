import { LoginStepsService } from './../../../modules/login/services/login-steps.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
})
export class ParticlesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("particles", { static: false }) rawParticles: any;
  private particles!: HTMLElement;

  observers: Subscription[] = [];

  constructor(
    private loginSteps:LoginStepsService
  ) {}

  ngAfterViewInit(): void {
    this.particles = this.rawParticles.nativeElement;
  }

  ngOnInit(): void {

    this.observers.push(
      this.loginSteps.step.subscribe((step) => {
        if (step === 3) {
          this.particles.classList.add('disappear__particles');
        }
      })
    );

    particlesJS('particles-js', {
      particles: {
        number: { value: 160, density: { enable: true, value_area: 800 } },
        color: { value: '#e00e38' },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 1,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
         
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 600 },
        },
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
          repulse: { distance: 400, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
    
  }

  ngOnDestroy(): void {
    this.observers.forEach((element) => {
      element.unsubscribe();
    });
  }
}