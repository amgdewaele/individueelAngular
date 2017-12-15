import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalSchemeService } from '../../services/personalScheme.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-scheme',
  templateUrl: './delete-scheme.component.html',
  styleUrls: ['./delete-scheme.component.css']
})
export class DeleteSchemeComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  editedItemIndex: number;
  editMode: true;

  constructor(private personalSchemeService: PersonalSchemeService) { }

  ngOnInit() {
  }
  onClear() {
    this.slForm.reset();
    this.editMode = true;
  }
  
  onDelete() {
    this.personalSchemeService.deleteExerciseFromScheme(this.editedItemIndex);
    this.onClear();
  }

}
