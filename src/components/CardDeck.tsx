import { memo, useMemo } from "react";
import Card, { ICard } from "./Card";

const CardDeck = memo(
  ({ cards, flipped }: { cards: ICard[]; flipped?: boolean }) => {
    // Store rotation values in a ref so they persist between renders
    const cardRotations = useMemo(
      () => cards.map(() => Math.random() * 8 - 4),
      [cards], // Only recreate rotations when number of cards changes
    );

    return (
      <div className="relative inline-flex">
        {cards.map((card, index) => (
          <div
            key={`${card.suit}-${card.value}`}
            className="absolute transition-all duration-300 ease-in-out first:static"
            style={{
              transform: `rotate(${cardRotations[index]}deg)`,
            }}
          >
            <Card card={card} flipped={flipped} />
          </div>
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Check if arrays are different
    const cardsChanged = prevProps.cards.some(
      (card, index) =>
        card.suit !== nextProps.cards[index]?.suit ||
        card.value !== nextProps.cards[index]?.value,
    );

    return (
      !cardsChanged && // Only return true if cards haven't changed
      prevProps.cards.length === nextProps.cards.length &&
      prevProps.flipped === nextProps.flipped
    );
  },
);

export default CardDeck;
