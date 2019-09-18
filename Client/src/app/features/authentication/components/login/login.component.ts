
import { BaseApiService } from '../../../../shared/services/base-api.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseApiService implements OnInit {

  public username: any = 'admin';
  public password: any = 'admin';
  public token: any;
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  ngOnInit() {
  }

  onSubmit(form) {
    const payLoad = `{
      "username" : "${this.username}",
      "password" : "${this.password}"
    }`;
    super.postData('/api/v1.1/auth/login', payLoad,
      res => {
        if (res.status === 'ok') {
          this.token = res.token;
        }
      },
      err => {
        this.token = 'Unauthorised user';
      });
  }

}
