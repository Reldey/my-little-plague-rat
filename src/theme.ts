import React from 'react';

interface ITheme {
  buttonStyle: React.CSSProperties;
  iconStyle: React.CSSProperties;
  cardStyle: React.CSSProperties;
  mobileCutOff: number;
}

export const colors = {
  primary: 'green',
  secondary: 'purple',
  accent: 'pink',
  background: 'black',
};

const cardBoxShadow =
  '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)';

export const fancyBorderImage =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Cg fill='none' stroke='` +
  colors.primary +
  `' stroke-width='2'%3E%3Cpath d='M1 1h73v73H1z'/%3E%3Cpath d='M8 8h59v59H8z'/%3E%3Cpath d='M8 8h16v16H8zM51 8h16v16H51zM51 51h16v16H51zM8 51h16v16H8z'/%3E%3C/g%3E%3Cg fill='` +
  colors.primary +
  `'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Ccircle cx='59' cy='16' r='2'/%3E%3Ccircle cx='59' cy='59' r='2'/%3E%3Ccircle cx='16' cy='59' r='2'/%3E%3C/g%3E%3C/svg%3E") 25`;

export const theme: ITheme = {
  buttonStyle: {
    height: '36px',
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
  iconStyle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 2px',
    userSelect: 'none',
    fontFamily: 'Material Icons',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '24px',
    lineHeight: 1,
    textTransform: 'none',
    letterSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'nowrap',
    direction: 'ltr',
    textRendering: 'optimizeLegibility',
    fontFeatureSettings: 'liga',
  },
  cardStyle: {
    boxShadow: cardBoxShadow,
    borderRadius: '4px',
    display: 'flex',
    backgroundColor: colors.background,
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    color: 'white',
    maxWidth: '750px',
    border: '25px solid ' + colors.primary,
    borderImage: fancyBorderImage,
  },
  mobileCutOff: 1000,
};
