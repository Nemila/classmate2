import { File } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const FileCard = (props: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-md border p-4">
      <Link
        href="/"
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-secondary"
      >
        <File className="h-6 w-6" />
      </Link>

      <div className="flex flex-col gap-1">
        <Link
          className="text-xl font-semibold text-primary hover:underline"
          href="/"
        >
          Title of the file
        </Link>

        <p className="flex gap-3 text-sm text-muted-foreground">
          <p>Upload date: 12/02/2005</p>
          <p>Due date: 12/02/2005</p>
        </p>
      </div>
    </div>
  );
};

export default FileCard;
