"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Swagger-JSDoc
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
var appConfig_1 = __importDefault(require("../../config/appConfig"));
var SwaggerUI = /** @class */ (function () {
    function SwaggerUI() {
        // use publish host name if it was specified   
        this.router = express_1.Router();
        this.appConfig = new appConfig_1.default();
        this.apiVersion = this.appConfig.getApiVersion();
        this.appPort = this.appConfig.getAppPortAddr();
        this.options = {
            swaggerDefinition: {
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
        };
        this.swaggerSpec = swaggerJSDoc(this.options);
    }
    SwaggerUI.prototype.routes = function () {
        var showExplorer = undefined;
        var options = {
            swaggerOptions: {
                //authAction: { JWT: { name: "JWT", schema: { type: "apiKey", in: "header", name: "Authorization", description: "" }, value: "Bearer <JWT>" } }
                authAction: { name: "Authorization", value: "Bearer <JWT>" }
            }
        };
        this.router.use('/', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec, showExplorer, options));
    };
    return SwaggerUI;
}());
exports.default = SwaggerUI;
//# sourceMappingURL=swagger.util.js.map