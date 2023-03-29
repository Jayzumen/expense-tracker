import { auth } from "@clerk/nextjs/app-beta";
import prismadb from "../../../lib/prismadb";

export async function GET(req: Request) {
  const { userId } = auth();
  try {
    const data = await prismadb.expense.findMany({
      where: {
        user_Id: userId as string,
      },
    });

    return new Response(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: Request) {
  const { userId } = auth();
  const { name, amount, color } = await req.json();
  try {
    const data = await prismadb.expense.create({
      data: {
        name: name,
        amount: amount,
        color: color,
        user_Id: userId as string,
      },
    });

    return new Response(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req: Request) {
  const { userId } = auth();
  const { id } = await req.json();
  try {
    await prismadb.expense.deleteMany({
      where: {
        id: id,
        user_Id: userId as string,
      },
    });

    return new Response(JSON.stringify("Deleted"));
  } catch (err) {
    console.log(err);
  }
}
