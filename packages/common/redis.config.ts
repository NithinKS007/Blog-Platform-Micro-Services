import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

export class RedisService {
  private client: RedisClientType;

  constructor(config: RedisConfig) {
    this.client = createClient({
      url: `redis://${config.host}:${config.port}`,
      password: config.password,
      database: config.db ?? 0,
      socket: {
        reconnectStrategy: (retries: number) => Math.min(retries * 50, 1000),
      },
    });

    this.client.on('error', (err: Error) => console.error('❌ Redis client error:', err));
    this.client.on('end', () => console.log('🔴 Redis connection ended'));
  }

  // Connect to Redis
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('🔴 Connected to Redis');
    } catch (error) {
      console.error('❌ Failed to connect to Redis:', error);
      throw error;
    }
  }

  // Graceful shutdown
  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      console.log('🔴 Redis connection closed');
    } catch (error) {
      console.error('❌ Error closing Redis connection:', error);
    }
  }

  // Test connection
  async ping(): Promise<string> {
    return this.client.ping();
  }

  // Utility methods
  async set(key: string, value: string, expireInSeconds?: number): Promise<void> {
    if (expireInSeconds) {
      await this.client.setEx(key, expireInSeconds, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return Boolean(result);
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    const result = await this.client.expire(key, seconds);
    return Boolean(result);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }
}

export const redisService = new RedisService({
  host: process.env.REDIS_HOST!,
  port: parseInt(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
});
