import RedisClient from '../utils/redis.util';

export default class AppInializer {

    private redisClient: RedisClient;
    private redisInstance: any;

    constructor(server: any) {
        this.redisClient = new RedisClient();
    }

    public init() {
      
    }

    getRedis() {
       this.redisInstance = RedisClient.getNewInstance();
       return this.redisInstance._client;
    }
}