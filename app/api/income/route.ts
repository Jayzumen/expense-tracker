import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/app-beta";
import { and, eq } from "drizzle-orm/expressions";
import { income } from "@/lib/schema";
import { db } from "@/lib/dbConn";
import { v4 as uuidv4 } from "uuid";
import { Income } from "@/types/finances";

export async function GET(req: Request) {
  const { userId } = auth();

  try {
    const data = await db
      .select()
      .from(income)
      .where(eq(income.user_id, userId as string));

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  const { userId } = auth();

  const { description, amount } = await req.json();

  const incomeData: Income = {
    id: uuidv4(),
    description: description,
    amount: amount,
    created_at: new Date().toString(),
    user_id: userId as string,
  };
  try {
    const data = await db.insert(income).values(incomeData);

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
      .delete(income)
      .where(and(eq(income.id, id), eq(income.user_id, userId as string)));
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "Deleted" });
}
