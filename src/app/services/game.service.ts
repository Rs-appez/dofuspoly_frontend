import { Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  private _game : Signal<Game | undefined> = signal<Game | undefined>(undefined);

  private url = `${environment.apiUrl}game/`;
  private apiKey = environment.apiKey;

  headers = new HttpHeaders({
    Authorization: `${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  getGame(id : number) : Signal<Game | undefined>  {
    if (this._game() === undefined || this._game()!.id !== id) {
      this._game = signal<Game | undefined>(undefined);
      this.fetchGame(id);
    }
    return this._game; ;
  }

  fetchGame(id: number) {
    this._game = toSignal(this.http.get<Game>(this.url + id +"/", { headers: this.headers }));
  }
}
