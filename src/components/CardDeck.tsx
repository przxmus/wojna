import Card, { ICard } from "./Card";

const CardDeck = ({
  cards,
  flipped,
}: {
  cards: ICard[];
  flipped?: boolean;
}) => {
  return (
    <div className="relative inline-flex">
      {cards.map((card, index) => (
        <div
          key={index}
          className="absolute transition-all duration-300 ease-in-out first:static"
          style={{
            transform: `rotate(${Math.random() * 4 - 2}deg)`,
          }}
        >
          <Card card={card} flipped={flipped} />
        </div>
      ))}
    </div>
  );
};

export default CardDeck;
