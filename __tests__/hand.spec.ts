import {card, Card} from "../src/card"
import {highestCards, isFourOfKind, isFullHouse, isPair, isThreeOfKind, cards, isTwoPairs} from "../src/hand"

describe('hand', () => {
    test('highest card in hand', () => {
        const hand = cards('2H', '3S', '8C', '7D', '9H')
            expect(highestCards(hand)).toStrictEqual(card('9H'));
    })

    test('pair', () => {
        const hand = cards('2H', '2S', '8C', '7D', '9H')
        expect(isPair(hand)).toStrictEqual([true, cards('2H', '2S')]);
    })

    test('three of kind', () => {
        const hand = cards('2H', '2S', '2C', '7D','9H')
        expect(isThreeOfKind(hand)).toStrictEqual([true, cards('2H', '2S', '2C')]);
    })

    test('three of kind', () => {
        const hand = cards('2H', '2S', '2C', '2D', '9H')
        expect(isFourOfKind(hand)).toStrictEqual([true, cards('2H', '2S', '2C', '2D')]);
    })

    test('full house', () => {
        const hand = cards('2H', '2S', '2C', '3D', '3H')
        expect(isFullHouse(hand)).toStrictEqual([true, cards('2H', '2S', '2C', '3D', '3H')]);
    })

    test('two pairs', () => {
        const hand = cards('2H', '2S', '5C', '3D', '3H')
        expect(isTwoPairs(hand)).toStrictEqual([true, cards('2H', '2S', '3D', '3H')]);
    })
})