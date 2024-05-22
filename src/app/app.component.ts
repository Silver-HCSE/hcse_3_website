import { Component } from '@angular/core';
import { HcseDataService } from './hcse-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hcse_website';
  constructor(private data_service: HcseDataService) {
    this.data_service.initialize();
  }
}
