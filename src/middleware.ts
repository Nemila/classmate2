import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const routesMap: { [key: string]: string[] } = {
  admin: [
    "/admin/dashboard",
    "/admin/courses",
    "/admin/students",
    "/admin/teachers",
    "/admin/departments",
  ],
  teacher: ["/teacher/dashboard", "/teacher/courses"],
  student: ["/student/dashboard", "/student/courses"],
};

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/my-guy"],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.isPublicRoute) {
      const { role } = auth.sessionClaims.metadata;

      const adminRegex = /^\/admin(?:\/|$)/;
      const teacherRegex = /^\/teacher(?:\/|$)/;
      const studentRegex = /^\/student(?:\/|$)/;

      if (role === "admin" && !adminRegex.test(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (role === "teacher" && !teacherRegex.test(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (role === "student" && !studentRegex.test(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // if (!routesMap[role].includes(req.nextUrl.pathname)) {
      //   return NextResponse.redirect(new URL("/", req.url));
      // }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
