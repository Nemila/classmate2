import { Roles } from "@/types/globals";
import { auth, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createClerkUser = async (
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  schoolId: string,
  role: "admin" | "teacher" | "student",
) => {
  try {
    const clerkUser = await clerkClient.users.createUser({
      password,
      lastName,
      firstName,
      username,
      emailAddress: [email],
      skipPasswordChecks: true,
      publicMetadata: {
        schoolId: schoolId,
        role: role,
      },
    });

    return clerkUser;
  } catch (error: any) {
    console.log(error?.message);
  }
};

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();
  return sessionClaims?.metadata.role === role;
};

export const getMetadata = () => {
  const { sessionClaims, userId } = auth();
  return { ...sessionClaims?.metadata, userId };
};
