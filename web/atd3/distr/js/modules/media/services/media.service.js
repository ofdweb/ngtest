"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var service_1 = require("./service");
var media_model_1 = require("./../models/media.model");
var http_service_1 = require("./http.service");
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var MediaService = /** @class */ (function (_super) {
    __extends(MediaService, _super);
    function MediaService(httpService) {
        var _this = _super.call(this, httpService) || this;
        _this.httpService = httpService;
        return _this;
    }
    MediaService.prototype.saveItem = function (model) {
        var body = model.buildBody();
        return this.httpService.http.post('/media/save', body);
    };
    MediaService.prototype.removeItem = function (id) {
        return this.httpService.http.get('/media/delete?id=' + id);
    };
    MediaService.prototype.loadItem = function (id) {
        return this.httpService.http.get('/media/load?id=' + id).map(function (resp) {
            var data = resp.json();
            var m = new media_model_1.MediaModel();
            if (data.result) {
                return m.loadFromObject(data.item);
            }
            return m;
        });
    };
    MediaService.prototype.getItems = function () {
        return this.httpService.http.get(this.buildListUrl('/media/list')).map(function (resp) {
            var list = resp.json().list;
            var medias = [];
            for (var i = 0, len = list.length; i < len; i++) {
                var m = new media_model_1.MediaModel();
                medias.push(m.loadFromObject(list[i]));
            }
            return medias;
        });
    };
    MediaService.prototype.loadFile = function (file, callback) {
        var formData = new window['FormData']();
        formData.append('file', file, file.name);
        var xhr = new window['XMLHttpRequest']();
        xhr.onload = function () {
            if (xhr.status === 200) {
                if (typeof callback != 'undefined') {
                    var json = JSON.parse(xhr.responseText);
                    callback(json);
                }
            }
            else {
            }
        };
        xhr.open('POST', '/media/upload', true);
        xhr.send(formData);
    };
    MediaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], MediaService);
    return MediaService;
}(service_1.Service));
exports.MediaService = MediaService;
;
