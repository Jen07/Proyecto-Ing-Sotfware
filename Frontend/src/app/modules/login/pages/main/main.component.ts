import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoginStepsService } from '../../services/login-steps.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor( public loginSteps: LoginStepsService) {}

  ngOnInit(): void {}
}