import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  id: number;
  editMode = false;
  exerciseForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private exerciseService: ExerciseService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.exerciseService.updateExercise(this.id, this.exerciseForm.value);
    } else {
      this.exerciseService.addExercise(this.exerciseForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let exerciseBodyPart = '';
    let exerciseName = '';
    let exerciseDescription = '';
    let exerciseReps;
    let exerciseSets;

    if (this.editMode) {
      const exercise = this.exerciseService.getExercise(this.id).then(exercise => {
      exerciseBodyPart = exercise.bodyPart;
      exerciseName = exercise.name;
      exerciseDescription = exercise.description;
      exerciseReps = exercise.reps;
      exerciseSets = exercise.sets;
      })
    };
    
    this.exerciseForm = new FormGroup({
      'bodyPart': new FormControl(exerciseBodyPart, Validators.required),
      'name': new FormControl(exerciseName, Validators.required),
      'description': new FormControl(exerciseDescription, Validators.required),
      'reps': new FormControl(exerciseReps, Validators.required),
      'sets': new FormControl(exerciseSets, Validators.required)
    });
  }
}
