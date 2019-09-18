const redis = require("redis");
export default class RedisClient {
    private _client: any = {};
    private static instance: RedisClient;
    constructor() {
        this._client = redis.createClient('6379', '127.0.0.1');
    }

    
    /**
     * Method to return the redis client object
     */
    public get client() {
        return this._client;
    }

    /**
     * Static method to return the existing redis client class instance
     */
    public static getCurrentInstance(): RedisClient {
        return this.instance || (this.instance = new this());
    }

    /**
     * Static method to return new redis client class instance
     */
    public static getNewInstance(): RedisClient {
        return new this();
    }
}