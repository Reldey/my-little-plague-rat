import React, { useState } from 'react';
import { theme } from '../theme';

interface IButton {
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button(props: IButton): JSX.Element {
  const [hovered, setHovered] = useState(false);

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
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
