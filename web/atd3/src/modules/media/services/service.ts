import {HttpService} from './http.service';
import {Injectable} from '@angular/core';

@Injectable()
export class Service {
  
  public query:string = null;
  public sort:string = null;
  public direction:string = null;
  public page:number = null;
  
  constructor(public httpService: HttpService){}
  
  public buildListUrl(url:string):string {
    var res:string = url + '?';
    var qp = [];
    for(let k in this)
    {
      if (this.hasOwnProperty(k) && this[k] && typeof this[k] != 'function' && typeof this[k] != 'object')
        qp.push(k + '=' + this[k]);
    }
    res = res + qp.join('&');
    return res;
  }
  
  public buildFilterObject():any
  {
    var obj:any = {};
    for(let k in this)
    {
      if (this.hasOwnProperty(k) && this[k] && typeof this[k] != 'function' && typeof this[k] != 'object')
        obj[k] = this[k];
    }
    return obj;
  }
  
  public loadFromJSON(json:string)
  {
    try {
      let obj = JSON.parse(json);
      for(let k in obj)
      {
        if (obj[k] && this.hasOwnProperty(k) && typeof this[k] != 'function')
          this[k] = obj[k];
      }
    }
    catch(e){}
  }
  
  public buildSortLink(name):string {
    let obj:any = this.buildFilterObject();
    if (typeof obj['sort'] != 'undefined'
        && obj['sort'] == name
        && typeof obj['direction'] != 'undefined'
        && obj['direction'] == 'asc')
    {
      obj['direction'] = 'desc';
    }
    else
    {
      obj['direction'] = 'asc';
    }
    obj['sort'] = name;
    return JSON.stringify(obj);
  }
  
  public checkSort(name, direction):boolean
  {
    return typeof this['sort'] != 'undefined'
        && this['sort'] == name
        && typeof this['direction'] != 'undefined'
        && this['direction'] == direction;
  }
  
};