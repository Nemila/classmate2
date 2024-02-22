import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Course } from "@prisma/client";
import { UpdateCourseDialog } from "./update-course-dialog";

type Props = {
  courses?: Course[];
};

export function TableDemo({ courses }: Props) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Credit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <TableRow key={course.code}>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.credit}</TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <UpdateCourseDialog course={course} />
                    <ConfirmDialog courseId={course.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No courses added yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
