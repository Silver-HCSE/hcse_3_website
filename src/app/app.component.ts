import { Component, OnInit } from '@angular/core';
import { HcseDataService } from './hcse-data.service';
import { CommonModule } from '@angular/common';
import { KeywordRatingComponent } from './keyword-rating/keyword-rating.component';
import { HighlightedTextComponent } from './highlighted-text/highlighted-text.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    CommonModule,
    RouterModule,
    HighlightedTextComponent,
    KeywordRatingComponent],
  standalone: true,
})
export class AppComponent implements OnInit {
  protected open = false;
  protected expanded = true;
  protected submenu = false;
  constructor(public data_service: HcseDataService) {
  }

  async ngOnInit() {
    await this.data_service.initialize();
  }
}
