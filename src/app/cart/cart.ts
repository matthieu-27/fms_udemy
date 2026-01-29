import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.course.price * item.quantity, 0);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
