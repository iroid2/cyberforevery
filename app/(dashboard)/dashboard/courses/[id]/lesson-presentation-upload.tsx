"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing";
import { updateLessonPresentation, removeLessonPresentation } from "@/app/actions/courses";
import { FileText, Upload, X, Loader2 } from "lucide-react";

interface Props {
  lessonId: string;
  courseId: string;
  currentUrl?: string | null;
  currentName?: string | null;
}

export function LessonPresentationUpload({
  lessonId,
  courseId,
  currentUrl,
  currentName,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [removing, startRemove] = useTransition();
  const router = useRouter();

  const hasPresentation = !!currentUrl;

  return (
    <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        Presentation / Slides
      </p>

      {hasPresentation ? (
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
            <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="truncate text-sm font-medium text-slate-700">
              {currentName ?? "Presentation uploaded"}
            </span>
          </div>
          <button
            onClick={() =>
              startRemove(async () => {
                await removeLessonPresentation(lessonId, courseId);
                router.refresh();
              })
            }
            disabled={removing}
            title="Remove presentation"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            {removing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : (
        <div className="relative">
          {uploading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/80">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
            </div>
          )}
          <UploadButton
            endpoint="presentationUpload"
            input={{ lessonId, courseId }}
            onUploadBegin={() => setUploading(true)}
            onClientUploadComplete={async (res) => {
              setUploading(false);
              const file = res?.[0];
              if (!file) return;
              const serverData = (file as { serverData?: { fileUrl: string; fileKey: string; fileName: string; fileType: string; fileSize: number } }).serverData;
              await updateLessonPresentation(lessonId, courseId, {
                url: serverData?.fileUrl ?? (file as { url?: string }).url ?? "",
                key: serverData?.fileKey ?? (file as { key?: string }).key ?? "",
                name: serverData?.fileName ?? file.name ?? "",
                type: serverData?.fileType ?? file.type ?? "",
                size: serverData?.fileSize ?? (file as { size?: number }).size ?? 0,
              });
              router.refresh();
            }}
            onUploadError={() => setUploading(false)}
            appearance={{
              button:
                "w-full flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 ut-uploading:opacity-60",
              allowedContent: "hidden",
            }}
            content={{
              button: (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload PDF / Slides
                </span>
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}
