import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
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
    alert(`Cours "${this.course.name}" ajouté au panier !`);
  }
}
