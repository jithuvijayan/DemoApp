"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authentication_controller_1 = __importDefault(require("../controllers/authentication.controller"));
var AuthenticationRouter = /** @class */ (function () {
    function AuthenticationRouter() {
        this.router = express_1.Router();
    }
    AuthenticationRouter.prototype.routes = function () {
        var authenticationcontroller = new authentication_controller_1.default();
        /**
        * @swagger
        * /auth/login:
        *   post:
        *     description: login
        *     tags:
        *       - Authentication
        *     parameters:
        *       - in: body
        *         name: authentication
        *         description: The user to authenticate.
        *         schema:
        *           type: object
        *           required:
        *              - username
        *              - password
        *           properties:
        *              username:
        *                  type: string
        *              password:
        *                  type: string
        *     responses:
        *       200:
        *         description: user authenticated successfully
        *         content:
        *              application/json:
        *                  schema:
        *                      type: object
        *                      properties:
        *                          token:
        *                              type: string
        *     examples:
        *       content:
        */
        this.router.post('/login', function (req, res) {
            authenticationcontroller.login(req, res);
        });
        this.router.post('/verifyToken', function (req, res) {
            authenticationcontroller.verifyToken(req, res);
        });
    };
    return AuthenticationRouter;
}());
exports.default = AuthenticationRouter;
//# sourceMappingURL=authentication.router.js.map