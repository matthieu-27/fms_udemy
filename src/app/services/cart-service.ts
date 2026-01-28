import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private panierSubject = new BehaviorSubject<CartItem[]>([]);
  panier$ = this.panierSubject.asObservable();

  addToCart(course: Course, quantity: number = 1) {
    // Logique pour ajouter au panier
  }

  getItems() {
    return [...this.items];
  }

  // Autres méthodes todo : remove, clear, getTotal, etc.
}
