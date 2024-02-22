import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const school = await prisma.school.create({
    data: {
      name: "Cyprus International University",
    },
  });

  const department = await prisma.department.create({
    data: {
      name: "Computer Engineering",
      school: { connect: { id: school.id } },
    },
  });

  await prisma.admin.createMany({
    data: [
      {
        clerkId: "user_2cYdKWX7J2RVvVqEy5bboSO8FSv",
        email: "pridila.2006@gmail.com",
        firstName: "Lamine",
        lastName: "Diamoutene",
        schoolId: school.id,
      },
    ],
  });

  await prisma.course.createMany({
    data: [
      {
        code: "CMPE101",
        credit: 3,
        name: "INTRODUCTION TO COMPUTING",
        schoolId: school.id,
        departmentId: department.id,
      },
      {
        code: "CMPE100",
        credit: 0,
        name: "INTRODUCTION TO COMPUTER ENGINEERING",
        schoolId: school.id,
        departmentId: department.id,
      },
      {
        code: "CHEM110",
        credit: 4,
        name: "GENERAL CHEMISTRY",
        schoolId: school.id,
        departmentId: department.id,
      },
      {
        code: "MATH101",
        credit: 4,
        name: "CALCULUS-I",
        schoolId: school.id,
        departmentId: department.id,
      },
      {
        code: "MATH121",
        credit: 2,
        name: "LINEAR ALGEBRA",
        schoolId: school.id,
        departmentId: department.id,
      },
      {
        code: "ENGL141",
        credit: 3,
        name: "READING AND WRITING SKILLS-I",
        schoolId: school.id,
        departmentId: department.id,
      },
      {
        code: "HIST100",
        credit: 0,
        name: "HISTORY OF CIVILIZATION",
        schoolId: school.id,
        departmentId: department.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
