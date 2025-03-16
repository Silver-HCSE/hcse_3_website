import { Component, inject } from '@angular/core';
import { HcseDataService } from '../hcse-data.service';
import {
  BrnProgressComponent,
  BrnProgressIndicatorComponent,
  BrnProgressModule,
} from '@spartan-ng/brain/progress';
import {
  BrnHoverCardComponent,
  BrnHoverCardContentDirective,
  BrnHoverCardTriggerDirective,
} from '@spartan-ng/brain/hover-card';
import {
  HlmHoverCardContentComponent
} from '@spartan-ng/ui-hovercard-helm';
import { HlmProgressIndicatorDirective } from '@spartan-ng/ui-progress-helm';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';

@Component({
    selector: 'app-file-state',
    imports: [
        BrnHoverCardComponent,
        BrnHoverCardContentDirective,
        BrnHoverCardTriggerDirective,
        HlmHoverCardContentComponent,
        BrnProgressComponent,
        BrnProgressModule,
        BrnProgressIndicatorComponent,
        HlmProgressIndicatorDirective,
        HlmBadgeDirective,
    ],
    templateUrl: './file-state.component.html',
    styleUrl: './file-state.component.scss'
})
export class FileStateComponent {
  data_service = inject(HcseDataService)

}
