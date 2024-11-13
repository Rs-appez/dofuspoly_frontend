import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game-area',
  standalone: true,
  imports: [BoardComponent, CommonModule],
  templateUrl: './game-area.component.html',
  styleUrl: './game-area.component.css'
})
export class GameAreaComponent {

}
