const jwt = require('jsonwebtoken');
import AppConfig from '../../config/appConfig'
export default class AuthenticationService {

    public appconfig: AppConfig;
    constructor() {
        this.appconfig = new AppConfig();
    }

    generateToken(username: any, password: any) {
        const milliseconds = (new Date).getTime();
        const secretKey = this.appconfig.getAuthSecretToken();
        const options = { expiresIn: '1h' }
        const tokenPayload = { 'username': username, 'password': password, 'logintime': milliseconds };
        const token = jwt.sign(tokenPayload, secretKey, options);
        return token;
    }

    verifyToken(token: any) {
        const secretKey = this.appconfig.getAuthSecretToken();
        return jwt.verify(token, secretKey);
    }
}