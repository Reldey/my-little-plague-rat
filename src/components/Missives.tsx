import React, { useState } from 'react';
import { IRat } from '../data/IRat';
import { colors, theme } from '../theme';
import { Button } from './Button';
import { IMissive } from '../data/missives';

export function Missives(props: {
  ratList: IRat[];
  missiveList: IMissive[];
  penRect: DOMRect | undefined;
  gameRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  sendOnMissive: (rats: IRat[], missive: IMissive) => void;
}): JSX.Element {
  const [hoveredMissive, setHoveredMissive] = useState(-1);
  const [hoveredRatSlot, setHoveredRatSlot] = useState(-1);
  const [showMissiveList, setShowMissiveList] = useState(true);
  const [selectedMisive, setSelectedMissive] = useState<IMissive>();
  const [audio] = useState(new Audio('/audio/tap_warm.wav'));
  const [checkedRats, setCheckedRats] = useState<number[]>([]);

  return (
    <div
      style={{
        ...theme.cardStyle,
        ...{
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom:
            props.penRect && props.gameRef.current
              ? 'calc(' + props.gameRef.current.clientHeight + 'px - ' + props.penRect.height + 'px)'
              : 0,
        },
      }}
    >
      <div style={{ display: 'flex', width: '100%', height: '100%', flexFlow: 'column nowrap' }}>
        <div style={{ fontSize: '18px' }}>
          {showMissiveList ? 'Missives' : selectedMisive ? selectedMisive.title : ''}
        </div>
        <div
          style={{
            display: 'flex',
            flexFlow: 'column nowrap',
            overflowY: 'auto',
            textAlign: 'left',
            border: 'solid 2px purple',
            padding: '6px',
            marginTop: '6px',
          }}
        >
          {showMissiveList && (
            <>
              {props.missiveList.map((missive, index) => (
                <div
                  key={'missive' + index}
                  style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '6px',
                    border: hoveredMissive === index ? 'solid 2px white' : 'solid 2px gray',
                    cursor: missive.status === 'available' ? 'pointer' : 'default',
                  }}
                  onMouseEnter={() => {
                    if (missive.status === 'available') {
                      setHoveredMissive(index);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredMissive(-1);
                  }}
                  onClick={() => {
                    if (missive.status === 'available') {
                      setSelectedMissive(missive);
                      setShowMissiveList(false);
                      setHoveredMissive(-1);
                      audio.play();
                    }
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexFlow: 'column nowrap',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {missive.status === 'inProgress' && (
                      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                        <i style={theme.iconStyle}>hourglass_empty</i>
                        {missive.time}
                      </div>
                    )}
                    {missive.status === 'failed' && (
                      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                        <i style={{ ...theme.iconStyle, ...{ color: 'red' } }}>cancel</i>- Failed
                      </div>
                    )}
                    <div style={{ textAlign: 'left' }}>{missive.title}</div>
                  </div>
                  <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', padding: '6px 0' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          borderRight: 'solid 2px gray',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0 6px',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{missive.athleticismReq}</div>
                        <i style={theme.iconStyle}>directions_run</i>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          borderRight: 'solid 2px gray',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0 6px',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{missive.intelligenceReq}</div>
                        <i style={theme.iconStyle}>psychology</i>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{missive.cutenessReq}</div>
                        <i style={theme.iconStyle}>favorite</i>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <i style={theme.iconStyle}>pest_control_rodent</i> x {missive.ratSlots}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {selectedMisive && (
            <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
              <div>{selectedMisive.description}</div>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  width: '100%',
                  justifyContent: 'space-around',
                  margin: '12px 0',
                }}
              >
                <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
                  <div>---REWARDS---</div>
                  <div
                    style={{
                      display: 'flex',
                      flexFlow: 'row nowrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginTop: '6px' }}>
                      <i style={{ ...theme.iconStyle, ...{ color: 'goldenrod' } }}>toll</i>
                      {selectedMisive.goldReward}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
                  <div>---REQUIRES---</div>
                  <div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', padding: '6px 0' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{selectedMisive.ratSlots}</div>
                        <i style={theme.iconStyle}>pest_control_rodent</i>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{selectedMisive.athleticismReq}</div>
                        <i style={theme.iconStyle}>directions_run</i>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{selectedMisive.intelligenceReq}</div>
                        <i style={theme.iconStyle}>psychology</i>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0px 6px',
                        }}
                      >
                        <div style={{ fontSize: '20px' }}>{selectedMisive.cutenessReq}</div>
                        <i style={theme.iconStyle}>favorite</i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}
              >
                --RAT LIST--
                {props.ratList.map((rat, index) => {
                  if (rat.status === 'alive') {
                    return (
                      <div
                        key={'missiveRat' + index}
                        style={{
                          display: 'flex',
                          flexFlow: 'row nowrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '6px',
                          color: rat.present ? 'white' : 'gray',
                          cursor: rat.present ? 'pointer' : 'default',
                        }}
                        onMouseEnter={() => {
                          setHoveredRatSlot(index);
                        }}
                        onMouseLeave={() => {
                          setHoveredRatSlot(-1);
                        }}
                        onClick={() => {
                          if (rat.present) {
                            const checkedIndex = checkedRats.indexOf(rat.id);
                            const newCheckedRats = [...checkedRats];
                            if (checkedIndex !== -1) {
                              newCheckedRats.splice(checkedIndex, 1);
                            } else {
                              if (checkedRats.length < selectedMisive.ratSlots) {
                                newCheckedRats.push(rat.id);
                              }
                            }
                            setCheckedRats(newCheckedRats);
                          }
                        }}
                      >
                        <div>
                          <i style={theme.iconStyle}>
                            {checkedRats.includes(rat.id) ? 'check_box' : 'check_box_outline_blank'}
                          </i>
                        </div>
                        <div
                          style={{ width: '100px', textDecoration: hoveredRatSlot === index ? 'underline' : 'none' }}
                        >
                          {rat.name}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <i style={theme.iconStyle}>directions_run</i>
                          {rat.athleticism}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <i style={theme.iconStyle}>psychology</i>
                          {rat.intelligence}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <i style={theme.iconStyle}>favorite</i>
                          {rat.cuteness}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {showMissiveList && (
        <Button
          onClick={() => {
            props.onClose();
          }}
          style={{ marginTop: '6px', width: '120px' }}
        >
          Close
        </Button>
      )}
      {selectedMisive && (
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', width: '100%' }}>
          <Button
            onClick={() => {
              setShowMissiveList(true);
              setSelectedMissive(undefined);
            }}
            style={{ marginTop: '6px', width: '120px' }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (checkedRats.length === selectedMisive.ratSlots) {
                const ratsToSend: IRat[] = [];
                for (const id of checkedRats) {
                  for (const rat of props.ratList) {
                    if (id === rat.id) {
                      ratsToSend.push(rat);
                    }
                  }
                }
                // playSqueak[Math.floor(Math.random() * 4)]();
                setShowMissiveList(true);
                setSelectedMissive(undefined);
                props.sendOnMissive(ratsToSend, selectedMisive);
              }
            }}
            style={{
              marginTop: '6px',
              width: '120px',
              backgroundColor: checkedRats.length === selectedMisive.ratSlots ? colors.primary : 'gray',
            }}
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
}
