import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  addToPanier(course: Course, quantity: number = 1) {
    // Logique pour ajouter au panier
  }

  getItems() {
    return [...this.items];
  }

  // Autres méthodes todo : remove, clear, getTotal, etc.
}
