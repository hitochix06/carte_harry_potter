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
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-5xl mx-auto px-4 py-12">
        <!-- En-tête du panier -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-4xl font-extrabold text-gryffindor">
            Mon Panier
            <span class="text-sm font-normal text-gray-500 ml-2">
              ({{ cartItems.length }} articles)
            </span>
          </h1>
        </div>

        <!-- Section principale -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Liste des produits -->
          <div class="lg:col-span-2">
            <div
              *ngIf="cartItems.length === 0"
              class="text-center py-12 bg-white rounded-xl shadow-sm"
            >
              <img
                src="assets/logoministry.png"
                class="w-20 mx-auto mb-4"
                alt="Panier vide"
              />
              <p class="text-gray-500">Votre panier est vide</p>
            </div>

            <div *ngIf="cartItems.length > 0" class="space-y-4">
              <div
                *ngFor="let item of cartItems"
                class="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
              >
                <div class="flex items-center gap-6">
                  <div class="relative w-24 h-24 flex-shrink-0">
                    <img
                      [src]="item.product.image"
                      [alt]="item.product.name"
                      class="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div class="flex-grow">
                    <h3 class="font-semibold text-lg text-gray-800">
                      {{ item.product.name }}
                    </h3>
                    <p class="text-gryffindor font-medium mt-1">
                      {{ item.product.price }} € / unité
                    </p>
                  </div>

                  <div class="flex flex-col items-end gap-4">
                    <div class="flex items-center bg-gray-100 rounded-lg">
                      <button
                        (click)="decrementQuantity(item)"
                        class="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span class="w-12 text-center font-medium">{{
                        item.quantity
                      }}</span>
                      <button
                        (click)="incrementQuantity(item)"
                        class="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      (click)="removeFromCart(item)"
                      class="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Résumé et formulaire de commande -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 class="text-xl font-bold text-gray-800 mb-6">Résumé</h2>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Sous-total</span>
                  <span class="font-medium">{{ total }} €</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Livraison</span>
                  <span class="text-green-600">Gratuite</span>
                </div>
                <div class="border-t pt-4">
                  <div class="flex justify-between">
                    <span class="font-bold">Total</span>
                    <span class="font-bold text-gryffindor text-xl"
                      >{{ total }} €</span
                    >
                  </div>
                </div>
              </div>

              <form
                *ngIf="cartItems.length > 0"
                #orderForm="ngForm"
                (ngSubmit)="onSubmitOrder(orderForm.value)"
                class="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ngModel
                    required
                    placeholder="Votre nom"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gryffindor focus:border-gryffindor"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    ngModel
                    required
                    placeholder="Votre adresse"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gryffindor focus:border-gryffindor"
                  />
                </div>

                <button
                  type="submit"
                  [disabled]="orderForm.invalid"
                  class="w-full py-4 bg-gryffindor text-white font-bold rounded-lg hover:bg-red-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Valider la commande
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
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
