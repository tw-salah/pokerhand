import {Card, CardValue, Suite} from "./card"

export const countsEqual = <T>(n: number) => (k: T, v: Card[]) => v.length === n

export class Group<T> {
    private readonly group: Map<T, Card[]>

    private constructor(group: Map<T, Card[]>) {
        this.group = group;
    }

    filter = (predicate: (k: T, v: Card[]) => boolean): Group<T> => {
        const filtered = new Map(
            [...this.group]
                .filter(([k, v]) => predicate(k, v) )
        );

        return new Group<T>(filtered);
    }

    values = (): Card[] => [...this.group.values()].flatMap(m => m)

    get length() {
        return this.group.size
    }

    static byCardValue = (cards: Card[]): Group<CardValue> => {
        return Group.create(cards, c => c.value)
    }

    static byCardSuite = (cards: Card[]): Group<Suite> => {
        return Group.create(cards, c => c.suite)
    }

    private static create = <T>(cards: Card[], fn: (c: Card) => T): Group<T> => {
        const map = new Map<T, Card[]>();
        cards.forEach(card => {
            const k: T = fn(card)
            if (map.has(k)) {
                const group = map.get(k) || [];
                map.set(k, [...group, card])
            } else {
                map.set(k, [card])
            }
        })

        return new Group<T>(map);
    }
}
