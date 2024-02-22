import { DialogDemo } from "@/components/demo-dialog";
import { TableDemo } from "@/components/demo-table";
import { getCourses } from "@/lib/actions/courses";
import React from "react";

const page = async () => {
  const courses = await getCourses();

  return (
    <main className="space-y-6">
      <DialogDemo />
      <TableDemo courses={courses} />
    </main>
  );
};

export default page;
