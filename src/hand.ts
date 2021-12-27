import {card, Card, CardShorthand, compareCard, sort} from "./card"
import {countsEqual, Group} from "./group"

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
    const group = Group.byCardValue(cards).filter(countsEqual(2))
    return (group.length === 1)
        ? [true, group.values()]
        : [false, []]
}

export const isTwoPairs = (cards: Card[]): [boolean, Card[]] => {
    const group = Group.byCardValue(cards).filter(countsEqual(2))
    return (group.length === 2)
        ? [true, group.values()]
        : [false, []]
}

export const isThreeOfKind = (cards: Card[]): [boolean, Card[]] => {
    const group = Group.byCardValue(cards).filter(countsEqual(3))
    return (group.length === 1)
        ? [true, group.values()]
        : [false, []]
}

export const isFourOfKind = (cards: Card[]): [boolean, Card[]] => {
    const group = Group.byCardValue(cards).filter(countsEqual(4))
    return (group.length === 1)
        ? [true, group.values()]
        : [false, []]
}

export const isFullHouse = (cards: Card[]): [boolean, Card[]] => {
    const [hasPair, pairs] = isPair(cards)
    const [hasThrees, threes] = isThreeOfKind(cards)

    return (hasPair && hasThrees)
        ? [true, [...threes, ...pairs]]
        : [false, []]
}

export const isFlush = (cards: Card[]): [boolean, Card[]] => {
    const group = Group.byCardSuite(cards).filter(countsEqual(5))
    return (group.length === 1)
        ? [true, group.values()]
        : [false, []]
}

export const isStraight = (cards: Card[]): [boolean, Card[]] => {
    const sortedCards = sort(cards)

    for (let i = 0; i < sortedCards.length - 1; i++) {
        const current = sortedCards[i].index
        const next = sortedCards[i + 1].index
        if (current + 1 !== next) {
            return [false, []]
        }
    }

    return [true, sortedCards]
}

export const isStraightFlush = (cards: Card[]): [boolean, Card[]] => {
    const [straight, sorted] = isStraight(cards)
    const [flush] = isFlush(cards)

    return (straight && flush) ? [true, sorted] : [false, []]
}