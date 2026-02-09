import { User as UserModel } from '@/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable, signal } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements ErrorHandler {
  private dataUrl = 'http://localhost:3000/users';
  private users: UserModel[] = [];
  private user: UserModel = new UserModel('', '', ['']);
  private userSubject = new BehaviorSubject<UserModel>(this.user);
  user$ = this.userSubject.asObservable();
  private readonly USER_STORAGE_KEY = 'fms_udemy_user';
  isLoggedIn = signal(false);
  isBigBoss = signal(this.isAdmin(this.user.roles));

  constructor(private http: HttpClient) {
    this.getUsers().subscribe((users) => {
      this.users = users;
    });

    // Charger un user depuis le localStorage
    this.loadUserFromLocalStorage();
  }

  // Méthode pour charger le panier depuis le localStorage
  private loadUserFromLocalStorage(): void {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    if (userData) {
      try {
        this.user = JSON.parse(userData);
        this.isLoggedIn.set(true);
        this.isBigBoss.set(this.isAdmin(this.user.roles));
        this.userSubject.next(this.user);
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  private saveUserToLocalStorage(): void {
    try {
      localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(this.user));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'utilisateur dans localStorage:", error);
    }
  }

  handleError(error: any): void {
    console.error("Erreur lors du chargement de l'utilisateur depuis localStorage:", error);
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
        this.login(user);
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

  login(user: UserModel) {
    const newUser = new UserModel(user.email, user.password, user.roles);
    this.user = newUser;
    this.userSubject.next(this.user);
    this.isLoggedIn.set(true);
    this.isBigBoss.set(this.isAdmin(newUser.roles));
    this.saveUserToLocalStorage();
  }

  logout() {
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this.user = new UserModel('', '', ['']);
    this.userSubject.next(this.user);
    this.isLoggedIn.set(false);
    this.isBigBoss.set(false);
  }
}
