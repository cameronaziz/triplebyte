export const DEV_MODE = false;

export const BOARD_DIMENSIONS = {
  width: 10,
  height: 15,
  printDimensions: {
    width: 2,
    height: 1,
  }
};

export enum Speed {
  Off = 'off',
  Slow = 'slow',
  Medium = 'medium',
  Fast = 'fast',
}

export const SPEEDS: Types.Speeds = {
  [Speed.Off]: {
    interval: 0,
    lower: Speed.Off,
    higher: Speed.Slow,
  },
  [Speed.Slow]: {
    interval: 2000,
    lower: Speed.Off,
    higher: Speed.Medium,
  },
  [Speed.Medium]: {
    interval: 700,
    lower: Speed.Slow,
    higher: Speed.Fast,
  },
  [Speed.Fast]: {
    interval: 400,
    lower: Speed.Medium,
    higher: Speed.Fast,
  },
}

export const COLORS: Types.Colors = {
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
};

export const WELCOME_MESSAGE: Types.Message[] = [
  {
    text: 'Welcome to',

  },
  {
    text: 'Tetris',

  },
  {
    text: '',

  },
  {
    text: '',

  },
  {
    text: 'Speed: ⓪  ①  ②  ③',

  },
  {
    text: '',

  },
  {
    text: 'Press Enter',

  },
  {
    text: 'to start',

  },
]
