import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Contactus } from './components/shared/navbars/contactus';
import { Aboutus } from './pages/aboutus';
import { Services } from './pages/services';
import { Err404 } from './components/shared/error/err404';
import { Sadmissions } from './components/shared/services/sadmissions/sadmissions';
import { Admissions } from './components/pages/admissions/admissions';
import { Courses } from './pages/courses';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'courses', component: Courses },
  { path: 'services', component: Services },
  { path: 'admissions', component: Admissions },
  { path: 'contact-us', component: Contactus },
  { path: 'about-us', component: Aboutus },
  { path: 'services-admissions', component: Sadmissions },

  { path: 'error-404', component: Err404 },
  { path: '**', redirectTo: 'error-404' },
];
