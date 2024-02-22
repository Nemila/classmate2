import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type Props = {
  course: Prisma.CourseGetPayload<{ include: { department: true } }>;
};

const CourseCard = ({ course }: Props) => {
  return (
    <Link href={`/student/courses/${course.id}`}>
      <Card className="flex h-full flex-col justify-between">
        <CardHeader>
          <CardTitle className="line-clamp-2">{course.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.department.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{course.code}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
