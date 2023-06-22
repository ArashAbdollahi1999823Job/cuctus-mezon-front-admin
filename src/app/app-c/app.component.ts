import {Component, OnInit} from '@angular/core';
import {allPageAnimation} from "../shared/animations/allPageAnimation";
import {AuthService} from "../auth/services/auth.service";
import {UserAuthorizeDto} from "../shared/dto/identity/userAuthorizeDto";
import {environment} from "../../environments/environment";
import {PresenceService} from "../shared/services/presence.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [allPageAnimation]
})
export class AppComponent implements OnInit {
  title = 'مدیریت فروشگاه بزرگ کاکتوس';

  constructor(private authService: AuthService,private presenceService:PresenceService) {
  }

  ngOnInit(): void {
    this.authorizeUser();
  }

  private authorizeUser() {
    const user = <UserAuthorizeDto>JSON.parse(localStorage.getItem(environment.storage.adminToken))
    if (user) {
      this.authService.setCurrentUser(user)
      this.presenceService.presenceHubCreate(user);
    }
  }
}
