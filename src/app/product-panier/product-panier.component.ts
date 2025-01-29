import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Character } from '../Model/character.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-panier',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  template: `
    <div class="min-h-screen">
      <div class="max-w-5xl mx-auto px-4 py-12">
        <!-- En-tête du panier -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-4xl font-['Cinzel'] text-[#740001]">
            Chaudron Magique
            <span class="text-sm font-['Inter'] text-[#2A2A2A] ml-2">
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
              class="text-center py-12 bg-[#F9F7F1] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border-2 border-[#C0A875]"
            >
              <img
                src="assets/logoministry.png"
                class="w-20 mx-auto mb-4 opacity-70"
                alt="Panier vide"
              />
              <p class="text-[#4A4A4A] font-['Cinzel']">
                Votre chaudron est vide
              </p>
            </div>

            <div *ngIf="cartItems.length > 0" class="space-y-4">
              <div
                *ngFor="let item of cartItems"
                class="bg-[#F9F7F1] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6 transition-all hover:shadow-[0_0_20px_rgba(192,168,117,0.3)] border-2 border-[#C0A875]"
              >
                <div class="flex items-center gap-6">
                  <div class="relative w-24 h-24 flex-shrink-0">
                    <img
                      [src]="item.product.image"
                      [alt]="item.product.name"
                      class="w-full h-full object-cover rounded-lg border-2 border-[#C0A875]"
                    />
                  </div>

                  <div class="flex-grow">
                    <h3 class="font-['Cinzel'] text-lg text-[#2A2A2A]">
                      {{ item.product.name }}
                    </h3>
                    <p class="text-[#740001] font-medium mt-1">
                      {{ item.product.price }} Gallions
                    </p>
                  </div>

                  <div class="flex flex-col items-end gap-4">
                    <div
                      class="flex items-center bg-[#E4D5B7] rounded-lg border border-[#C0A875]"
                    >
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
                      class="text-[#740001] hover:text-[#4A0001] transition-colors font-['Inter']"
                    >
                      Evanesco
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Résumé et formulaire de commande -->
          <div class="lg:col-span-1">
            <div
              class="bg-[#F9F7F1] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6 sticky top-4 border-2 border-[#C0A875]"
            >
              <h2 class="text-xl font-['Cinzel'] text-[#2A2A2A] mb-6">
                Parchemin de commande
              </h2>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Sous-total</span>
                  <span class="font-medium"
                    >{{ total | number : '1.2-2' }} €</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Livraison</span>
                  <span class="text-green-600">Gratuite</span>
                </div>
                <div class="border-t pt-4">
                  <div class="flex justify-between">
                    <span class="font-bold">Total</span>
                    <span class="font-bold text-gryffindor text-xl"
                      >{{ total | number : '1.2-2' }} €</span
                    >
                  </div>
                </div>
              </div>

              <form
                *ngIf="cartItems.length > 0"
                #orderForm="ngForm"
                (ngSubmit)="onSubmitOrder(orderForm)"
                class="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ngModel
                    required
                    placeholder="Votre nom de sorcier"
                    class="w-full px-4 py-3 rounded-lg border-2 border-[#C0A875] bg-[#F9F7F1] focus:ring-2 focus:ring-[#740001] focus:border-[#740001] font-['Inter']"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ngModel
                    required
                    pattern="[^@]*@[^@]*"
                    placeholder="Votre email"
                    class="w-full px-4 py-3 rounded-lg border-2 border-[#C0A875] bg-[#F9F7F1] focus:ring-2 focus:ring-[#740001] focus:border-[#740001] font-['Inter']"
                    #email="ngModel"
                  />
                  <div
                    *ngIf="email.invalid && (email.dirty || email.touched)"
                    class="text-red-500 text-sm mt-1"
                  >
                    <div *ngIf="email.errors?.['required']">
                      L'email est requis
                    </div>
                    <div *ngIf="email.errors?.['pattern']">
                      L'email doit contenir un &#64;
                    </div>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    ngModel
                    required
                    placeholder="Votre adresse"
                    class="w-full px-4 py-3 rounded-lg border-2 border-[#C0A875] bg-[#F9F7F1] focus:ring-2 focus:ring-[#740001] focus:border-[#740001] font-['Inter']"
                  />
                </div>

                <button
                  type="submit"
                  [disabled]="orderForm.invalid"
                  class="w-full py-4 bg-[#740001] text-white font-['Cinzel'] rounded-lg hover:bg-[#4A0001] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Alohomora
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
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cartItems = this.productService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = Math.round(this.productService.calculateTotal() * 100) / 100;
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

  onSubmitOrder(form: NgForm) {
    if (form.invalid) {
      this.notificationService.show(
        'Veuillez remplir correctement tous les champs',
        'Erreur',
        'error'
      );
      return;
    }

    this.dialog.open(OrderConfirmationDialogComponent, {
      width: '400px',
      data: {
        name: form.value.name,
        address: form.value.address,
        email: form.value.email,
      },
    });

    this.productService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }
}
