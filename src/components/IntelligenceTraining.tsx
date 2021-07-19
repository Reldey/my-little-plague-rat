import React, { useCallback, useEffect, useState } from 'react';
import { IRat } from '../interfaces/rat';
import { colors, theme } from '../theme';
import { Button } from './Button';
import { MemoryCard } from './MemoryCard';

const cards = [
  'sports_bar',
  'bakery_dining',
  'auto_awesome',
  'pest_control_rodent',
  'dark_mode',
  'security',
  'theater_comedy',
  'favorite',
];

function shuffleArray<Type>(array: Type[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function chunkArray<Type>(array: Type[], size: number) {
  const newArray = [];
  for (let i = 0; i < array.length; i += size) {
    newArray.push(array.slice(i, i + size));
  }
  console.log(newArray);
  return newArray;
}

export function IntelligenceTraining(props: {
  rat: IRat;
  onClose: () => void;
  onCompletion: (score: number) => void;
}): JSX.Element {
  const [timer, setTimer] = useState(30);
  const [cardLists] = useState<string[][]>(chunkArray<string>(shuffleArray<string>([...cards, ...cards]), 4));
  const [shownCards, setShownCards] = useState<string[]>([]);
  const [matches, setMatches] = useState(0);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [shownSymbols, setShownSymbols] = useState<string[]>([]);

  useEffect(() => {
    const cardTimer = setTimeout(() => {
      if (shownSymbols.length === 2 && timer > 0) {
        if (shownSymbols[0] === shownSymbols[1]) {
          setShownSymbols([]);
          setShownCards([]);
          const newMatchedCards = [...matchedCards];
          newMatchedCards.push(shownSymbols[0]);
          setMatches(matches + 1);
          setMatchedCards(newMatchedCards);
          if (matches === 7) {
            setTimer(0);
          }
        } else {
          setShownCards([]);
          setShownSymbols([]);
        }
      }
    }, 500);
    return () => {
      clearTimeout(cardTimer);
    };
  }, [shownCards]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      props.onCompletion(matches / 8);
    }
  }, [timer]);

  return (
    <div
      style={{
        ...theme.cardStyle,
        ...{
          height: '540px',
          width: '440px',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <div style={{ fontSize: '18px' }}>{`Let's Train Intelligence!`}</div>
        <div style={{ marginTop: '12px' }}>{`Match the cards before the timer runs out!`}</div>
        {/* GAME AREA */}
        {timer > 0 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '12px',
            }}
          >
            {cardLists.map((cardList, index1) => (
              <div
                key={'memoryCardRow' + index1}
                style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', justifyContent: 'center' }}
              >
                {cardList.map((card, index2) => (
                  <MemoryCard
                    key={'memoryCard' + index1 + index2}
                    card={card}
                    onClick={() => {
                      const cardId = index1 + '' + index2;
                      if (shownSymbols.length < 2) {
                        const newShownCards = [...shownCards];
                        newShownCards.push(cardId);
                        const newShownSymbols = [...shownSymbols];
                        newShownSymbols.push(card);
                        setShownSymbols(newShownSymbols);
                        setShownCards(newShownCards);
                      }
                    }}
                    matchedCards={matchedCards}
                    flipped={shownCards.includes(index1 + '' + index2)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: '6px' }}>{timer > 0 ? 'Time left: ' + timer : <br />}</div>
        {timer === 0 && (
          <div>
            <div>Finished!</div>
            <div style={{ marginTop: '6px' }}>You scored {matches} out of 8</div>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', marginTop: '6px' }}>
              <div>{props.rat.name}&nbsp;</div>
              <div>
                {matches <= 2 && `couldn't remember a thing!`}
                {matches > 2 && matches <= 4 && 'did OK...'}
                {matches > 5 && matches <= 6 && 'did pretty good!'}
                {matches > 6 && matches <= 7 && 'did pretty GREAT!'}
                {matches === 8 && 'did PERFECT!'}
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        onClick={() => {
          props.onClose();
        }}
        style={{ marginTop: '6px', width: '120px' }}
      >
        Close
      </Button>
    </div>
  );
}
