import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import {ApplicationGeneratorService} from '../../services/application-generator.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  userId: string;
  feedbackEnabled = false;
  error = null;
  processing = false;
  application: string;
  applicationList:Array <{}> = [];

  constructor(
    private route: ActivatedRoute,
    private applicationGenerator:ApplicationGeneratorService ) { }

  ngOnInit() {
    this.route.params
    .subscribe((params) => this.userId = params['Uid']);

    this.getApplications ();
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.applicationGenerator.generate(this.application,this.userId)
        .then((result) => {
          console.log(result);
          this.getApplications ();
          this.processing = false;
          // ... handle result, reset form, etc...
          // ... maybe turn this to false if your're staying on the page - this.processing = false;
        })
        .catch((err) => {
          this.error = err.error.error; 
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

  getApplications () {
    this.error = '';
    this.applicationGenerator.getList(this.userId)
        .then((result) => {
          console.log(result);
          this.applicationList = result;
          // ... handle result, reset form, etc...
          // ... maybe turn this to false if your're staying on the page - this.processing = false;
        })
        .catch((err) => {
          this.error = err.error.error; 
    });
    
  }



}