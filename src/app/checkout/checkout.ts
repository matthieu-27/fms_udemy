import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormImports } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardIdDirective } from '@/shared/core';
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    ZardCardComponent,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormImports,
    ZardIdDirective,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  checkoutForm: FormGroup;
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });

    // Récupérer les données du panier
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const orderData = {
        customer: this.checkoutForm.value,
        items: this.cartItems,
        total: this.total,
        date: new Date(),
      };

      console.log('Commande validée:', orderData);
      alert('Commande validée avec succès!');
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
