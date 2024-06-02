import { Component, OnInit, Input } from '@angular/core';
import { HcseDataService } from '../hcse-data.service';
import { Observable } from 'rxjs';
import { PubmedArticle } from '../util';

@Component({
  selector: 'app-paper',
  standalone: true,
  imports: [],
  templateUrl: './paper.component.html',
  styleUrl: './paper.component.scss'
})
export class PaperComponent implements OnInit {
  @Input() id: string = '';
  article?: Observable<PubmedArticle>;

  constructor(private data_service: HcseDataService) { }

  ngOnInit(): void {
    if (this.id !== '') {
      this.article = this.data_service.fetchArticle(this.id);
    }
  }

}
