import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject , signal} from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent  {

  diceRollsCount = signal(0); // Initialisation d'un signal pour le compteur

  players: Player[] = [];

  playerService: PlayerService = inject(PlayerService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.getPlayers();
  }



  getPlayers() {
    this.playerService.getPlayers().subscribe((players: Player[]) => {
      this.players = players;
    });
  }  


  rollDice() {
    this.diceRollsCount.set(Math.floor(Math.random() * 6) + 1);
    
  }
}
