import express = require('express');
import bodyParser = require('body-parser');
import AuthenticationRouter from './router/authentication.router'
import SwaggerUI from './utils/swagger.util'
import AppConfig from '../config/appConfig'

class Server {
    public expressApp:any; 
    //public router = express.Router();
    public authenticationRouter: AuthenticationRouter;
    public swaggerUi: SwaggerUI;
    private appConfig: AppConfig;
    private apiVersion: any;
    constructor() {

        this.appConfig = new AppConfig();
        this.apiVersion = '/' + this.appConfig.getApiVersion();
        this.expressApp = express();
        this.authenticationRouter = new AuthenticationRouter();
        this.authenticationRouter.routes();

        this.swaggerUi = new SwaggerUI();
        this.swaggerUi.routes();
        this.config();
        this.routes();
    }


    public config(): void {
        // express middleware
        this.expressApp.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));
        this.expressApp.use(bodyParser.json({ limit: '50mb' }));

        this.expressApp.use((request: any, response: any, next: any) => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }


    public routes(): void {
        //console.log(this.version + '/auths')
        this.expressApp.use(this.apiVersion + '/api-docs', this.swaggerUi.router);
        this.expressApp.use(this.apiVersion + '/auth', this.authenticationRouter.router);
    }

}

export default new Server().expressApp;