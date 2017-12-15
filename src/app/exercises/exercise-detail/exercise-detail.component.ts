import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Exercise } from '../../models/exercise.model';
import { PersonalScheme } from '../../models/personalScheme.model';
import { ExerciseService } from '../../services/exercise.service';
@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  exercise: Exercise;
  id: number;

  constructor(private exerciseService: ExerciseService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.exerciseService.getExercise(params['id'])
          .then(rec => this.exercise = rec, this.id = params['id'])
          .catch(error => console.log(error));
        }
      );
  }

  onAddExerciseToPersonalScheme() {
    var newPersonalScheme = new PersonalScheme(this.exercise.bodyPart, this.exercise.name, this.exercise.description);
    this.exerciseService.addExerciseToPersonalScheme(newPersonalScheme);
  }

  onEditExercise() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteExercise() {
    this.exerciseService.deleteExercise(this.id);
    this.router.navigate(['/exercises']);
  }
}
