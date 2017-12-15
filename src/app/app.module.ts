import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseStartComponent } from './exercises/exercise-start/exercise-start.component';
import { ExerciseListComponent } from './exercises/exercise-list/exercise-list.component';
import { ExerciseItemComponent } from './exercises/exercise-list/exercise-item/exercise-item.component';
import { ExerciseEditComponent } from './exercises/exercise-edit/exercise-edit.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ExerciseService } from './services/exercise.service';
import { PersonalSchemeComponent } from './personal-scheme/personal-scheme.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendsEditComponent } from './friends/friends-edit/friends-edit.component';
import { FriendService } from './services/friend.services';
import { PersonalSchemeService } from './services/personalScheme.service';
import { DeleteSchemeComponent } from './personal-scheme/delete-scheme/delete-scheme.component';
import { PersonalItemSchemeComponent } from './personal-scheme/personal-item-scheme/personal-item-scheme.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExercisesComponent,
    ExerciseStartComponent,
    ExerciseListComponent,
    ExerciseItemComponent,
    ExerciseEditComponent,
    ExerciseDetailComponent,
    DropdownDirective,
    PersonalSchemeComponent,
    FriendsComponent,
    FriendsEditComponent,
    DeleteSchemeComponent,
    PersonalItemSchemeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ExerciseService, FriendService, PersonalSchemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
