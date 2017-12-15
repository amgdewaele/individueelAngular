import { PersonalScheme } from '../models/personalScheme.model';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Friend } from '../models/friend.model';

@Injectable()
export class PersonalSchemeService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/personal-scheme'; // URL to web api
  personalSchemeChanged = new Subject<PersonalScheme[]>();
  private personalSchemeService: PersonalSchemeService[] = [];
  private personalSchemas: PersonalScheme[] = [];
  private friend: Friend[] = [];

  constructor(private http: Http) { }

 

  getPersonalSchemes() {
    return this.http.get(this.serverUrl, {headers: this.headers})
    .toPromise()
    .then(response => {
      this.personalSchemas = response.json() as PersonalScheme[];
      this.personalSchemeChanged.next(this.personalSchemas.slice());
      return response.json() as PersonalScheme[];
    })
    .catch(error => {
      return this.handleError(error);
    });  
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

  getPersonalScheme(id: number) {
    return this.http.get(this.serverUrl + "/" + id, {headers: this.headers})
    .toPromise()
    .then(response => {
      return response.json() as PersonalScheme[];
    })
    .catch(error => {
      return this.handleError(error);
    });
  }

//   addFriend(friend: Friend) {
//     this.friends.push(friend);
//     this.friendChanged.next(this.friends.slice());
//   }

  addExerciseToScheme(personalSchemes: PersonalScheme) {

    this.http.post(this.serverUrl, personalSchemes)
    .map((response) => response.json() as PersonalScheme)
    .subscribe((result: PersonalScheme) => {
    });
    console.log('toegevoegd');
    console.log(personalSchemes);
  } 


  deleteExerciseFromScheme(index: number) {
    this.personalSchemas.splice(index, 1);
    this.personalSchemeChanged.next(this.personalSchemas.slice());
  }

  addFriend(friend: Friend){
    this.friend.push(friend);
    //this.next(this.friend.slice());
    console.log(friend);
    // this.http.post(this.serverUrl, friend)
    // .map((response) => response.json() as PersonalScheme)
    // .subscribe((result: PersonalScheme) => {
    // });
    // console.log('toegevoegd');
    // console.log(friend);
  }
}
