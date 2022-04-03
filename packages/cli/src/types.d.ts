import { Speed } from './constants';
import Settings from './machine/settings';

export type CellState = 'empty' | 'placed' | 'full';
export type Direction = 'clockwise' | 'counterclockwise';

export type Coordinate = {
  x: number;
  y: number;
  isCenter: boolean
}

export type Piece = {
  coordinates: Coordinate[];
}

export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'magenta' | 'cyan' | 'white'
export type Colors = {
  [color in Color]: string;
}

export type MovingPiece = {
  location: Omit<Coordinate, 'isCenter'>;
  piece: Piece;
  color: string;
  leftEdge(): number;
  rightEdge(): number;
}

export type SpeedInformation = {
  interval: number,
  lower: Speed,
  higher: Speed,
}

export type Speeds = {
  [speed in Speed]: SpeedInformation;
}

type Row = CellState[]
type BoardCells = Row[]

export type Board = {
  cells: BoardCells;
  movingPiece: MovingPiece | null;
  dimensions: Dimensions
}

type Dimensions = {
  width: number;
  height: number;
}

type PlayState = 'playing' | 'home' | 'end';

export type State = {
  board: Board;
  playState: PlayState;
  settings: Settings;
}

export type SettingsProperties = {
  speed: Speed;
  devMode: boolean;
}

export type Message = {
  label?: string
  text: string;
  tab?: number;
}

export type SettingsListener = (properties: Types.SettingsProperties) => void;

export as namespace Types
