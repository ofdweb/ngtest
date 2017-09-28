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
var MediaPreviewComponent = /** @class */ (function () {
    function MediaPreviewComponent() {
        this.mediaPath = "";
        this.mediaMime = "";
    }
    MediaPreviewComponent.prototype.ngOnInit = function () {
        this.mediaPath = this.media.getFileHref();
        this.mediaMime = this.media.getFileMime();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MediaPreviewComponent.prototype, "media", void 0);
    MediaPreviewComponent = __decorate([
        core_1.Component({
            selector: 'media-preview',
            template: "<div *ngIf=\"media\" class=\"media-preview\">\n      <div *ngIf=\"media.getType() == 'image'\">\n        <img [src]=\"mediaPath\" alt=\"\" />\n      </div>\n      <div *ngIf=\"media.getType() == 'audio'\">\n        <audio controls>\n          <source [src]=\"mediaPath\" />\n        </audio>\n      </div>\n      <div *ngIf=\"media.getType() == 'video'\">\n        <video controls>\n          <source [src]=\"mediaPath\" [type]=\"mediaMime\" />\n        </video>\n      </div>\n    </div>"
        })
    ], MediaPreviewComponent);
    return MediaPreviewComponent;
}());
exports.MediaPreviewComponent = MediaPreviewComponent;
