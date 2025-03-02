import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { id } = params; // ✅ Get ID correctly from route
    const { isdone } = await req.json(); // ✅ Extract `isdone` from request body

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { isdone: !isdone } // ✅ Toggle `isdone`
    });

    return new Response(JSON.stringify(updatedTodo), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update todo" }), { status: 500 });
  }
}
