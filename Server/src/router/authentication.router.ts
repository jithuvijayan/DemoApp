import { Router } from 'express';
import AuthenticationService from '../service/authentication.service'
import AuthenticationController from '../controllers/authentication.controller'
export default class AuthenticationRouter {
    public router: Router;
    constructor() {
        this.router = Router();
    }
    public routes() {
        const authenticationcontroller = new AuthenticationController();
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
    }
}