import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCourse } from "@/lib/actions/courses";
import prisma from "@/lib/prisma";
import { Course } from "@prisma/client";
import { PenSquare } from "lucide-react";

type Props = {
  course: Course;
};

export function UpdateCourseDialog({ course }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <PenSquare className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update course</DialogTitle>
          <DialogDescription>
            Yodate a course here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-6 py-4"
          action={async (formData) => {
            "use server";
            updateCourse(formData, course.id);
          }}
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={course.name}
              placeholder="Type here..."
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              name="code"
              defaultValue={course.code}
              placeholder="Type here..."
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="credit">Credit</Label>
            <Input
              id="credit"
              name="credit"
              type="number"
              defaultValue={course.credit}
              placeholder="Type here..."
            />
          </div>

          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
