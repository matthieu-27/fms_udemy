import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Initialiser avec un tableau vide
    this.cartItemsSubject.next(this.items);
  }

  addToCart(course: Course, quantity: number = 1) {
    // Vérifier si le cours est déjà dans le panier
    const existingItem = this.items.find(item => item.course.id === course.id);

    if (existingItem) {
      // Si le cours existe déjà, augmenter la quantité
      existingItem.quantity += quantity;
    } else {
      // Sinon, ajouter un nouvel élément au panier
      const newItem: CartItem = {
        course: course,
        quantity: quantity
      };
      this.items.push(newItem);
    }

    // Notifier les observateurs que le panier a changé
    this.cartItemsSubject.next([...this.items]);
  }

  removeFromCart(cartItem: CartItem) {
    // Trouver l'index de l'élément à supprimer
    const index = this.items.findIndex(item => item.course.id === cartItem.course.id);

    if (index !== -1) {
      // Supprimer l'élément du tableau
      this.items.splice(index, 1);
      // Notifier les observateurs
      this.cartItemsSubject.next([...this.items]);
    }
  }

  clearCart() {
    // Vider complètement le panier
    this.items = [];
    this.cartItemsSubject.next([...this.items]);
  }

  getCartItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (item.course.price * item.quantity);
    }, 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  }
}
