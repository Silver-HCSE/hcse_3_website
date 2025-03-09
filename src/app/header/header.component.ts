import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmMenuBarComponent,
  HlmMenuBarItemDirective,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ 
    HlmMenuBarComponent,
    HlmMenuItemDirective,
    HlmMenuBarItemDirective,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
