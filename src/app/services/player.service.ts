import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { environment } from '../../environments/environment';
import { Logger } from '../logger.service';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  constructor(private logger: Logger) {
    this.logger.log('PlayerService instance created');
  }

  url = `${environment.apiUrl}player/`;
  private apiKey = environment.apiKey;

  headers = {
    Authorization: `${this.apiKey}`,
    'Content-Type': 'application/json',
  };

  async getPlayers(): Promise<Player[]> {
    const response = await fetch(this.url, { headers: this.headers });
    const data = await response.json();
    const players: Player[] = data.results.map((player: any) => ({
      name: player.user.username,
      position: player.position,
      money: player.money,
      inJail: player.in_jail,
      jailTurns: player.jail_turns,
      cards: player.cards,
    }));
    return players;
  }

}
