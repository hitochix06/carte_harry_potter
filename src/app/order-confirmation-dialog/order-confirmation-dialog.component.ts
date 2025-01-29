import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-order-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl">
      <div class="text-center">
        <img
          src="assets/logoministry.png"
          class="w-20 mx-auto mb-4"
          alt="Confirmation"
        />
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Commande Confirmée !
        </h2>
        <p class="text-gray-600 mb-6">
          Merci {{ data.name }} pour votre commande.<br />
          Elle sera livrée à l'adresse suivante :<br />
          {{ data.address }}
        </p>
        <button
          (click)="closeDialog()"
          class="w-full py-3 bg-gryffindor text-white font-bold rounded-lg hover:bg-red-900 transition-all"
        >
          Fermer
        </button>
      </div>
    </div>
  `,
})
export class OrderConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; address: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
