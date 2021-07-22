import React, { useEffect, useRef, useState } from 'react';
import { ActionButton } from '../components/ActionButton';
import { IRat } from '../data/IRat';
import { names } from '../data/names';
import { RatIconButton } from '../components/RatIconButton';
import { RatCharacter } from '../components/RatCharacter';
import { theme } from '../theme';
import { AthleticismTraining } from '../components/AthleticismTraining';
import { Button } from '../components/Button';
import { IntelligenceTraining } from '../components/IntelligenceTraining';

import Background from '../graphics/Plague_Rat_Background_test_3.png';
import { CutenessTraining } from '../components/CutenessTraining';
import { Missives } from '../components/Missives';
import { missives } from '../data/missives';
import { MusicPlayer } from '../components/MusicPlayer';
export const RAT_LIST_HEIGHT = 64;
export const RAT_INFO_HEIGHT = 64;

export function GameScene(): JSX.Element {
  const [ratList, setRatList] = useState<IRat[]>([]);
  const [selectedRat, setSelectedRat] = useState<IRat>();
  const [hoveredRat, setHoveredRat] = useState<IRat>();
  const [showRatInfo, setShowRatInfo] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showTrainingAthleticism, setShowTrainingAthleticism] = useState(false);
  const [showTrainingIntelligence, setShowTrainingIntelligence] = useState(false);
  const [showTrainingCuteness, setShowTrainingCuteness] = useState(false);
  const [showMissives, setShowMissives] = useState(false);
  const [missiveList, setMissiveList] = useState(missives);
  const [missivesRequireAction, setMissivesRequireAction] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [penRect, setPenRect] = useState<DOMRect>();
  const [oldPenRect, setOldPenRect] = useState<DOMRect>();
  const ratPenRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const [maxRats, setMaxRats] = useState(2);
  const [coins, setCoins] = useState(100);

  const liveRatCount = ratList.filter((rat) => rat.status === 'alive').length;
  useEffect(() => {
    function handleResize() {
      if (ratPenRef !== null) {
        if (ratPenRef.current) {
          setPenRect(ratPenRef.current.getBoundingClientRect());
        }
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [ratPenRef]);

  useEffect(() => {
    setOldPenRect(penRect);
  }, [penRect]);

  /* AGE and GROWTH SYSTEM */
  useEffect(() => {
    const ageRatsInterval = setInterval(() => {
      const newRatList = [...ratList];
      for (const rat of newRatList) {
        if (rat.status !== 'dead') {
          rat.age += 1;
          if (rat.age % 10 === 0) {
            console.log(rat.stamina);
            if (rat.stamina >= 50 && rat.size < 2) {
              rat.size += 0.2;
              if (rat.size > 2) {
                rat.size = 2 + rat.initialSize - 1;
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

  /* MISSIVE TIME LENGTH CHECKER/UPDATER */
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newMissiveList = [...missiveList];
      for (const missive of newMissiveList) {
        if (missive.status === 'inProgress') {
          if (missive.time > 0) {
            missive.time += -1;
          } else if (missive.time === 0 && missive.ratsSent) {
            const newRatList = [...ratList];
            let totalAthleticism = 0;
            let totalIntelligence = 0;
            let totalCuteness = 0;
            for (const rat of missive.ratsSent) {
              totalAthleticism += rat.athleticism;
              totalIntelligence += rat.intelligence;
              totalCuteness += rat.cuteness;
            }
            if (
              totalAthleticism >= missive.athleticismReq &&
              totalIntelligence >= missive.intelligenceReq &&
              totalCuteness >= missive.cutenessReq
            ) {
              missive.status = 'completed';
            } else {
              missive.status = 'failed';
            }
            for (const missiveRat of missive.ratsSent) {
              for (const rat of newRatList) {
                if (rat.id === missiveRat.id) {
                  rat.present = true;
                  rat.status = missive.status === 'failed' ? 'dead' : 'alive';
                }
              }
            }
            console.log(newRatList);
            setRatList(newRatList);
          }
        }
      }
      setMissiveList(newMissiveList);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ratList, coins]);

  useEffect(() => {
    const actionMissives = missiveList.filter(
      (missive) => missive.status === 'completed' || missive.status === 'failed',
    );
    if (actionMissives.length > 0) {
      setMissivesRequireAction(true);
    } else {
      setMissivesRequireAction(false);
    }
  }, [missiveList]);

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
        overflow: 'hidden',
        position: 'relative',
      }}
      ref={gameRef}
    >
      {/* INFO MODAL */}
      {showRatInfo && selectedRat && (
        <div
          style={{
            ...theme.cardStyle,
            ...{
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom:
                penRect && gameRef.current
                  ? 'calc(' + gameRef.current.clientHeight + 'px - ' + penRect.height + 'px)'
                  : 0,
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
                {(selectedRat.size * 4).toFixed(2)}
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
                Athleticism&nbsp;
                {selectedRat.athleticism.toFixed(2)}
              </div>
              <div>
                Intelligence&nbsp;
                {selectedRat.intelligence.toFixed(2)}
              </div>
              <div>
                Cuteness&nbsp;
                {selectedRat.cuteness.toFixed(2)}
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
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom:
                penRect && gameRef.current
                  ? 'calc(' + gameRef.current.clientHeight + 'px - ' + (penRect.height - RAT_INFO_HEIGHT) + 'px)'
                  : 0,
            },
          }}
        >
          <div style={{ fontSize: '24px', textAlign: 'center' }}>
            What skill shall we improve for {selectedRat.name}?
          </div>
          <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', justifyContent: 'space-around' }}>
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
          onCompletion={(trainingRat, score) => {
            const newRatList = [...ratList];
            for (const rat of newRatList) {
              if (trainingRat.id === rat.id) {
                rat.athleticism = rat.athleticism + score;
              }
            }
            setRatList(newRatList);
          }}
          rat={selectedRat}
          onClose={() => {
            setShowTrainingAthleticism(false);
          }}
          gameRef={gameRef}
          penRect={penRect}
        />
      )}
      {showTrainingIntelligence && selectedRat && (
        <IntelligenceTraining
          onCompletion={(trainingRat, score) => {
            const newRatList = [...ratList];
            for (const rat of newRatList) {
              if (trainingRat.id === rat.id) {
                rat.intelligence = rat.intelligence + score;
              }
            }
            setRatList(newRatList);
          }}
          rat={selectedRat}
          onClose={() => {
            setShowTrainingIntelligence(false);
          }}
          penRect={penRect}
          gameRef={gameRef}
        />
      )}
      {showTrainingCuteness && selectedRat && (
        <CutenessTraining
          onCompletion={(trainingRat, score) => {
            const newRatList = [...ratList];
            for (const rat of newRatList) {
              if (trainingRat.id === rat.id) {
                rat.cuteness = rat.cuteness + score;
              }
            }
            setRatList(newRatList);
          }}
          rat={selectedRat}
          onClose={() => {
            setShowTrainingCuteness(false);
          }}
          gameRef={gameRef}
          penRect={penRect}
        />
      )}
      {showMissives && (
        <Missives
          ratList={ratList}
          missiveList={missiveList}
          onClose={() => {
            setShowMissives(false);
          }}
          sendOnMissive={(rats, missive) => {
            const newRatList = [...ratList];
            const newMissiveList = [...missiveList];
            for (const missiveRat of rats) {
              for (const rat of newRatList) {
                if (missiveRat.id === rat.id) {
                  rat.present = false;
                }
              }
            }
            for (const gameMissive of newMissiveList) {
              if (missive.id === gameMissive.id) {
                gameMissive.status = 'inProgress';
                gameMissive.ratsSent = rats;
              }
            }
            setRatList(newRatList);
            setMissiveList(newMissiveList);
          }}
          claimRewards={(missive) => {
            let newMissiveList = [...missiveList];
            newMissiveList = newMissiveList.filter((gameMissive) => gameMissive.id !== missive.id);
            setCoins(coins + missive.coinReward);
            setMissiveList(newMissiveList);
          }}
          clearFailed={(missive) => {
            let newMissiveList = [...missiveList];
            newMissiveList = newMissiveList.filter((gameMissive) => gameMissive.id !== missive.id);
            setMissiveList(newMissiveList);
          }}
          penRect={penRect}
          gameRef={gameRef}
        />
      )}
      {showStore && (
        <div
          style={{
            ...theme.cardStyle,
            ...{
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom:
                penRect && gameRef.current
                  ? 'calc(' + gameRef.current.clientHeight + 'px - ' + penRect.height + 'px)'
                  : 0,
            },
          }}
        >
          <div
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '22px' }}>Store</div>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                  borderTop: 'solid 2px gray',
                  padding: '6px 0 6px 0',
                  margin: '6px 0 0 0',
                }}
              >
                <>Increased Pen Size</>
                <ActionButton
                  style={{
                    width: '48px',
                    minWidth: '48px',
                    height: '48px',
                    display: 'flex',
                    flexFlow: 'column nowrap',
                  }}
                  onClick={() => {
                    setCoins(coins - 100);
                    setMaxRats(maxRats + 1);
                  }}
                  disabled={coins < 100}
                >
                  <i style={{ ...theme.iconStyle, ...{ color: 'goldenrod' } }}>toll</i>100
                </ActionButton>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowStore(false);
            }}
            style={{ width: '120px' }}
          >
            Close
          </Button>
        </div>
      )}
      {/* RAT PEN */}
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          position: 'relative',
          backgroundImage: `url(${Background})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1f1f14',
        }}
        id={'rat_pen'}
        ref={ratPenRef}
      >
        {ratList.map((rat) => {
          let currentRat = null;
          if (penRect && oldPenRect && penRect.width === oldPenRect.width) {
            currentRat = document.getElementById('rat_body' + rat.id) as HTMLElement | null;
          }
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
                penRect={penRect}
              />
            );
          } else {
            return;
          }
        })}
        {}
      </div>
      {/* SELECTED RAT MENU */}
      {selectedRat && penRect && gameRef && gameRef.current && (
        <div
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '16px',
            position: 'absolute',
            width: '100%',
            height: RAT_INFO_HEIGHT + 'px',
            bottom: 'calc(' + gameRef.current.clientHeight + 'px - ' + penRect.height + 'px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '6px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>{selectedRat.athleticism.toFixed(1)}</div>
              <i style={theme.iconStyle}>directions_run</i>
            </div>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '6px',
              }}
            >
              <div>{selectedRat.intelligence.toFixed(1)}</div>
              <i style={theme.iconStyle}>psychology</i>
            </div>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 6px',
                marginLeft: '6px',
              }}
            >
              <div>{selectedRat.cuteness.toFixed(1)}</div>
              <i style={theme.iconStyle}>favorite</i>
            </div>
          </div>
          <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }}>
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
              style={{ minWidth: '42px', width: '42px', height: '42px', fontSize: '16px', marginRight: '6px' }}
            >
              Feed
              <br />
              Rat
            </ActionButton>
            <ActionButton
              onClick={() => {
                setShowTraining(!showTraining);
              }}
              disabled={selectedRat === undefined || !selectedRat.present}
              style={{ minWidth: '42px', width: '42px', height: '42px', fontSize: '16px', marginRight: '6px' }}
            >
              Train
            </ActionButton>
          </div>
        </div>
      )}

      {/* RAT LIST */}
      <div
        style={{
          display: 'flex',
          maxWidth: '100%',
          height: RAT_LIST_HEIGHT + 'px',
          backgroundColor: 'black',
          overflowX: 'auto',
          padding: '6px 6px 6px 0',
          borderTop: 'solid 2px gray',
          justifyContent: 'flex-start',
          alignItems: 'center',
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
              />
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
          alignItems: 'center',
          backgroundColor: 'black',
          borderTop: 'solid 2px white',
          padding: '6px',
        }}
      >
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
          onClick={() => {
            setShowStore(true);
          }}
          style={{ marginTop: '6px' }}
        >
          <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <i style={{ ...theme.iconStyle, ...{ color: 'goldenrod' } }}>toll</i>
            {coins}
          </div>
        </ActionButton>
        {/* 
                <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
          <ActionButton
            onClick={() => {
              setShowRatInfo(!showRatInfo);
            }}
            disabled={selectedRat === undefined || selectedRat.status !== 'alive'}
          >
            Rat
            <br />
            Info
          </ActionButton>
        </div>
        */}

        <ActionButton
          onClick={() => {
            setShowMissives(true);
          }}
          style={{ marginTop: '6px' }}
        >
          {missivesRequireAction && (
            <>
              !<br />
            </>
          )}
          Missives
        </ActionButton>

        <MusicPlayer />
      </div>
    </div>
  );
}
