import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService:AuthService,
    public domSanitizer: DomSanitizer,
    private router:Router
    ) { }

  ngOnInit(): void { }

  logout(){
    this.authService.destroyUser();
    this.router.navigate(["/login"]);
  }

}
