import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';
import { Hero } from '../components/pages/home/hero';
import { Universitylist } from '../components/pages/home/universitylist';
import { Details } from '../components/pages/home/details';
import { Count } from '../components/pages/home/count';
import { Subscribe } from '../components/pages/home/subscribe';
import { Testimonials } from '../components/pages/home/testimonials';
import { Banner } from '../components/pages/home/banner';
import { review } from "../components/pages/home/review";

@Component({
  selector: 'app-home',
  imports: [Hero, Details, Count, Subscribe, Testimonials, Banner, review],
  template: `
 <div>
  <app-banner />

  <app-hero />

  <app-count />

  <app-details />

  <app-review />
  <!-- <app-testimonials /> -->

  <!-- <app-universitylist /> -->

  <app-subscribe />
</div>

`
})
export class Home { }
