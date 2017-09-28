import { Service } from './service';
import { MediaModel } from './../models/media.model';
import {HttpService} from './http.service';

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MediaService extends Service {
  
  constructor(public httpService: HttpService){
    super(httpService);
  }
  
  saveItem(model:MediaModel):Observable<Response> {
    var body = model.buildBody();
    return this.httpService.http.post('/media/save', body);
  }
  
  removeItem(id:number):Observable<Response> {
    return this.httpService.http.get('/media/delete?id=' + id);
  }
  
  loadItem(id:number):Observable<MediaModel> {
    return this.httpService.http.get('/media/load?id=' + id).map((resp:Response)=>{
      let data = resp.json();
      let m = new MediaModel();
      if (data.result)
      {
        return m.loadFromObject(data.item);
      }
      return m;
    });
  }
  
  getItems():Observable<MediaModel[]> {
    return this.httpService.http.get(this.buildListUrl('/media/list')).map((resp:Response)=>{
      let list = resp.json().list;
      let medias :MediaModel[] = [];
      for(var i = 0, len = list.length; i < len; i++)
      {
        let m = new MediaModel();
        medias.push(m.loadFromObject(list[i]));
      }
      return medias;
    });
  }
  
  loadFile(file:any, callback:any):void {
    var formData = new window['FormData']();
    formData.append('file', file, file.name);
    var xhr = new window['XMLHttpRequest']();
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (typeof callback != 'undefined')
        {
          var json:any = JSON.parse(xhr.responseText);
          callback(json);
        }
      } else {
      }
    };
    xhr.open('POST', '/media/upload', true);
    xhr.send(formData);
  }
  
};