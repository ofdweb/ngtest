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
var router_2 = require("@angular/router");
var media_service_1 = require("./../services/media.service");
var http_service_1 = require("./../services/http.service");
var MediaListComponent = /** @class */ (function () {
    function MediaListComponent(activateRoute, router, httpService) {
        var _this = this;
        this.activateRoute = activateRoute;
        this.router = router;
        this.httpService = httpService;
        this.medias = [];
        this.previewOpened = false;
        this.previewModel = null;
        this.preloaderVisible = false;
        var $this = this;
        this.mediaService = new media_service_1.MediaService(httpService);
        this.router.events.subscribe(function (data) {
            if (data instanceof router_2.NavigationEnd) {
                if (typeof activateRoute.snapshot.params['filters'] != 'undefined') {
                    _this.mediaService.loadFromJSON(activateRoute.snapshot.params['filters']);
                }
                $this.loadItems();
            }
        });
    }
    MediaListComponent.prototype.ngOnInit = function () {
    };
    MediaListComponent.prototype.searchItems = function () {
        var url = '/list/' + JSON.stringify(this.mediaService.buildFilterObject());
        this.router.navigate([url]);
    };
    MediaListComponent.prototype.redirectTo = function (url) {
        this.router.navigate([url]);
        return false;
    };
    MediaListComponent.prototype.loadItems = function () {
        this.preloaderVisible = true;
        var $this = this;
        this.mediaService.getItems().subscribe(function (data) {
            $this.medias = data;
            $this.preloaderVisible = false;
        });
    };
    MediaListComponent.prototype.remove = function (id) {
        var $this = this;
        if (confirm("Вы уверены, что хотите удалить медиа-файл?")) {
            this.mediaService.removeItem(id).subscribe(function (data) {
                var json = data.json();
                if (json.result) {
                    $this.loadItems();
                }
            });
        }
        return false;
    };
    MediaListComponent.prototype.preview = function (model) {
        this.previewModel = model;
        this.previewOpened = true;
        return false;
    };
    MediaListComponent.prototype.hideModal = function () {
        this.previewOpened = false;
    };
    MediaListComponent = __decorate([
        core_1.Component({
            selector: 'media-app',
            templateUrl: '/templates/media-list',
            providers: [media_service_1.MediaService, http_service_1.HttpService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, http_service_1.HttpService])
    ], MediaListComponent);
    return MediaListComponent;
}());
exports.MediaListComponent = MediaListComponent;
