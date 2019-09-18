import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'q';
export abstract class BaseApiService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    constructor(
        protected httpClient: HttpClient
    ) {
    }

    getData(resource: any, ) {
        return this.httpClient.get(resource);
    }

    postData(resource: any, reqBody: any, callbackSuccess, callbackError) {
        this.httpClient.post(resource, reqBody, { headers: this.headers, responseType: 'json'}).subscribe(callbackSuccess, callbackError);
    }
}
