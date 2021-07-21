import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { IRat } from '../data/IRat';
import RatSvg from '../graphics/Rat_2.svg';

export const RAT_BASE_HEIGHT = 32;
export const RAT_BASE_WIDTH = 64;

export function RatCharacter(props: {
  rat: IRat;
  currentRat: HTMLElement | null;
  selected: boolean;
  hovered: boolean;
  penRect: DOMRect | undefined;
  onClick: (rat: IRat) => void;
}): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const ratRef = useRef<HTMLDivElement>(null);
  const ratImgRef = useRef<HTMLImageElement>(null);
  const [squeak1] = useSound('/audio/Mouse_Squeak_1.wav', { volume: 0.2 });
  const [squeak2] = useSound('/audio/Mouse_Squeak_2.wav', { volume: 0.2 });
  const [squeak3] = useSound('/audio/Mouse_Squeak_3.wav', { volume: 0.2 });
  const [squeak4] = useSound('/audio/Mouse_Squeak_4.wav', { volume: 0.2 });

  const squeaks = [squeak1, squeak2, squeak3, squeak4];

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
          if (props.penRect) {
            console.log(props.penRect.width);
            generateNewLeft(props.penRect.width, ratBody);
          }
        }
      }
    }

    const intervalId = setInterval(() => {
      if (props.penRect) {
        generateNewLeft(props.penRect?.width, ratRef);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.penRect]);

  return (
    <div
      className={'rat-body'}
      id={'rat_body' + props.rat.id}
      ref={ratRef}
      style={{
        position: 'absolute',
        bottom:
          props.currentRat !== null
            ? props.currentRat.style.bottom
            : Math.floor(Math.random() * (props.penRect ? props.penRect?.height / 2 : 200)) + 12 + 'px',
        left:
          props.currentRat !== null
            ? props.currentRat.style.left
            : Math.floor(Math.random() * (props.penRect ? props.penRect?.width - 100 : 600)),
        height: props.rat.size * RAT_BASE_HEIGHT,
        width: props.rat.size * RAT_BASE_WIDTH,
        display: 'flex',
        flex: '1 1 auto',
        transformOrigin: 'bottom center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
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
          squeaks[Math.floor(Math.random() * 4)]();
          props.onClick(props.rat);
        }}
        style={{ width: props.rat.size * RAT_BASE_WIDTH, height: props.rat.size * RAT_BASE_HEIGHT }}
      />
    </div>
  );
}
