import { User as UserModel } from '@/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUrl = 'http://localhost:3000/users';
  private users: UserModel[] = [];
  isLoggedIn = signal(false);
  isBigBoss = signal(false);

  constructor(private http: HttpClient) {
    this.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.dataUrl);
  }

  encrypt(text: string): string {
    return CryptoJS.SHA3(text).toString();
  }

  /**
   * Checks if user is in `users` table and if he is an admin
   * @param email
   * @param password
   */
  checkUser(email: string, password: string): boolean {
    for (const user of this.users) {
      if (user.email == email && user.password === this.encrypt(password)) {
        this.isLoggedIn.set(true);
        this.isBigBoss.set(this.isAdmin(user.roles));
        return true;
      }
    }
    return false;
  }

  /**
   * Check if ADMIN is within roles array
   * @param roles
   * @returns
   */
  isAdmin(roles: string[]) {
    if (roles.includes('ADMIN')) {
      this.isBigBoss.set(true);
      return true;
    }
    return false;
  }
}
