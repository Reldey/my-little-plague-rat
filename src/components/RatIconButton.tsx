import React, { useState } from 'react';
import { IRat } from '../interfaces/rat';
import { theme } from '../theme';

export function RatIconButton(props: {
  rat: IRat;
  selected: boolean;
  hovered: boolean;
  onClick: (rat: IRat) => void;
  onMouseEnter: (rat: IRat) => void;
  onMouseLeave: () => void;
  onInfoClick: (rat: IRat) => void;
}): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '82px',
        minWidth: '82px',
        fontSize: '12px',
        border: hovered || props.selected || props.hovered ? 'white solid 2px' : 'rgba(0,0,0,0.5) solid 2px',
        borderRadius: '4px',
        marginLeft: '6px',
        cursor: 'pointer',
        padding: '6px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onClick={() => {
        props.onClick(props.rat);
      }}
      onMouseEnter={() => {
        setHovered(true);
        props.onMouseEnter(props.rat);
      }}
      onMouseLeave={() => {
        setHovered(false);
        props.onMouseLeave();
      }}
    >
      <div>{props.rat.name}</div>
      <i
        style={{
          ...theme.iconStyle,
          ...{ marginTop: '6px', width: '24px', color: hoveredInfo ? 'white' : 'lightgray' },
        }}
        onClick={(e) => {
          e.stopPropagation();
          props.onInfoClick(props.rat);
        }}
        onMouseEnter={() => {
          setHoveredInfo(true);
        }}
        onMouseLeave={() => {
          setHoveredInfo(false);
        }}
      >
        info
      </i>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '6px',
        }}
      >
        <i style={{ ...theme.iconStyle, ...{ fontSize: '12px' } }}>restaurant</i>
        <div
          style={{
            backgroundColor: 'black',
            width: '100%',
            height: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            border: 'solid 1px white',
          }}
        >
          <div
            style={{ position: 'absolute', width: props.rat.stamina + '%', backgroundColor: 'yellow', height: '8px' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
