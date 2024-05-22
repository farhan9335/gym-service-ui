import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public personId!: string;
  public personDetail!: Person
  public imageSrc!: string


  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.personId = value['personId'];
      this.fetchPersonDetail(this.personId);
    });
  }

  fetchPersonDetail(personId: string) {
    this.api.getPersonById(personId).subscribe(response => {
      this.personDetail = response;
      this.imageSrc = 'data:' + this.personDetail.imageData.type + ';base64,' + this.personDetail.imageData.imageData;
    });
  }



}
