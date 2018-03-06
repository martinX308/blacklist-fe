import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApplicationDataService} from '../../services/application-data.service';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})

export class ApplicationPageComponent implements OnInit {
  userId:string;
  apiKey:string;
  postings:Array<any>;

  constructor(private route: ActivatedRoute, private appService: ApplicationDataService) { }
  
  ngOnInit() {
    this.route.params
      .subscribe((params) => this.apiKey = params['token']);
    this.route.params
      .subscribe((params) => this.userId = params['Uid']);
    this.getPostedData();
  }

  getPostedData () {
    this.appService.getApiData(this.apiKey)
      .then(result => {
        console.log(result);
        this.postings = result;
      });
  }

}
