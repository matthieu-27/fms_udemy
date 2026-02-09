import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '@/services/user-service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardCheckboxComponent } from '@/shared/components/checkbox';
import { ZardFormImports } from '@/shared/components/form/form.imports';
import { ZardInputDirective } from '@/shared/components/input';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

interface FormData {
  email: string;
  password: string;
  terms: boolean;
}

@Component({
  selector: 'app-admin-page',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormImports,
    ZardCardComponent,
    ZardCheckboxComponent,
    ZardButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  private readonly fb = inject(FormBuilder);
  readonly showSuccess = signal(false);
  readonly isSubmitting = signal(false);

  readonly profileForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    terms: [false, Validators.requiredTrue],
  });

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    } else {
      if (
        this.userService.checkUser(this.profileForm.value.email!, this.profileForm.value.password!)
      ) {
        toast.success('Identification réussie !', {
          description:
            "Bravo et merci d'avoir bien appuyé sur les bonnes touches dans le bon ordre",
        });
        this.router.navigate(['checkout']);
      } else {
        toast.error("Erreur d'identification", {
          description: "L'email ou le mot de passe sont incorrect",
        });
      }
    }
  }

  isFieldInvalid(fieldName: keyof FormData): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  /**
   * getters
   */
  get emailControl() {
    return this.profileForm.get('email')!;
  }

  get passwordControl() {
    return this.profileForm.get('password')!;
  }

  /**
   * Reset Form button
   */
  resetForm() {
    this.showSuccess.set(false);
    this.profileForm.reset();
  }
}
