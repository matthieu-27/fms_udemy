import { UserService } from '@/services/user-service';
import { ZardAlertDialogService } from '@/shared/components/alert-dialog';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardMenuImports } from '@/shared/components/menu';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Course as CourseModel } from '../models/course.model';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-course',
  imports: [
    CurrencyPipe,
    ZardButtonComponent,
    ZardIconComponent,
    ZardCardComponent,
    ZardMenuImports,
  ],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  course = input.required<CourseModel>();
  isBigBoss = signal(false);
  private alertDialogService = inject(ZardAlertDialogService);

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
  ) {
    this.userService.isBigBoss() ? this.isBigBoss.set(true) : null;
  }

  // Méthode pour ajouter au panier
  addToCart() {
    this.cartService.addToCart(this.course());
    toast.success(`Cours ajouté au panier !`, {
      description: `Le cours en ligne ${this.course.name} a bien été ajouté au panier`,
    });
  }

  log(item: string) {
    console.log('Navigate to:', item);
  }

  edit(id: number) {
    this.router.navigateByUrl('edit/' + id);
  }

  showDialog() {
    this.alertDialogService.confirm({
      zTitle: 'Are you absolutely sure?',
      zDescription:
        'This action cannot be undone. This will permanently delete the course and remove the data from our server.',
      zOkText: 'Continue',
      zCancelText: 'Cancel',
    });
  }
}
