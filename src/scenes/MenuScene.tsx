import React from 'react';
import ReactPlayer from 'react-player';
import { Button } from '../components/Button';
import { theme } from '../theme';

export function MenuScene(props: { onPlay: () => void; onOptions: () => void }): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1 1 auto',
        color: 'white',
      }}
    >
      <ReactPlayer
        className="react-player fixed-bottom"
        url="media/Plague_Rat_Title_Animated.MP4"
        width="400px"
        height="400px"
        controls={false}
        playing={true}
      />
      <Button style={theme.buttonStyle} onClick={props.onPlay}>
        Play
      </Button>
      <Button style={{ marginTop: '12px' }} onClick={props.onOptions}>
        Options
      </Button>
    </div>
  );
}
