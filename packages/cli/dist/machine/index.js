"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var piece_1 = __importDefault(require("../piece"));
var printer_1 = __importDefault(require("./printer"));
var settings_1 = __importDefault(require("./settings"));
var createRow = function () { return Array.from({ length: constants_1.BOARD_DIMENSIONS.width }, function () { return 'empty'; }); };
var createBoard = function () { return Array.from({ length: constants_1.BOARD_DIMENSIONS.height }, function () { return createRow(); }); };
var Machine = /** @class */ (function () {
    function Machine() {
        var _this = this;
        this.interval = null;
        this.devModeListener = function (settings) {
            if (settings.devMode && _this.interval) {
                clearInterval(_this.interval);
            }
        };
        // Clears the board and resets the piece
        this.resetBoard = function () {
            _this.state.board.cells = createBoard();
            _this.state.board.movingPiece = null;
            _this.state.playState = 'home';
        };
        // Prints the board to the console
        this.print = function () {
            switch (_this.state.playState) {
                case 'playing':
                    _this.printer.printBoard();
                    break;
                case 'home':
                    _this.printer.printHome();
                    break;
                case 'end':
                    _this.printer.printEnd();
                    break;
            }
        };
        // Starts iteration to move
        this.play = function () {
            var settings = _this.state.settings;
            settings.tabLocation = -1;
            _this.isPlaying = true;
            if (!settings.devMode) {
                _this.interval = setInterval(function () {
                    _this.move();
                    _this.print();
                }, constants_1.SPEEDS[_this.state.settings.speed].interval);
            }
        };
        // Moves the piece down
        this.move = function () {
            _this.checkFullRow();
            var _a = _this.state.board, movingPiece = _a.movingPiece, height = _a.dimensions.height, cells = _a.cells;
            if (!movingPiece) {
                piece_1.default.place(_this.state);
                return;
            }
            var location = movingPiece.location, coordinates = movingPiece.piece.coordinates;
            var done = coordinates.some(function (coord) {
                var x = coord.x, y = coord.y;
                if (y + location.y + 1 >= height) {
                    return true;
                }
                var cell = cells[y + location.y + 1][x + location.x];
                return cell === 'placed';
            });
            if (done) {
                // this.checkNoSpace(movingPiece);
                coordinates.forEach(function (coord) {
                    var x = coord.x, y = coord.y;
                    cells[y + location.y] = cells[y + location.y] || [];
                    cells[y + location.y][x + location.x] = 'placed';
                });
                _this.state.board.movingPiece = null;
                return;
            }
            movingPiece.location.y += 1;
            return;
        };
        this.checkNoSpace = function (movingPiece) {
            if (movingPiece.location.y === 0) {
                _this.state.board.movingPiece = null;
                _this.state.playState = 'end';
                if (_this.interval) {
                    clearInterval(_this.interval);
                }
                return;
            }
        };
        this.checkFullRow = function () {
            var indices = [];
            _this.state.board.cells = _this.state.board.cells.map(function (row, index) {
                var isFull = row.every(function (cell) { return cell === 'placed'; });
                if (isFull) {
                    indices.push(index);
                    return row.map(function () { return 'full'; });
                }
                return row;
            });
            setTimeout(function () {
                if (indices.length === 0) {
                    return;
                }
                indices.forEach(function (index) {
                    _this.state.board.cells.splice(index, 1);
                    _this.state.board.cells.unshift(createRow());
                });
            }, 500);
        };
        this.state = {
            board: {
                cells: createBoard(),
                movingPiece: null,
                dimensions: {
                    height: constants_1.BOARD_DIMENSIONS.height,
                    width: constants_1.BOARD_DIMENSIONS.width,
                },
            },
            playState: 'home',
            settings: new settings_1.default()
        };
        this.state.settings.addEventListener(this.devModeListener);
        this.printer = new printer_1.default(this.state.board, this.state.settings);
    }
    Object.defineProperty(Machine.prototype, "isEnd", {
        get: function () {
            return this.state.playState === 'end';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "settings", {
        get: function () {
            return this.state.settings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "board", {
        get: function () {
            return this.state.board;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "isPlaying", {
        get: function () {
            return this.state.playState === 'playing';
        },
        set: function (isPlaying) {
            this.state.playState = 'playing';
            if (!isPlaying) {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    return Machine;
}());
exports.default = Machine;
