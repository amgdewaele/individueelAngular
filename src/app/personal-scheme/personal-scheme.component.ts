import { Component, OnInit } from '@angular/core';
import { PersonalScheme } from '../models/personalScheme.model';
import { Subscription } from 'rxjs/Subscription';
import { PersonalSchemeService } from '../services/personalScheme.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-scheme',
  templateUrl: './personal-scheme.component.html',
  styleUrls: ['./personal-scheme.component.css']
})
export class PersonalSchemeComponent implements OnInit {

  personalScheme: PersonalScheme[];
  private subscription: Subscription;

  constructor(private pService: PersonalSchemeService,
                      private route: ActivatedRoute,
                      private router: Router) { }

  ngOnInit() {
    this.pService.getPersonalSchemes();
    this.subscription = this.pService.personalSchemeChanged
      .subscribe(
        (personalScheme: PersonalScheme[]) => {
          this.personalScheme = personalScheme;
        }
      );
  }

  // onEditItem(index: number) {
  //   this.slService.startedEditing.next(index);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
