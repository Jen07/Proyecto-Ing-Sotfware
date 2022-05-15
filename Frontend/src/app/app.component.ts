import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Se verifica por la posible existencia de un token de session.
    this.authService.loadToken()
  }

}
