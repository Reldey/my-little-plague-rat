import React, { useState } from 'react';
import { colors, theme } from '../theme';

const memoryCardStyle: React.CSSProperties = {
  width: '48px',
  height: '48px',
  fontSize: '32px',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  margin: '6px',
};

export function MemoryCard(props: {
  card: string;
  flipped: boolean;
  matchedCards: string[];
  onClick: () => void;
}): JSX.Element {
  const [hovered, setHovered] = useState(false);

  const notSolved = !props.matchedCards.includes(props.card);

  return (
    <div
      style={{
        ...memoryCardStyle,
        ...{
          border: notSolved ? (hovered ? 'solid 2px white' : 'solid 2px ' + colors.primary) : 'solid 2px black',
          cursor: notSolved ? 'pointer' : 'default',
        },
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        if (notSolved) {
          props.onClick();
        }
      }}
    >
      {props.flipped && <i style={{ ...theme.iconStyle, ...{ color: 'white' } }}>{props.card}</i>}
    </div>
  );
}
