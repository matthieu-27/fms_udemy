import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CartService implements ErrorHandler {
  private items: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private readonly CART_STORAGE_KEY = 'fms_udemy_cart';

  constructor() {
    // Charger le panier depuis le localStorage au démarrage
    this.loadCartFromLocalStorage();
  }

  handleError(error: any): void {
    console.error('Erreur lors du chargement du panier depuis localStorage:', error);
    this.items = [];
    this.cartItemsSubject.next([...this.items]);
  }

  // Méthode pour charger le panier depuis le localStorage
  private loadCartFromLocalStorage(): void {
    const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
    if (cartData) {
      try {
        this.items = JSON.parse(cartData);
        this.cartItemsSubject.next([...this.items]);
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  // Méthode pour sauvegarder le panier dans le localStorage
  private saveCartToLocalStorage(): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier dans localStorage:', error);
    }
  }

  addToCart(course: Course, quantity: number = 1) {
    // Vérifier si le cours est déjà dans le panier
    const existingItem = this.items.find((item) => item.course.id === course.id);

    if (existingItem) {
      // Si le cours existe déjà, augmenter la quantité
      existingItem.quantity += quantity;
    } else {
      // Sinon, ajouter un nouvel élément au panier
      const newItem: CartItem = {
        course: course,
        quantity: quantity,
      };
      this.items.push(newItem);
    }

    // Notifier les observateurs que le panier a changé
    this.cartItemsSubject.next([...this.items]);

    // Sauvegarder dans le localStorage
    this.saveCartToLocalStorage();
  }

  removeFromCart(cartItem: CartItem) {
    // Trouver l'index de l'élément à supprimer
    const index = this.items.findIndex((item) => item.course.id === cartItem.course.id);

    if (index !== -1) {
      // Supprimer l'élément du tableau
      this.items.splice(index, 1);
      // Notifier les observateurs
      this.cartItemsSubject.next([...this.items]);

      // Sauvegarder dans le localStorage
      this.saveCartToLocalStorage();
    }
  }

  clearCart() {
    // Vider complètement le panier
    this.items = [];
    this.cartItemsSubject.next([...this.items]);

    // Sauvegarder dans le localStorage
    this.saveCartToLocalStorage();
  }

  getCartItems(): CartItem[] {
    return [...this.items];
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  }
}
