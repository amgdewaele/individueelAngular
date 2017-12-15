import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseStartComponent } from './exercises/exercise-start/exercise-start.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail/exercise-detail.component';
import { ExerciseEditComponent } from './exercises/exercise-edit/exercise-edit.component';
import { FriendsComponent } from './friends/friends.component';
import { PersonalSchemeComponent } from './personal-scheme/personal-scheme.component';
import { PersonalItemSchemeComponent } from './personal-scheme/personal-item-scheme/personal-item-scheme.component';
import { FriendsEditComponent } from './friends/friends-edit/friends-edit.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/exercises', pathMatch: 'full' },
  { path: 'exercises', component: ExercisesComponent, children: [
    { path: '', component: ExerciseStartComponent },
    { path: 'new', component: ExerciseEditComponent },
    { path: ':id', component: ExerciseDetailComponent },
    { path: ':id/edit', component: ExerciseEditComponent },
  ] },
  { path: 'friend', component: FriendsComponent, children: [
     {path: ':id' , component: FriendsEditComponent }
  ] },
  {path: 'personal-scheme', component: PersonalSchemeComponent, children: [
    { path: ':id', component: PersonalItemSchemeComponent },
  ]}
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  }