import React, { useEffect, useState } from 'react';
import { ActionButton } from '../components/ActionButton';
import { IRat } from '../interfaces/rat';
import { names } from '../data/names';
import { RatIconButton } from '../components/RatIconButton';
import { RatCharacter } from '../components/RatCharacter';
import { theme } from '../theme';
import { AthleticismTraining } from '../components/AthleticismTraining';
import { Button } from '../components/Button';
import { IntelligenceTraining } from '../components/IntelligenceTraining';

import Background from '../graphics/background.png';
import { CutenessTraining } from '../components/CutenessTraining';

export function GameScene(): JSX.Element {
  const [ratList, setRatList] = useState<IRat[]>([]);
  const [selectedRat, setSelectedRat] = useState<IRat>();
  const [hoveredRat, setHoveredRat] = useState<IRat>();
  const [showRatInfo, setShowRatInfo] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showTrainingAthleticism, setShowTrainingAthleticism] = useState(false);
  const [showTrainingIntelligence, setShowTrainingIntelligence] = useState(false);
  const [showTrainingCuteness, setShowTrainingCuteness] = useState(false);

  const [maxRats, setMaxRats] = useState(2);
  const [coins, setCoins] = useState(100);

  const liveRatCount = ratList.filter((rat) => rat.status === 'alive').length;

  /* AGE and GROWTH SYSTEM */
  useEffect(() => {
    const ageRatsInterval = setInterval(() => {
      const newRatList = [...ratList];
      for (const rat of newRatList) {
        if (rat.status !== 'dead') {
          rat.age += 1;
          if (rat.age % 10 === 0) {
            if (rat.stamina >= 50 && rat.size < 3) {
              rat.size += 0.2;
              if (rat.size > 3) {
                rat.size = 3 + rat.initialSize - 1;
              }
            }
            rat.stamina += -25;
            if (rat.stamina <= 0) {
              rat.stamina = 0;
              rat.careMistakes += 1;
              if (rat.careMistakes >= 10) {
                rat.status = 'dead';
                rat.present = false;
                alert(rat.name + ' has passed away due to starvation...');
                if (selectedRat && selectedRat.name === rat.name) {
                  setSelectedRat(undefined);
                }
              }
            }
          }
        }
      }
      setRatList(newRatList);
    }, 10000);
    return () => clearInterval(ageRatsInterval);
  }, [ratList]);

  useEffect(() => {
    console.log(ratList);
  }, [ratList]);

  function ratGenerator() {
    let ratName = names[Math.floor(Math.random() * names.length)];
    let sameNameCount = 0;
    for (const rat of ratList) {
      if (ratName === rat.name) {
        sameNameCount = sameNameCount + 1;
      }
    }
    if (sameNameCount === 1) {
      ratName = ratName + ' II';
    } else if (sameNameCount === 2) {
      ratName = ratName + ' III';
    } else if (sameNameCount > 2) {
      ratGenerator();
      return;
    }

    const initialSize = parseFloat((Math.random() * (1.4 - 1) + 1).toFixed(2));

    const newRat: IRat = {
      name: ratName,
      id: ratList.length,
      status: 'alive',
      stamina: 10,
      athleticism: Math.floor(Math.random() * 4),
      intelligence: Math.floor(Math.random() * 4),
      cuteness: Math.floor(Math.random() * 4),
      size: initialSize,
      age: 0,
      equipment: [],
      present: true,
      careMistakes: 0,
      initialSize,
    };
    const newRatList = [...ratList];
    newRatList.push(newRat);
    setRatList(newRatList);
    setSelectedRat(newRat);
  }

  return (
    <div
      style={{
        color: 'white',
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: '1 1 auto',

        backgroundColor: 'black',
        maxWidth: '800px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* INFO MODAL */}
      {showRatInfo && selectedRat && (
        <div
          style={{
            ...theme.cardStyle,
            ...{
              width: '300px',
              height: '300px',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          }}
        >
          <div style={{ fontSize: '18px' }}>{selectedRat.name}</div>
          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              width: '100%',
              height: '100%',
              justifyContent: 'space-around',
              marginTop: '6px',
            }}
          >
            <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-around' }}>
              <div>
                Age
                <div style={{ marginTop: '6px' }} />
                {selectedRat.age} hours
              </div>
              <div>
                Size
                <div style={{ marginTop: '6px' }} />
                {parseFloat(selectedRat.size.toPrecision(2)) * 4}
                &nbsp;cm
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-around',
              }}
            >
              <div>
                Athleticism
                <div style={{ marginTop: '6px' }} />
                {selectedRat.athleticism.toPrecision(2)}
              </div>
              <div>
                Intelligence
                <div style={{ marginTop: '6px' }} />
                {selectedRat.intelligence.toPrecision(2)}
              </div>
              <div>
                Cuteness
                <div style={{ marginTop: '6px' }} />
                {selectedRat.cuteness.toPrecision(2)}
              </div>
            </div>
          </div>
          <Button
            style={{ width: '120px', marginTop: '6px', border: 'solid 2px black' }}
            onClick={() => {
              setShowRatInfo(false);
            }}
          >
            Close
          </Button>
        </div>
      )}
      {/* TRAINING AND MODALS */}
      {showTraining && selectedRat && (
        <div
          style={{
            ...theme.cardStyle,
            ...{
              width: '400px',
              height: '300px',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          }}
        >
          <div style={{ fontSize: '24px' }}>What skill shall we improve for {selectedRat.name}?</div>
          <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', justifyContent: 'space-around' }}>
            <ActionButton
              onClick={() => {
                setShowTrainingAthleticism(true);
              }}
              style={{ flexFlow: 'column nowrap', width: '92px' }}
            >
              <div>Athletics</div>
              <i style={theme.iconStyle}>directions_run</i>
            </ActionButton>
            <ActionButton
              onClick={() => {
                setShowTrainingIntelligence(true);
              }}
              style={{ flexFlow: 'column nowrap', width: '92px' }}
            >
              <div>Intelligence</div>
              <i style={theme.iconStyle}>psychology</i>
            </ActionButton>
            <ActionButton
              onClick={() => {
                setShowTrainingCuteness(true);
              }}
              style={{ flexFlow: 'column nowrap', width: '92px' }}
            >
              <div>Cuteness</div>
              <i style={theme.iconStyle}>favorite</i>
            </ActionButton>
          </div>
          <Button
            onClick={() => {
              setShowTraining(false);
            }}
            style={{ width: '120px' }}
          >
            Close
          </Button>
        </div>
      )}
      {showTrainingAthleticism && selectedRat && (
        <AthleticismTraining
          onCompletion={(score) => {
            const newRatList = [...ratList];
            for (const rat of newRatList) {
              if (selectedRat.id === rat.id) {
                rat.athleticism = rat.athleticism + score / 100;
              }
            }
            setRatList(newRatList);
          }}
          rat={selectedRat}
          onClose={() => {
            setShowTrainingAthleticism(false);
          }}
        />
      )}
      {showTrainingIntelligence && selectedRat && (
        <IntelligenceTraining
          onCompletion={(score) => {
            const newRatList = [...ratList];
            for (const rat of newRatList) {
              if (selectedRat.id === rat.id) {
                rat.intelligence = rat.intelligence + score / 100;
              }
            }
            setRatList(newRatList);
          }}
          rat={selectedRat}
          onClose={() => {
            setShowTrainingIntelligence(false);
          }}
        />
      )}
      {showTrainingCuteness && selectedRat && (
        <CutenessTraining
          onCompletion={(score) => {
            const newRatList = [...ratList];
            for (const rat of newRatList) {
              if (selectedRat.id === rat.id) {
                rat.athleticism = rat.athleticism + score / 100;
              }
            }
            setRatList(newRatList);
          }}
          rat={selectedRat}
          onClose={() => {
            setShowTrainingCuteness(false);
          }}
        />
      )}
      {/* RAT LIST */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '94px',
          backgroundColor: 'black',
          maxWidth: '100%',
          overflowX: 'auto',
          padding: '6px',
        }}
      >
        {ratList.map((rat) => {
          if (rat.status !== 'dead') {
            return (
              <RatIconButton
                rat={rat}
                key={'ratIconButton' + rat.id}
                hovered={hoveredRat ? hoveredRat.id === rat.id : false}
                selected={selectedRat ? selectedRat.id === rat.id : false}
                onClick={(rat) => {
                  if (selectedRat && selectedRat.id === rat.id) {
                    setSelectedRat(undefined);
                  } else {
                    setSelectedRat(rat);
                  }
                }}
                onMouseEnter={(rat) => {
                  setHoveredRat(rat);
                }}
                onMouseLeave={() => {
                  setHoveredRat(undefined);
                }}
                onInfoClick={(rat) => {
                  setSelectedRat(rat);
                  setShowRatInfo(!showRatInfo);
                }}
              />
            );
          } else {
            return;
          }
        })}
      </div>
      {/* RAT PEN */}
      <div
        style={{ display: 'flex', flex: '1 1 auto', position: 'relative', backgroundImage: `url(${Background})` }}
        id={'rat_pen'}
      >
        {ratList.map((rat) => {
          const currentRat = document.getElementById('rat_body' + rat.id) as HTMLElement | null;
          if (rat.status === 'alive' && rat.present === true) {
            return (
              <RatCharacter
                key={'ratCharacter' + rat.id}
                rat={rat}
                currentRat={currentRat}
                selected={selectedRat ? rat.id === selectedRat.id : false}
                hovered={hoveredRat ? rat.id === hoveredRat.id : false}
                onClick={(rat) => {
                  setSelectedRat(rat);
                }}
              />
            );
          } else {
            return;
          }
        })}
        {}
      </div>
      {/* ACTION BAR */}
      <div
        style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          width: '100%',
          justifyContent: 'space-around',
          backgroundColor: 'gray',
          padding: '6px',
        }}
      >
        {/* RESOURCES */}
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center' }}>
          <i style={{ ...theme.iconStyle, ...{ color: 'goldenrod' } }}>toll</i>
          <div>{coins}</div>
        </div>
        <ActionButton
          onClick={() => {
            ratGenerator();
          }}
          disabled={maxRats <= liveRatCount}
        >
          +<br />
          Rat
        </ActionButton>
        <ActionButton
          disabled={
            selectedRat === undefined ||
            selectedRat.stamina === 100 ||
            selectedRat.present === false ||
            selectedRat.status !== 'alive'
          }
          onClick={() => {
            if (selectedRat && selectedRat.stamina < 100) {
              const newRatList = [...ratList];
              for (const rat of newRatList) {
                if (rat.id === selectedRat.id) {
                  rat.stamina += 10;
                  if (rat.stamina > 100) {
                    rat.stamina = 100;
                  }
                }
              }
              setRatList(newRatList);
            }
          }}
        >
          Feed
          <br />
          Rat
        </ActionButton>
        <ActionButton
          onClick={() => {
            setShowTraining(!showTraining);
          }}
          disabled={selectedRat === undefined}
        >
          Train
        </ActionButton>
        <ActionButton
          onClick={() => {
            console.log('lets do stuff');
          }}
        >
          Missives
        </ActionButton>
      </div>
    </div>
  );
}
