import React, { useCallback, useEffect, useState } from 'react';
import { IRat } from '../interfaces/rat';
import { colors, theme } from '../theme';
import { Button } from './Button';

export function Missives(props: { onClose: () => void }): JSX.Element {
  return (
    <div
      style={{
        ...theme.cardStyle,
        ...{
          height: '400px',
          width: '500px',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'column nowrap' }}></div>
      <Button
        onClick={() => {
          props.onClose();
        }}
        style={{ marginTop: '6px', width: '120px' }}
      >
        Close
      </Button>
    </div>
  );
}
