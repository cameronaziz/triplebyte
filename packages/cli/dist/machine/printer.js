"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var reset = '\x1b[0m';
var Printer = /** @class */ (function () {
    function Printer(board, settings) {
        var _this = this;
        this.startPrint = function () {
            _this.resetBoard();
            process.stdout.write(' ');
            _this.repeat('█', _this.board.dimensions.width + 1);
            process.stdout.write(' \n');
        };
        this.endPrint = function () {
            process.stdout.write(' ');
            _this.repeat('█', _this.board.dimensions.width + 1);
            process.stdout.write(' ');
        };
        this.printBoard = function () {
            _this.startPrint();
            var _a = _this.board, cells = _a.cells, movingPiece = _a.movingPiece;
            cells.forEach(function (row, rowIndex) {
                process.stdout.write(' █');
                row.forEach(function (cell, columnIndex) {
                    if (movingPiece && Printer.isMovingCell(movingPiece, columnIndex, rowIndex)) {
                        _this.printMoving(movingPiece);
                        return;
                    }
                    switch (cell) {
                        case 'empty':
                            _this.repeat(' ');
                            break;
                        case 'full':
                            _this.repeat("".concat(constants_1.COLORS.green, "\u2588").concat(reset));
                            break;
                        default:
                            _this.repeat('▓');
                    }
                });
                process.stdout.write('█ \n');
            });
            _this.endPrint();
        };
        this.printHome = function () {
            var messages = __spreadArray([], constants_1.WELCOME_MESSAGE, true);
            _this.printScreen(messages);
        };
        this.printEnd = function () {
            var messages = [{ text: 'Game Over' }, { text: 'Press any key to restart' }];
            _this.printScreen(messages);
        };
        this.printScreen = function (messages) {
            _this.startPrint();
            var width = _this.board.dimensions.width;
            var offset = Math.ceil((width - messages.length) / 2);
            for (var i = 0; i < width; i++) {
                var row = _this.board.cells[i];
                process.stdout.write(' █');
                if (i >= offset && messages) {
                    var message = messages.shift() || { text: '' };
                    var rowSize = row.length * constants_1.BOARD_DIMENSIONS.printDimensions.width;
                    var space = (rowSize - message.text.length) / constants_1.BOARD_DIMENSIONS.printDimensions.width;
                    var leading = Math.floor(space / 2);
                    _this.repeat(' ', leading);
                    var text = _this.formatText(message);
                    process.stdout.write(text);
                    _this.repeat(' ', space - leading);
                }
                else {
                    _this.repeat(' ', row.length);
                }
                process.stdout.write('█ \n');
            }
            _this.endPrint();
        };
        this.resetBoard = function () {
            if (_this.settings.devMode) {
                process.stdout.write('\n');
                return;
            }
            process.stdout.cursorTo(0, 0);
            process.stdout.write('\x1Bc');
            process.stdout.clearScreenDown();
            process.stdout.cursorTo(0, 0);
        };
        this.repeat = function (text, size) {
            if (size === void 0) { size = 1; }
            var length = constants_1.BOARD_DIMENSIONS.printDimensions.width * size;
            Array.from({ length: length }).forEach(function () {
                process.stdout.write(text);
            });
        };
        this.printMoving = function (movingPiece) {
            process.stdout.write("".concat(movingPiece.color, "\u2588\u2588").concat(reset));
        };
        this.formatText = function (message) {
            switch (_this.settings.tabLocation) {
                case 0: return _this.formatSpeed(message.text);
                default: return message.text;
            }
        };
        this.formatSpeed = function (message) {
            var speed = _this.settings.speed;
            if (message.includes('Speed')) {
                switch (speed) {
                    case 'off':
                        return colorize(message, '⓪', constants_1.COLORS.green);
                    case 'slow':
                        return colorize(message, '①', constants_1.COLORS.green);
                    case 'medium':
                        return colorize(message, '②', constants_1.COLORS.green);
                    case 'fast':
                        return colorize(message, '③', constants_1.COLORS.green);
                }
            }
            return message;
        };
        this.board = board;
        this.settings = settings;
    }
    Printer.isMovingCell = function (movingPiece, x, y) {
        var piece = movingPiece.piece, _a = movingPiece.location, movingX = _a.x, movingY = _a.y;
        return piece.coordinates.some(function (coord) { return coord.x + movingX === x && coord.y + movingY === y; });
    };
    return Printer;
}());
var colorize = function (message, search, color) {
    return message.replace(search, "".concat(color).concat(search).concat(reset));
};
exports.default = Printer;
