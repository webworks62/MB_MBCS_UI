import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';
import { Hero } from '../../shared/home/hero/hero';
import { Universitylist } from '../../shared/home/universitylist/universitylist';
import { Details } from '../../shared/home/details/details';
import { Count } from '../../shared/home/count/count';
import { Subscribe } from '../../shared/home/subscribe/subscribe';
import { Testimonials } from '../../shared/home/testimonials/testimonials';
import { Banner } from '../../shared/home/banner/banner';

@Component({
  selector: 'app-home',
  imports: [Hero, Details, Count, Subscribe, Testimonials, Banner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
