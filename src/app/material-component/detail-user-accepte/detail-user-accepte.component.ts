import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-user-accepte',
  templateUrl: './detail-user-accepte.component.html',
  styleUrls: ['./detail-user-accepte.component.css']
})
export class DetailUserAccepteComponent implements OnInit {

  userId!: string;
  user!: User;

  constructor(private route: ActivatedRoute, private serviceMontre: UserService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadMontreDetails(this.userId);
    });
  }

  loadMontreDetails(id: string): void {
    this.serviceMontre.getUserById(id).subscribe((data: User) => {
      this.user = data;
    });
  }
  
  retournerALaListe() {

    this.router.navigate(['/users_approuves']);
  }

}
