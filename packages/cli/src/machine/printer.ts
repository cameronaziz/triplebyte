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
    this.resetBoard();
    this.endPrint();
  }

  private endPrint = () => {
    process.stdout.write(' ');
    this.repeat('█', this.board.dimensions.width);
    process.stdout.write('██\n');
  }

  private get height() {
    switch(this.settings.height) {
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
      default:
        return 2;
    }
  }

  private get width() {
    return this.settings.width * 2;
  }

  printBoard = () => {
    this.startPrint()
    const { cells, movingPiece } = this.board;
    const height = this.settings.height * 2;
    cells.forEach((row, rowIndex) => {
      Array.from({ length: this.height }).forEach(() => {
        process.stdout.write(' █');
        row.forEach((cell, columnIndex) => {
          if (movingPiece && Printer.isMovingCell(movingPiece, columnIndex, rowIndex)) {
            this.repeat(`${movingPiece.color}█${reset}`);
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
    const { dimensions } = this.board
    const height = dimensions.height * this.height
    const additionalRows = Math.max(0, height - messages.length - 2);
    const before = Math.floor(additionalRows / 2);
    this.emptyRows(before);
    const offset = Math.ceil((dimensions.width - messages.length) / 2);
    for (let i = 0; i < dimensions.width; i++) {
      const row = this.board.cells[i];
      const rowSize = row.length * this.width;
      process.stdout.write(' █');
      if (i >= offset && messages) {
        const message = messages.shift() || { text: ''};
        const messageLength = `${message.label ? message.label : ''}${message.text}`.length;
        const space = rowSize - messageLength
        const leading = Math.ceil(space / 2);
        process.stdout.cursorTo(leading + 2)
        const text = this.formatText(message)
        process.stdout.write(text);
      }
      process.stdout.cursorTo(rowSize + 2)
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
    const length = this.width * size;
    Array.from({ length: length }).forEach(() => {
      process.stdout.write(text);
    });
  };

  private static isMovingCell = (movingPiece: Types.MovingPiece, x: number,  y: number): boolean => {
    const { piece, location: { x: movingX, y: movingY } } = movingPiece;
    return piece.coordinates.some((coord) => coord.x + movingX === x && coord.y + movingY === y)
  }

  private formatText = (message: Types.Message) => {
    switch (message.tab) {
      case 0: {
        const formatted = this.formatSetting(message.text, this.convertSpeed(), 0)
        return `${message.label}${CODES.dim}${formatted}${CODES.reset}`;
      }
      case 1: {
        const formatted = this.formatSetting(message.text, this.settings.width, 1)
        return `${message.label}${CODES.dim}${formatted}${CODES.reset}`;
      }
      case 2: {
        const formatted =this.formatSetting(message.text, this.settings.height, 2)
        return `${message.label}${CODES.dim}${formatted}${CODES.reset}`;
      }
      default: return message.text;
    }
  }

  private convertSpeed = () => {
    switch (this.settings.speed) {
      case 'slow':
        return 1
      case 'medium':
        return 2
      case 'fast':
        return 3
      default:
        return 2
    }
  }

  private formatSetting = (message: string, value: number, tab: number) => {
    const { tabLocation } = this.settings;
    const color = tabLocation === tab ? COLORS.green : '\x1b[37m';
    switch (value) {
      case 1:
        return colorize(message, '①', color);
      case 2:
        return colorize(message, '②', color);
      case 3:
        return colorize(message, '③', color);
    }
    return message;
  }
}

const colorize = (message: string, search: string, color: string): string =>
  message.replace(search, `${reset}${color}${search}${reset}${CODES.dim}`);


export default Printer;
