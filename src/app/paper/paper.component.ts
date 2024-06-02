import { Component, Input } from '@angular/core';
import { PubmedArticle } from '../util';
import { TuiAccordionModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-paper',
  standalone: true,
  imports: [TuiAccordionModule],
  templateUrl: './paper.component.html',
  styleUrl: './paper.component.scss'
})
export class PaperComponent {
  @Input() article: PubmedArticle | undefined = undefined;

}
