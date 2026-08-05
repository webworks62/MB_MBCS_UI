import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Headers } from "./components/shared/navbars/headers";
import { Footer } from "./components/shared/navbars/footer";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Headers, Footer],
  template: ` 
   @if (showLayout) {
<nav>
  <app-headers />
</nav>
}

<main>
  <router-outlet />
</main>

@if (showLayout) {
<footer>
  <app-footer />
</footer>
}
`
})
export class App {
  // protected readonly title = signal('client');

  private router = inject(Router);

  showLayout :any;

  constructor() {
  this.updateLayout(this.router.url);

  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.updateLayout(this.router.url);
    });
}

private updateLayout(url: string) {
  this.showLayout =
    !url.startsWith("/admin-dashboard") &&
    !url.startsWith("/admin-login");
}

}
