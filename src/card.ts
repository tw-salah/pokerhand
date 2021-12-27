const cardValues = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'] as const;
export type CardValue = typeof cardValues[number]
export type Suite = 'C' | 'D' | 'H' | 'S'

export type Card = {
    value: CardValue;
    suite: Suite;
    index: number;
}
export type CardShorthand = `${CardValue}${Suite}`

export const card = (card: CardShorthand): Card => {
  const [value, suite]  = card.split('') as [CardValue, Suite]
  const index = cardValues.indexOf(value)

  return {
      value,
      suite,
      index
  }
}

export const compareCard = (cardA: Card, cardB: Card): number => {
    const cardBIndex = cardValues.indexOf(cardB.value);
    const cardAIndex = cardValues.indexOf(cardA.value);

    if (cardBIndex === cardAIndex) return 0;
    return cardAIndex > cardBIndex ? 1 : -1;
}

export const sort = (cards: Card[]): Card[] => {
    return cards.sort(compareCard)
}

export const display = (card: Card): string => `${card.value}${card.suite}`