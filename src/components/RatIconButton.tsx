import React from 'react';
import useSound from 'use-sound';
import { IRat } from '../data/IRat';
import { theme } from '../theme';

export function RatIconButton(props: {
  rat: IRat;
  selected: boolean;
  hovered: boolean;
  onClick: (rat: IRat) => void;
  onMouseEnter: (rat: IRat) => void;
  onMouseLeave: () => void;
}): JSX.Element {
  const [squeak1] = useSound('/audio/Mouse_Squeak_1.mp3', { volume: 0.2 });
  const [squeak2] = useSound('/audio/Mouse_Squeak_2.mp3', { volume: 0.2 });
  const [squeak3] = useSound('/audio/Mouse_Squeak_3.mp3', { volume: 0.2 });
  const [squeak4] = useSound('/audio/Mouse_Squeak_4.mp3', { volume: 0.2 });

  const squeaks = [squeak1, squeak2, squeak3, squeak4];

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '72px',
        minWidth: '72px',
        fontSize: '12px',
        border: props.selected ? 'white solid 4px' : 'gray solid 2px',
        borderRadius: '4px',
        marginLeft: '6px',
        cursor: 'pointer',
        padding: '6px',
        justifyContent: 'space-between',
        alignItems: 'center',
        userSelect: 'none',
      }}
      onClick={() => {
        if (!props.selected && props.rat.present) {
          squeaks[Math.floor(Math.random() * 4)]();
        }

        props.onClick(props.rat);
      }}
      onMouseEnter={() => {
        props.onMouseEnter(props.rat);
      }}
      onMouseLeave={() => {
        props.onMouseLeave();
      }}
    >
      <div style={{ fontSize: '18px' }}>{props.rat.name}</div>
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
