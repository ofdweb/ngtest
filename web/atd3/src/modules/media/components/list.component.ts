import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { MediaService } from './../services/media.service';
import { HttpService } from './../services/http.service';
import { MediaModel } from './../models/media.model';
     
@Component({
    selector: 'media-app',
    templateUrl: '/templates/media-list',
    providers:[MediaService, HttpService]
})

export class MediaListComponent {
	
	public mediaService:MediaService;
	public medias:MediaModel[] = [];
	
	public previewOpened:boolean = false;
	public previewModel:MediaModel = null;
	public preloaderVisible:boolean = false;
	
	constructor(private activateRoute: ActivatedRoute, private router: Router, public httpService: HttpService){
		var $this:any = this;
    this.mediaService = new MediaService(httpService);
		
		
		
		this.router.events.subscribe((data) => {
			if (data instanceof NavigationEnd)
			{
				if (typeof activateRoute.snapshot.params['filters'] != 'undefined')
				{
					this.mediaService.loadFromJSON(activateRoute.snapshot.params['filters']);
				}
				$this.loadItems();
			}
			
		});
  }
	
	public ngOnInit(){
		
	}
	
	searchItems(){
		var url:string = '/list/' + JSON.stringify(this.mediaService.buildFilterObject());
		this.router.navigate([url]);
	}
	
	redirectTo(url:string):boolean {
		this.router.navigate([url]);
		return false;
	}
	
	loadItems(){
		this.preloaderVisible = true;
		var $this = this;
		this.mediaService.getItems().subscribe((data) => {
			$this.medias = data;
			$this.preloaderVisible = false;
		});
	}
	
	remove(id:number):boolean {
		let $this = this;
		this.preloaderVisible = true;
		if (confirm("Вы уверены, что хотите удалить медиа-файл?"))
		{
			this.mediaService.removeItem(id).subscribe((data) => {
				var json:any = data.json();
      	if (json.result)
				{
					$this.loadItems();
				}
			});
		}
		return false;
	}
	
	preview(model:MediaModel):boolean {
		this.previewModel = model;
		this.previewOpened = true;
		return false;
	}
	
	hideModal():void {
		this.previewOpened = false;
	}
	
}
	