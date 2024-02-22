import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { createStudent, getStudents } from "@/lib/actions/students";
import { getDepartments } from "@/lib/actions/departments";
import { Button } from "@/components/ui/button";
import {
  addStudentToGroup,
  createGroup,
  getGroups,
} from "@/lib/actions/groups";
import { getCourses } from "@/lib/actions/courses";
import { getTeachers } from "@/lib/actions/teachers";

const page = async () => {
  const students = await getStudents();
  const groups = await getGroups();
  const departments = await getDepartments();
  const courses = await getCourses();
  const teachers = await getTeachers();

  return (
    <main className="space-y-6">
      <p>Students</p>

      <div>
        <p>All Students</p>
        <div>{JSON.stringify(students, null, 2)}</div>
      </div>

      <div>
        <p>All Groups</p>
        <div>{JSON.stringify(groups, null, 2)}</div>
      </div>

      <div className="flex flex-col gap-4">
        <p>Create a new student</p>

        <form className="flex flex-col gap-4" action={createStudent}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Type here..."
              id="email"
              required={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              type="text"
              placeholder="Type here..."
              id="username"
              required={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              required={true}
              placeholder="Type here..."
              name="password"
              id="password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              required={true}
              placeholder="Type here..."
              name="firstName"
              id="firstName"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required={true}
              placeholder="Type here..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="department">Department</Label>
            <Select name="departmentId">
              <SelectTrigger id="department">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Create</Button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <p>Create a group</p>

        <form className="flex flex-col gap-4" action={createGroup}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="course">Course</Label>
            <Select name="courseId">
              <SelectTrigger id="course">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {courses?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Select name="teacherId">
              <SelectTrigger id="teacher">
                <SelectValue placeholder="Teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers?.map((item) => (
                  <SelectItem key={item.clerkId} value={item.clerkId}>
                    {item.firstName} {item.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Create</Button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <p>Add student to group</p>

        <form className="flex flex-col gap-4" action={addStudentToGroup}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              name="studentId"
              type="text"
              placeholder="Type here..."
              id="studentId"
              required={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="group">Group</Label>
            <Select name="groupId">
              <SelectTrigger id="group">
                <SelectValue placeholder="Group" />
              </SelectTrigger>
              <SelectContent>
                {groups?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    GR{item.number} | {item.course.name} |{" "}
                    {item.teacher.firstName} {item.teacher.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Create</Button>
        </form>
      </div>
    </main>
  );
};

export default page;
