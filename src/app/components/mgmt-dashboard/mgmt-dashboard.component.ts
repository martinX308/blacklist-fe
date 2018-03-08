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
  apiRequestLog: object = {};
  apiList: Array<string> = [];

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
      const apiKeyList = result.reduce((arrayList,object)=> {
        if (arrayList[object.api]===undefined) {
          arrayList[object.api]  = {
            positiveCount:0,
            responseCount:0
          };  
        }
        arrayList[object.api]["responseCount"]++;
        if (object.response === "true") {  
          arrayList[object.api]["positiveCount"]++; 
        }
        return arrayList;
      },{});
      
      this.apiRequestLog = apiKeyList;
      this.apiList= Object.keys(apiKeyList);
    
    })
    .catch((err) => {
      this.error = err.error.error; 
    });
  }

}
