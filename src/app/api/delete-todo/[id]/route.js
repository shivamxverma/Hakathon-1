import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const { id } = params; // ✅ Correct param access

    await prisma.todo.delete({
      where: { id: parseInt(id) }
    });

    return new Response(JSON.stringify({ msg: "Todo deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete todo" }), { status: 500 });
  }
}
