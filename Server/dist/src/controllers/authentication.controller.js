"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_service_1 = __importDefault(require("../service/authentication.service"));
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
        this.authenticationservices = new authentication_service_1.default();
    }
    AuthenticationController.prototype.login = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if (username === 'admin' && password === 'admin') {
            var token = this.authenticationservices.generateToken(username, password);
            return res.status(200).json({
                status: 'ok',
                token: token
            });
        }
        else {
            return res.status(401).json({
                status: 'Unauthorized',
                message: 'Invalid credentials'
            });
        }
    };
    AuthenticationController.prototype.verifyToken = function (req, res) {
        var token = req.body.token;
        var tokenStatus = this.authenticationservices.verifyToken(token);
        return res.status(401).json({
            status: 'ok',
            message: tokenStatus
        });
    };
    return AuthenticationController;
}());
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map