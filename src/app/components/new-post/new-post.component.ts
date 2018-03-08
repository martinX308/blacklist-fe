import { Component, OnInit, Input } from '@angular/core';
import {ApplicationDataService} from '../../services/application-data.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @Input() applicationList:any;

  feedbackEnabled = false;
  error = null;
  processing = false;
  ddNum: string;

  selectedAppplication:object;

  constructor(private fraudCaseGenerator:ApplicationDataService) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.fraudCaseGenerator.addNewFraudCase(this.selectedAppplication["apiKey"]["token"],this.selectedAppplication["apiSecret"]["token"],this.selectedAppplication["_id"],{ddNumber:form.value.ddNum})
        .then((result) => {
          console.log(result);
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


}
