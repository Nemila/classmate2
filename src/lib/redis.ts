import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_DABASE_URL!);
export default redis;
