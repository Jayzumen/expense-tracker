import { db } from "@/lib/dbConn";
import { expense } from "@/lib/schema";
import { auth } from "@clerk/nextjs/app-beta";
import { and, eq } from "drizzle-orm/expressions";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  const data = await db
    .select()
    .from(expense)
    .where(
      and(eq(expense.id, params.id), eq(expense.user_id, userId as string))
    );

  return NextResponse.json(data[0]);
}
