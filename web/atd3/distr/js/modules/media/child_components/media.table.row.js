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
var core_1 = require("@angular/core");
var media_model_1 = require("./../models/media.model");
var MediaRowComponent = /** @class */ (function () {
    function MediaRowComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", media_model_1.MediaModel)
    ], MediaRowComponent.prototype, "media", void 0);
    MediaRowComponent = __decorate([
        core_1.Component({
            selector: 'media-row',
            template: "<tr>\n      <td>{{media.id}}</td>\n      <td>{{media.getFileName()}}</td>\n      <td>{{media.getTypeTitle()}}</td>\n    </tr>"
        })
    ], MediaRowComponent);
    return MediaRowComponent;
}());
exports.MediaRowComponent = MediaRowComponent;
