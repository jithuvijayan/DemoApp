const jwt = require('jsonwebtoken');
import AppConfig from '../../config/appConfig';
import { SocketService } from '../service/socket.service';
export default class AuthenticationService {

    public appconfig: AppConfig;
    private socketservice: SocketService;
    constructor() {
        this.appconfig = new AppConfig();
        this.socketservice = new SocketService();
    }

    generateToken(username: any, password: any) {
        const milliseconds = (new Date).getTime();
        const secretKey = this.appconfig.getAuthSecretToken();
        const options = { expiresIn: '1h' }
        const tokenPayload = { 'username': username, 'password': password, 'logintime': milliseconds };
        const token = jwt.sign(tokenPayload, secretKey, options);
        this.socketservice.emitData(token)
        return token;
    }

    verifyToken(token: any) {
        const secretKey = this.appconfig.getAuthSecretToken();
        return jwt.verify(token, secretKey);
    }
}