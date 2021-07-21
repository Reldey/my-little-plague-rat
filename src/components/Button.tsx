import React, { useState } from 'react';
import useSound from 'use-sound';
import { theme } from '../theme';

interface IButton {
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button(props: IButton): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const [play] = useSound('/audio/Tap_Warm.mp3');

  return (
    <div
      style={{
        ...theme.buttonStyle,
        ...props.style,
        ...{ border: hovered ? 'solid 2px white' : 'solid 2px darkgray' },
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
          play();
        }
      }}
    >
      {props.children}
    </div>
  );
}
