import React, { useEffect, useRef, useState } from 'react';
import { IRat } from '../interfaces/rat';
import RatSvg from '../graphics/rat.svg';

export const RAT_BASE_HEIGHT = 32;
export const RAT_BASE_WIDTH = 64;

export function RatCharacter(props: {
  rat: IRat;
  currentRat: HTMLElement | null;
  selected: boolean;
  hovered: boolean;
  onClick: (rat: IRat) => void;
}): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const ratRef = useRef<HTMLDivElement>(null);
  const ratImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    function generateNewLeft(containerWidth: number, ratBody: React.RefObject<HTMLDivElement>) {
      const movement = Math.floor(Math.random() * (12 + 12 + 1)) - 12;
      if (ratBody.current) {
        const currentLeft = parseInt(ratBody.current.style.left, 10);
        if (movement + currentLeft > 0 && movement + currentLeft < containerWidth) {
          ratBody.current.style.left = movement + currentLeft + 'px';
          if (ratImgRef.current) {
            ratImgRef.current.style.transform = 'scaleX(' + (movement >= 0 ? '1' : '-1') + ')';
          }
        } else {
          generateNewLeft(containerWidth, ratBody);
        }
      }
    }

    const intervalId = setInterval(() => {
      generateNewLeft(800, ratRef);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={'rat-body'}
      id={'rat_body' + props.rat.id}
      style={{
        position: 'absolute',
        bottom: '12px',
        left: props.currentRat !== null ? props.currentRat.style.left : Math.floor(Math.random() * 800),
        height: props.rat.size * RAT_BASE_HEIGHT,
        width: props.rat.size * RAT_BASE_WIDTH,
        display: 'flex',
        flex: '1 1 auto',
        transformOrigin: 'bottom center',
      }}
      ref={ratRef}
    >
      <div
        style={{
          position: 'absolute',
          bottom: props.rat.size * RAT_BASE_HEIGHT,
          transformOrigin: 'center bottom',
          width: '100%',
          textAlign: 'center',
          display: props.hovered || props.selected || hovered ? 'inline-block' : 'none',
          textShadow: '2px -2px 0 black',
        }}
      >
        {props.rat.name}
      </div>
      <img
        src={RatSvg}
        ref={ratImgRef}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={() => {
          props.onClick(props.rat);
        }}
        style={{ width: props.rat.size * RAT_BASE_WIDTH, height: props.rat.size * RAT_BASE_HEIGHT }}
      />
    </div>
  );
}
