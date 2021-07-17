import React, { useState } from 'react';
import { theme } from '../theme';

interface IActionButton {
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}

export function ActionButton(props: IActionButton): JSX.Element {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...theme.buttonStyle,
        ...{ width: '64px', height: '64px', minWidth: '64px', backgroundColor: 'green' },
        ...props.style,
        ...{ border: hovered ? 'solid 2px white' : 'none' },
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
