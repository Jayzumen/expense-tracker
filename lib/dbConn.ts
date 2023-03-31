import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { expense, income } from "./schema";

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);

export const getIncomes = async () => {
  const data = await db.select().from(income).execute();
  return data;
};

export const getExpenses = async () => {
  const data = await db.select().from(expense).execute();
  return data;
};
