import React, { useCallback, useEffect, useState } from 'react';
import { IRat } from '../interfaces/rat';
import { colors, theme } from '../theme';
import { Button } from './Button';

const keyStyle: React.CSSProperties = {
  width: '52px',
  height: '52px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '6px',
};

const wKeyCode = 87;
const aKeyCode = 65;
const sKeyCode = 83;
const dKeyCode = 68;

const keyCodeArray = [wKeyCode, aKeyCode, sKeyCode, dKeyCode];

export function CutenessTraining(props: {
  rat: IRat;
  onClose: () => void;
  onCompletion: (score: number) => void;
}): JSX.Element {
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(40);
  const [effort, setEffort] = useState(0);
  const [targetKey, setTargetKey] = useState<number>();

  const gameKeyPresses = useCallback(
    (event) => {
      if (event.keyCode === targetKey && countdown <= 0 && timer > 0) {
        if (effort < 100) {
          setEffort(effort + 2);
          setTargetKey(undefined);
          if (timer >= 3) {
            setTimeout(() => {
              setTargetKey(keyCodeArray[Math.floor(Math.random() * (3 + 1))]);
            }, 250);
          }
        }
      }
    },
    [countdown, effort, targetKey, timer],
  );

  useEffect(() => {
    document.addEventListener('keydown', gameKeyPresses, false);

    return () => {
      document.removeEventListener('keydown', gameKeyPresses, false);
    };
  }, [countdown, effort, targetKey, timer]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > -1) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [countdown]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (countdown === -1 && timer > 0) {
        if (timer === 40 && targetKey === undefined) {
          setTargetKey(keyCodeArray[Math.floor(Math.random() * (3 + 1))]);
        }
        if (timer === 1) {
          setTargetKey(undefined);
        }
        setTimer(timer - 1);
      }
    }, 250);
    return () => clearInterval(timerInterval);
  }, [timer, countdown]);

  useEffect(() => {
    if (timer === 0) {
      setTargetKey(undefined);
      if (effort < 24) {
        props.onCompletion(effort / 24);
      } else {
        props.onCompletion(1);
      }
    }
  }, [timer]);

  return (
    <div
      style={{
        ...theme.cardStyle,
        ...{
          height: '400px',
          width: '500px',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <div style={{ fontSize: '18px' }}>{`Let's Train Cuteness!`}</div>
        <div style={{ marginTop: '12px' }}>{`Hit the keys when they light up, but don't hit the wrong one!`}</div>
        <div style={{ marginTop: '6px' }}>{countdown > 0 ? countdown : 'GO!!!'}</div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12px',
          }}
        >
          <div
            style={{
              ...keyStyle,
              ...{ border: targetKey === wKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
            }}
          >
            W
          </div>
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div
              style={{
                ...keyStyle,
                ...{ border: targetKey === aKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
              }}
            >
              A
            </div>
            <div
              style={{
                ...keyStyle,
                ...{ border: targetKey === sKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
              }}
            >
              S
            </div>
            <div
              style={{
                ...keyStyle,
                ...{ border: targetKey === dKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
              }}
            >
              D
            </div>
          </div>
        </div>
        <div style={{ marginTop: '6px' }}>
          {countdown === -1 && timer > 0 ? 'Time left: ' + Math.floor(timer / 4) : <br />}
        </div>
        {timer === 0 && (
          <div>
            <div>Finished!</div>
            <div style={{ marginTop: '6px' }}>You scored {effort}</div>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', marginTop: '6px' }}>
              <div>{props.rat.name}&nbsp;</div>
              <div>
                {effort <= 4 && 'barely moved!'}
                {effort > 4 && effort <= 8 && 'did OK...'}
                {effort > 8 && effort <= 16 && 'did pretty good!'}
                {effort > 16 && effort < 23 && 'did pretty GREAT!'}
                {effort >= 24 && 'did PERFECT!'}
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
