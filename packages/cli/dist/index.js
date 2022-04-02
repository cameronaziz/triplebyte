"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var constants_1 = require("./constants");
var machine_1 = __importDefault(require("./machine"));
var piece_1 = __importDefault(require("./piece"));
// Listen to Standard Input
readline_1.default.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
var cli = function () { return new Promise(function (resolve) {
    // Hide cursor
    process.stdout.write('\x1B[?25l');
    // Setup Machine
    var machine = new machine_1.default();
    // Listen to keypresses
    process.stdin.on('keypress', function (str, key) {
        // Handle exit
        if (key.ctrl && key.name === 'c') {
            process.exit();
        }
        // Handle end of game
        if (machine.isEnd) {
            machine.resetBoard();
        }
        // Handle all others
        switch (key.name) {
            // 0, 1, 2 and 3 are for setting the speed
            case '0':
                if (!machine.isPlaying) {
                    machine.settings.speed = constants_1.Speed.Off;
                }
                break;
            case '1':
                if (!machine.isPlaying) {
                    machine.settings.speed = constants_1.Speed.Slow;
                }
                break;
            case '2':
                if (!machine.isPlaying) {
                    machine.settings.speed = constants_1.Speed.Medium;
                }
                break;
            case '3':
                if (!machine.isPlaying) {
                    machine.settings.speed = constants_1.Speed.Fast;
                }
                break;
            // When playing, move piece
            // When on home, set speed
            case 'left':
                if (!machine.isPlaying) {
                    machine.settings.speed = constants_1.SPEEDS[machine.settings.speed].lower;
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
                    machine.settings.speed = constants_1.SPEEDS[machine.settings.speed].higher;
                    break;
                }
                if (machine.board.movingPiece && machine.board.movingPiece.rightEdge() < constants_1.BOARD_DIMENSIONS.width) {
                    machine.board.movingPiece.location.x += 1;
                }
                break;
            // Rotate piece clockwise
            case 's':
                if (machine.board.movingPiece) {
                    piece_1.default.rotate(machine.board.movingPiece, 'clockwise');
                }
                break;
            // Rotate piece counterclockwise
            case 'a':
                if (machine.board.movingPiece) {
                    piece_1.default.rotate(machine.board.movingPiece, 'counterclockwise');
                }
                break;
            // Speed up moving piece down
            case 'down':
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
                machine.isPlaying = true;
                // machine.play();
                break;
            }
            case 'tab': {
                machine.settings.tabLocation += 1;
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
    machine.print();
}); };
exports.default = cli;
