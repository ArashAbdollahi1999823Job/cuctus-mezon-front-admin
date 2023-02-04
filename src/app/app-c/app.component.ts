import {Component, OnInit} from '@angular/core';
import {allPageAnimation} from "../shared/animations/allPageAnimation";
import {AuthService} from "../auth/services/auth.service";
import {IUserDto} from "../shared/dto/identiry/IUserDto";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[allPageAnimation]
})
export class AppComponent implements OnInit{
  title = 'مدیریت فروشگاه بزرگ کاکتوس';
  constructor(private authService:AuthService) {}
  ngOnInit(): void {
    this.authorizeUser();
  }
  private authorizeUser() {
    const user=<IUserDto>JSON.parse(localStorage.getItem(environment.keyUserToken))
    if (user) {
      this.authService.setCurrentUser(user)
    }
  }
}
