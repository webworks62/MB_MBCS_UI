import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Contactus } from './components/shared/navbars/contactus/contactus';
import { Aboutus } from './components/pages/aboutus/aboutus';
import { Services } from './components/pages/services/services';
import { Err404 } from './components/shared/error/err404/err404';
import { Testpagesa } from './components/shared/navbars/testpagesa/testpagesa';
import { Sadmissions } from './components/shared/services/sadmissions/sadmissions';
import { Admissions } from './components/pages/admissions/admissions';
import { Courses } from './components/pages/courses/courses';

export const routes: Routes = [
  { path: '', component: Home },
  // { path: 'home', component: Home },
  { path: 'courses', component: Courses },
  { path: 'services', component: Services },
  { path: 'admissions', component: Admissions },
  { path: 'contact-us', component: Contactus },
  { path: 'about-us', component: Aboutus },
  { path: 'services-admissions', component: Sadmissions },

  { path: 'test', component: Testpagesa },
  { path: 'error-404', component: Err404 },
  { path: '**', redirectTo: 'error-404' },
];
