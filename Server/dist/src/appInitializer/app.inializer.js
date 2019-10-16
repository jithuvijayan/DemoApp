"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_util_1 = __importDefault(require("../utils/redis.util"));
var AppInializer = /** @class */ (function () {
    function AppInializer(server) {
        this.redisClient = new redis_util_1.default();
        this.initializeSocketService(server);
    }
    AppInializer.prototype.initializeSocketService = function (server) {
        var socket = require('../utils/socket.util')(server);
        global.socket = socket;
    };
    AppInializer.prototype.getRedis = function () {
        this.redisInstance = redis_util_1.default.getNewInstance();
        return this.redisInstance._client;
    };
    return AppInializer;
}());
exports.default = AppInializer;
//# sourceMappingURL=app.inializer.js.map