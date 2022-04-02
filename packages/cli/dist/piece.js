"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var rotateCoord = function (center, point, direction) {
    var yDifference = center.y - point.y;
    var yChange = direction === 'clockwise' ? yDifference : -yDifference;
    var xDifference = center.x - point.x;
    var xChange = direction === 'clockwise' ? xDifference : -xDifference;
    var y = center.y - xChange;
    var x = center.x + yChange;
    return __assign(__assign({}, point), { x: x, y: y });
};
var rotate = function (movingPiece, direction) {
    var lowestX = 0;
    var lowestY = 0;
    var center = movingPiece.piece.coordinates.find(function (coord) { return coord.isCenter; }) || { x: 0, y: 0, isCenter: true };
    var result = movingPiece.piece.coordinates.map(function (coord) { return rotateCoord(center, coord, direction); });
    result
        .forEach(function (coord) {
        if (coord.x < lowestX) {
            lowestX = coord.x;
        }
        if (coord.y < lowestY) {
            lowestY = coord.y;
        }
    });
    movingPiece.piece.coordinates = result.map(function (coord) { return (__assign(__assign({}, coord), { x: coord.x, y: coord.y })); });
    movingPiece.location.x = movingPiece.location.x - lowestX;
    movingPiece.location.y = movingPiece.location.y - lowestY;
};
var pieces = [
    {
        coordinates: [
            {
                x: 0,
                y: 0,
                isCenter: false,
            },
            {
                x: 0,
                y: 1,
                isCenter: true,
            },
            {
                x: 1,
                y: 1,
                isCenter: false,
            },
            {
                x: 0,
                y: 2,
                isCenter: false,
            },
        ],
    },
    {
        coordinates: [
            {
                x: 0,
                y: 0,
                isCenter: false,
            },
            {
                x: 1,
                y: 0,
                isCenter: true,
            },
            {
                x: 0,
                y: 1,
                isCenter: false,
            },
            {
                x: 1,
                y: 1,
                isCenter: false,
            },
        ],
    },
    {
        coordinates: [
            {
                x: 0,
                y: 0,
                isCenter: false,
            },
            {
                x: 1,
                y: 0,
                isCenter: true,
            },
            {
                x: 2,
                y: 0,
                isCenter: false,
            },
            {
                x: 3,
                y: 0,
                isCenter: false,
            },
        ],
    },
    {
        coordinates: [
            {
                x: 0,
                y: 0,
                isCenter: false,
            },
            {
                x: 0,
                y: 1,
                isCenter: true,
            },
            {
                x: 1,
                y: 1,
                isCenter: false,
            },
            {
                x: 1,
                y: 2,
                isCenter: false,
            },
        ],
    },
    {
        coordinates: [
            {
                x: 0,
                y: 0,
                isCenter: false,
            },
            {
                x: 0,
                y: 1,
                isCenter: false,
            },
            {
                x: 1,
                y: 1,
                isCenter: true,
            },
            {
                x: 2,
                y: 1,
                isCenter: false,
            },
        ],
    },
];
var place = function (state) {
    var piece = pieces[Math.floor(Math.random() * pieces.length)];
    var colorKeys = Object.keys(constants_1.COLORS);
    var key = colorKeys[colorKeys.length * Math.random() << 0];
    var color = constants_1.COLORS[key];
    var minX = piece.coordinates.map(function (coord) { return coord.x; }).reduce(function (a, b) { return Math.min(a, b); });
    var maxX = piece.coordinates.map(function (coord) { return coord.x; }).reduce(function (a, b) { return Math.max(a, b); });
    var width = maxX - minX + 1;
    var center = Math.ceil((state.board.dimensions.width - width) / 4);
    var newPiece = {
        piece: piece,
        color: color,
        location: {
            x: center,
            y: 0,
        },
        leftEdge: function () {
            var lowest = this.piece.coordinates.reduce(function (a, b) { return Math.min(a, b.x); }, Infinity);
            return this.location.x + lowest;
        },
        rightEdge: function () {
            var highest = this.piece.coordinates.reduce(function (a, b) { return Math.max(a, b.x); }, 0);
            return this.location.x + highest + 1;
        }
    };
    state.board.movingPiece = newPiece;
};
exports.default = {
    place: place,
    rotate: rotate,
};
