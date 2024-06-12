import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  intervenants!: User;
  soldatId!: string;
  cvVisible: boolean = false;
  pdfSrc: string | undefined; // Déplacez la déclaration ici
  @Input() data: any;
  constructor(
    private http: HttpClient,
    private intervenantservice: UserService,
    private route: ActivatedRoute,
    private activeModal: NgbActiveModal,
    //@Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  closeModal() {
    this.activeModal.dismiss('Cross click'); // 'Cross click' est le motif de fermeture facultatif
  }

  ngOnInit(): void {
    this.soldatId = this.data;
    this.intervenantservice.getUserById(this.soldatId).subscribe(
      data => {
        this.intervenants = data;
        this.pdfSrc = `${data.cv}`; // Initialisez pdfSrc ici
        console.log(this.pdfSrc);
      },
      error => {
        console.error(error);
        // Gérer l'erreur ici
      }
    );
  }

  toggleCVVisibility() {
    this.cvVisible = !this.cvVisible;
  }
}
