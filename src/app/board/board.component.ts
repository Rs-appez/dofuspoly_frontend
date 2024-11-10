import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
export class BoardComponent implements OnInit {
  diceRollsCount = signal<number>(0); // Initialisation d'un signal pour le compteur
  players = signal<Player[]>([]); // Initialisation d'un signal pour les joueurs

  boardPosition: { [key: string]: { x: number; y: number } } = {
    "start" : { x: 87.5677, y: 91.1008},
    "jail" : { x: -0.110921, y: 94.9036},
    "parking" : { x: -0.110921, y: 3.47358},
    "goToJail" : { x: 87.1469, y: 3.47358},

    "bottom" : { x: 78.8, y: 92.3684},
    "left" : { x: 1.68494, y: 81.2592},
    "top" : { x: 12.8827, y: 2.31103},
    "right" : { x: 92.3936, y: 15.4162},
  };

  playersObservable: Observable<Player[]>;

  playerService: PlayerService = inject(PlayerService);

  constructor() {
    this.playersObservable = this.playerService.getPlayers();
  }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.playersObservable.subscribe((players: Player[]) => {
      this.players.set(players);
      this.placeAllPlayers();
    });
  }

  placeAllPlayers() {
    this.players().forEach((player) => {
      this.placePlayer(player);
    });
  }

  placePlayer(player: Player) {
  let x: number | undefined, y: number | undefined;
  let offset : number = this.players().indexOf(player);  

  if ([1, 11, 21, 31].includes(player.position)) {
    switch (player.position) {
      case 1:
        ({ x, y } = this.boardPosition["start"]);
        break;
      case 11:
        ({ x, y } = this.boardPosition["jail"]);
        break;
      case 21:
        ({ x, y } = this.boardPosition["parking"]);
        break;
      case 31:
        ({ x, y } = this.boardPosition["goToJail"]);
        break;
    }
    offset *= 2.7;
  }
  else if (player.position > 1 && player.position < 11) {
    ({ x, y } = this.boardPosition["bottom"]);
    x = x - 8.222 * (player.position - 2);
    offset *= 1.6;
  }
  else if (player.position > 11 && player.position < 21) {
    ({ x, y } = this.boardPosition["left"]);
    y = y - 8.222 * (player.position%11 - 1);
    offset *= 1.6;
  }
  else if (player.position > 21 && player.position < 31) {
    ({ x, y } = this.boardPosition["top"]);
    x = x + 8.222 * (player.position%21 - 1);
    offset *= 1.6;
  }
  else if (player.position > 31 && player.position < 41) {
    ({ x, y } = this.boardPosition["right"]);
    y = y + 8.222 * (player.position%31 - 1);
    offset *= 1.6;
  }
  
  if (x !== undefined && y !== undefined) {
    player.x = x + offset;
    player.y = y;
  }
}

  rollDice() {
    this.diceRollsCount.set(Math.floor(Math.random() * 6) + 1);
    this.players()[0].position += this.diceRollsCount();
    this.players()[0].position %= 40;
    // this.players().forEach((player) => {
    //   player.position += this.diceRollsCount();
    // });
    this.placeAllPlayers();
  }
}
