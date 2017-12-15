import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.services';
import { Friend } from '../models/friend.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  id: number;
  friends: Friend[];
  private subscription: Subscription;

  constructor(private FService: FriendService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.FService.friendChanged
    .subscribe(
      (friends: Friend[]) =>{
        this.friends = friends;
      }
    );
    this.FService.getFriends();
  }

  onEditItem(index: number) {
    this.FService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

