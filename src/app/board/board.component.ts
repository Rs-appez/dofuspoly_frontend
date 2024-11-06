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
  diceRollsCount = 0;
  animationState = 'start';

  rollDice() {
    this.diceRollsCount = Math.floor(Math.random() * 6) + 1;
    console.log('Dice roll:', this.diceRollsCount);
  }
}
