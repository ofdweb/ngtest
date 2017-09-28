<div class="page">
  <h3>
    Медиа-файлы
  </h3>
  <div class="row">
    <div class="col s12">
      <a class="waves-effect waves-light btn" routerLink="/edit">Добавить медиа-файл</a>
      <button class="waves-effect waves-light btn red" (click)="loadItems()">
        Обновить список
      </button>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s10">
      <input type="text" placeholder="" [(ngModel)]="mediaService.query" />
      <label class="{{mediaService.query && mediaService.query.length > 0 ? 'active' : ''}}">Поиск</label>
    </div>
    <div class="col s2">
      <button class="waves-effect waves-light btn btn-large green" (click)="searchItems()">
        Найти
      </button>
    </div>
  </div>
  <div>
    <table class="centered bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th><a [routerLink]="'/list/' + mediaService.buildSortLink('name')">
                Наименование файла <i *ngIf="mediaService && mediaService.checkSort('name', 'asc')" class="tiny material-icons">sort</i>
                                      <i *ngIf="mediaService && mediaService.checkSort('name', 'desc')" class="tiny material-icons">sort</i>
              </a>
          </th>
          <th>
            <a [routerLink]="'/list/' + mediaService.buildSortLink('mime')">
                Тип файла <i *ngIf="mediaService && mediaService.checkSort('mime', 'asc')" class="tiny material-icons">sort</i>
                                      <i *ngIf="mediaService && mediaService.checkSort('mime', 'desc')" class="tiny material-icons">sort</i>
              </a>
          </th>
          <th>
            <a [routerLink]="'/list/' + mediaService.buildSortLink('length')">
                Длительность  <i *ngIf="mediaService && mediaService.checkSort('length', 'asc')" class="tiny material-icons">sort</i>
                               <i *ngIf="mediaService && mediaService.checkSort('length', 'desc')" class="tiny material-icons">sort</i>
              </a>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let media of medias">
          <td>{{media.id}}</td>
          <td>{{media.getFileName()}}</td>
          <td>{{media.getTypeTitle()}}</td>
          <td>{{media.getDuration()}}</td>
          <td>
            <a routerLink="/edit/{{media.id}}"><i class="small material-icons">create</i></a>
            <a (click)="remove(media.id)" routerLink=""><i class="small material-icons">delete</i></a>
            <a (click)="preview(media)" routerLink=""><i class="small material-icons">play_arrow</i></a>
            
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="media-preview" class="media-preview-wrapper modal-block" *ngIf="previewOpened && previewModel">
    <div class="modal-content">
      <media-preview [media]="previewModel"></media-preview>
    </div>
  </div>
  <div class="modal-block-overlay" *ngIf="previewOpened && previewModel" (click)="hideModal()">
    &nbsp;
  </div>
  <div *ngIf="preloaderVisible">
    <media-preloader></media-preloader>
  </div>
</div>