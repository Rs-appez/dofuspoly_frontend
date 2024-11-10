import { CommonModule } from '@angular/common';
import { Component, inject , signal} from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent  {

  diceRollsCount = signal<number>(0); // Initialisation d'un signal pour le compteur
  players  = signal<Player[]>([]); // Initialisation d'un signal pour les joueurs

  playersObservable: Observable<Player[]>;

  playerService: PlayerService = inject(PlayerService);

  constructor() {
    this.playersObservable = this.playerService.getPlayers();
    this.getPlayers();
  }

  getPlayers()  {
    this.playersObservable.subscribe(
      (players : Player[]) => {
        this.players.set(players);
      }
    );
  }  


  rollDice() {
    this.diceRollsCount.set(Math.floor(Math.random() * 6) + 1);
    
  }
}
