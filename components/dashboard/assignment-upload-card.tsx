"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";

export function AssignmentUploadCard({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const router = useRouter();

  return (
    <div className="mt-4 rounded-2xl border border-border bg-background/70 p-4">
      <UploadDropzone
        endpoint="assignmentSubmission"
        input={{ assignmentId }}
        onClientUploadComplete={() => {
          toast.success("Assignment uploaded successfully.");
          router.refresh();
        }}
        onUploadError={(error) => {
          toast.error(error.message);
        }}
        appearance={{
          container: "border-none bg-transparent p-0",
          uploadIcon: "text-primary",
          label: "text-sm font-bold text-foreground",
          allowedContent: "text-xs text-muted",
          button:
            "rounded-full bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90",
        }}
      />
    </div>
  );
}
