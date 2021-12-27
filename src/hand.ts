import {card, Card, CardShorthand, compareCard} from "./card"
import {GroupCards} from "./group"

export const cards = (...cards: CardShorthand[]): Card[] => {
    return cards.map(c => card(c))
}

export const highestCards = (cards: Card[]): Card => {
    const first = cards[0];
    return cards.reduce((c1, c2) => {
        const r = compareCard(c1, c2);
        return (r <= 0) ? c1 : c2;
    }, first);
}

export const isPair = (cards: Card[]): [boolean, Card[]] => {
    const group = GroupCards
            .byCardValue(cards)
            .filter((k, v) => v.length === 2)

    return (group.length === 1) ? [true, group.values()] : [false, []]
}

export const isTwoPairs = (cards: Card[]): [boolean, Card[]] => {
    const group = GroupCards
        .byCardValue(cards)
        .filter((k, v) => v.length === 2)

    return (group.length === 2) ? [true, group.values()] : [false, []]
}

export const isThreeOfKind = (cards: Card[]): [boolean, Card[]] => {
    const group = GroupCards
        .byCardValue(cards)
        .filter((k, v) => v.length === 3)

    return (group.length === 1) ? [true, group.values()] : [false, []]
}

export const isFourOfKind = (cards: Card[]): [boolean, Card[]] => {
    const group = GroupCards
        .byCardValue(cards)
        .filter((k, v) => v.length === 4)

    return (group.length === 1) ? [true, group.values()] : [false, []]
}

export const isFullHouse = (cards: Card[]): [boolean, Card[]] => {
    const group = GroupCards.byCardValue(cards)
    const pair = group.filter((k, v) => v.length === 2)
    const threes = group.filter((k, v) => v.length === 3)

    return (pair.length === 1 && threes.length ===1) ? [true, [...threes.values(), ...pair.values()]] : [false, []]
}