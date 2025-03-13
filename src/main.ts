import { importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { HallmarkDescriptionViewComponent } from './app/hallmark-description-view/hallmark-description-view.component';
import { DictionaryComponent } from './app/dictionary/dictionary.component';
import { SearchComponent } from './app/search/search.component';
import { PaperComponent } from './app/paper/paper.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { KeywordWrapperComponent } from './app/keyword-wrapper/keyword-wrapper.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { HomeComponent } from './app/home/home.component';

const appRoutes: Routes = [
  { path: '', title: "Home", component: HomeComponent },
  { path: 'hallmarks', title: "Hallmarks", component: HallmarkDescriptionViewComponent },
  { path: 'dictionary', title: "Dictionary", component: DictionaryComponent },
  { path: 'keyword/:word', title: "Keyword Details", component: KeywordWrapperComponent },
  { path: 'search', title: "Search", component: SearchComponent },
  { path: 'article/:pmc', title: "Article", component: PaperComponent },
  { path: '**', component: PageNotFoundComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(appRoutes, withComponentInputBinding()), provideCharts(withDefaultRegisterables())
  ]
})
  .catch(err => console.error(err));
