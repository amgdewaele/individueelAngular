import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Friend } from '../../models/friend.model';
import { FriendService } from '../../services/friend.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends-edit',
  templateUrl: './friends-edit.component.html',
  styleUrls: ['./friends-edit.component.css']
})
export class FriendsEditComponent implements OnInit {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Friend;
  friends: Friend[];

  constructor(private FService: FriendService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.FService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.FService.getFriend(index);
          this.slForm.setValue({
            firstName: this.editedItem.firstName,
            lastName: this.editedItem.lastName,
            age: this.editedItem.age
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newFriend = new Friend(value.firstName, value.lastName, value.age);
    if (this.editMode) {
      this.FService.updateFriend(this.editedItemIndex, newFriend);
    } else {
      this.FService.addFriend(newFriend);
    }
    this.editMode = false;
    form.reset();
  }

  addFriendToScheme(friend: Friend) {
    this.FService.addFriendToScheme(friend);
    this.slForm.reset(); 
    this.editMode = false;
  }
  onDelete() {
    this.FService.deleteFriend(this.editedItemIndex);
    this.slForm.reset(); 
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

