import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string = 'http://localhost:8089/v1/person';
  constructor(private httpClient: HttpClient) {

  }

  savePerson(person:Person,file:File){
    const formData: FormData = new FormData();
    const personBlob = new Blob([JSON.stringify(person)], { type: 'application/json' });
    formData.append('person', personBlob);
    formData.append('file', file); 
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<any>(`${this.baseUrl}`, formData, { headers: headers });
  }

  gtAllPerson(){
    return this.httpClient.get<Person []>(`${this.baseUrl}`);
  }

  getPersonById(personId:string){
    return this.httpClient.get<Person>(`${this.baseUrl}/${personId}`);
  }

  deletePersonById(personId:string){
    return this.httpClient.delete(`${this.baseUrl}/${personId}`);
  }

   updatePersonWithImageData(person:Person){
     return this.httpClient.put<Person>(`${this.baseUrl}`,person);
   }

  updatePerson(person:Person,file:File){
    const formData: FormData = new FormData();
    const personBlob = new Blob([JSON.stringify(person)], { type: 'application/json' });
    formData.append('person', personBlob);
    formData.append('file', file); 
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.httpClient.put<any>(`${this.baseUrl}`, formData, { headers: headers });
  }
}
