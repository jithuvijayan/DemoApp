import debug = require('debug');
import http = require('http');
import expressApp from './server';
import AppInializer from './appInitializer/app.inializer'

const app_port = process.env.APP_PORT || 4000;
let server: any = {};

// Initializing dependencies
debug('ts-express:server');

server = http.createServer(expressApp);
server.listen(app_port, function (req: any, res: any) {
    const addressInfo = server.address();
    console.log('Server listening on port: ' + addressInfo["port"]);
    const appInit = new AppInializer(server);
});

server.on('error', function(error: NodeJS.ErrnoException){
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof app_port === 'string') ? 'Pipe ' + app_port : 'Port ' + app_port;
    switch (error.code) {
        case 'EACCES':
            console.log(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

function onListening(): void {
    // const addr = server.address();
    // const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    // debug(`Listening on ${bind}`);
}