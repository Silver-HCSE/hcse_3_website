import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { HlmMenuBarComponent, HlmMenuBarItemDirective } from '@spartan-ng/ui-menu-helm';
import { filter, map } from 'rxjs';

import { HlmBreadCrumbModule } from '@spartan-ng/ui-breadcrumb-helm';
import { FileStateComponent } from '../file-state/file-state.component';

@Component({
  selector: 'app-header',
  imports: [
    HlmMenuBarComponent,
    HlmMenuBarItemDirective,
    RouterModule,
    HlmBreadCrumbModule,
    FileStateComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  pageTitle = signal('');
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.routeConfig?.title;
        }),
      )
      .subscribe((title) => {
        if (typeof title == 'string') {
          this.pageTitle.set(title);
        }
      });
  }
}
