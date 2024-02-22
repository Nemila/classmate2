import FileCard from "@/components/file-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: { courseId: string };
};

const page = ({ params }: Props) => {
  return (
    <main className="space-y-8">
      <div>
        <Button>New Upload</Button>
      </div>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Syllabus
          </p>
          <Separator />
        </div>

        <div className="flex flex-col gap-4">
          <FileCard />
          <FileCard />
        </div>
      </section>

      <section className="space-y-2">
        <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Lectures Notes
        </p>
        <Separator />

        <div className="flex flex-col gap-4">
          <FileCard />
          <FileCard />
        </div>
      </section>

      <section className="space-y-2">
        <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Worksheets
        </p>
        <Separator />

        <div className="flex flex-col gap-4">
          <FileCard />
          <FileCard />
        </div>
      </section>
    </main>
  );
};

export default page;
