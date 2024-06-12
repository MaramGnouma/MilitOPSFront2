import { Component, Input, OnInit } from '@angular/core';
import { Camera } from '../camera';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CameraService } from 'src/app/services/camera.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-camera-detail',
  templateUrl: './camera-detail.component.html',
  styleUrls: ['./camera-detail.component.css']
})
export class CameraDetailComponent implements OnInit {


  camera!: Camera; // Assurez-vous d'importer et de définir le type Camera selon votre modèle de données
  cameraId!: string; // Définissez le type de l'ID de la caméra selon vos besoins
  cvVisible: boolean = false;
  pdfSrc: string | undefined; // Déplacez la déclaration ici
  @Input() data: any;

  constructor(
    private http: HttpClient,
    private cameraService: CameraService, // Assurez-vous d'injecter le service de caméra ici
    private route: ActivatedRoute,
    private activeModal: NgbActiveModal
  ) {}

  closeModal() {
    this.activeModal.dismiss('Cross click'); // 'Cross click' est le motif de fermeture facultatif
  }

  ngOnInit(): void {
    this.cameraId = this.data;
    this.cameraService.getCameraById(this.cameraId).subscribe(
      data => {
        this.camera = data;
      //  this.pdfSrc = data.manualUrl; // Initialisez pdfSrc ici avec l'URL du manuel de la caméra par exemple
        console.log(this.pdfSrc)
      },
      error => {
        console.error(error);
        // Gérer l'erreur ici
      }
    );
  }




}
