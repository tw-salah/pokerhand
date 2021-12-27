import {Card, CardValue} from "./card"

export class GroupCards<T> {
    private readonly group: Map<T, Card[]>

    private constructor(group: Map<T, Card[]>) {
        this.group = group;
    }

    filter = (predicate: (k: T, v: Card[]) => boolean): GroupCards<T> => {
        const filtered = new Map(
            [...this.group]
                .filter(([k, v]) => predicate(k, v) )
        );

        return new GroupCards<T>(filtered);
    }

    values = (): Card[] => [...this.group.values()].flatMap(m => m)

    get length() {
        return this.group.size
    }

    static byCardValue = (cards: Card[]): GroupCards<CardValue> => {
        const map = new Map<CardValue, Card[]>();
        cards.forEach(card => {
            if (map.has(card.value)) {
                const group = map.get(card.value) || [];
                map.set(card.value, [...group, card])
            } else {
                map.set(card.value, [card])
            }
        })

        return new GroupCards<CardValue>(map);
    }
}

export const groupByCardValue = (cards: Card[]): Map<string, Card[]> => {
    const map = new Map<string, Card[]>();
    cards.forEach(card => {
        if (map.has(card.value)) {
            const group = map.get(card.value) || [];
            map.set(card.value, [...group, card])
        } else {
            map.set(card.value, [card])
        }
    })

    return map;
}
