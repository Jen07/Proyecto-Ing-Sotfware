import { Subscription } from 'rxjs';
import { DepartmentsService } from './../../services/departments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private observers: Subscription[] = [];

  constructor(public departmentsService:DepartmentsService) {}

  ngOnInit(): void {}

}