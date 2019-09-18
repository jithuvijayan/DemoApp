
import { Request, Response } from 'express';
import AuthenticationService from '../service/authentication.service'
export default class AuthenticationController {
    private authenticationservices: AuthenticationService;
    constructor() {
        this.authenticationservices = new AuthenticationService();
    }

    login(req: Request, res: Response) {
        const username = req.body.username;
        const password = req.body.password;
        if (username === 'admin' && password === 'admin') {
            const token = this.authenticationservices.generateToken(username, password);
            return res.status(200).json({
                status: 'ok',
                token: token
            });

        } else {
            return res.status(401).json({
                status: 'Unauthorized',
                message: 'Invalid credentials'
            });
        }
    }

    verifyToken(req: Request, res: Response) {
        const token = req.body.token;
        const tokenStatus = this.authenticationservices.verifyToken(token);
        return res.status(401).json({
            status: 'ok',
            message: tokenStatus
        });
    }

}