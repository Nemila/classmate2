import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTeacher, getTeachers } from "@/lib/actions/teachers";

const page = async () => {
  const students = await getTeachers();

  return (
    <main className="space-y-6">
      <p>Teachers</p>

      <div>
        <p>All Teachers</p>
        <div>{JSON.stringify(students, null, 2)}</div>
      </div>

      <div className="flex flex-col gap-4">
        <p>Create a new teacher</p>

        <form className="flex flex-col gap-4" action={createTeacher}>
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

          <Button type="submit">Create</Button>
        </form>
      </div>
    </main>
  );
};

export default page;
