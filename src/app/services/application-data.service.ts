import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class ApplicationDataService {

  private MS_URL = environment.msUrl+'/api/blacklist-entry';

  constructor(private httpClient: HttpClient) { }

  getApiData (apiKey:any): Promise<any> {
    const options = {
      withCredentials: true,
      headers: {
        authtoken:apiKey
      }
    };
  
    return this.httpClient.get(`${this.MS_URL}/mylog`, options)
      .toPromise();
  }
}

