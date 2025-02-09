import { useEffect, useRef, useState } from "react";
import CardDeck from "./components/CardDeck";
import Card, { ICard, Suit } from "./components/Card";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Tooltip } from "react-tooltip";

gsap.registerPlugin(useGSAP);

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

  const [moveAvailable, setMoveAvailable] = useState(true);

  const playerOneCardRef = useRef(null);
  const playerTwoCardRef = useRef(null);
  const potDeckRef = useRef(null);
  const globalDeckRef = useRef(null);
  const playerOneDeckRef = useRef(null);
  const playerTwoDeckRef = useRef(null);

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
    gsap.to(globalDeckRef.current, {
      rotation: -10,
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
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
        gsap.fromTo(
          playerOneDeckRef.current,
          {
            rotation: -10,
            scale: 0,
            opacity: 0,
            ease: "power2.out",
          },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
          },
        );
        gsap.fromTo(
          playerTwoDeckRef.current,
          {
            rotation: 10,
            scale: 0,
            opacity: 0,
            ease: "power2.out",
          },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
          },
        );
        setGlobalDeck([]);
        setGameStarted(true);
      },
    });
  };

  const cardsToPot = (
    player: PlayerState,
    setPlayer: (state: PlayerState) => void,
  ) => {
    const cardsToAdd = player.deck.slice(-3);

    setMoveAvailable(false);
    gsap.fromTo(
      playerOneCardRef.current,
      {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
      },
      {
        x: -200,
        y: 0,
        rotation: -10,
        opacity: 0,
        duration: 0.5,
      },
    );

    gsap.fromTo(
      playerTwoCardRef.current,
      {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
      },
      {
        x: 200,
        y: 0,
        rotation: 10,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (potDeck.length === 0) {
            gsap.fromTo(
              potDeckRef.current,
              {
                x: 0,
                y: 0,
                rotation: -10,
                opacity: 0,
                scale: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              },
            );
          }
          setPlayer({
            ...player,
            playedCard: null,
            potCards: [...player.potCards, ...cardsToAdd],
            // add back current played card to the deck at bottom
            deck: [player.playedCard, ...player.deck.slice(0, -3)].filter(
              (card) => card !== null,
            ),
          });
          setMoveAvailable(true);
        },
      },
    );
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
    // Only animate if there's no played card yet
    if (!player.playedCard) {
      setMoveAvailable(false);
      if (player === playerOne) {
        gsap.fromTo(
          playerOneCardRef.current,
          {
            x: -200,
            y: 0,
            rotation: -10,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setMoveAvailable(true);
            },
          },
        );
      }

      if (player === playerTwo) {
        gsap.fromTo(
          playerTwoCardRef.current,
          {
            x: 200,
            y: 0,
            rotation: 10,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setMoveAvailable(true);
            },
          },
        );
      }
    }

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
        setMoveAvailable(false);
        gsap.fromTo(
          playerOneCardRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
          },
          {
            x: -200,
            y: 0,
            rotation: -10,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
        );
        gsap.fromTo(
          playerTwoCardRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
          },
          {
            x: -200,
            y: 0,
            rotation: -10,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setPlayerOne({
                ...playerOne,
                playedCard: null,
                deck: updatedDeck,
              });
              setPlayerTwo({
                ...playerTwo,
                playedCard: null,
              });
              setMoveAvailable(true);
            },
          },
        );
      } else if (
        playerTwo.playedCard.value > playerOne.playedCard.value &&
        potDeck.length === 0
      ) {
        const updatedDeck = [
          playerOne.playedCard,
          playerTwo.playedCard,
          ...playerTwo.deck,
        ];
        setMoveAvailable(false);
        gsap.fromTo(
          playerOneCardRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
          },
          {
            x: 200,
            y: 0,
            rotation: 10,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
        );
        gsap.fromTo(
          playerTwoCardRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
          },
          {
            x: 200,
            y: 0,
            rotation: 10,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setPlayerTwo({
                ...playerTwo,
                playedCard: null,
                deck: updatedDeck,
              });
              setPlayerOne({
                ...playerOne,
                playedCard: null,
              });
              setMoveAvailable(true);
            },
          },
        );
      } else if (playerOne.playedCard.value === playerTwo.playedCard.value) {
        cardsToPot(playerOne, setPlayerOne);
        cardsToPot(playerTwo, setPlayerTwo);
      } else if (potDeck.length > 0) {
        if (!playerOne.playedCard && !playerTwo.playedCard) {
          playCard(playerOne, setPlayerOne);
          playCard(playerTwo, setPlayerTwo);
        } else if (playerOne.playedCard && playerTwo.playedCard) {
          setMoveAvailable(false);
          // Handle pot resolution without playing card animations
          if (playerOne.playedCard.value > playerTwo.playedCard.value) {
            const updatedDeck = [
              playerTwo.playedCard,
              playerOne.playedCard,
              ...playerOne.deck,
              ...potDeck,
            ];
            gsap.fromTo(
              playerOneCardRef.current,
              {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
              },
              {
                x: -200,
                y: 0,
                rotation: -10,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
              },
            );
            gsap.fromTo(
              playerTwoCardRef.current,
              {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
              },
              {
                x: -200,
                y: 0,
                rotation: 10,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                  gsap.to(potDeckRef.current, {
                    x: -200,
                    y: -200,
                    rotation: 10,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: () => {
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
                      setMoveAvailable(true);
                    },
                  });
                },
              },
            );
          } else if (playerTwo.playedCard.value > playerOne.playedCard.value) {
            const updatedDeck = [
              playerOne.playedCard,
              playerTwo.playedCard,
              ...playerTwo.deck,
              ...potDeck,
            ];
            setMoveAvailable(false);
            gsap.fromTo(
              playerOneCardRef.current,
              {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
              },
              {
                x: 200,
                y: 0,
                rotation: -10,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
              },
            );
            gsap.fromTo(
              playerTwoCardRef.current,
              {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
              },
              {
                x: 200,
                y: 0,
                rotation: 10,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                  gsap.fromTo(
                    potDeckRef.current,
                    {
                      x: 0,
                      y: 0,
                      rotation: 0,
                      opacity: 1,
                    },
                    {
                      x: 200,
                      y: -200,
                      rotation: 10,
                      opacity: 0,
                      duration: 0.5,
                      ease: "power2.out",
                      onComplete: () => {
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
                        setMoveAvailable(true);
                      },
                    },
                  );
                },
              },
            );
          }
        }
      }
    } else {
      playCard(playerOne, setPlayerOne);
      playCard(playerTwo, setPlayerTwo);
    }
  };

  return (
    <div className="">
      <div className="flex h-screen flex-col items-center justify-center gap-16 pt-24 pb-24">
        <div className="flex h-1/2 w-full flex-row items-center justify-around">
          <div className="" ref={playerOneDeckRef}>
            <CardDeck cards={playerOne.deck} flipped />
          </div>
          <div className="flex w-3/12 flex-row items-center justify-center">
            <div className="flex flex-row gap-8">
              <div className="" ref={playerOneCardRef}>
                {playerOne.playedCard ? (
                  <Card card={playerOne.playedCard} />
                ) : null}
              </div>
              <div className="" ref={playerTwoCardRef}>
                {playerTwo.playedCard ? (
                  <Card card={playerTwo.playedCard} />
                ) : null}
              </div>
            </div>
          </div>
          <div className="" ref={playerTwoDeckRef}>
            <CardDeck cards={playerTwo.deck} flipped />
          </div>
        </div>

        <div className="flex h-1/2 flex-row items-center justify-center">
          <Tooltip anchorSelect="#global-deck" place="top">
            <p>Kliknij, aby przestasować</p>
          </Tooltip>
          <div
            className="flex cursor-pointer"
            onClick={shuffleDeck}
            ref={globalDeckRef}
            id="global-deck"
          >
            <CardDeck cards={globalDeck} />
          </div>
          <div className="" ref={potDeckRef}>
            <CardDeck cards={potDeck} flipped />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full flex-row items-center justify-center p-4">
        <button
          className="cursor-not-allowed rounded-lg border-2 border-green-900 bg-green-500 p-4 pr-8 pl-8 font-bold transition-all duration-100 ease-in-out enabled:cursor-pointer enabled:hover:brightness-120 enabled:active:brightness-80 disabled:brightness-50"
          onClick={nextMove}
          disabled={!moveAvailable}
        >
          Graj
        </button>
      </div>
    </div>
  );
};

export default App;
