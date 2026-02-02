import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { toast } from 'ngx-sonner';
import { Course as CourseModel } from '../models/course.model';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-course',
  imports: [CurrencyPipe],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  @Input() course!: CourseModel;

  constructor(private cartService: CartService) {}

  // Méthode pour ajouter au panier
  addToCart() {
    this.cartService.addToCart(this.course);
    toast.success(`Cours ajouté au panier !`, {
      description: `Le cours en ligne ${this.course.name} a bien été ajouté au panier`,
    });
  }
}
