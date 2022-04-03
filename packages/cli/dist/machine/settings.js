"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var Settings = /** @class */ (function () {
    function Settings() {
        this.speedTarget = constants_1.Speed.Medium;
        this.tabLocationTarget = -1;
        this.devModeTarget = constants_1.DEV_MODE;
        this.widthTarget = 2;
        this.heightTarget = 1;
        this.listeners = [];
    }
    Settings.prototype.addEventListener = function (listener) {
        this.listeners.push(listener);
    };
    Settings.prototype.removeEventListener = function (listener) {
        this.listeners = this.listeners.filter(function (l) { return l !== listener; });
    };
    Object.defineProperty(Settings.prototype, "devMode", {
        get: function () {
            return this.devModeTarget;
        },
        set: function (status) {
            this.devModeTarget = status;
            this.notify();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Settings.prototype, "speed", {
        get: function () {
            return this.speedTarget;
        },
        set: function (status) {
            this.speedTarget = status;
            this.notify();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Settings.prototype, "width", {
        get: function () {
            return this.widthTarget;
        },
        set: function (value) {
            this.widthTarget = value;
            this.notify();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Settings.prototype, "height", {
        get: function () {
            return this.heightTarget;
        },
        set: function (value) {
            this.heightTarget = value;
            this.notify();
        },
        enumerable: false,
        configurable: true
    });
    Settings.prototype.notify = function () {
        var _this = this;
        this.listeners.forEach(function (listener) { return listener({
            speed: _this.speedTarget,
            devMode: _this.devModeTarget,
        }); });
    };
    Object.defineProperty(Settings.prototype, "tabLocation", {
        get: function () {
            return this.tabLocationTarget;
        },
        set: function (status) {
            var location = Math.ceil(status);
            if (location < 0) {
                this.tabLocationTarget = -1;
                return;
            }
            if (location >= 2) {
                this.tabLocationTarget = 2;
                return;
            }
            this.tabLocationTarget = location;
        },
        enumerable: false,
        configurable: true
    });
    return Settings;
}());
;
exports.default = Settings;
