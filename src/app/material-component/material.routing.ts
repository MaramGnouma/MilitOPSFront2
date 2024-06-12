import { Routes } from '@angular/router';



import { UsersComponent } from './users/users.component';
import { DetailComponent } from './detail/detail.component';
import { UsersAcceptedComponent } from './users-accepted/users-accepted.component';
import { EquipementsComponent } from './equipements/equipements.component';
import { MontreComponent } from './montre/montre.component';
import { CameraComponent } from './camera/camera.component';

import { DetailMontreComponent } from './detail-montre/detail-montre.component';
import { CameraDetailComponent } from './camera-detail/camera-detail.component';
import { LoginComponent } from '../login/login.component';
import { DetailUserAccepteComponent } from './detail-user-accepte/detail-user-accepte.component';
import { MaterielTerrainComponent } from './materiel-terrain/materiel-terrain.component';
import { DetailMaterielsTerrainComponent } from './detail-materiels-terrain/detail-materiels-terrain.component';
import { ListIntervenantComponent } from './list-intervenant/list-intervenant.component';
import { AddIntervenantComponent } from './add-intervenant/add-intervenant.component';
import { EditIntervenantComponent } from './edit-intervenant/edit-intervenant.component';
import { ProfileComponent } from './profile/profile.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MenutestComponent } from '../menutest/menutest.component';
import { AuthGuard } from '../auth.guard';

import { EditMissionAgentComponent } from './edit-mission-agent/edit-mission-agent.component';

export const MaterialRoutes: Routes = [
  {
    path:'users',    
    component: UsersComponent,
    canActivate: [AuthGuard], // Appliquer l'AuthGuard à cette route parente

  },

  {
    path:'materiels',
    component: MaterielTerrainComponent
    ,
    canActivate: [AuthGuard], // Appliquer l'AuthGuard à cette route parente

  
  },
  {
    path:'soldats',
    component: ListIntervenantComponent   ,
    canActivate: [AuthGuard],
  },
  {
    path:'addsoldat',
    component: AddIntervenantComponent   ,
    canActivate: [AuthGuard],
  },
  {
    path:'adduser',
    component: AddUserModalComponent   ,
    canActivate: [AuthGuard],
  },
  {
    path:'addsoldat',
    component: AddIntervenantComponent   ,
    canActivate: [AuthGuard],
  },
  {
    path:'profile',
    component: ProfileComponent   ,
    canActivate: [AuthGuard],
  },

  {
    path:'updatesoldats/:id',
    component: EditIntervenantComponent   ,
    canActivate: [AuthGuard],
  },
  {
    path:'updateuser/:id',
    component: EditUserComponent   ,
    canActivate: [AuthGuard],
  },
  {
    path:'updateagant/:id',
    component: EditMissionAgentComponent   ,
    canActivate: [AuthGuard],
  },
  {
    path:'users_approuves',
    component:UsersAcceptedComponent   ,
    canActivate: [AuthGuard],
  },
  { path: 'user-details/:id', 
  component: DetailComponent    ,
  canActivate: [AuthGuard],
  },
  { path: 'materielsTerrain-details/:id', 
  component: DetailMaterielsTerrainComponent    ,
  canActivate: [AuthGuard],
  },
  
  { path: 'detail-montre/:id', component: DetailMontreComponent    ,
  canActivate: [AuthGuard],}, 
  {path:'camera-detail/:id',component:CameraDetailComponent    ,
  canActivate: [AuthGuard],},
  /*
  {
    path: 'equipements',   
    canActivate: [AuthGuard],
    //component: EquipementsComponent,
    children: [
      { path: 'montre_connecte', component: MontreComponent },
      { path: 'camera', component: CameraComponent },
      { path: '', redirectTo: 'equipements', pathMatch: 'full' }, // Redirection par défaut vers "Montre Connectée"
    ]
  },
*/

  
  { path: 'montre_connecte', component: MontreComponent ,  canActivate: [AuthGuard],
},
  { path: 'camera', component: CameraComponent ,  canActivate: [AuthGuard],
},

  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard], // Appliquer l'AuthGuard à cette route
    children: [{ path: '', redirectTo: '/login', pathMatch: 'full' }],
  },
  
];
