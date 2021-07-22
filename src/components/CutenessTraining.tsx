import React, { RefObject, useCallback, useEffect, useState } from 'react';
import { IRat } from '../data/IRat';
import { RAT_INFO_HEIGHT } from '../scenes/GameScene';
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

const upKeyCode = 38;
const leftKeyCode = 37;
const downKeyCode = 40;
const rightKeyCode = 39;

const keyCodeArray = [upKeyCode, leftKeyCode, downKeyCode, rightKeyCode];

export function CutenessTraining(props: {
  rat: IRat;
  penRect: DOMRect | undefined;
  gameRef: RefObject<HTMLDivElement>;
  onClose: () => void;
  onCompletion: (trainingRat: IRat, score: number) => void;
}): JSX.Element {
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(40);
  const [effort, setEffort] = useState(0);
  const [targetKey, setTargetKey] = useState<number>();
  const [trainingRat, setTrainingRat] = useState<IRat>();

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

  function tapKey(keyTapped: number) {
    if (keyTapped === targetKey && countdown <= 0 && timer > 0) {
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
  }

  useEffect(() => {
    if (timer === 39) {
      setTrainingRat(props.rat);
    }
  }, [timer]);

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
      if (trainingRat) {
        if (effort < 24) {
          props.onCompletion(trainingRat, effort / 24);
        } else {
          props.onCompletion(trainingRat, 1);
        }
      }
    }
  }, [timer]);

  return (
    <div
      style={{
        ...theme.cardStyle,
        ...{
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom:
            props.penRect && props.gameRef.current
              ? 'calc(' +
                props.gameRef.current.clientHeight +
                'px - ' +
                (props.penRect.height - RAT_INFO_HEIGHT) +
                'px)'
              : 0,
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
            onClick={() => {
              tapKey(upKeyCode);
            }}
            style={{
              ...keyStyle,
              ...{ border: targetKey === upKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
            }}
          >
            <i style={theme.iconStyle}>north</i>
          </div>
          <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div
              onClick={() => {
                tapKey(leftKeyCode);
              }}
              style={{
                ...keyStyle,
                ...{ border: targetKey === leftKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
              }}
            >
              <i style={theme.iconStyle}>west</i>
            </div>
            <div
              onClick={() => {
                tapKey(downKeyCode);
              }}
              style={{
                ...keyStyle,
                ...{ border: targetKey === downKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
              }}
            >
              <i style={theme.iconStyle}>south</i>
            </div>
            <div
              onClick={() => {
                tapKey(rightKeyCode);
              }}
              style={{
                ...keyStyle,
                ...{ border: targetKey === rightKeyCode ? 'solid 2px ' + colors.primary : 'solid 2px gray' },
              }}
            >
              <i style={theme.iconStyle}>east</i>
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
              <div>{trainingRat?.name || 'Error'}&nbsp;</div>
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
