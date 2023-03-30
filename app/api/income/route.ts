import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import { auth } from "@clerk/nextjs/app-beta";

export async function GET(req: Request) {
  const { userId } = auth();

  try {
    const data = await prismadb.income.findMany({
      where: {
        user_Id: userId as string,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  const { userId } = auth();

  const { description, amount } = await req.json();
  try {
    const data = await prismadb.income.create({
      data: {
        description: description,
        amount: amount,
        user_Id: userId as string,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req: Request) {
  const { userId } = auth();

  const { id } = await req.json();
  try {
    await prismadb.income.deleteMany({
      where: {
        id: id,
        user_Id: userId as string,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "Deleted" });
}
