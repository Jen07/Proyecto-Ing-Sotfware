import { RequestService } from './../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {

  constructor(
    public requestService:RequestService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    if(!this.requestService.selected.value.id){
      this.router.navigate(["/"])
    }
  }


}
