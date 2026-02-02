import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormImports } from '@/shared/components/form/form.imports';
import { ZardInputDirective } from '@/shared/components/input';

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
  private users = [
    { email: 'elbab@gmail.com', password: '1234', roles: ['ADMIN', 'USER'] },
    { email: 'hugo@gmail.com', password: '1234', roles: ['USER'] },
  ];

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  onSubmit() {
    console.log(this.profileForm.value);
    console.log(this.isAdmin(this.profileForm.value.email!, this.profileForm.value.password!));
  }

  isAdmin(email: string, password: string) {
    this.users.forEach((user) => {
      if (user.email == email && user.password == password) {
        return true;
      }
      return false;
    });
  }
}
