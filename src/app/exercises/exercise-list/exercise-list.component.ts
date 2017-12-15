import { Component, OnInit } from '@angular/core';

import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  exercises: Exercise[];
  subscription: Subscription;

  constructor(private exerciseService: ExerciseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.exerciseService.getExercises()
    .then(ing => this.exercises = ing) 
    .catch(error => console.log(error));
    this.subscription = this.exerciseService.exercisesChanged
      .subscribe(
        (exercise: Exercise[]) => {
          this.exercises = exercise;
        }
      );
  }

  onNewExercise() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
