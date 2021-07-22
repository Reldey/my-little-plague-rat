import React, { useState } from 'react';
import useSound from 'use-sound';
import { theme } from '../theme';

interface IActionButton {
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseDown?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function ActionButton(props: IActionButton): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const [play] = useSound('/audio/Tap_Warm.mp3');

  return (
    <>
      <div
        style={{
          ...theme.buttonStyle,
          ...{
            width: '64px',
            height: '64px',
            minWidth: '64px',
            textAlign: 'center',
            backgroundColor: props.disabled ? 'gray' : 'green',
            color: props.disabled ? 'darkgray' : 'white',
          },
          ...props.style,
          ...{ border: props.disabled ? 'solid 2px darkgray' : hovered ? 'solid 2px white' : 'solid 2px darkgray' },
        }}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={() => {
          if (!props.disabled) {
            if (props.onClick) {
              props.onClick();
            } else if (props.onMouseDown) {
              props.onMouseDown();
            }
            play();
          }
        }}
      >
        {props.children}
      </div>
    </>
  );
}
