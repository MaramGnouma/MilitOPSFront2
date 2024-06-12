import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipement } from 'src/app/Models/materielsTerrain';
import { MaterielsTerrainService } from 'src/app/services/materiels-terrain.service';

@Component({
  selector: 'app-detail-materiels-terrain',
  templateUrl: './detail-materiels-terrain.component.html',
  styleUrls: ['./detail-materiels-terrain.component.css']
})
export class DetailMaterielsTerrainComponent {
  equipementId!: string;
  equipement!: Equipement;

  constructor(private route: ActivatedRoute, private equipementService: MaterielsTerrainService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.equipementId = params['id'];
      this.loadEquipementDetails();
    });
  }

  loadEquipementDetails(): void {
    this.equipementService.getEquipementById(this.equipementId).subscribe(
      (data: Equipement) => {
        console.log('Données de l\'équipement reçues du service :', data);

        this.equipement = data;
        console.log('Equipement assigné :', this.equipement);

      },
      (error) => {
        console.error(error);
      }
    );
  }

  retournerALaListe() {

    this.router.navigate(['/materiels']);
  }
}
