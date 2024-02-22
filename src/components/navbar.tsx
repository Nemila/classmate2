import { getMetadata } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  adminRoutes,
  guessRoutes,
  studentRoutes,
  teacherRoutes,
} from "@/lib/site-config";

const Navbar = () => {
  const metadata = getMetadata();

  const routesMap: {
    [key: string]: { name: string; href: string }[];
  } = {
    admin: [...adminRoutes],
    teacher: [...teacherRoutes],
    student: [...studentRoutes],
    guess: [...guessRoutes],
  };

  const routes = routesMap[metadata?.role ?? "guess"];

  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between py-6">
        <Link href="/" className="text-lg font-bold">
          Classmate
        </Link>

        <div>
          {routes.map((item) => (
            <Link href={item.href} key={item.name}>
              <Button variant={"link"}>{item.name}</Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
