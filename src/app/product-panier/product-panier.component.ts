import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Character } from '../Model/character.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-panier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-panier.component.html',
  styleUrls: ['./product-panier.component.css']
})
export class ProductPanierComponent implements OnInit {
  cartItems: { product: Character, quantity: number }[] = [];
  total: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cartItems = this.productService.getCartItems();
    this.total = this.productService.calculateTotal();
  }

  onSubmitOrder(formValues: { name: string; address: string }) {
    alert(`Commande passé par ${formValues.name}, livraison à ${formValues.address}`);
    this.productService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }
}