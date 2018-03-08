import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ApplicationDataService} from '../../services/application-data.service';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})

export class ApplicationPageComponent implements OnInit {
  userId:string;
  apiKey:string;
  apiSecret:string;
  applicationId:string;
  postings:Array<{}> = [];
  error = null;
  isInputHidden:Array<any> = [];


  constructor(private route: ActivatedRoute, private appService: ApplicationDataService) { }
  
  ngOnInit() {
    
    this.route.queryParams
      .subscribe((queryParams) => {
        this.apiSecret = queryParams['secret'];
        this.applicationId = queryParams['applicationId'];
    });
    this.route.params
      .subscribe((params) => {
        this.apiKey = params['token'];
        this.userId = params['Uid'];
        this.getPostedData();
      });

  }

  getPostedData () {
    this.error = '';
    this.appService.getApiData(this.apiKey,this.apiSecret,this.applicationId)
      .then(result => {
        this.postings = result.blacklist;
        return;
      })
      .catch((err) => {
        this.error = err.error.error; 
      });
  }

  editRequest(editPosting:object){
    console.log(editPosting["id"] + " "+ editPosting["ddNum"]);
    
    this.appService.editBlacklistEntry(this.apiKey,this.apiSecret,this.applicationId,editPosting)
    .then(result => {
      console.log(result);
      this.getPostedData();
      return;     
    })
    .catch((err) => {
      this.error = err.error.error; 
    });;

  }

}
