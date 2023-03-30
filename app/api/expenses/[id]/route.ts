import { auth } from "@clerk/nextjs/app-beta";
import prismadb from "../../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  const data = await prismadb.expense.findMany({
    where: {
      id: params.id,
      user_Id: userId!,
    },
  });
  return NextResponse.json(data[0]);
}
