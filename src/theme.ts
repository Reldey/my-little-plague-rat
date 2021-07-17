import React from 'react';

interface ITheme {
  buttonStyle: React.CSSProperties;
}

export const colors = {
  primary: 'green',
  secondary: 'purple',
  accent: 'pink',
  background: 'black',
};

export const theme: ITheme = {
  buttonStyle: {
    height: '42px',
    minWidth: '120px',
    backgroundColor: colors.secondary,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    userSelect: 'none',
    cursor: 'pointer',
  },
};
