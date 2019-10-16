"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var http = require("http");
var server_1 = __importDefault(require("./server"));
var app_inializer_1 = __importDefault(require("./appInitializer/app.inializer"));
var app_port = process.env.APP_PORT || 4000;
var server = {};
// Initializing dependencies
debug('ts-express:server');
server = http.createServer(server_1.default);
server.listen(app_port, function (req, res) {
    var addressInfo = server.address();
    console.log('Server listening on port: ' + addressInfo["port"]);
    var appInit = new app_inializer_1.default(server);
});
server.on('error', function (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = (typeof app_port === 'string') ? 'Pipe ' + app_port : 'Port ' + app_port;
    switch (error.code) {
        case 'EACCES':
            console.log(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
});
function onListening() {
    // const addr = server.address();
    // const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    // debug(`Listening on ${bind}`);
}
//# sourceMappingURL=main.js.map