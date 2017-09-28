"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
    }
    Model.prototype.loadFromObject = function (obj) {
        for (var k in obj) {
            if (this.hasOwnProperty(k)) {
                this[k] = obj[k];
            }
        }
        return this;
    };
    Model.prototype.buildBody = function () {
        var res = {};
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                res[k] = this[k];
            }
        }
        return res;
    };
    return Model;
}());
exports.Model = Model;
;
