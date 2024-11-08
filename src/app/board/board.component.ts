import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject , OnInit} from '@angular/core';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

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

  players: Player[] = [{ name: 'test', position: 0, money: 0, inJail: false, jailTurns: 0, cards: [] }];

  playerService: PlayerService = inject(PlayerService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.getPlayers();
  }

  ngOnInit() {
    
  }

  getPlayers() {
    this.playerService.getPlayers().then((players: Player[]) => {
      this.players = players;
      console.log('Player local:', players);
      console.log('Players:', this.players);
      this.cdr.detectChanges();
      this.rollDice();
      this.cdr.detectChanges();
    });
  }  
}
