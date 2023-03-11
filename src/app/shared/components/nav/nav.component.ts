import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent{

  public userId:string;
  constructor(private authService:AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}

