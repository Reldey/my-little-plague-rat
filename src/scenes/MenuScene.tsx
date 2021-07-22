import React from 'react';
import { Button } from '../components/Button';
import { colors, theme } from '../theme';

export function MenuScene(props: { onPlay: () => void; onOptions: () => void }): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: '1 1 auto',
        backgroundColor: 'black',
        height: '100%',
        color: 'white',
      }}
    >
      {/*  <ReactPlayer
        className="react-player fixed-bottom"
        url="/media/Plague_Rat_Title_Animated.MP4"
        width="400px"
        height="400px"
        controls={false}
        playing={true}
      />*/}
      <img
        src={'/media/Plague_Rat_Title.png'}
        alt={'my little plague rat'}
        style={{ maxWidth: '90%', maxHeight: '60%', marginTop: '24px' }}
      />
      <Button style={theme.buttonStyle} onClick={props.onPlay}>
        Play
      </Button>
      {/* 
        <Button style={{ marginTop: '12px' }} onClick={props.onOptions}>
          Options
        </Button>
      */}
      <div style={{ color: colors.primary, textAlign: 'center' }}>
        Design and Code
        <br />
        Reldey
      </div>
      <div style={{ color: colors.primary, textAlign: 'center' }}>
        Graphics
        <br />
        Lore
      </div>
      <div style={{ marginBottom: '24px' }}>Copyright 2021, Price UX LLC</div>
    </div>
  );
}
