import { Component, OnInit } from '@angular/core';
import { HcseDataService } from './hcse-data.service';

import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'hcse_website';
  constructor(public data_service: HcseDataService) {
  }

  async ngOnInit() {
    await this.data_service.initialize();
  }
}
