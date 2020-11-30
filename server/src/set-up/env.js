import { config } from "dotenv";
config();
export const JWT_KEY = process.env.JWT_KEY
//export const DATABASE_TEST = process.env.DATABASE_TEST
//export const DATABASE_URL = process.env.DATABASE_URL
//export const NODE_ENV = process.env.NODE_ENV
export const DATABASE_URL =
  process.env.NODE_ENV !== "test"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_TEST;