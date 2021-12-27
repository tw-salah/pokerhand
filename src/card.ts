const cardValues = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'] as const;
export type CardValue = typeof cardValues[number]
export type Suite = 'C' | 'D' | 'H' | 'S'

export type Card = {
    value: CardValue;
    suite: Suite;
}
export type CardShorthand = `${CardValue}${Suite}`

export const card = (card: CardShorthand): Card => {
  const [v, s] = card.split('')
  return {
      value: v as CardValue,
      suite: s as Suite
  }
}

export const compareCard = (cardA: Card, cardB: Card): number => {
    const cardBIndex = cardValues.indexOf(cardB.value);
    const cardAIndex = cardValues.indexOf(cardA.value);

    if (cardBIndex === cardAIndex) return 0;
    return cardBIndex > cardAIndex ? 1 : -1;
}

export const display = (card: Card): string => `${card.value}${card.suite}`