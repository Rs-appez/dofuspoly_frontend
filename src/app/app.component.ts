import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAreaComponent } from './component/game-area/game-area.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, GameAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
