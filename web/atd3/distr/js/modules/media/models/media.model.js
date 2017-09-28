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
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var MediaTitle = {
    'image': 'Изображение',
    'audio': 'Аудиозапись',
    'video': 'Видео'
};
var MediaModel = /** @class */ (function (_super) {
    __extends(MediaModel, _super);
    function MediaModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.fileId = 0;
        _this.name = "";
        _this.mimeType = "";
        _this.width = 0;
        _this.height = 0;
        _this.length = 0;
        _this.file = null;
        return _this;
    }
    MediaModel.prototype.getType = function () {
        if (typeof this['file'] != 'undefined'
            && this.file
            && typeof this.file['mime'] != 'undefined'
            && this.file['mime']) {
            if (this.file['mime'].indexOf('image') != -1)
                return 'image';
            if (this.file['mime'].indexOf('audio') != -1)
                return 'audio';
            if (this.file['mime'].indexOf('video') != -1)
                return 'video';
        }
        return '';
    };
    MediaModel.prototype.getFileHref = function () {
        if (typeof this['file'] != 'undefined'
            && this.file
            && typeof this.file['path'] != 'undefined'
            && this.file['path']) {
            return this.file['path'];
        }
        return '';
    };
    MediaModel.prototype.getFileMime = function () {
        if (typeof this['file'] != 'undefined'
            && this.file
            && typeof this.file['mime'] != 'undefined'
            && this.file['mime']) {
            return this.file['mime'];
        }
        return '';
    };
    MediaModel.prototype.getSizes = function () {
        var res = '';
        return res;
    };
    MediaModel.prototype.getDuration = function () {
        var res = '';
        if (this.getType() == 'image')
            return res;
        var modDiv = this.length;
        var hour = Math.floor(modDiv / 3600);
        modDiv = modDiv - hour * 3600;
        var minutes = Math.floor(modDiv / 60);
        modDiv = modDiv - minutes * 60;
        if (hour)
            res = res + (hour + ' ч');
        if (hour || minutes)
            res = res + (' ' + minutes + ' м');
        if (hour || minutes || modDiv)
            res = res + (' ' + modDiv + ' с');
        return res;
    };
    MediaModel.prototype.getTypeTitle = function () {
        var type = this.getType();
        if (typeof MediaTitle[type] != 'undefined')
            return MediaTitle[type];
        return '';
    };
    MediaModel.prototype.getFileName = function () {
        if (typeof this['file'] != 'undefined'
            && this.file
            && typeof this.file['name'] != 'undefined'
            && this.file['name'])
            return this.file['name'];
        return '';
    };
    return MediaModel;
}(model_1.Model));
exports.MediaModel = MediaModel;
