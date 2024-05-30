import { Component } from '@angular/core';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { TuiNavigationModule } from '@taiga-ui/experimental';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TuiNavigationModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
