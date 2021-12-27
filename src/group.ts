import {Card, CardValue, Suite} from "./card"

export const countsEqual = <T>(n: number) => (k: T, v: Card[]) => v.length === n

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
        return GroupCards.create(cards, c => c.value)
    }

    static byCardSuite = (cards: Card[]): GroupCards<Suite> => {
        return GroupCards.create(cards, c => c.suite)
    }

    private static create = <T>(cards: Card[], fn: (c: Card) => T): GroupCards<T> => {
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

        return new GroupCards<T>(map);
    }
}
