import { CommonModule } from '@angular/common';
import { Component, inject, effect, WritableSignal } from '@angular/core';
import { Player } from '../../interfaces/player';
import { Game } from '../../interfaces/game';
import { PlayerService } from '../../services/player.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../services/game.service';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  diceRollsCount;
  game: WritableSignal<Game>;

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
    this.game = this.gameService.getGame(1);
    this.diceRollsCount = this.gameService.diceRollsCount;

    // Create an effect that triggers placeAllPlayers whenever players is updated
    effect(() => {
      const players = this.game().players;
      this.placeAllPlayers();
    });
  }

  placeAllPlayers() {
    const players = this.game().players;
    players.forEach((player) => {
      this.placePlayer(player);
    });
  }

  placePlayer(player: Player) {
    let x: number | undefined, y: number | undefined;
    let offset: number = this.game().players.indexOf(player) ?? 0;

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
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    this.diceRollsCount.set(diceRoll);

    this.movePlayer();
  }

  movePlayer() {
    const game = this.game();
    const { players, current_player } = game;
    const player = players.find(
      (player) => player.user === current_player.user
    );

    if (player) {
      const playerIndex = players.indexOf(player);
      const updatedPlayers = players.map((p, i) => {
        if (i === playerIndex) {
          return {
            ...p,
            position: (p.position + this.diceRollsCount()) % 40,
          };
        }
        return p;
      });

      const nextPlayerIndex = (playerIndex + 1) % players.length;
      const updatedGame = {
        ...game,
        players: updatedPlayers,
        current_player: players[nextPlayerIndex],
      };

      this.game.update(() => updatedGame);
    }

    this.placeAllPlayers();
  }
}
