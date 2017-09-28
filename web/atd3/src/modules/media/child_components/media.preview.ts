import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MediaModel } from './../models/media.model';

@Component({
    selector: 'media-preview',
    template: `<div *ngIf="media" class="media-preview">
      <div *ngIf="media.getType() == 'image'">
        <img [src]="mediaPath" alt="" />
      </div>
      <div *ngIf="media.getType() == 'audio'">
        <audio controls>
          <source [src]="mediaPath" />
        </audio>
      </div>
      <div *ngIf="media.getType() == 'video'">
        <video controls>
          <source [src]="mediaPath" [type]="mediaMime" />
        </video>
      </div>
    </div>`
})

export class MediaPreviewComponent {
  @Input() media: any;
  
  mediaPath:string = "";
  mediaMime:string = "";
  
  ngOnInit(){
    this.mediaPath = this.media.getFileHref();
    this.mediaMime = this.media.getFileMime();
  }
  
}