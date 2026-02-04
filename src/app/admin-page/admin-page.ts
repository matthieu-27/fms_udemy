import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormImports } from '@/shared/components/form/form.imports';
import { ZardInputDirective } from '@/shared/components/input';

import { UserService } from '@/services/user-service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

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
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.userService.encrypt(this.profileForm.value.password!));

      if (
        this.userService.checkUser(this.profileForm.value.email!, this.profileForm.value.password!)
      ) {
        console.log(this.userService.isLoggedIn());
        toast.success('Identification réussie !', {
          description:
            "Bravo et merci d'avoir bien appuyé sur les bonnes touches dans le bon ordre",
        });
        this.router.navigate(['profile']);
      } else {
        toast.error("Erreur d'identification", {
          description: "L'email ou le mot de passe sont incorrect",
        });
      }
    }
  }

  /**
   * emailControl getter
   */
  get emailControl() {
    return this.profileForm.get('email')!;
  }

  /**
   * Reset Form button
   */
  resetForm() {
    this.profileForm.reset();
  }
}
