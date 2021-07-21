import React, { RefObject, useCallback, useEffect, useState } from 'react';
import { IRat } from '../data/IRat';
import { theme } from '../theme';
import { ActionButton } from './ActionButton';
import { Button } from './Button';

export function AthleticismTraining(props: {
  rat: IRat;
  penRect: DOMRect | undefined;
  gameRef: RefObject<HTMLDivElement>;
  onClose: () => void;
  onCompletion: (trainingRat: IRat, score: number) => void;
}): JSX.Element {
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(10);
  const [effort, setEffort] = useState(0);
  const [trainingRat, setTrainingRat] = useState<IRat>();

  const gameKeyPresses = useCallback(
    (event) => {
      console.log(countdown);
      if ((event.keyCode === 90 || event.keycode === 191) && countdown <= 0 && timer > 0) {
        if (effort < 100) {
          setEffort(effort + 2);
        }
      }
    },
    [countdown, effort],
  );

  useEffect(() => {
    document.addEventListener('keydown', gameKeyPresses, false);

    return () => {
      document.removeEventListener('keydown', gameKeyPresses, false);
    };
  }, [countdown, effort]);

  useEffect(() => {
    if (countdown === -1) {
      setTrainingRat(props.rat);
    }
  }, [countdown]);

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
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer, countdown]);

  useEffect(() => {
    if (timer === 0) {
      if (trainingRat) {
        props.onCompletion(trainingRat, effort / 100);
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
              ? 'calc(' + props.gameRef.current.clientHeight + 'px - ' + props.penRect.height + 'px)'
              : 0,
        },
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <div style={{ fontSize: '18px' }}>{`Let's Train Athleticism!`}</div>
        <div
          style={{ marginTop: '12px' }}
        >{`Mash "Z" and "/" (or tap the buttons below) when the timer hits 0 to fill up the bar!`}</div>
        <div style={{ marginTop: '6px' }}>{countdown > 0 ? countdown : 'GO!!!'}</div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12px',
          }}
        >
          <i style={{ ...theme.iconStyle, ...{ fontSize: '24px' } }}>directions_run</i>
          <div
            style={{
              width: '100%',
              height: '28px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              border: 'solid 2px white',
            }}
          >
            <div style={{ position: 'absolute', width: effort + '%', backgroundColor: 'yellow', height: '24px' }}></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', marginTop: '12px' }}>
          <ActionButton
            onClick={() => {
              if (effort < 100) {
                setEffort(effort + 2);
              }
            }}
          >
            Left
            <br />
            Foot
          </ActionButton>
          <ActionButton
            onClick={() => {
              if (effort < 100) {
                setEffort(effort + 2);
              }
            }}
          >
            Right
            <br />
            Foot
          </ActionButton>
        </div>
        <div style={{ marginTop: '6px' }}>{countdown === -1 && timer > 0 ? 'Time left: ' + timer : <br />}</div>
        {timer === 0 && (
          <div>
            <div>Finished!</div>
            <div style={{ marginTop: '6px' }}>You scored {effort} out of 100</div>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', marginTop: '6px' }}>
              <div>{trainingRat?.name || 'Error'}&nbsp;</div>
              <div>
                {effort <= 25 && 'barely moved!'}
                {effort > 25 && effort <= 50 && 'did OK...'}
                {effort > 50 && effort <= 75 && 'did pretty good!'}
                {effort > 75 && effort < 100 && 'did pretty GREAT!'}
                {effort === 100 && 'did PERFECT!'}
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
