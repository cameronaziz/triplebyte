"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WELCOME_MESSAGE = exports.COLORS = exports.SPEEDS = exports.Speed = exports.BOARD_DIMENSIONS = exports.DEV_MODE = void 0;
exports.DEV_MODE = false;
exports.BOARD_DIMENSIONS = {
    width: 10,
    height: 15,
    printDimensions: {
        width: 2,
        height: 1,
    }
};
var Speed;
(function (Speed) {
    Speed["Off"] = "off";
    Speed["Slow"] = "slow";
    Speed["Medium"] = "medium";
    Speed["Fast"] = "fast";
})(Speed = exports.Speed || (exports.Speed = {}));
exports.SPEEDS = (_a = {},
    _a[Speed.Off] = {
        interval: 0,
        lower: Speed.Off,
        higher: Speed.Slow,
    },
    _a[Speed.Slow] = {
        interval: 2000,
        lower: Speed.Off,
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
        text: 'Speed: ⓪  ①  ②  ③',
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
