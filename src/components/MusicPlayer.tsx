import React, { useState, useEffect } from 'react';
import { ActionButton } from '../components/ActionButton';
import { theme } from '../theme';

export const MusicPlayer = (): JSX.Element => {
  const [audio] = useState(new Audio('/audio/MLPR_Song.mp3'));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing && audio) {
      audio.volume = 0.2;
      audio.play();
      audio.setAttribute('loop', 'true');
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
      audio.remove();
    };
  }, [audio, playing]);

  return (
    <ActionButton
      onClick={() => {
        setPlaying(!playing);
      }}
      style={{ borderRadius: '50%', width: '42px', minWidth: '42px', height: '42px' }}
    >
      <i style={{ ...theme.iconStyle, ...{ fontSize: '36px' } }}>{playing ? 'music_off' : 'music_note'}</i>
    </ActionButton>
  );
};
