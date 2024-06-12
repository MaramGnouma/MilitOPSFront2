import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashComponent } from './dash/dash.component';
import { MenutestComponent } from './menutest/menutest.component';

const routes: Routes = [
  {
    path:'dash',
    component: DashComponent
    
  },
  {
    path:'menuu',
    component: MenutestComponent   ,
   // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard], // Appliquer l'AuthGuard à cette route parente
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      //{ path: '', loadChildren: () => MaterialRoutes },


    ]
  },

  {
    path:'login',
 

    component: LoginComponent,

  },
  { 
    path: '', 
    canActivate: [AuthGuard], 
   
    redirectTo: '/login' // Redirigez vers une autre route si nécessaire
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
