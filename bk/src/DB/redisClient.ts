import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis successfully!");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
    }
})();

export default redisClient;
