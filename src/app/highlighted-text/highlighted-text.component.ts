import { Component, Input, OnChanges } from '@angular/core';
import { TuiTagModule } from '@taiga-ui/kit';
import { HcseDataService } from '../hcse-data.service';
import { TuiNavigationModule } from '@taiga-ui/experimental';
import { RouterModule } from '@angular/router';

class section {
  is_pure: boolean = true;
  content: string = '';
  index: number = 0;
}

@Component({
  selector: 'app-highlighted-text',
  standalone: true,
  imports: [
    TuiTagModule, TuiNavigationModule, RouterModule],
  templateUrl: './highlighted-text.component.html',
  styleUrl: './highlighted-text.component.scss'
})
export class HighlightedTextComponent implements OnChanges {
  @Input() text: string = '';
  keywords: string[] = [];
  sections: section[] = [];

  constructor(private data_service: HcseDataService) {
  }

  ngOnChanges(): void {
    this.keywords = this.data_service.get_keywords_for_text(this.text);
    let arr = this.text.split(" ");
    let i = 0
    for (const w of arr) {
      let pot_keyword = w.toLowerCase();
      pot_keyword.replace(/[.?,;()!]/g, '');
      this.sections.push({ is_pure: this.keywords.indexOf(pot_keyword) == -1, content: w, index: i });
      i++;
    }
  }
}
