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
    <div
      class="p-8 max-w-md mx-auto bg-[#f3e5d8] rounded-xl border-4 border-[#8b0000] shadow-2xl"
    >
      <div class="text-center">
        <img
          src="assets/logoministry.png"
          class="w-32 mx-auto mb-6 transform hover:scale-105 transition-transform duration-300"
          alt="Confirmation"
        />
        <h2 class="text-3xl font-['Cinzel'] text-[#8b0000] mb-6">
          Commande Enchantée !
        </h2>
        <div class="bg-[#2a2a2a]/10 p-6 rounded-lg mb-6">
          <p class="font-['Crimson_Text'] text-lg text-[#2a2a2a] mb-4">
            Cher(e) <span class="font-semibold">{{ data.name }}</span
            >,<br />
            Votre commande a été enregistrée avec succès dans nos registres
            magiques.
          </p>
          <p class="font-['Crimson_Text'] text-lg text-[#2a2a2a]">
            Un hibou livrera votre colis à :<br />
            <span class="font-semibold italic">{{ data.address }}</span>
          </p>
        </div>
        <button
          (click)="closeDialog()"
          class="w-full py-4 bg-[#8b0000] text-[#f3e5d8] font-['Cinzel'] text-lg font-bold rounded-lg
          hover:bg-[#6a0000] transform hover:scale-105 transition-all duration-300
          shadow-lg hover:shadow-xl"
        >
          Finite Incantatem
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
