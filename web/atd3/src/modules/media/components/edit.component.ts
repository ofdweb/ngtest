import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaModel } from './../models/media.model';
import { MediaService } from './../services/media.service';
import { HttpService } from './../services/http.service';

@Component({
    selector: 'media-app',
    templateUrl: '/templates/media-edit',
    providers:[MediaService, HttpService]
})

export class MediaEditComponent {
  
  public isNewEntity:boolean = true;
  public preloaderVisible:boolean = false;
  id: number;
  model:MediaModel;
  public mediaService:MediaService;
  
  constructor(private activateRoute: ActivatedRoute, private router: Router, public httpService: HttpService){
    this.model = new MediaModel();
    this.mediaService = new MediaService(httpService);
    if (typeof activateRoute.snapshot.params['id'] != 'undefined')
    {
      this.id = activateRoute.snapshot.params['id'];
      this.isNewEntity = false;
      this.loadEntity();
    }
    
  }
  
  loadEntity():void {
    var $this = this;
    this.preloaderVisible = true;
    this.mediaService.loadItem(this.id).subscribe((data) => {
      $this.model = data;
      $this.preloaderVisible = false;
    });
  }
  
  uploadFile(event:any):void {
    var $this = this;
    if (typeof event.target.files != 'undefined'
       && event.target.files
       && typeof event.target.files[0] != 'undefined'
       && event.target.files[0])
    {
      this.preloaderVisible = true;
      this.mediaService.loadFile(event.target.files[0], (data) => {
        $this.preloaderVisible = false;
        if (data.result)
        {
          $this.model.fileId = data.fileId;
          $this.model.name = event.target.files[0].name;
        }
      });
    }
    
  }
  
  save():void {
    var $this = this;
    this.preloaderVisible = true;
    this.mediaService.saveItem(this.model).subscribe((data) => {
      var json:any = data.json();
      $this.preloaderVisible = false;
      if (json.result)
      {
        $this.router.navigateByUrl('/');
      }
      else
      {
        
      }
    });
  }
  
}