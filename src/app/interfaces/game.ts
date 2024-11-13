import { Case } from './case';
import { Player } from './player';

export interface Game {
  id: number;
  board: { cases: Case[] };
  players: Player[];
  turn: number;
  finished: boolean;
  current_player: Player;
}
