import React, { useState } from 'react';
import './App.css';
import { GameScene } from './scenes/GameScene';
import { MenuScene } from './scenes/MenuScene';

function App(): JSX.Element {
  const [showScene, setShowScene] = useState<'Menu' | 'Game' | 'Options'>('Menu');

  return (
    <div className="App">
      <div style={{ display: 'flex', flex: '1 1 auto', width: '800px', height: '600px', backgroundColor: 'black' }}>
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
    </div>
  );
}

export default App;
