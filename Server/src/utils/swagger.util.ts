import { Request, Response, Router } from 'express';
// Swagger-JSDoc
import swaggerUi = require( 'swagger-ui-express' );
import swaggerJSDoc = require( 'swagger-jsdoc' );
import AppConfig from '../../config/appConfig'
export default class SwaggerUI {

  public router: Router;
  private options: any;
  private swaggerSpec: any;
  private appConfig: AppConfig;
  private apiVersion: any;
  private appPort: any;
  constructor() {
    // use publish host name if it was specified   
    this.router = Router();
    this.appConfig = new AppConfig();
    this.apiVersion = this.appConfig.getApiVersion();
    this.appPort = this.appConfig.getAppPortAddr();
    this.options = {
      swaggerDefinition:
      {
        swagger: '2.0',
        info: {
          title: 'DEMO API Explorer',
          version: this.apiVersion,
          contact: {
            name: '',
            url: ''
          }
        },
        host: ":" + this.appPort,
        basePath: "/" + this.apiVersion
      },
      apis: ['./src/router/*.ts'],
      schemes: "http"
    }
    this.swaggerSpec = swaggerJSDoc( this.options );
  }

  public routes() {
    var showExplorer = undefined;
    var options = {
      swaggerOptions: {
        //authAction: { JWT: { name: "JWT", schema: { type: "apiKey", in: "header", name: "Authorization", description: "" }, value: "Bearer <JWT>" } }
        authAction: { name: "Authorization", value: "Bearer <JWT>" }
      }
    };
    this.router.use( '/', swaggerUi.serve, swaggerUi.setup( this.swaggerSpec, showExplorer, options ) );
  }
}
