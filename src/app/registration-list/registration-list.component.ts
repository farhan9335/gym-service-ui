import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../models/person.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit{
  public dataSource!:MatTableDataSource<Person>;
  public persons!:Person[];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[]=['personId','firstName','lastName','mobile','bmiResult','gender','trainingPackage','enquiryDate','action'];
  
  constructor(private api:ApiService,private router:Router,private confirm:NgConfirmService,private toastService:NgToastService){}

  ngOnInit(): void {
    this.getAllPersons();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(personId:number){
    this.router.navigate(['update',personId]);
  }

  delete(personId:string){
    this.confirm.showConfirm("Are you sure to want to delete?",
    () =>{
      this.api.deletePersonById(personId).subscribe(response => {
        this.toastService.success({detail:"SUCCESS",summary:"Enquiery Deleted",duration:3000});
        this.getAllPersons();  
      });
    },
    ()=>{

    }
  );
  }

  getAllPersons(){
    this.api.gtAllPerson().subscribe(response => {
      this.persons = response;
      this.dataSource = new MatTableDataSource(this.persons);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
