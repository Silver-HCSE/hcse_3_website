import { Component, Input } from '@angular/core';
import { PubmedArticle } from '../util';
import { HighlightedTextComponent } from '../highlighted-text/highlighted-text.component';

@Component({
    selector: 'app-paper',
    imports: [HighlightedTextComponent],
    templateUrl: './paper.component.html',
    styleUrl: './paper.component.scss'
})
export class PaperComponent {
  @Input() article: PubmedArticle | undefined = undefined;

}
