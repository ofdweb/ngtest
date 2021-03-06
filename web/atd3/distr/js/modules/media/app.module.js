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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var app_component_1 = require("./components/app.component");
var list_component_1 = require("./components/list.component");
var edit_component_1 = require("./components/edit.component");
var media_service_1 = require("./services/media.service");
var media_preview_1 = require("./child_components/media.preview");
var media_preloader_1 = require("./child_components/media.preloader");
var MediaAppRoutes = [
    { path: '', component: list_component_1.MediaListComponent },
    { path: 'list', component: list_component_1.MediaListComponent },
    { path: 'list/:filters', component: list_component_1.MediaListComponent },
    { path: 'edit', component: edit_component_1.MediaEditComponent },
    { path: 'edit/:id', component: edit_component_1.MediaEditComponent }
];
var MediaAppModule = /** @class */ (function () {
    function MediaAppModule() {
    }
    MediaAppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_2.ReactiveFormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(MediaAppRoutes)],
            declarations: [app_component_1.MediaAppComponent, list_component_1.MediaListComponent, edit_component_1.MediaEditComponent,
                media_preview_1.MediaPreviewComponent, media_preloader_1.MediaPreloaderComponent
            ],
            providers: [common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, media_service_1.MediaService],
            bootstrap: [app_component_1.MediaAppComponent]
        }),
        __metadata("design:paramtypes", [])
    ], MediaAppModule);
    return MediaAppModule;
}());
exports.MediaAppModule = MediaAppModule;
