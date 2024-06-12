import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MontreService } from 'src/app/services/montre.service';
import { Montre } from '../montre';


@Component({
  selector: 'app-detail-montre',
  templateUrl: './detail-montre.component.html',
  styleUrls: ['./detail-montre.component.css']
})
export class DetailMontreComponent implements OnInit {

  montreId!: string;
  montre!: Montre;

  constructor(private route: ActivatedRoute, private serviceMontre: MontreService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.montreId = params['id'];
      this.loadMontreDetails(this.montreId);
    });
  }

  loadMontreDetails(id: string): void {
    this.serviceMontre.getMontreById(id).subscribe((data: Montre) => {
      this.montre = data;
    });
  }
  
  retournerALaListe() {

    this.router.navigate(['/montre_connecte']);
  }
}

