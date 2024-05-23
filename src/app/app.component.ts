import { Component, OnInit } from '@angular/core';
import { HcseDataService } from './hcse-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'hcse_website';
  constructor(public data_service: HcseDataService) {
  }

  async ngOnInit() {
    await this.data_service.initialize();
  }
}
