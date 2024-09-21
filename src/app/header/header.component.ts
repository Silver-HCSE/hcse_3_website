import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmMenuBarComponent, HlmMenuItemDirective } from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HlmMenuBarComponent, HlmMenuItemDirective, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
