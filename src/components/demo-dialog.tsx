import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { createCourse } from "@/lib/actions/courses";
import { getDepartments } from "@/lib/actions/departments";

export async function DialogDemo() {
  const departments = await getDepartments();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new course</DialogTitle>
          <DialogDescription>
            Add a new course to your course list here. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-6 py-4" action={createCourse}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Type here..." />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="code">Code</Label>
            <Input id="code" name="code" placeholder="Type here..." />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="credit">Credit</Label>
            <Input
              id="credit"
              name="credit"
              type="number"
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

          <Button type="submit">Save changes</Button>
        </form>
        {/* <DialogFooter>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
