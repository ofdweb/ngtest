import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import { MediaAppComponent }   from './components/app.component';
import { MediaListComponent }   from './components/list.component';
import { MediaEditComponent }   from './components/edit.component';

import { MediaService } from './services/media.service';

import { MediaPreviewComponent } from './child_components/media.preview';
import { MediaPreloaderComponent } from './child_components/media.preloader';

const MediaAppRoutes: Routes = [
	{path:'', component:MediaListComponent},
	{path:'list', component:MediaListComponent},
	{path:'list/:filters', component:MediaListComponent},
	{path:'edit', component:MediaEditComponent},
	{path:'edit/:id', component:MediaEditComponent}
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule.forRoot(MediaAppRoutes) ],
    declarations: [ MediaAppComponent, MediaListComponent, MediaEditComponent,
									MediaPreviewComponent, MediaPreloaderComponent
									],
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}, MediaService],
    bootstrap:    [ MediaAppComponent ]
})
export class MediaAppModule {
    constructor(){}
}