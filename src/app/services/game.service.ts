import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  url = `${environment.apiUrl}game/`;
  private apiKey = environment.apiKey;

  headers = new HttpHeaders({
    Authorization: `${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  getGame(id : number): Observable<Game> {
    return this.http.get<Game>(this.url + id, { headers: this.headers });
  }
}
