import React, { useState } from 'react';
import './App.css';
import { GameScene } from './scenes/GameScene';
import { MenuScene } from './scenes/MenuScene';

function App(): JSX.Element {
  const [showScene, setShowScene] = useState<'Menu' | 'Game' | 'Options'>('Menu');

  return (
    <div style={{ display: 'flex', flex: '1 1 auto', backgroundColor: 'black', height: '100%', width: '100%' }}>
      {showScene === 'Menu' && (
        <MenuScene
          onPlay={() => {
            setShowScene('Game');
          }}
          onOptions={() => {
            setShowScene('Options');
          }}
        />
      )}
      {showScene === 'Game' && <GameScene />}
    </div>
  );
}

export default App;
