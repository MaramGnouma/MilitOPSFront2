import 'hammerjs';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';




import { UsersComponent } from './users/users.component';
import { CreateRangePipe } from './users/create-range.pipe';
import { DetailComponent } from './detail/detail.component';
import { UsersAcceptedComponent } from './users-accepted/users-accepted.component';
import { EquipementsComponent } from './equipements/equipements.component';
import { MontreComponent } from './montre/montre.component';

import { CameraComponent } from './camera/camera.component';
import { DetailMontreComponent } from './detail-montre/detail-montre.component';
import { CameraDetailComponent } from './camera-detail/camera-detail.component';

import { AddSmartwatchModalComponent } from './add-smartwatch-modal/add-smartwatch-modal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { EditCameraComponent } from './edit-camera/edit-camera.component';
import { EditSmartWatchComponent } from './edit-smart-watch/edit-smart-watch.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailUserAccepteComponent } from './detail-user-accepte/detail-user-accepte.component';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoMaterialModule } from '../demo-material-module';
import { MaterielTerrainComponent } from './materiel-terrain/materiel-terrain.component';
import { DetailMaterielsTerrainComponent } from './detail-materiels-terrain/detail-materiels-terrain.component';
import { AddMaterielsTerrainComponent } from './add-materiels-terrain/add-materiels-terrain.component';
import { EditMaterielTerrainComponent } from './edit-materiel-terrain/edit-materiel-terrain.component';
import { ListIntervenantComponent } from './list-intervenant/list-intervenant.component';
import { DetailIntervenantComponent } from './detail-intervenant/detail-intervenant.component';
import { EditIntervenantComponent } from './edit-intervenant/edit-intervenant.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddIntervenantComponent } from './add-intervenant/add-intervenant.component';
import { ProfileComponent } from './profile/profile.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AddCameraComponent } from './add-camera/add-camera.component';
import { EditMissionAgentComponent } from './edit-mission-agent/edit-mission-agent.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    NgbModule,
    NgbModalModule,
  PdfViewerModule, 
  MatStepperModule,
  // Assurez-vous que PdfViewerModule est importé ici

  ],
  providers: [],
  //entryComponents: [],
  declarations: [
   
  
    UsersComponent,
    CreateRangePipe,
    DetailComponent,
    UsersAcceptedComponent,
    EquipementsComponent,
    MontreComponent,
    
    CameraComponent,
    DetailMontreComponent,
    CameraDetailComponent,
    AddSmartwatchModalComponent,
  
    AddUserModalComponent,
    EditCameraComponent,
    EditSmartWatchComponent,
    EditUserComponent,
    DetailUserAccepteComponent,
    MaterielTerrainComponent,
    DetailMaterielsTerrainComponent,
    AddMaterielsTerrainComponent,
    EditMaterielTerrainComponent,
    ListIntervenantComponent,
    DetailIntervenantComponent,
    EditIntervenantComponent,
    AddIntervenantComponent,
    ProfileComponent,
    AddCameraComponent,
    EditMissionAgentComponent,
    
  ]
})
export class MaterialComponentsModule {}
