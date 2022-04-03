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
    // Listen to keypress
    process.stdin.on('keypress', function (str, key) {
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
                            machine.settings.speed = constants_1.Speed.Slow;
                            break;
                        case 1:
                            machine.settings.width = 1;
                            break;
                        case 2:
                            machine.settings.height = 1;
                            break;
                    }
                }
                break;
            case '2':
                if (!machine.isPlaying) {
                    switch (machine.settings.tabLocation) {
                        case 0:
                            machine.settings.speed = constants_1.Speed.Medium;
                            break;
                        case 1:
                            machine.settings.width = 2;
                            break;
                        case 2:
                            machine.settings.height = 2;
                            break;
                    }
                }
                break;
            case '3':
                if (!machine.isPlaying) {
                    switch (machine.settings.tabLocation) {
                        case 0:
                            machine.settings.speed = constants_1.Speed.Fast;
                            break;
                        case 1:
                            machine.settings.width = 3;
                            break;
                        case 2:
                            machine.settings.height = 3;
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
                            machine.settings.speed = constants_1.SPEEDS[machine.settings.speed].lower;
                            break;
                        case 1:
                            machine.settings.width = Math.max(1, machine.settings.width - 1);
                            break;
                        case 2:
                            machine.settings.height = Math.max(1, machine.settings.height - 1);
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
                            machine.settings.speed = constants_1.SPEEDS[machine.settings.speed].higher;
                            break;
                        case 1:
                            machine.settings.width = Math.min(3, machine.settings.width + 1);
                            break;
                        case 2:
                            machine.settings.height = Math.min(3, machine.settings.height + 1);
                            break;
                    }
                }
                if (machine.board.movingPiece && machine.board.movingPiece.rightEdge() < constants_1.BOARD_DIMENSIONS.width) {
                    machine.board.movingPiece.location.x += 1;
                }
                break;
            // Rotate piece clockwise
            case 'down':
                if (machine.board.movingPiece) {
                    piece_1.default.rotate(machine.board.movingPiece, 'clockwise');
                }
                break;
            // Rotate piece counterclockwise
            case 'up':
                if (machine.board.movingPiece) {
                    piece_1.default.rotate(machine.board.movingPiece, 'counterclockwise');
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
                break;
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
    machine.print();
}); };
exports.default = cli;
