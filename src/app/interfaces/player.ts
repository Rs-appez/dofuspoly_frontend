import { Card } from "./card";

export interface Player {
    name: string;
    position: number;
    money: number;
    inJail: boolean;
    jailTurns: number;
    cards: Card[];
    image: string;
    x ?: number ;
    y ?: number;
}

