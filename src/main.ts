import { provideExperimentalZonelessChangeDetection } from '@angular/core' ;
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';


bootstrapApplication(AppModule, {
providers: [
    provideExperimentalZonelessChangeDetection()
  ]
})
  .catch(err => console.error(err));
