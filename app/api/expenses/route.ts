import { db } from "@/lib/dbConn";
import { expense } from "@/lib/schema";
import { Expense } from "@/types/finances";
import { auth } from "@clerk/nextjs/app-beta";
import { and, eq } from "drizzle-orm/expressions";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  const { userId } = auth();
  try {
    const data = await db
      .select()
      .from(expense)
      .where(eq(expense.user_id, userId as string));

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: Request) {
  const { userId } = auth();
  const { name, amount, color } = await req.json();

  const expenseData: Expense = {
    id: uuidv4(),
    name: name,
    amount: amount,
    color: color,
    created_at: new Date().toString(),
    user_id: userId as string,
  };
  try {
    const data = await db.insert(expense).values(expenseData);

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req: Request) {
  const { userId } = auth();
  const { id } = await req.json();
  try {
    await db
      .delete(expense)
      .where(and(eq(expense.id, id), eq(expense.user_id, userId as string)));

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
  }
}
