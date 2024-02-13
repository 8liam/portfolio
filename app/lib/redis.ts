import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://apn1-sterling-cow-33505.upstash.io",
  token: process.env.REDIS_KEY!,
});
