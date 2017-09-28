"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_service_1 = require("./http.service");
var core_1 = require("@angular/core");
var Service = /** @class */ (function () {
    function Service(httpService) {
        this.httpService = httpService;
        this.query = null;
        this.sort = null;
        this.direction = null;
        this.page = null;
    }
    Service.prototype.buildListUrl = function (url) {
        var res = url + '?';
        var qp = [];
        for (var k in this) {
            if (this.hasOwnProperty(k) && this[k] && typeof this[k] != 'function' && typeof this[k] != 'object')
                qp.push(k + '=' + this[k]);
        }
        res = res + qp.join('&');
        return res;
    };
    Service.prototype.buildFilterObject = function () {
        var obj = {};
        for (var k in this) {
            if (this.hasOwnProperty(k) && this[k] && typeof this[k] != 'function' && typeof this[k] != 'object')
                obj[k] = this[k];
        }
        return obj;
    };
    Service.prototype.loadFromJSON = function (json) {
        try {
            var obj = JSON.parse(json);
            for (var k in obj) {
                if (obj[k] && this.hasOwnProperty(k) && typeof this[k] != 'function')
                    this[k] = obj[k];
            }
        }
        catch (e) { }
    };
    Service.prototype.buildSortLink = function (name) {
        var obj = this.buildFilterObject();
        if (typeof obj['sort'] != 'undefined'
            && obj['sort'] == name
            && typeof obj['direction'] != 'undefined'
            && obj['direction'] == 'asc') {
            obj['direction'] = 'desc';
        }
        else {
            obj['direction'] = 'asc';
        }
        obj['sort'] = name;
        return JSON.stringify(obj);
    };
    Service.prototype.checkSort = function (name, direction) {
        return typeof this['sort'] != 'undefined'
            && this['sort'] == name
            && typeof this['direction'] != 'undefined'
            && this['direction'] == direction;
    };
    Service = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], Service);
    return Service;
}());
exports.Service = Service;
;
