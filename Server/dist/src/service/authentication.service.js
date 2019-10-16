"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var appConfig_1 = __importDefault(require("../../config/appConfig"));
var socket_service_1 = require("../service/socket.service");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService() {
        this.appconfig = new appConfig_1.default();
        this.socketservice = new socket_service_1.SocketService();
    }
    AuthenticationService.prototype.generateToken = function (username, password) {
        var milliseconds = (new Date).getTime();
        var secretKey = this.appconfig.getAuthSecretToken();
        var options = { expiresIn: '1h' };
        var tokenPayload = { 'username': username, 'password': password, 'logintime': milliseconds };
        var token = jwt.sign(tokenPayload, secretKey, options);
        this.socketservice.emitData(token);
        return token;
    };
    AuthenticationService.prototype.verifyToken = function (token) {
        var secretKey = this.appconfig.getAuthSecretToken();
        return jwt.verify(token, secretKey);
    };
    return AuthenticationService;
}());
exports.default = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map