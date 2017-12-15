import { Friend } from '../models/friend.model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PersonalSchemeService } from '../services/personalScheme.service';


@Injectable()
export class FriendService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/friend'; // URL to web api
  friendChanged = new Subject<Friend[]>();
  startedEditing = new Subject<number>();
  private friends: Friend[] = [];

  constructor(private http: Http, private personalSchemeService: PersonalSchemeService) {}

  getFriends(){
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.log("then get friend");
        this.friends = response.json() as Friend[];    
        this.friendChanged.next(this.friends.slice());
        return response.json() as Friend[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

  getFriend(id: number) {
    // return this.http.get(this.serverUrl + "/" + id, {headers: this.headers})
    //   .toPromise()
    //   .then(response => {
    //     return response.json() as Friend[];
    //   })
    //   .catch(error => {
    //     return this.handleError(error);
    //   })

    return this.friends[id];
  }


  addFriend(friend: Friend) {
    console.log('add');
    this.http.post(this.serverUrl, friend)
      .map((response) => response.json() as Friend)
      .subscribe((result: Friend) => {
        this.friends.push(result);
        console.dir(result);
        this.friendChanged.next(this.friends.slice());
      });
    }

    addFriends(friends: Friend[]) {
        for (const friend of friends){
            this.addFriend(friend);
        };
      }


  updateFriend(index: number, newFriend: Friend) {
    this.http.put(environment.serverUrl + '/friend/' + index, newFriend, {headers: this.headers})
    .map((response) => response.json() as Friend)
    .subscribe((result: Friend) => {
      this.friends[index] = result;
      this.friendChanged.next(this.friends.slice());
    });  
  }

  deleteFriend(index: number) {
    this.http.delete(environment.serverUrl + '/friend/' + index, {headers: this.headers})
    .map((response) => response.json())
    .subscribe((result: Friend) => {
      this.friends.splice(index, 1);
      this.friendChanged.next(this.friends.slice());
    });
  }

  addFriendToScheme(friends){
    this.personalSchemeService.addFriend(friends); 
  }
}
