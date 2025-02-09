import { memo, useMemo, useRef } from "react";
import Card, { ICard } from "./Card";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

const CardDeck = memo(
  ({ cards, flipped }: { cards: ICard[]; flipped?: boolean }) => {
    // Store rotation values in a ref so they persist between renders
    const cardRotations = useMemo(
      () => cards.map(() => Math.random() * 8 - 4),
      [cards], // Only recreate rotations when number of cards changes
    );

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
      console.log("czego huju nie dzialasz");
      // get each card element from ref
      cardRefs.current.forEach((cardRef, index) => {
        if (!cardRef) return;

        // animate each card
        gsap.to(cardRef, {
          duration: 0.5,
          rotation: cardRotations[index],
          ease: "back",
        });
      });
    }, [cardRotations]);

    return (
      <div className="relative inline-flex">
        {cards.map((card, index) => (
          <div
            key={`${card.suit}-${card.value}-${index}`}
            className="absolute first:static"
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el;
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
