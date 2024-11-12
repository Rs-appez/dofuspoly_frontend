import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Signal,
  signal,
  effect,
} from '@angular/core';
import { Player } from '../interfaces/player';
import { Game } from '../interfaces/game';
import { PlayerService } from '../services/player.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  diceRollsCount = signal<number>(0);
  players: Signal<Player[] | undefined> = signal<Player[]>([]);
  game : Signal<Game | undefined> = signal<Game | undefined>(undefined);

  boardPosition: { [key: string]: { x: number; y: number } } = {
    start: { x: 87.5677, y: 91.1008 },
    jail: { x: -0.110921, y: 94.9036 },
    parking: { x: -0.110921, y: 3.47358 },
    goToJail: { x: 87.1469, y: 3.47358 },

    bottom: { x: 78.8, y: 92.3684 },
    left: { x: 1.68494, y: 81.2592 },
    top: { x: 12.8827, y: 2.31103 },
    right: { x: 92.3936, y: 15.4162 },
  };

  playerService: PlayerService = inject(PlayerService);
  gameService: GameService = inject(GameService);

  constructor() {
    this.players = toSignal(this.playerService.getPlayers());
    this.game = toSignal(this.gameService.getGame(1));


    // Create an effect that triggers placeAllPlayers whenever players is updated
    effect(() => {
      const players = this.players();
      if (players) {
        this.placeAllPlayers();
      }
    });
  }

  placeAllPlayers() {
    const players = this.players();
    if (players) {
      players.forEach((player) => {
        this.placePlayer(player);
      });
    }
  }

  placePlayer(player: Player) {
    let x: number | undefined, y: number | undefined;
    let offset: number = this.players()?.indexOf(player) ?? 0;

    if ([1, 11, 21, 31].includes(player.position)) {
      switch (player.position) {
        case 1:
          ({ x, y } = this.boardPosition['start']);
          break;
        case 11:
          ({ x, y } = this.boardPosition['jail']);
          break;
        case 21:
          ({ x, y } = this.boardPosition['parking']);
          break;
        case 31:
          ({ x, y } = this.boardPosition['goToJail']);
          break;
      }
      offset *= 2.7;
    } else if (player.position > 1 && player.position < 11) {
      ({ x, y } = this.boardPosition['bottom']);
      x = x - 8.222 * (player.position - 2);
      offset *= 1.6;
    } else if (player.position > 11 && player.position < 21) {
      ({ x, y } = this.boardPosition['left']);
      y = y - 8.222 * ((player.position % 11) - 1);
      offset *= 1.6;
    } else if (player.position > 21 && player.position < 31) {
      ({ x, y } = this.boardPosition['top']);
      x = x + 8.222 * ((player.position % 21) - 1);
      offset *= 1.6;
    } else if (player.position > 31 && player.position < 41) {
      ({ x, y } = this.boardPosition['right']);
      y = y + 8.222 * ((player.position % 31) - 1);
      offset *= 1.6;
    }

    if (x !== undefined && y !== undefined) {
      player.x = x + offset;
      player.y = y;
    }
  }

  rollDice() {
    this.diceRollsCount.set(Math.floor(Math.random() * 6) + 1);
    const players = this.players();
    if (players && players.length > 0) {
      players[0].position += this.diceRollsCount();
      players[0].position %= 40;
    }
    // this.players().forEach((player) => {
    //   player.position += this.diceRollsCount();
    // });
    this.placeAllPlayers();
  }
}
