import { Component } from '@angular/core';

import { HlmCarouselComponent, HlmCarouselContentComponent,HlmCarouselItemComponent,HlmCarouselNextComponent,HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardModule,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HlmCarouselComponent, HlmCarouselContentComponent,HlmCarouselItemComponent,HlmCarouselNextComponent,HlmCarouselPreviousComponent, HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardModule,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective, 
    HlmButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
