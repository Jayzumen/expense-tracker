import { db } from "@/lib/dbConn";
import { currentUser } from "@clerk/nextjs/app-beta";
import { User } from "@clerk/nextjs/dist/api";
import { eq } from "drizzle-orm/expressions";
import { NextResponse } from "next/server";
import { Income, Expense } from "@/types/finances";
import { income, expense } from "@/lib/schema";

export async function GET(req: Request) {
  const user: User | null = await currentUser();

  const incomeData = await db
    .select()
    .from(income)
    .where(eq(income.user_id, user?.id as string));

  const incomeAmount: number = incomeData.reduce(
    (acc: number, curr: Income) => {
      return acc + curr.amount;
    },
    0
  );

  const expenseData = await db
    .select()
    .from(expense)
    .where(eq(expense.user_id, user?.id as string));

  const expenseAmount: number = expenseData.reduce(
    (acc: number, curr: Expense) => {
      return acc + curr.amount;
    },
    0
  );

  const balance = incomeAmount - expenseAmount;

  return NextResponse.json(balance);
}
