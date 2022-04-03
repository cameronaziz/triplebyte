"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var Settings = /** @class */ (function () {
    function Settings() {
        this.speedTarget = constants_1.Speed.Medium;
        this.tabLocationTarget = -1;
        this.devModeTarget = constants_1.DEV_MODE;
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
            this.notify();
            this.devModeTarget = status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Settings.prototype, "speed", {
        get: function () {
            return this.speedTarget;
        },
        set: function (status) {
            this.notify();
            this.speedTarget = status;
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
            if (location >= 0) {
                this.tabLocationTarget = 0;
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
