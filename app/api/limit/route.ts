import { currentUser } from "@clerk/nextjs/app-beta";
import { User } from "@clerk/nextjs/dist/api";
import prismadb from "../../../lib/prismadb";
import { Expense, Income } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user: User | null = await currentUser();

  const incomeData = await prismadb.income.findMany({
    where: {
      user_Id: user?.id,
    },
  });
  const limit: number = incomeData.reduce((acc: number, curr: Income) => {
    return acc + curr.amount;
  }, 0);

  const expenseData = await prismadb.expense.findMany({
    where: {
      user_Id: user?.id,
    },
  });
  const expense: number = expenseData.reduce((acc: number, curr: Expense) => {
    return acc + curr.amount;
  }, 0);

  const balance = limit - expense;

  return NextResponse.json(balance);
}
