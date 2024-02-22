"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getMetadata } from "../utils";

export async function getCourses() {
  try {
    const { schoolId } = getMetadata();

    const courses = await prisma.course.findMany({
      where: { schoolId },
    });

    return courses;
  } catch (error: any) {
    console.log(error?.message);
  }
}

export async function getStudentGroups(studentId: string) {
  try {
    const groups = await prisma.group.findMany({
      where: {
        students: { some: { clerkId: studentId } },
      },
      include: {
        course: { include: { department: true } },
      },
    });

    return groups;
  } catch (error: any) {
    console.log(error?.message);
  }
}

export async function getTeacherGroups(teacherId: string) {
  try {
    const groups = await prisma.group.findMany({
      where: {
        teacherId: teacherId,
      },
      include: {
        course: { include: { department: true } },
      },
    });

    return groups;
  } catch (error: any) {
    console.log(error?.message);
  }
}

export async function createCourse(formData: FormData) {
  const schema = z.object({
    name: z.string(),
    code: z.string(),
    credit: z.number(),
    departmentId: z.string(),
  });

  try {
    const validatedFields = schema.safeParse({
      name: formData.get("name"),
      code: formData.get("code"),
      credit: Number(formData.get("credit")),
      departmentId: formData.get("departmentId"),
    });

    if (!validatedFields.success) {
      throw new Error("Incorrect fields");
    }

    const { data } = validatedFields;

    const { schoolId } = getMetadata();

    await prisma.course.create({
      data: {
        code: data.code,
        credit: data.credit,
        name: data.name,
        department: {
          connect: { id: data.departmentId },
        },
        school: {
          connect: { id: schoolId },
        },
      },
    });

    revalidatePath("/courses");
  } catch (error: any) {
    console.log(error?.message);
  }
}

export async function updateCourse(formData: FormData, courseId: string) {
  const schema = z.object({
    name: z.string(),
    code: z.string(),
    credit: z.number(),
  });

  try {
    const validatedFields = schema.safeParse({
      name: formData.get("name"),
      code: formData.get("code"),
      credit: Number(formData.get("credit")),
    });

    if (!validatedFields.success) {
      throw new Error("Incorrect fields");
    }

    const { data } = validatedFields;

    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        name: data.name,
        code: data.code,
        credit: data.credit,
      },
    });

    revalidatePath("/courses");
  } catch (error: any) {
    console.log(error?.message);
  }
}
