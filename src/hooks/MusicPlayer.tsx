import React, { useState, useEffect } from 'react';
import { ActionButton } from '../components/ActionButton';
import { theme } from '../theme';

export const MusicPlayer = ({ url }: { url: string }): JSX.Element => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing && audio) {
      audio.play();
      audio.setAttribute('loop', 'true');
    } else {
      audio.pause();
    }
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
