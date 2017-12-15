import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Exercise } from '../models/exercise.model';
import { PersonalScheme } from '../models/personalScheme.model';
import { PersonalSchemeService } from '../services/personalScheme.service';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';


@Injectable()
export class ExerciseService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/exercises'; // URL to web api
  exercisesChanged = new Subject<Exercise[]>();
  private exercises: Exercise[] = [];

  constructor(private http: Http, private fService: PersonalSchemeService) {}

  getExercises() {
    return this.http.get(this.serverUrl, {headers: this.headers})
    .toPromise()
    .then(response => {
      this.exercises = response.json() as Exercise[];
      this.exercisesChanged.next(this.exercises.slice());
      return response.json() as Exercise[];
    })
    .catch(error => {
      return this.handleError(error);
    });  
  }
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

  getExercise(id: number) {
    return this.http.get(this.serverUrl + "/" + id, {headers: this.headers})
    .toPromise()
    .then(response => {
      return response.json() as Exercise[];
    })
    .catch(error => {
      return this.handleError(error)
    });
  } 

  addExerciseToPersonalScheme(personalExercise: PersonalScheme) {
  
    this.fService.addExerciseToScheme(personalExercise); 
  }

  addExercise(exercise: Exercise) {
    this.http.post(this.serverUrl, exercise)
    .map((response) => response.json() as Exercise)
    .subscribe((result: Exercise) => {
      this.exercises.push(result);
      this.exercisesChanged.next(this.exercises.slice());
    });
  }
  //weergeeft data nog niet in text areas
  updateExercise(index: number, newExercise: Exercise) {
    this.http.put(environment.serverUrl + '/exercise/' + index, newExercise, {headers: this.headers})
    .map((response) => response.json() as Exercise)
    .subscribe((result: Exercise) => {
      this.exercises[index] = result;
      this.exercisesChanged.next(this.exercises.slice());
    });
  }


  deleteExercise(index: number) {
    this.http.delete(environment.serverUrl + '/exercise/' + index, {headers: this.headers})
    .map((response) => response.json())
    .subscribe((result: Exercise) => {
      this.exercises.splice(index, 1);
      this.exercisesChanged.next(this.exercises.slice());
    });
  }
}
