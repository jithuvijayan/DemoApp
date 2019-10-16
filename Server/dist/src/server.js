"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var authentication_router_1 = __importDefault(require("./router/authentication.router"));
var swagger_util_1 = __importDefault(require("./utils/swagger.util"));
var appConfig_1 = __importDefault(require("../config/appConfig"));
var Server = /** @class */ (function () {
    function Server() {
        this.appConfig = new appConfig_1.default();
        this.apiVersion = '/' + this.appConfig.getApiVersion();
        this.expressApp = express();
        this.authenticationRouter = new authentication_router_1.default();
        this.authenticationRouter.routes();
        this.swaggerUi = new swagger_util_1.default();
        this.swaggerUi.routes();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        // express middleware
        this.expressApp.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));
        this.expressApp.use(bodyParser.json({ limit: '50mb' }));
        this.expressApp.use(function (request, response, next) {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    };
    Server.prototype.routes = function () {
        //console.log(this.version + '/auths')
        this.expressApp.use(this.apiVersion + '/api-docs', this.swaggerUi.router);
        this.expressApp.use(this.apiVersion + '/auth', this.authenticationRouter.router);
    };
    return Server;
}());
exports.default = new Server().expressApp;
//# sourceMappingURL=server.js.map