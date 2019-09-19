import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/services/base-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'url';
@Injectable()
export class AuthenticationService extends BaseApiService {
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    authenticateUser(username: any, password: any) {
        return new Promise((settle, reject) => {
            const payLoad = `{
                "username" : "${password}",
                "password" : "${password}"
              }`;
            super.postData('/api/v1.1/auth/login', payLoad,
                res => {
                    if (res.status === 'ok') {
                        settle(res.token);
                    }
                },
                err => {
                    reject('Unauthorised user');
                });
        });
    }
}
