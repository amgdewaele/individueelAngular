import { Component, OnInit, Input } from '@angular/core';
import { PersonalSchemeService } from '../../services/personalScheme.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-personal-item-scheme',
  templateUrl: './personal-item-scheme.component.html',
  styleUrls: ['./personal-item-scheme.component.css']
})
export class PersonalItemSchemeComponent implements OnInit {

  @Input() personalScheme: PersonalSchemeService;
  @Input() index: number;

  constructor(private personalSchemeService: PersonalSchemeService,
    private route: ActivatedRoute,
    private router: Router) { 
}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.personalSchemeService.getPersonalScheme(params['id'])
        .then(rec => this.personalScheme = rec, this.index = params['id'])
        .catch(error => console.log(error));
      }
    );
  }

}
