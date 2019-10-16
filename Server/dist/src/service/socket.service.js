"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketService = /** @class */ (function () {
    function SocketService() {
    }
    SocketService.prototype.emitData = function (data) {
        this.socket = global.socket;
        this.socket.emit('token', data);
    };
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map