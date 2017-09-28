<div class="page">
  <h3 *ngIf="isNewEntity">
    Добавление медиа-файла
  </h3>
  <h3 *ngIf="!isNewEntity">
    Редактирование медиа-файла
  </h3>
  <div class="form row">
    <div class="col s12">
      <div class="file-field input-field">
        <div class="btn">
          <span>Файл</span>
          <input type="file" (change)="uploadFile($event)" accept="image/*,audio/mp3,audio/ogg,audio/wav,audio/wav,video/mp4,video/ogg,video/webm" />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
    </div>
    <div class="input-field col s12">
      <input type="text" placeholder=" " required="required" [(ngModel)]="model.name" />
      <label class="{{model.name.length > 0 ? 'active' : ''}}">Имя файла</label>
    </div>
    <div class="col s12">
      <button (click)="save()" class="waves-effect waves-light btn green btn-large">
        <span *ngIf="isNewEntity">Добавить</span>
        <span *ngIf="!isNewEntity">Сохранить</span>
      </button>
      <a class="waves-effect waves-light btn btn-large red" routerLink="/list">Отмена</a>
    </div>
  </div>
  <div *ngIf="preloaderVisible">
    <media-preloader></media-preloader>
  </div>
</div>