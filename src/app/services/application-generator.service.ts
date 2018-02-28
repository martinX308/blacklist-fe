import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApplicationGeneratorService {
  private application: string;

  private API_URL = 'http://localhost:3000/api/application';

  constructor(private httpClient: HttpClient) { }


  generate (application: string,user: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    const configuration = {
      application,
      user
    }
    return this.httpClient.post(`${this.API_URL}/create`, configuration, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

}
