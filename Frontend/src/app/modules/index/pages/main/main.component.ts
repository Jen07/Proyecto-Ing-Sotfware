import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  
  ngOnInit(): void {
  }

  logout(){
    this.authService.destroyUser();
    this.router.navigate(["/login"]);
  }

}
