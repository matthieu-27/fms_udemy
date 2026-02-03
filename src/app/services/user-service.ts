import { User as UserModel } from '@/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUrl = 'http://localhost:3000/users';
  private users: UserModel[] = [];

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
   * Checks if user is in `users` table
   * @param email
   * @param password
   */
  checkUser(email: string, password: string): boolean {
    for (const user of this.users) {
      if (user.email == email && user.password === this.encrypt(password)) {
        return true;
      }
    }
    return false;
  }
}
