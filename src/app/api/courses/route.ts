import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const courseId = await req.json();
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
  } catch (error: any) {
    console.log(error?.message);
  }
}
