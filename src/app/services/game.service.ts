import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {
    this._game = signal<Game>(this.defaultGame);
  }

  defaultGame: Game = {
    id: 0,
    players: [],
    board: { cases: [] },
    turn: 0,
    finished: false,
    current_player: { user: '', position: 0, money: 0, in_jail: false, jail_turns: 0, cards: [], image: '' },
  };

  private _game: WritableSignal<Game> ;
  diceRollsCount = signal<number>(0);
  
  private url = `${environment.apiUrl}game/`;
  private apiKey = environment.apiKey;

  headers = new HttpHeaders({
    Authorization: `${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  getGame(id: number): WritableSignal<Game>{
    if (this._game().id !== id) {
      this.fetchGame(id);
    }
    return this._game ; 
  }

  fetchGame(id: number) {
      this.http.get<Game>(`${this.url}${id}/`, { headers: this.headers }).subscribe({
        next: (game) => {
          this._game.set(game);
        },
        error: (error) => {
          console.error('Error fetching game:', error);
        },
      }
    );
  }
}
