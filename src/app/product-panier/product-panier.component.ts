import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Character } from '../Model/character.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-product-panier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gryffindor mb-6">Votre panier</h1>

      <div
        *ngIf="cartItems.length === 0"
        class="p-4 text-center text-gray-600 bg-gray-100 rounded-lg"
      >
        Votre panier est vide.
      </div>

      <div class="space-y-4">
        <div
          *ngFor="let item of cartItems"
          class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <img
                [src]="item.product.image"
                [alt]="item.product.name"
                class="w-16 h-16 object-cover rounded"
              />
              <span class="text-lg font-medium">{{ item.product.name }}</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <button
                  (click)="decrementQuantity(item)"
                  class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span class="text-gray-600">{{ item.quantity }}</span>
                <button
                  (click)="incrementQuantity(item)"
                  class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <span class="text-gryffindor font-semibold"
                >{{ item.product.price * item.quantity }} €</span
              >
              <button
                (click)="removeFromCart(item)"
                class="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 text-right">
        <h2 class="text-2xl font-bold text-gryffindor">
          Total : {{ total }} €
        </h2>
      </div>

      <form
        *ngIf="cartItems.length > 0"
        #orderForm="ngForm"
        (ngSubmit)="onSubmitOrder(orderForm.value)"
        class="mt-8 space-y-6"
      >
        <h2 class="text-2xl font-bold text-gray-800">Passer une commande</h2>

        <div class="space-y-4">
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Nom :
            </label>
            <input
              id="name"
              type="text"
              name="name"
              ngModel
              required
              placeholder="Entrez votre nom"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gryffindor focus:border-gryffindor"
            />
          </div>

          <div class="space-y-2">
            <label
              for="address"
              class="block text-sm font-medium text-gray-700"
            >
              Adresse :
            </label>
            <input
              id="address"
              type="text"
              name="address"
              ngModel
              required
              placeholder="Entrez votre adresse"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gryffindor focus:border-gryffindor"
            />
          </div>
        </div>

        <button
          type="submit"
          [disabled]="orderForm.invalid"
          class="w-full py-3 px-4 bg-gryffindor text-white font-bold rounded-md hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Commander
        </button>
      </form>
    </div>
  `,
})
export class ProductPanierComponent implements OnInit {
  cartItems: { product: Character; quantity: number }[] = [];
  total: number = 0;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.cartItems = this.productService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.productService.calculateTotal();
  }

  incrementQuantity(item: { product: Character; quantity: number }) {
    item.quantity++;
    this.productService.updateCartItemQuantity(item.product, item.quantity);
    this.calculateTotal();
  }

  decrementQuantity(item: { product: Character; quantity: number }) {
    if (item.quantity > 1) {
      item.quantity--;
      this.productService.updateCartItemQuantity(item.product, item.quantity);
      this.calculateTotal();
    }
  }

  removeFromCart(item: { product: Character; quantity: number }) {
    this.productService.removeFromCart(item.product);
    this.cartItems = this.productService.getCartItems();
    this.calculateTotal();
    this.notificationService.show(
      'Produit retiré du panier',
      'Suppression',
      'info'
    );
  }

  onSubmitOrder(formValues: { name: string; address: string }) {
    this.notificationService.show(
      `Commande passée par ${formValues.name}, livraison à ${formValues.address}`,
      'Commande confirmée',
      'success'
    );
    this.productService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }
}
