import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Headers } from "./components/shared/navbars/headers";
import { Footer } from "./components/shared/navbars/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Headers, Footer],
  template:` <nav>
  <app-headers />
</nav> 

<!-- <main class="md:pt-16"> -->
<main>
  <router-outlet />
</main>

<footer>
  <app-footer />
</footer>
`
})
export class App {
  protected readonly title = signal('client');
}
