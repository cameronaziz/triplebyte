"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WELCOME_MESSAGE = exports.CODES = exports.COLORS = exports.SPEEDS = exports.Speed = exports.BOARD_DIMENSIONS = exports.DEV_MODE = void 0;
exports.DEV_MODE = false;
exports.BOARD_DIMENSIONS = {
    width: 10,
    height: 15,
    printDimensions: {
        width: 2,
        height: 2,
    }
};
var Speed;
(function (Speed) {
    // Off = 'off',
    Speed["Slow"] = "slow";
    Speed["Medium"] = "medium";
    Speed["Fast"] = "fast";
})(Speed = exports.Speed || (exports.Speed = {}));
exports.SPEEDS = (_a = {},
    _a[Speed.Slow] = {
        interval: 2000,
        lower: Speed.Slow,
        higher: Speed.Medium,
    },
    _a[Speed.Medium] = {
        interval: 700,
        lower: Speed.Slow,
        higher: Speed.Fast,
    },
    _a[Speed.Fast] = {
        interval: 400,
        lower: Speed.Medium,
        higher: Speed.Fast,
    },
    _a);
exports.COLORS = {
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    magenta: '\x1b[35m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    white: "\x1b[37m",
};
exports.CODES = {
    reset: '\x1b[0m',
    dim: '\x1b[2m',
};
exports.WELCOME_MESSAGE = [
    {
        text: 'Welcome to',
    },
    {
        text: 'Tetris',
    },
    {
        text: '',
    },
    {
        text: '',
    },
    {
        label: 'Speed ',
        text: '①  ②  ③',
        tab: 0,
    },
    {
        text: '',
    },
    {
        text: 'Press Enter',
    },
    {
        text: 'to start',
    },
];
