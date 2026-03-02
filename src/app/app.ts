import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Headers } from "./components/shared/navbars/headers/headers";
import { Footer } from "./components/shared/navbars/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Headers, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
