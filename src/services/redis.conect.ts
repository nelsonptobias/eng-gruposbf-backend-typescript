import { Redis } from "ioredis";

const clientRedis = new Redis('redis://default:9g62Q391HmfiNMJEwkS4pCzwsMYgpHlY@redis-18647.c308.sa-east-1-1.ec2.cloud.redislabs.com:18647');

export { clientRedis };