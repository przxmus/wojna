import { useEffect, useState } from "react";
import CardDeck from "./components/CardDeck";
import Card, { ICard, Suit } from "./components/Card";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// interface IPlayer {
//   playedCard: ICard | null;
//   potCards: ICard[];
//   deck: ICard[];
// }

interface PlayerState {
  playedCard: ICard | null;
  potCards: ICard[];
  deck: ICard[];
}

// class Player implements IPlayer {
//   playedCard: ICard | null;
//   potCards: ICard[];
//   deck: ICard[];
//   onChange?: () => void;

//   constructor(onChange?: () => void) {
//     this.playedCard = null;
//     this.potCards = [];
//     this.deck = [];
//     this.onChange = onChange;
//   }

//   playCard = () => {
//     this.playedCard = this.deck.pop() || null;
//     this.onChange?.();
//   };

//   setDeck = (deck: ICard[]) => {
//     this.deck = deck;
//     this.onChange?.();
//   };

//   cardsToPot = () => {
//     this.potCards.push(...this.deck.slice(-3));
//     this.setDeck(this.deck.slice(0, -3));
//     this.onChange?.();
//   };
// }

const App = () => {
  const [globalDeck, setGlobalDeck] = useState<ICard[]>(() => {
    const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
    const values: number[] = Array.from({ length: 13 }, (_, i) => i + 2);
    return suits.flatMap((suit) => values.map((value) => ({ suit, value })));
  });

  const [playerOne, setPlayerOne] = useState<PlayerState>({
    playedCard: null,
    potCards: [],
    deck: [],
  });

  const [playerTwo, setPlayerTwo] = useState<PlayerState>({
    playedCard: null,
    potCards: [],
    deck: [],
  });

  const [potDeck, setPotDeck] = useState<ICard[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const shuffleDeck = () => {
    setGlobalDeck((deck) => {
      const shuffledDeck = [...deck];
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
      }
      return shuffledDeck;
    });
  };

  const startGame = () => {
    setPlayerOne({
      playedCard: null,
      potCards: [],
      deck: globalDeck.slice(0, 26),
    });
    setPlayerTwo({
      playedCard: null,
      potCards: [],
      deck: globalDeck.slice(26),
    });
    setGlobalDeck([]);
    setGameStarted(true);
  };

  const cardsToPot = (
    player: PlayerState,
    setPlayer: (state: PlayerState) => void,
  ) => {
    const cardsToAdd = player.deck.slice(-3);
    setPlayer({
      ...player,
      playedCard: null,
      potCards: [...player.potCards, ...cardsToAdd],
      // add back current played card to the deck at bottom
      deck: [player.playedCard, ...player.deck.slice(0, -3)].filter(
        (card) => card !== null,
      ),
    });
  };

  useEffect(() => {
    if (gameStarted) {
      setPotDeck([...playerOne.potCards, ...playerTwo.potCards]);
    }
  }, [playerOne.potCards, playerTwo.potCards, gameStarted]);

  const playCard = (
    player: PlayerState,
    setPlayer: (state: PlayerState) => void,
  ) => {
    setPlayer({
      ...player,
      playedCard: player.deck.pop() || null,
    });
  };

  const nextMove = () => {
    if (!gameStarted) {
      startGame();
      return;
    }
    if (playerOne.deck.length === 0 && playerTwo.deck.length === 0) {
      MySwal.fire({
        title: "Remis!",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#4caf50",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        window.location.reload();
        console.log("Remis!");
      });
      return;
    } else if (playerOne.deck.length === 0) {
      MySwal.fire({
        title: "Gracz 2 wygrywa!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4caf50",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        window.location.reload();
      });
      return;
    } else if (playerTwo.deck.length === 0) {
      MySwal.fire({
        title: "Gracz 1 wygrywa!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4caf50",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        window.location.reload();
      });
      return;
    }
    if (playerOne.playedCard && playerTwo.playedCard) {
      if (
        playerOne.playedCard.value > playerTwo.playedCard.value &&
        potDeck.length === 0
      ) {
        const updatedDeck = [
          playerTwo.playedCard,
          playerOne.playedCard,
          ...playerOne.deck,
        ];
        setPlayerOne({
          ...playerOne,
          playedCard: null,
          deck: updatedDeck,
        });
        setPlayerTwo({
          ...playerTwo,
          playedCard: null,
        });
      } else if (
        playerTwo.playedCard.value > playerOne.playedCard.value &&
        potDeck.length === 0
      ) {
        const updatedDeck = [
          playerOne.playedCard,
          playerTwo.playedCard,
          ...playerTwo.deck,
        ];
        setPlayerTwo({
          ...playerTwo,
          playedCard: null,
          deck: updatedDeck,
        });
        setPlayerOne({
          ...playerOne,
          playedCard: null,
        });
      } else if (playerOne.playedCard.value === playerTwo.playedCard.value) {
        cardsToPot(playerOne, setPlayerOne);
        cardsToPot(playerTwo, setPlayerTwo);
      } else if (potDeck.length > 0) {
        playCard(playerOne, setPlayerOne);
        playCard(playerTwo, setPlayerTwo);

        // If there is a winner, resolve the pot
        if (playerOne.playedCard && playerTwo.playedCard) {
          if (playerOne.playedCard.value > playerTwo.playedCard.value) {
            const updatedDeck = [
              playerTwo.playedCard,
              playerOne.playedCard,
              ...playerOne.deck,
              ...potDeck,
            ];
            setPlayerOne({
              ...playerOne,
              playedCard: null,
              deck: updatedDeck,
            });
            setPlayerTwo({
              ...playerTwo,
              playedCard: null,
            });
            setPotDeck([]);
          } else if (playerTwo.playedCard.value > playerOne.playedCard.value) {
            const updatedDeck = [
              playerOne.playedCard,
              playerTwo.playedCard,
              ...playerTwo.deck,
              ...potDeck,
            ];
            setPlayerTwo({
              ...playerTwo,
              playedCard: null,
              deck: updatedDeck,
              potCards: [],
            });
            setPlayerOne({
              ...playerOne,
              playedCard: null,
              potCards: [],
            });
            setPotDeck([]);
          }
        }
      }
    } else {
      // Only play new cards if there isn't a winner to resolve
      playCard(playerOne, setPlayerOne);
      playCard(playerTwo, setPlayerTwo);
    }
  };

  return (
    <div className="">
      <div className="flex h-screen flex-col items-center justify-center gap-16 pt-24 pb-24">
        {gameStarted ? (
          <div className="flex h-1/2 w-full flex-row items-center justify-around">
            <CardDeck cards={playerOne.deck} flipped />
            <div className="flex w-3/12 flex-row items-center justify-center">
              <div className="flex flex-row gap-8">
                {playerOne.playedCard ? (
                  <Card card={playerOne.playedCard} />
                ) : null}
                {playerTwo.playedCard ? (
                  <Card card={playerTwo.playedCard} />
                ) : null}
              </div>
            </div>
            <CardDeck cards={playerTwo.deck} flipped />
          </div>
        ) : null}

        <div className="flex h-1/2 flex-row items-center justify-center">
          <div className="flex cursor-pointer" onClick={shuffleDeck}>
            <CardDeck cards={globalDeck} />
          </div>
          <CardDeck cards={potDeck} flipped />
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full flex-row items-center justify-center p-4">
        <button
          className="cursor-pointer rounded-lg border-2 border-green-900 bg-green-500 p-4 pr-8 pl-8 font-bold transition-all duration-100 ease-in-out hover:brightness-120 active:brightness-80"
          onClick={nextMove}
        >
          Graj
        </button>
      </div>
    </div>
  );
};

export default App;
