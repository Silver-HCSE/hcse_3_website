import { Component, OnInit } from '@angular/core';
import { HcseDataService } from './hcse-data.service';

import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { CommonModule } from '@angular/common';
import { KeywordRatingComponent } from './keyword-rating/keyword-rating.component';
import { HighlightPipe } from './highlight.pipe';
import { TuiTagModule } from '@taiga-ui/kit';
import { DomSanitizer } from '@angular/platform-browser';
import { HighlightedTextComponent } from './highlighted-text/highlighted-text.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    TuiRootModule,
    TuiTagModule,
    TuiDialogModule,
    TuiAlertModule,
    HighlightedTextComponent,
    KeywordRatingComponent],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  standalone: true,
})
export class AppComponent implements OnInit {

  constructor(public data_service: HcseDataService, public dom: DomSanitizer) {
  }

  async ngOnInit() {
    await this.data_service.initialize();
  }
}
