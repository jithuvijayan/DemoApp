"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis");
var RedisClient = /** @class */ (function () {
    function RedisClient() {
        this._client = {};
        this._client = redis.createClient('6379', '127.0.0.1');
    }
    Object.defineProperty(RedisClient.prototype, "client", {
        /**
         * Method to return the redis client object
         */
        get: function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Static method to return the existing redis client class instance
     */
    RedisClient.getCurrentInstance = function () {
        return this.instance || (this.instance = new this());
    };
    /**
     * Static method to return new redis client class instance
     */
    RedisClient.getNewInstance = function () {
        return new this();
    };
    return RedisClient;
}());
exports.default = RedisClient;
//# sourceMappingURL=redis.util.js.map