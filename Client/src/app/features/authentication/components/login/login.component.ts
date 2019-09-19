import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SocketService } from '../../../../shared/services/socket.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: any = 'admin';
  public password: any = 'admin';
  public token: any;
  constructor(
    private authenticationservice: AuthenticationService,
    private socketservice: SocketService) {
    this.getSocketData();
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.authenticationservice.authenticateUser(this.username, this.password).then((result) => {
      // this.token = result;
    }).catch((err) => {
      this.token = err;
    });
  }

  getSocketData() {
    this.socketservice.onConnection('token').subscribe(
      data => {
        this.token = data;
      });
  }

}
