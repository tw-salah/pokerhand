import {Card, compareCard, display, card} from "../src/card"

describe("card", () => {
    test("card comparison", () => {
        const cardA = card('2H')
        const cardB = card('3H')

        expect(compareCard(cardA, cardB)).toBe(1)
        expect(compareCard(cardB, cardA)).toBe(-1)
        expect(compareCard(cardA, cardA)).toBe(0)
    })

    test("comparing [T, J, Q, K, A]", () => {
        const cardA = card('KH')
        const cardB = card('2H')

        expect(compareCard(cardA, cardB)).toBe(-1)
    })

    test("display card", () => {
        const cardA = card('2H')

        expect(display(cardA)).toBe('2H')
    })
});
