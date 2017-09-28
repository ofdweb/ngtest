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
var router_1 = require("@angular/router");
var media_model_1 = require("./../models/media.model");
var media_service_1 = require("./../services/media.service");
var http_service_1 = require("./../services/http.service");
var MediaEditComponent = /** @class */ (function () {
    function MediaEditComponent(activateRoute, router, httpService) {
        this.activateRoute = activateRoute;
        this.router = router;
        this.httpService = httpService;
        this.isNewEntity = true;
        this.preloaderVisible = false;
        this.model = new media_model_1.MediaModel();
        this.mediaService = new media_service_1.MediaService(httpService);
        if (typeof activateRoute.snapshot.params['id'] != 'undefined') {
            this.id = activateRoute.snapshot.params['id'];
            this.isNewEntity = false;
            this.loadEntity();
        }
    }
    MediaEditComponent.prototype.loadEntity = function () {
        var $this = this;
        this.preloaderVisible = true;
        this.mediaService.loadItem(this.id).subscribe(function (data) {
            $this.model = data;
            $this.preloaderVisible = false;
        });
    };
    MediaEditComponent.prototype.uploadFile = function (event) {
        var $this = this;
        if (typeof event.target.files != 'undefined'
            && event.target.files
            && typeof event.target.files[0] != 'undefined'
            && event.target.files[0]) {
            this.preloaderVisible = true;
            this.mediaService.loadFile(event.target.files[0], function (data) {
                $this.preloaderVisible = false;
                if (data.result) {
                    $this.model.fileId = data.fileId;
                    $this.model.name = event.target.files[0].name;
                }
            });
        }
    };
    MediaEditComponent.prototype.save = function () {
        var $this = this;
        this.mediaService.saveItem(this.model).subscribe(function (data) {
            var json = data.json();
            if (json.result) {
                $this.router.navigateByUrl('/');
            }
            else {
            }
        });
    };
    MediaEditComponent = __decorate([
        core_1.Component({
            selector: 'media-app',
            templateUrl: '/templates/media-edit',
            providers: [media_service_1.MediaService, http_service_1.HttpService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, http_service_1.HttpService])
    ], MediaEditComponent);
    return MediaEditComponent;
}());
exports.MediaEditComponent = MediaEditComponent;
