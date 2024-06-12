import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Intervenant } from 'src/app/Models/intervenant';
import { IntervenantService } from 'src/app/services/intervenant.service';

@Component({
  selector: 'app-detail-intervenant',
  templateUrl: './detail-intervenant.component.html',
  styleUrls: ['./detail-intervenant.component.css']
})
export class DetailIntervenantComponent {
  intervenant!: Intervenant; // Assurez-vous que la classe User correspond à votre modèle
  soldatId!: string;
  cvVisible: boolean = false;
  pdfSrc: string | undefined;
  @Input() data: any;

  constructor(
    private http: HttpClient,
    private intervenantService: IntervenantService,
    private route: ActivatedRoute,
    private activeModal: NgbActiveModal,
    //@Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  ngOnInit(): void {
    this.soldatId = this.data;
    this.intervenantService.getIntervenantById(this.soldatId).subscribe(
      (data: Intervenant) => {
        this.intervenant = data;
        //this.pdfSrc = data.cv;
        this.pdfSrc = `assets/${data.cv}`; // Initialisez pdfSrc ici
        console.log(this.pdfSrc);
      },
      (error) => {
        console.error(error);
        // Gérer l'erreur ici
      }
    );
  }

  toggleCVVisibility() {
    this.cvVisible = !this.cvVisible;
  }
}
