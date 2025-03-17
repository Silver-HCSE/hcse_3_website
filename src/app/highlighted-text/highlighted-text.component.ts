import { Component, Input, OnChanges } from '@angular/core';
import { HcseDataService } from '../hcse-data.service';
import { RouterModule } from '@angular/router';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';

class section {
  is_pure = true;
  content = '';
  index = 0;
}

@Component({
  selector: 'app-highlighted-text',
  imports: [RouterModule, HlmBadgeDirective],
  templateUrl: './highlighted-text.component.html',
  styleUrl: './highlighted-text.component.scss',
})
export class HighlightedTextComponent implements OnChanges {
  @Input() text = '';
  keywords: string[] = [];
  sections: section[] = [];

  constructor(private data_service: HcseDataService) {}

  ngOnChanges(): void {
    this.keywords = this.data_service.get_keywords_for_text(this.text);
    const arr = this.text.split(' ');
    let i = 0;
    for (const w of arr) {
      const pot_keyword = w.toLowerCase();
      pot_keyword.replace(/[.?,;()!]/g, '');
      this.sections.push({
        is_pure: this.keywords.indexOf(pot_keyword) == -1,
        content: w,
        index: i,
      });
      i++;
    }
  }
}
