import CourseCard from "@/components/course-card";
import { getStudentGroups, getTeacherGroups } from "@/lib/actions/courses";
import { checkRole, getMetadata } from "@/lib/utils";

const page = async () => {
  if (checkRole("student")) return <StudentComponent />;
  if (checkRole("teacher")) return <TeacherComponent />;
};

export default page;

const TeacherComponent = async () => {
  const { userId } = getMetadata();
  const groups = await getTeacherGroups(userId as string);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {groups?.map((item) => (
          <CourseCard key={item.id} course={item.course} />
        ))}
      </div>
    </div>
  );
};

const StudentComponent = async () => {
  const { userId } = getMetadata();
  const courses = await getStudentGroups(userId as string);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {courses?.map((item) => (
          <CourseCard key={item.id} course={item.course} />
        ))}
      </div>
    </div>
  );
};
