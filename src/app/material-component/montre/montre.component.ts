import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSmartwatchModalComponent } from '../add-smartwatch-modal/add-smartwatch-modal.component';
import { EditSmartWatchComponent } from '../edit-smart-watch/edit-smart-watch.component';
import { Montre } from '../montre';
import { MontreService } from 'src/app/services/montre.service';

@Component({
  selector: 'app-montre',
  templateUrl: './montre.component.html',
  styleUrls: ['./montre.component.css']
})
export class MontreComponent implements OnInit {

  montres!: any[];

  newMontre: Montre = {
    _id: '',
    nom: '',
    modele: '',
    os: '',
    size: '',
    connectivity:'' ,
    batteryLife: '',
    affichage: '',
    photo: '',
    marque:'',
    fonctionnalites:''

  };
  constructor(private router: Router,private modalService: NgbModal,private serviceMontre: MontreService) {}




  ngOnInit(): void {
    this.loadMontres();
  }

  loadMontres(): void {
    this.serviceMontre.getAllMontres().subscribe((data: Montre[]) => {
      this.montres = data;
    });
  }


  navigateToDetail(montreId: string) {
    this.router.navigate(['/detail-montre', montreId]);
  }
  
/*
  openPopup() {
    this.popupService.openPopup();
  }*/
  newSmartwatch: any = {};


 // Assurez-vous d'initialiser correctement vos montres
 openAddSmartwatchModal() {
  this.modalService.open(AddSmartwatchModalComponent, { centered: true });
}

editsmartwatch(smartwatch: any) {
  const modalRef = this.modalService.open(EditSmartWatchComponent, { centered: true });
  modalRef.componentInstance.smartwatchData = smartwatch;
}
onClickTrashIcon(montreId: string): void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteMontre(montreId);
    }
  });
}

deleteMontre(montreId: string): void {
  this.serviceMontre.deleteMontre(montreId).subscribe(() => {
    // Mettez à jour la liste des montres après la suppression
    this.loadMontres();
    // Affichez une notification ou un message de confirmation
    Swal.fire({
      title: "Deleted!",
      text: "Your SmartWatch has been deleted.",
      icon: "success"
    });
  });
}
searchTerm: string = ''; // Terme de recherche


clearSearch() {
  this.searchTerm = '';
}

// Méthode pour filtrer les équipements en fonction du terme de recherche
filterMontres(): Montre[] {
  return this.montres.filter((montre) =>
    montre.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    montre.modele.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    montre.os.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}

