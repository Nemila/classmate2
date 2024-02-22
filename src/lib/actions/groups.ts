"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getMetadata } from "../utils";

export async function getGroups() {
  try {
    const { schoolId } = getMetadata();

    const groups = await prisma.group.findMany({
      where: { schoolId },
      include: { course: true, teacher: true, students: true },
    });

    return groups;
  } catch (error: any) {
    console.log(error?.message);
  }
}

export async function createGroup(formData: FormData) {
  const schema = z.object({
    teacherId: z.string(),
    courseId: z.string(),
  });

  try {
    const validatedFields = schema.safeParse({
      teacherId: formData.get("teacherId"),
      courseId: formData.get("courseId"),
    });

    if (!validatedFields.success) {
      throw new Error("Incorrect fields");
    }

    const { data } = validatedFields;

    const { schoolId } = getMetadata();

    await prisma.group.create({
      data: {
        course: {
          connect: { id: data.courseId },
        },
        teacher: {
          connect: { clerkId: data.teacherId },
        },
        school: {
          connect: { id: schoolId },
        },
      },
    });

    revalidatePath("/students");
  } catch (error: any) {
    console.log(error?.message);
  }
}

export async function addStudentToGroup(formData: FormData) {
  const schema = z.object({
    studentId: z.string(),
    groupId: z.string(),
  });

  try {
    const validatedFields = schema.safeParse({
      studentId: formData.get("studentId"),
      groupId: formData.get("groupId"),
    });

    if (!validatedFields.success) {
      throw new Error("Incorrect fields");
    }

    const { data } = validatedFields;

    await prisma.student.update({
      where: {
        clerkId: data.studentId,
      },
      data: {
        groups: {
          connect: { id: data.groupId },
        },
      },
    });

    revalidatePath("/students");
  } catch (error: any) {
    console.log(error?.message);
  }
}
