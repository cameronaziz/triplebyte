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
            _this.endPrint();
        };
        this.endPrint = function () {
            process.stdout.write(' ');
            _this.repeat('█', _this.board.dimensions.width);
            process.stdout.write('██\n');
        };
        this.printBoard = function () {
            _this.startPrint();
            var _a = _this.board, cells = _a.cells, movingPiece = _a.movingPiece;
            var height = _this.settings.height * 2;
            cells.forEach(function (row, rowIndex) {
                Array.from({ length: _this.height }).forEach(function () {
                    process.stdout.write(' █');
                    row.forEach(function (cell, columnIndex) {
                        if (movingPiece && Printer.isMovingCell(movingPiece, columnIndex, rowIndex)) {
                            _this.repeat("".concat(movingPiece.color, "\u2588").concat(reset));
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
            var dimensions = _this.board.dimensions;
            var height = dimensions.height * _this.height;
            var additionalRows = Math.max(0, height - messages.length - 2);
            var before = Math.floor(additionalRows / 2);
            _this.emptyRows(before);
            var offset = Math.ceil((dimensions.width - messages.length) / 2);
            for (var i = 0; i < dimensions.width; i++) {
                var row = _this.board.cells[i];
                var rowSize = row.length * _this.width;
                process.stdout.write(' █');
                if (i >= offset && messages) {
                    var message = messages.shift() || { text: '' };
                    var messageLength = "".concat(message.label ? message.label : '').concat(message.text).length;
                    var space = rowSize - messageLength;
                    var leading = Math.ceil(space / 2);
                    process.stdout.cursorTo(leading + 2);
                    var text = _this.formatText(message);
                    process.stdout.write(text);
                }
                process.stdout.cursorTo(rowSize + 2);
                process.stdout.write('█ \n');
            }
            _this.emptyRows(additionalRows - before);
            _this.endPrint();
        };
        this.resetBoard = function (force) {
            if (!_this.settings.devMode) {
                process.stdout.cursorTo(0, 0);
                process.stdout.write('\x1Bc');
                process.stdout.clearScreenDown();
                process.stdout.cursorTo(0, 0);
                return;
            }
            process.stdout.write('\n');
        };
        this.emptyRows = function (amount, width) {
            if (amount === void 0) { amount = 1; }
            if (width === void 0) { width = constants_1.BOARD_DIMENSIONS.width; }
            Array.from({ length: amount }).forEach(function () {
                process.stdout.write(' █');
                _this.repeat(' ', width);
                process.stdout.write('█ \n');
            });
        };
        this.repeat = function (text, size) {
            if (size === void 0) { size = 1; }
            var length = _this.width * size;
            Array.from({ length: length }).forEach(function () {
                process.stdout.write(text);
            });
        };
        this.formatText = function (message) {
            switch (message.tab) {
                case 0: {
                    var formatted = _this.formatSetting(message.text, _this.convertSpeed(), 0);
                    return "".concat(message.label).concat(constants_1.CODES.dim).concat(formatted).concat(constants_1.CODES.reset);
                }
                case 1: {
                    var formatted = _this.formatSetting(message.text, _this.settings.width, 1);
                    return "".concat(message.label).concat(constants_1.CODES.dim).concat(formatted).concat(constants_1.CODES.reset);
                }
                case 2: {
                    var formatted = _this.formatSetting(message.text, _this.settings.height, 2);
                    return "".concat(message.label).concat(constants_1.CODES.dim).concat(formatted).concat(constants_1.CODES.reset);
                }
                default: return message.text;
            }
        };
        this.convertSpeed = function () {
            switch (_this.settings.speed) {
                case 'slow':
                    return 1;
                case 'medium':
                    return 2;
                case 'fast':
                    return 3;
                default:
                    return 2;
            }
        };
        this.formatSetting = function (message, value, tab) {
            var tabLocation = _this.settings.tabLocation;
            var color = tabLocation === tab ? constants_1.COLORS.green : '\x1b[37m';
            switch (value) {
                case 1:
                    return colorize(message, '①', color);
                case 2:
                    return colorize(message, '②', color);
                case 3:
                    return colorize(message, '③', color);
            }
            return message;
        };
        this.board = board;
        this.settings = settings;
    }
    Object.defineProperty(Printer.prototype, "height", {
        get: function () {
            switch (this.settings.height) {
                case 1:
                    return 2;
                case 2:
                    return 3;
                case 3:
                    return 4;
                default:
                    return 2;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Printer.prototype, "width", {
        get: function () {
            return this.settings.width * 2;
        },
        enumerable: false,
        configurable: true
    });
    Printer.isMovingCell = function (movingPiece, x, y) {
        var piece = movingPiece.piece, _a = movingPiece.location, movingX = _a.x, movingY = _a.y;
        return piece.coordinates.some(function (coord) { return coord.x + movingX === x && coord.y + movingY === y; });
    };
    return Printer;
}());
var colorize = function (message, search, color) {
    return message.replace(search, "".concat(reset).concat(color).concat(search).concat(reset).concat(constants_1.CODES.dim));
};
exports.default = Printer;
