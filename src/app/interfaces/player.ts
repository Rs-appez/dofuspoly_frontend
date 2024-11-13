import { Card } from "./card";

export interface Player {
    user: string;
    position: number;
    money: number;
    in_jail: boolean;
    jail_turns: number;
    cards: Card[];
    image: string;
    x ?: number ;
    y ?: number;
}

