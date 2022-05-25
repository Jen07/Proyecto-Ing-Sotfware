
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private formBuilder:FormBuilder
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

  private createForm(): FormGroup {
    return this.formBuilder.group({
      classifier: [0],
      state: [0],
      min: [''],
      max: [''],
    });
  }

}