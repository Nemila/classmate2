import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createDepartment, getDepartments } from "@/lib/actions/departments";

const page = async () => {
  const departments = await getDepartments();

  return (
    <main className="space-y-6">
      <p>Department</p>

      <div>
        <p>All Departments</p>
        <div>{JSON.stringify(departments, null, 2)}</div>
      </div>

      <div className="flex flex-col gap-4">
        <p>Create a new department</p>
        <form className="flex flex-col gap-4" action={createDepartment}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input name="name" placeholder="Type here" id="name" />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </div>
    </main>
  );
};

export default page;
