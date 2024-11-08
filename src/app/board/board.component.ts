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
export class BoardComponent implements OnInit {
  diceRollsCount = 0;

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

  rollDice() {
    this.diceRollsCount = Math.floor(Math.random() * 6) + 1;
    console.log('Dice roll:', this.diceRollsCount);
    console.log('Players:', this.players);
    this.cdr.detectChanges();
  }
}
