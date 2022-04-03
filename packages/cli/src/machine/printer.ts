import { BOARD_DIMENSIONS, CODES, COLORS, WELCOME_MESSAGE } from '../constants';
import type Settings from './settings';
const reset = '\x1b[0m';

class Printer {
  board: Types.Board;
  settings: Settings;

  constructor(board: Types.Board, settings: Settings) {
    this.board = board
    this.settings = settings
  }

  private startPrint = () => {
    this.resetBoard()
    process.stdout.write(' ');
    this.repeat('█', this.board.dimensions.width + 1);
    process.stdout.write(' \n');
  }

  private endPrint = () => {
    process.stdout.write(' ');
    this.repeat('█', this.board.dimensions.width + 1);
    process.stdout.write(' ');
  }

  printBoard = () => {
    this.startPrint()
    const { cells, movingPiece } = this.board;
    cells.forEach((row, rowIndex) => {
      process.stdout.write(' █');
      row.forEach((cell, columnIndex) => {
        if (movingPiece && Printer.isMovingCell(movingPiece, columnIndex, rowIndex)) {
          this.printMoving(movingPiece);
          return;
        }
        switch (cell) {
          case 'empty':
            this.repeat(' ')
            break
          case 'full':
            this.repeat(`${COLORS.green}█${reset}`)
            break
          default:
            this.repeat('▓')
        }
      });
      process.stdout.write('█ \n');
    });
    this.endPrint()
  };

  printHome = () => {
    const messages = [...WELCOME_MESSAGE];
    this.printScreen(messages);
  }

  printEnd = () => {
    const messages = [{ text: 'Game Over'}, { text: 'Press any key to restart'}];
    this.printScreen(messages);
  }

  private printScreen = (messages: Types.Message[]) => {
    this.startPrint()
    const { width, height } = this.board.dimensions
    const additionalRows = Math.max(0, height - messages.length - 2);
    const before = Math.floor(additionalRows / 2);
    this.emptyRows(before);
    const offset = Math.ceil((width - messages.length) / 2);
    for (let i = 0; i < width; i++) {
      const row = this.board.cells[i];
      process.stdout.write(' █');
      if (i >= offset && messages) {
        const message = messages.shift() || { text: ''};
        const messageText = `${message.label ? message.label : ''}${message.text}`;
        const rowSize = row.length * BOARD_DIMENSIONS.printDimensions.width
        const space = (rowSize - messageText.length) / BOARD_DIMENSIONS.printDimensions.width;
        const leading = Math.floor(space / 2);
        this.repeat(' ', leading);
        const text = this.formatText(message)
        process.stdout.write(text);
        this.repeat(' ', space - leading);
      } else {
        this.repeat(' ', row.length);
      }
      process.stdout.write('█ \n');
    }
    this.emptyRows(additionalRows - before);
    this.endPrint()
  }

  private resetBoard = (force?: boolean) => {
    if (!this.settings.devMode) {
      process.stdout.cursorTo(0, 0);
      process.stdout.write('\x1Bc');
      process.stdout.clearScreenDown();
      process.stdout.cursorTo(0, 0);
      return;
    }
    process.stdout.write('\n');
  };

  private emptyRows = (amount: number = 1, width: number = BOARD_DIMENSIONS.width) => {
    Array.from({ length: amount }).forEach(() => {
      process.stdout.write(' █');
      this.repeat(' ', width);
      process.stdout.write('█ \n');
    });
  }

  private repeat = (text: string, size: number = 1) => {
    const length = BOARD_DIMENSIONS.printDimensions.width * size;
    Array.from({ length: length }).forEach(() => {
      process.stdout.write(text);
    });
  };

  private static isMovingCell = (movingPiece: Types.MovingPiece, x: number,  y: number): boolean => {
    const { piece, location: { x: movingX, y: movingY } } = movingPiece;
    return piece.coordinates.some((coord) => coord.x + movingX === x && coord.y + movingY === y)
  }

  private printMoving = (movingPiece: Types.MovingPiece) => {
    process.stdout.write(`${movingPiece.color}██${reset}`);
  };


  private formatText = (message: Types.Message) => {
    switch (message.tab) {
      case 0:
        return `${message.label}${CODES.dim}${this.formatSpeed(message.text)}${CODES.reset}`;
      default: return message.text;
    }
  }

  private formatSpeed = (message: string) => {
    const { speed, tabLocation } = this.settings;
    const color = tabLocation === 0 ? COLORS.green : COLORS.white;
    switch (speed) {
      case 'slow':
        return colorize(message, '①', color);
      case 'medium':
        return colorize(message, '②', color);
      case 'fast':
        return colorize(message, '③', color);
    }
    return message;
  }
}

const colorize = (message: string, search: string, color: string): string =>
  message.replace(search, `${reset}${color}${search}${reset}${CODES.dim}`);


export default Printer;
