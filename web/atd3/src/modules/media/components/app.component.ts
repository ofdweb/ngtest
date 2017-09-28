import { Component} from '@angular/core';
  
@Component({
    selector: 'media-app',
    template: `<div>
                    <router-outlet></router-outlet>
               </div>`
})
export class MediaAppComponent {}