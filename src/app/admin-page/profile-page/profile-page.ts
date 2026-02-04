import { UserService } from '@/services/user-service';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  isAdmin = signal(false);
  constructor(private userService: UserService) {
    this.isAdmin.set(this.userService.isBigBoss());
  }
}
