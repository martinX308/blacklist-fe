import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import {ApplicationGeneratorService} from '../../services/application-generator.service';

@Component({
  selector: 'app-mgmt-dashboard',
  templateUrl: './mgmt-dashboard.component.html',
  styleUrls: ['./mgmt-dashboard.component.css']
})

export class MgmtDashboardComponent implements OnInit {
  userId: string;
  error = null;
  apiRequestLog = [];

  constructor( 
    private route: ActivatedRoute,
    private applicationGenerator:ApplicationGeneratorService) { }

  ngOnInit() {
    this.route.params
    .subscribe((params) => this.userId = params['Uid']);

    this.lookupApiData ();
  }
  
  lookupApiData () {
    this.error = '';
    this.applicationGenerator.getApiData(this.userId)
    .then((result) => {
      console.log(result);
      this.apiRequestLog = result;
    })
    .catch((err) => {
      this.error = err.error.error; 
    });
  }

}
