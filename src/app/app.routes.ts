import { Routes } from '@angular/router';
import { Compn } from './compn/compn';
import { Err404 } from './err404/err404';

export const routes: Routes = [
    {path:'', component:Compn},

    {path:'error-404', component:Err404},
    {path:'**', redirectTo:'error-404'}
];
