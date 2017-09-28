(function (global) {
  System.config({
    paths: {
      // псевдоним для пути к модулям
      'npm:': '/atd3/node_modules/',
      'modules:': '/atd3/distr/js/modules/',
      'src:': '/atd3/src/modules/'
    },
    // указываем загрузчику System, где искать модули
    map: {
      // наше приложение будет находиться в папке app
      media_app: 'modules:media',     
      modal: 'modules:modal',
      // пакеты angular
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
	  '@angular/select2' : 'npm:angular2-select2',
	  '@angular/ng2select2': 'npm:ng2-select2/ng2-select2.js',
	  '@angular/tabs': 'npm:angular2-tabs',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // остальные пакеты
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      //'typescript': 'npm:typescript/lib/typescript.js',  
      '@model/customers':'../src/models/customers.model.ts',
	  'ng2-datetime/ng2-datetime':'npm:ng2-datetime/ng2-datetime'
    },
    // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
    packages: {
      media_app: {
        main: './main.js',
        defaultExtension: 'js'
      },    
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);