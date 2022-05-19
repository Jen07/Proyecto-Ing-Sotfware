import { ClassifiersService } from './../../services/classifiers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public classifiersService:ClassifiersService) { }

  ngOnInit(): void {
  }

}
