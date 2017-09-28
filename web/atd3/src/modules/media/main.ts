import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MediaAppModule } from './app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(MediaAppModule);