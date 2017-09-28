import { Model } from './model';

const MediaTitle = {
  'image':'Изображение',
  'audio':'Аудиозапись',
  'video':'Видео'
};

export class MediaModel extends Model {
  public id:number = 0;
  public fileId:number = 0;
  public name:string = "";
  public mimeType:string = "";
  public width:number = 0;
  public height:number = 0;
  public length:number = 0;
  
  public file:any = null;
  
  public getType():string {
    if (typeof this['file'] != 'undefined' 
        && this.file
        && typeof this.file['mime'] != 'undefined'
        && this.file['mime']
       )
    {
      if (this.file['mime'].indexOf('image') != -1) return 'image';
      if (this.file['mime'].indexOf('audio') != -1) return 'audio';
      if (this.file['mime'].indexOf('video') != -1) return 'video';
    }
    return '';
  }
  
  public getFileHref():string {
    if (typeof this['file'] != 'undefined' 
        && this.file
        && typeof this.file['path'] != 'undefined'
        && this.file['path']
       )
    {
      return this.file['path'];
    }
    return '';
  }
  
  public getFileMime():string {
    if (typeof this['file'] != 'undefined' 
        && this.file
        && typeof this.file['mime'] != 'undefined'
        && this.file['mime']
       )
    {
      return this.file['mime'];
    }
    return '';
  }
  
  public getSizes():string {
    var res:string = '';
    return res;
  }
  
  public getDuration():string {
    var res:string = '';
    if (this.getType() == 'image')
      return res;
    let modDiv = this.length;
    let hour = Math.floor(modDiv / 3600);
    modDiv = modDiv - hour * 3600;
    let minutes = Math.floor(modDiv / 60);
    modDiv = modDiv - minutes * 60;
    if (hour)
      res = res + (hour + ' ч');
    if (hour || minutes)
      res = res + (' ' + minutes + ' м');
    if (hour || minutes || modDiv)
      res = res + (' ' + modDiv + ' с');
    return res;
  }
  
  public getTypeTitle():string {
    let type:string = this.getType();
    if (typeof MediaTitle[type] != 'undefined')
      return MediaTitle[type];
    return '';
  }
  
  public getFileName():string {
    if (typeof this['file'] != 'undefined' 
        && this.file
        && typeof this.file['name'] != 'undefined'
        && this.file['name']
       )
      return this.file['name'];
    return '';
  }
  
}