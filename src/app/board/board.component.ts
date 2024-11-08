import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  diceRollsCount = signal(0); // Initialisation d'un signal pour le compteur
  animationState = signal('start'); // Initialisation d'un signal pour l'état de l'animation

  rollDice() {
    this.diceRollsCount.set(Math.floor(Math.random() * 6) + 1);
    console.log('Dice roll:', this.diceRollsCount());
  }
}
