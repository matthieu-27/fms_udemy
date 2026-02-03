import { ChangeDetectionStrategy, Component, model, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormImports } from '@/shared/components/form/form.imports';
import { ZardInputDirective } from '@/shared/components/input';

import { Roles, User as UserModel } from '@/models/user.model';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-admin-page',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormImports,
    ZardCardComponent,
    ZardButtonComponent,
    // ZardIdDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  private users: UserModel[] = [
    { email: 'elbab@gmail.com', password: '1234', roles: Roles.Admin },
    { email: 'hugo@gmail.com', password: '1234', roles: Roles.User },
    { email: 'test@gmail.com', password: '1234', roles: Roles.Customer },
  ];
  user = model<UserModel>();

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSubmit() {
    console.log(this.profileForm.value);
    console.log(this.checkUser(this.profileForm.value.email!, this.profileForm.value.password!));
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(this.profileForm.value.password!, salt);
    console.log(hashPass);
  }

  /**
   * Checks if user is in `users` table
   * @param email
   * @param password
   */
  checkUser(email: string, password: string): boolean {
    for (const user of this.users) {
      if (user.email == email && user.password == password) {
        this.user.set(new UserModel(email, password, user.roles));
        return true;
      } else {
        this.user.set(undefined);
      }
    }
    return false;
  }

  get emailControl() {
    return this.profileForm.get('email')!;
  }
}
