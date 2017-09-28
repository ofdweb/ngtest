import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MediaModel } from './../models/media.model';

@Component({
    selector: 'media-row',
    template: `<tr>
      <td>{{media.id}}</td>
      <td>{{media.getFileName()}}</td>
      <td>{{media.getTypeTitle()}}</td>
    </tr>`
})

export class MediaRowComponent {
  @Input() media: MediaModel;
}