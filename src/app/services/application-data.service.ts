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

  getApiData (apiKey:string,apiSecret:string,applicationId:string): Promise<any> {
    const keys = btoa(apiKey+":"+apiSecret);
    const options = {
      withCredentials: true,
      headers: {
        "authorization":keys
      }
    };
  
    return this.httpClient.get(`${this.MS_URL}/mylog/${applicationId}`, options)
      .toPromise();
  }

  editBlacklistEntry(apiKey:string,apiSecret:string,applicationId:string,entry:object):Promise <any>{
    const keys = btoa(apiKey+":"+apiSecret);
    const options = {
      withCredentials: true,
      headers: {
        "authorization":keys
      }
    };

    return this.httpClient.put(`${this.MS_URL}/mylog/${applicationId}/edit`,entry, options)
    .toPromise();
  }
  
  addNewFraudCase (apiKey:string,apiSecret:string,applicationId:string,entry:object):Promise <any> {
    const keys = btoa(apiKey+":"+apiSecret);
    const options = {
      withCredentials: true,
      headers: {
        "authorization":keys
      }
    };
    return this.httpClient.post(`${this.MS_URL}/add`,entry, options)
    .toPromise();
  }

}

