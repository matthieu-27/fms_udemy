import { User as UserModel } from '@/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUrl = 'http://localhost:3000/users';
  private salt = bcrypt.genSaltSync(10);
  private users: UserModel[] = [];

  constructor(private http: HttpClient) {
    this.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.dataUrl);
  }

  /**
   * Checks if user is in `users` table
   * @param email
   * @param password
   */
  checkUser(email: string, password: string): boolean {
    for (const user of this.users) {
      if (user.email == email && user.password == password) {
        return true;
      }
    }
    return false;
  }
}
