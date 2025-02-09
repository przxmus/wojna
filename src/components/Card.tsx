import { JSX } from "react";

type Suit = "hearts" | "diamonds" | "clubs" | "spades";

interface ICard {
  suit: Suit;
  value: number | string;
}

const getColorFromSuit = (suit: Suit): string => {
  switch (suit) {
    case "hearts":
      return "#ff0000";
    case "diamonds":
      return "#ff0000";
    case "clubs":
      return "#000000";
    case "spades":
      return "#000000";
  }
};

const CardSymbolSVG = ({
  children,
  suit,
}: {
  children: JSX.Element;
  suit: Suit;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={getColorFromSuit(suit)}
      className="h-full w-full"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
};

const getSymbolFromSuit = (suit: Suit): JSX.Element => {
  switch (suit) {
    case "hearts":
      return (
        <>
          <CardSymbolSVG suit={suit}>
            <path d="M2 8.5C2 5.46243 4.46243 3 7.5 3C9.36016 3 11.0046 3.92345 12 5.33692C12.9954 3.92345 14.6398 3 16.5 3C19.5376 3 22 5.46243 22 8.5C22 16 11.9999 21.4852 11.9999 21.4852C11.9999 21.4852 2 16 2 8.5Z"></path>
          </CardSymbolSVG>
        </>
      );
    case "diamonds":
      return (
        <>
          <CardSymbolSVG suit={suit}>
            <path d="M4.03607 10.7336L11.2259 1.94599C11.626 1.45697 12.3737 1.45697 12.7738 1.94599L19.9637 10.7336C20.5664 11.4703 20.5664 12.5298 19.9637 13.2665L12.7738 22.0541C12.3737 22.5431 11.626 22.5431 11.2259 22.0541L4.03607 13.2665C3.43329 12.5298 3.43329 11.4703 4.03607 10.7336Z"></path>
          </CardSymbolSVG>
        </>
      );
    case "clubs":
      return (
        <>
          <CardSymbolSVG suit={suit}>
            <path d="M13.7748 11.0393C14.933 9.26656 16 7.63328 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 7.63328 9.06704 9.26656 10.2252 11.0393L10.226 11.0405C10.3036 11.1593 10.3816 11.2787 10.4597 11.3988C10.1704 11.179 9.90318 10.9699 9.65213 10.7734C8.27615 9.69663 7.38594 9 6 9C3.79086 9 2 10.7909 2 13C2 15.2091 3.79086 17 6 17C7.63328 17 9.26656 15.933 11.0393 14.7748L11.0701 14.7547C10.9774 17.0361 10.1119 18.4381 9.15685 19.9853L9.15684 19.9853L9.15683 19.9853C9.03494 20.1828 8.91159 20.3826 8.7882 20.5869C8.4039 21.2232 8.87465 22 9.61803 22H14.382C15.1253 22 15.5961 21.2232 15.2118 20.5869C15.0884 20.3826 14.9651 20.1828 14.8432 19.9853L14.8432 19.9853L14.8432 19.9853C13.8881 18.4381 13.0226 17.0361 12.9299 14.7547C12.9402 14.7614 12.9505 14.7681 12.9607 14.7748C14.7334 15.933 16.3667 17 18 17C20.2091 17 22 15.2091 22 13C22 10.7909 20.2091 9 18 9C16.6141 9 15.7238 9.69663 14.3479 10.7734C14.0968 10.9699 13.8296 11.179 13.5403 11.3988C13.6187 11.2783 13.697 11.1585 13.7748 11.0393Z"></path>
          </CardSymbolSVG>
        </>
      );
    case "spades":
      return (
        <>
          <CardSymbolSVG suit={suit}>
            <path d="M10.9513 15.8933C10.0076 16.5855 8.80705 17 7.5 17C4.46243 17 2 14.7614 2 12C2 8.45193 5.52486 5.91097 8.64404 3.66245C9.92046 2.74232 11.1289 1.87116 12.0001 1C12.8713 1.87114 14.0797 2.74228 15.3561 3.66238C18.4752 5.91092 22 8.4519 22 12C22 14.7614 19.5376 17 16.5 17C15.193 17 13.9924 16.5855 13.0487 15.8933C13.333 17.5389 14.0578 18.713 14.8432 19.9853C14.965 20.1827 15.0884 20.3826 15.2118 20.5869C15.5961 21.2232 15.1253 22 14.382 22H9.61803C8.87465 22 8.4039 21.2232 8.7882 20.5869C8.91159 20.3826 9.03495 20.1827 9.15685 19.9853C9.94224 18.713 10.667 17.5389 10.9513 15.8933Z"></path>
          </CardSymbolSVG>
        </>
      );
  }
};

const CardSymbol = ({
  symbol,
  flipped,
  miniature,
}: {
  symbol: JSX.Element;
  flipped?: boolean;
  miniature?: boolean;
}) => {
  return (
    <div
      className={
        (miniature == true ? "h-4 w-4" : "h-8 w-8") +
        " " +
        (flipped == true ? "rotate-180" : "")
      }
    >
      {symbol}
    </div>
  );
};

// make BaseCard component with "flex h-120 w-75 flex-col items-center justify-between rounded-2xl border-2 border-black bg-amber-50 p-4" class and children
const BaseCard = ({
  children,
  card,
}: {
  children: JSX.Element;
  card: ICard;
}) => {
  return (
    <div
      className="flex h-60 w-30 flex-col items-center justify-between rounded-2xl border-2 border-black bg-amber-50 p-4 font-bold select-none lg:h-80 lg:w-50"
      style={{
        color: getColorFromSuit(card.suit),
      }}
    >
      {children}
    </div>
  );
};

const Two = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">2</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">2</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">2</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">2</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Jack = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">J</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">J</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <p className="text-5xl font-bold">J</p>
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">J</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">J</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Queen = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">Q</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">Q</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <p className="text-5xl font-bold">Q</p>
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">Q</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">Q</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const King = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">K</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">K</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <p className="text-5xl font-bold">K</p>
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">K</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">K</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Ace = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">A</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">A</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">A</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">A</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Ten = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Nine = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Eight = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Seven = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full flex-row items-center justify-around"></div>
        <div className="flex w-full flex-row items-center justify-around"></div>
        <div className="flex w-full flex-row items-center justify-around"></div>

        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Six = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} flipped />
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Five = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Four = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-around">
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
        </div>
        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Three = ({ card }: { card: ICard }) => {
  return (
    <BaseCard card={card}>
      <>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
        <CardSymbol symbol={getSymbolFromSuit(card.suit)} />

        <div className="flex w-full rotate-180 flex-row items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
          <CardSymbol symbol={getSymbolFromSuit(card.suit)} />
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{card.value}</p>
            <CardSymbol symbol={getSymbolFromSuit(card.suit)} miniature />
          </div>
        </div>
      </>
    </BaseCard>
  );
};

const Card = ({ card, flipped }: { card: ICard; flipped?: boolean }) => {
  if (flipped) {
    return (
      <BaseCard card={card}>
        <div className="flex w-full flex-row items-center justify-center"></div>
      </BaseCard>
    );
  }
  switch (card.value) {
    case 2:
      return <Two card={card} />;
    case 3:
      return <Three card={card} />;
    case 4:
      return <Four card={card} />;
    case 5:
      return <Five card={card} />;
    case 6:
      return <Six card={card} />;
    case 7:
      return <Seven card={card} />;
    case 8:
      return <Eight card={card} />;
    case 9:
      return <Nine card={card} />;
    case 10:
      return <Ten card={card} />;
    case 11:
      return <Jack card={card} />;
    case 12:
      return <Queen card={card} />;
    case 13:
      return <King card={card} />;
    case 14:
      return <Ace card={card} />;
  }
};

export default Card;
export type { Suit, ICard };
