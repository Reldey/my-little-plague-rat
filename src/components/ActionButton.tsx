import React, { useState } from 'react';
import { theme } from '../theme';

interface IActionButton {
  style?: React.CSSProperties;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function ActionButton(props: IActionButton): JSX.Element {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...theme.buttonStyle,
        ...{
          width: '64px',
          height: '64px',
          minWidth: '64px',
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
          props.onClick();
        }
      }}
    >
      {props.children}
    </div>
  );
}
