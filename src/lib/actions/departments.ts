"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getMetadata } from "../utils";

export const getDepartments = async () => {
  try {
    const { schoolId } = getMetadata();

    const departments = await prisma.department.findMany({
      where: {
        schoolId,
      },
    });

    return departments;
  } catch (error: any) {
    console.log(error?.message);
  }
};

export const createDepartment = async (formData: FormData) => {
  const schema = z.object({
    name: z.string(),
  });

  try {
    const validatedFields = schema.safeParse({ name: formData.get("name") });

    if (!validatedFields.success) {
      throw new Error("Incorrect fields");
    }

    const { data } = validatedFields;

    const { schoolId } = getMetadata();

    await prisma.department.create({
      data: {
        name: data.name,

        school: {
          connect: { id: schoolId },
        },
      },
    });

    revalidatePath("/departments");
  } catch (error: any) {
    console.log(error?.message);
  }
};
