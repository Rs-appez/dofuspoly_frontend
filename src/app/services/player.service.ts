import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { environment } from '../../environments/environment';
import { Logger } from '../logger.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  constructor(private http: HttpClient) {
  }

  url = `${environment.apiUrl}player/`;
  private apiKey = environment.apiKey;

  headers = new HttpHeaders({
    Authorization: `${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  getPlayers(): Observable<Player[]> {
    return this.http.get<{ results: any[] }>(this.url, { headers: this.headers }).pipe(
      map(data => data.results.map((player: any) => ({
        name: player.user.username,
        position: player.position,
        money: player.money,
        inJail: player.in_jail,
        jailTurns: player.jail_turns,
        cards: player.cards,
        image: player.image,
      })))
    );
  }
}
