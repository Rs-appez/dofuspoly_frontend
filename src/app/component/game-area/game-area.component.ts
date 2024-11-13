import {
  Component,
  effect,
  inject,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { Game } from '../../interfaces/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-area',
  standalone: true,
  imports: [BoardComponent, CommonModule],
  templateUrl: './game-area.component.html',
  styleUrl: './game-area.component.css',
})
export class GameAreaComponent {
  diceRollsCount;

  game: WritableSignal<Game>;

  gameService: GameService = inject(GameService);

  constructor() {
    this.game = this.gameService.getGame(1);
    this.diceRollsCount = this.gameService.diceRollsCount;

    effect(() => {
      console.log('Dice rolled :', this.diceRollsCount());
      console.log('Game :', this.game());
    });
  }

}
