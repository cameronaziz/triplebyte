export const DEV_MODE = false;

export const BOARD_DIMENSIONS = {
  width: 10,
  height: 15,
  printDimensions: {
    width: 2,
    height: 2,
  }
};

export enum Speed {
  // Off = 'off',
  Slow = 'slow',
  Medium = 'medium',
  Fast = 'fast',
}

export const SPEEDS: Types.Speeds = {
  [Speed.Slow]: {
    interval: 2000,
    lower: Speed.Slow,
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
  white: "\x1b[37m",
};

export const CODES = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
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
    label: 'Speed ',
    text: '①  ②  ③',
    tab: 0,
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
