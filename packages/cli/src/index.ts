import readline from 'readline';
import { BOARD_DIMENSIONS, Speed, SPEEDS } from './constants';
import Machine from './machine';
import piece from './piece';

// Listen to Standard Input
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const cli = () => new Promise((resolve) => {
  // Hide cursor
  process.stdout.write('\x1B[?25l')
  // Setup Machine
  const machine = new Machine();


  // Listen to keypress
  process.stdin.on('keypress', (str, key) => {
    // Handle exit
    if (key.ctrl && key.name === 'c') {
      process.stdout.write('\x1B[?25h\n');
      process.exit();
    }

    // Handle end of game
    if (machine.isEnd) {
      machine.resetBoard();
    }

    // Handle all others
    switch (key.name) {
      // 1, 2 and 3 are for setting the speed
      case '1':
        if (!machine.isPlaying) {
          switch (machine.settings.tabLocation) {
            case 0:
              machine.settings.speed = Speed.Slow
              break;
            case 1:
              machine.settings.width = 1
              break;
            case 2:
              machine.settings.height = 1
              break;
          }
        }
        break;
      case '2':
        if (!machine.isPlaying) {
          switch (machine.settings.tabLocation) {
            case 0:
              machine.settings.speed = Speed.Medium
              break;
            case 1:
              machine.settings.width = 2
              break;
            case 2:
              machine.settings.height = 2
              break;
          }
        }
        break;
      case '3':
        if (!machine.isPlaying) {
          switch (machine.settings.tabLocation) {
            case 0:
              machine.settings.speed = Speed.Fast
              break;
            case 1:
              machine.settings.width = 3
              break;
            case 2:
              machine.settings.height = 3
              break;
          }
        }
        break;
      // When playing, move piece
      // When on home, set speed
      case 'left':
        if (!machine.isPlaying) {
          switch (machine.settings.tabLocation) {
            case 0:
              machine.settings.speed = SPEEDS[machine.settings.speed].lower
              break;
            case 1:
              machine.settings.width = Math.max(1, machine.settings.width - 1)
              break;
            case 2:
              machine.settings.height = Math.max(1, machine.settings.height - 1)
              break;
          }
          break;
        }

        if (machine.board.movingPiece && machine.board.movingPiece.leftEdge() > 0) {
          machine.board.movingPiece.location.x -= 1;
        }
        break;
      // When playing, move piece
      // When on home, set speed
      case 'right':
        if (!machine.isPlaying) {
          switch (machine.settings.tabLocation) {
            case 0:
              machine.settings.speed = SPEEDS[machine.settings.speed].higher
              break;
            case 1:
              machine.settings.width = Math.min(3, machine.settings.width + 1)
              break;
            case 2:
              machine.settings.height = Math.min(3, machine.settings.height + 1)
              break;
          }
        }
        if (machine.board.movingPiece && machine.board.movingPiece.rightEdge() < BOARD_DIMENSIONS.width) {
          machine.board.movingPiece.location.x += 1;
        }
        break;
      // Rotate piece clockwise
      case 'down':
        if (machine.board.movingPiece) {
          piece.rotate(machine.board.movingPiece, 'clockwise');
        }
        break;
      // Rotate piece counterclockwise
      case 'up':
        if (machine.board.movingPiece) {
          piece.rotate(machine.board.movingPiece, 'counterclockwise');
        }
        break;
      // Speed up moving piece down
      case 'space':
        if (machine.board.movingPiece) {
          machine.move();
        }
        break;
      // When playing, move piece down
      // When on home, start game
      case 'return': {
        if (machine.isPlaying) {
          machine.move();
          break;
        }
        machine.play();
        break;
      }
      case 'tab': {
        if (!machine.isPlaying) {
          if (key.shift === true) {
            machine.settings.tabLocation -= 1;
            break;
          }
          machine.settings.tabLocation += 1;
        }
        break
      }
      case 'escape': {
        if (!machine.isPlaying) {
          machine.settings.tabLocation = -1;
        }
        break;
      }
      // Set dev mode
      case 'd':
        machine.settings.devMode = !machine.settings.devMode;
        break;
    }
    // After interaction, print
    machine.print();
  });

  // Print to start
  machine.print()
})

export default cli;
