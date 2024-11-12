import { Case } from "./case";
import { Player } from "./player";

export interface Game {

    cases : Case[];
    players : Player[];
    turn : number;
    finished : boolean;
    currentPlayer : Player;


}