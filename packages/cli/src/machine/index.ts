import { BOARD_DIMENSIONS, Speed, SPEEDS } from '../constants';
import piece from '../piece';
import Printer from './printer';
import Settings from './settings';

const createRow = (): Types.CellState[] => Array.from({ length: BOARD_DIMENSIONS.width }, (): Types.CellState => 'empty');
const createBoard = (): Types.BoardCells => Array.from({ length: BOARD_DIMENSIONS.height }, () => createRow());

class Machine {
  private state: Types.State;
  private printer: Printer;
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.state = {
      board: {
        cells: createBoard(),
        movingPiece: null,
        dimensions: {
          height: BOARD_DIMENSIONS.height,
          width: BOARD_DIMENSIONS.width,
        },
      },
      playState: 'home',
      settings: new Settings()
    };
    this.state.settings.addEventListener(this.devModeListener);
    this.printer = new Printer(this.state.board, this.state.settings);
  }

  private devModeListener: Types.SettingsListener = (settings) => {
    if (settings.devMode && this.interval) {
      clearInterval(this.interval);
    }
  }

  get isEnd() {
    return this.state.playState === 'end';
  }

  get settings() {
    return this.state.settings;
  }

  get board() {
    return this.state.board;
  }

  get isPlaying() {
    return this.state.playState === 'playing';
  }

  set isPlaying(isPlaying: boolean) {
    this.state.playState = 'playing';
    if (!isPlaying) { 
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }

  // Clears the board and resets the piece
  resetBoard = () => {
    this.state.board.cells = createBoard();
    this.state.board.movingPiece = null;
    this.state.playState = 'home';
  }

  // Prints the board to the console
  print = () => {
    switch (this.state.playState) {
      case 'playing':
        this.printer.printBoard();
        break;
      case 'home':
        this.printer.printHome();
        break;
      case 'end':
        this.printer.printEnd();
        break;
    }
  }

  // Starts iteration to move
  play = () => {
    const { settings } = this.state
    if (settings.speed !== Speed.Off && !settings.devMode) {
      this.interval = setInterval(() => {
        this.move()
        this.print();
      }, SPEEDS[this.state.settings.speed].interval);
    }
  }

  // Moves the piece down
  move = () => {
    this.checkFullRow();
    const { movingPiece, dimensions: { height }, cells } = this.state.board
    if (!movingPiece) {
      piece.place(this.state);
      return;
    }

    const { location, piece: { coordinates } } = movingPiece;

    const done = coordinates.some((coord) => {
        const { x, y } = coord;
        if (y + location.y + 1 >= height) {
          return true;
        }
        const cell = cells[y + location.y + 1][x + location.x];
        return cell === 'placed';
    });

    if (done) {
      // this.checkNoSpace(movingPiece);
      coordinates.forEach((coord) => {
        const { x, y } = coord;
        cells[y + location.y] = cells[y + location.y] || [];
        cells[y + location.y][x + location.x] = 'placed';
      });
      this.state.board.movingPiece = null;
      return;
    }
    movingPiece.location.y += 1;
    return;
  };


  private checkNoSpace = (movingPiece: Types.MovingPiece) => {
    if (movingPiece.location.y === 0) {
      this.state.board.movingPiece = null;
      this.state.playState = 'end';
      if (this.interval) {
        clearInterval(this.interval);
      }
      return;
    }
  }

  private checkFullRow = () => {
    let indices: number[] = [];
    this.state.board.cells = this.state.board.cells.map((row, index) => {
      const isFull = row.every((cell) => cell === 'placed')
      if (isFull) {
        indices.push(index);
        return row.map(() => 'full');
      }
      return row
    });
    setTimeout(() => {
    if (indices.length === 0) {
      return;
    }
    indices.forEach((index) => {
      this.state.board.cells.splice(index, 1);
      this.state.board.cells.unshift(createRow());
    });
    }, 500);
  }
}


export default Machine;
