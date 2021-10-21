import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userHasLogged: boolean;
  urlLogoEmpresa: string;
  nombreEmpresa: string;
  constructor(private authService: AuthService, private router: Router) {
    this.userHasLogged = false;
    this.nombreEmpresa = environment.nombreEmpresa;
    this.urlLogoEmpresa = environment.urlImgLogoEmpresa;
  }

  ngOnInit(): void {
    this.authService.getUserAuthState().subscribe((user) => {
      if (user) {
        this.userHasLogged = true;
      } else {
        this.userHasLogged = false;
      }
    });
  }
  onLogout() {
    this.authService.logout().then(() => {
      setTimeout(() => {
        this.router.navigate(['auth']);
      }, 500);
    });
  }
}
