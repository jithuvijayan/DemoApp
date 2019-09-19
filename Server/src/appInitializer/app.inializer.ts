import RedisClient from '../utils/redis.util';
export default class AppInializer {

    private redisClient: RedisClient;
    private redisInstance: any;

    constructor(server: any) {
        this.redisClient = new RedisClient();
        this.initializeSocketService(server);
    }

    public initializeSocketService(server: any) {
        const socket = require('../utils/socket.util')(server);
        (global as any).socket = socket;
    }

    getRedis() {
       this.redisInstance = RedisClient.getNewInstance();
       return this.redisInstance._client;
    }
}