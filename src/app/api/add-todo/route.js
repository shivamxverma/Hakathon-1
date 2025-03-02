import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    const newTodo = await prisma.todo.create({
      data: { title, description, isdone: false }
    });

    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Todo creation failed" }), { status: 500 });
  }
}
