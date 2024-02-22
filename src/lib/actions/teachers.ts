"use server";

import prisma from "@/lib/prisma";
import { createClerkUser, getMetadata } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function getTeachers() {
  try {
    const { schoolId } = getMetadata();

    const teachers = await prisma.teacher.findMany({
      where: { schoolId },
    });

    return teachers;
  } catch (error: any) {
    console.log(error?.message);
  }
}

export async function createTeacher(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });

  try {
    const validatedFields = schema.safeParse({
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });

    if (!validatedFields.success) {
      throw new Error("Incorrect fields");
    }

    const { data } = validatedFields;

    const { schoolId } = getMetadata();

    const clerkUser = await createClerkUser(
      data.email,
      data.username,
      data.password,
      data.firstName,
      data.lastName,
      schoolId,
      "teacher",
    );

    if (!clerkUser) throw new Error("Couldn't create the account try again");

    await prisma.teacher.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        clerkId: clerkUser.id,
        school: {
          connect: { id: schoolId },
        },
      },
    });

    revalidatePath("/teachers");
  } catch (error: any) {
    console.log(error?.message);
  }
}
