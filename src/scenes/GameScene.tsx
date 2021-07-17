import React, { useEffect, useState } from 'react';
import { ActionButton } from '../components/ActionButton';
import { IRat } from '../interfaces/rat';
import { names } from '../data/names';

export function GameScene(): JSX.Element {
  const [ratList, setRatList] = useState<IRat[]>([]);

  function ratGenerator() {
    let ratName = names[Math.floor(Math.random() * names.length - 1)];
    let sameNameCount = 0;
    for (const rat of ratList) {
      if (ratName === rat.name) {
        sameNameCount = sameNameCount + 1;
      }
    }
    if (sameNameCount === 1) {
      ratName = ratName + ' the 2nd';
    } else if (sameNameCount === 2) {
      ratName = ratName + ' the 3rd';
    } else if (sameNameCount > 2) {
      ratName = ratName + ' the ' + (sameNameCount + 1) + 'th';
    }
    const newRat: IRat = {
      name: ratName,
      id: ratList.length,
      status: 'alive',
      stamina: Math.floor(Math.random() * 4),
      athleticism: Math.floor(Math.random() * 4),
      cunning: Math.floor(Math.random() * 4),
      cuteness: Math.floor(Math.random() * 4),
      size: Math.floor(Math.random() * 4),
      equipment: [],
      present: true,
    };
    const newRatList = [...ratList];
    newRatList.push(newRat);
    setRatList(newRatList);
  }

  useEffect(() => {
    function generateNewLeft(containerWidth: number, ratBody: HTMLElement) {
      const movement = Math.floor(Math.random() * (12 + 12 + 1)) - 12;
      const currentLeft = parseInt(ratBody.style.left, 10);
      if (movement + currentLeft > 0 && movement + currentLeft < containerWidth) {
        ratBody.style.left = movement + currentLeft + 'px';
      } else {
        generateNewLeft(containerWidth, ratBody);
      }
    }

    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      const ratBodies = document.getElementsByClassName('rat-body');
      const ratPen = document.getElementById('rat_pen') as HTMLElement;
      for (const index in ratBodies) {
        const ratBody = ratBodies[index] as HTMLElement;
        if (typeof ratBody === 'object') {
          generateNewLeft(ratPen.getBoundingClientRect().width, ratBody);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  return (
    <div
      style={{
        color: 'white',
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: '1 1 auto',
        backgroundImage: 'url(/media/Ruins-Pixelatd-Colorized.png)',
        backgroundColor: 'black',
      }}
    >
      {/* RAT LIST */}
      <div style={{ display: 'flex', width: '100%', height: '72px', backgroundColor: 'purple' }}>{}</div>
      {/* RAT PEN */}
      <div style={{ display: 'flex', flex: '1 1 auto', position: 'relative' }} id={'rat_pen'}>
        {ratList.map((rat, index) => {
          const currentRat = document.getElementById('rat_body' + rat.id) as HTMLElement | null;
          if (rat.status === 'alive' && rat.present === true) {
            return (
              <div
                className={'rat-body'}
                id={'rat_body' + rat.id}
                key={'ratBody' + index}
                style={{
                  position: 'absolute',
                  top: '400px',
                  left: currentRat !== null ? currentRat.style.left : Math.floor(Math.random() * 800),
                }}
              >
                {rat.name}
              </div>
            );
          } else {
            return;
          }
        })}
      </div>
      {/* ACTION BAR */}
      <div
        style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          width: '100%',
          justifyContent: 'space-around',
          backgroundColor: 'gray',
          padding: '12px',
        }}
      >
        <ActionButton
          onClick={() => {
            ratGenerator();
          }}
        >
          +<br />
          Rat
        </ActionButton>
        <ActionButton>
          Feed
          <br />
          Rat
        </ActionButton>
        <ActionButton>Train</ActionButton>
      </div>
    </div>
  );
}
