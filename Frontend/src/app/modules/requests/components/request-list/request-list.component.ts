import { ClassifiersService } from './../../../classifiers/services/classifiers.service';
import { RequestService } from './../../services/request.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  
  public form!: FormGroup;

  constructor(
    public requestService:RequestService,
    private router:Router,
    private formBuilder:FormBuilder,
    public classifierService:ClassifiersService
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {}

  getMax(){
    return this.form.get("max")?.value || "2022-09-18"
  }

  getMin(){
    return this.form.get("min")?.value || "2021-09-18"
  }

  clearFilters(){
   this.form.reset();
    this.form.get("classifier")?.setValue(0);
    this.form.get("state")?.setValue(0);
  }

  selectRequest(id:number | undefined){
    this.requestService.selected.next(this.requestService.list.value.find(data =>  data.id === id) || {});
    this.router.navigate([`request`]);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      classifier: [0],
      state: [0],
      min: [''],
      max: [''],
    });
  }
  
}