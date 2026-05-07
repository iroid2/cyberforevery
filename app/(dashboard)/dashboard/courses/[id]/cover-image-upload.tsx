"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing";
import { ImageIcon, Loader2 } from "lucide-react";

interface Props {
  courseId: string;
  currentImage?: string | null;
}

export function CoverImageUpload({ courseId, currentImage }: Props) {
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      {/* Preview */}
      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 h-36">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Course cover"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-36 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs font-medium">No cover image</span>
          </div>
        </div>
      )}

      {/* Upload button */}
      <div className="relative">
        {uploading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
          </div>
        )}
        <UploadButton
          endpoint="courseImageUpload"
          input={{ courseId }}
          onUploadBegin={() => setUploading(true)}
          onClientUploadComplete={(res) => {
            setUploading(false);
            if (res?.[0]) {
              setPreview((res[0] as { url?: string; fileUrl?: string }).url ?? (res[0] as { url?: string; serverData?: { fileUrl: string } }).serverData?.fileUrl ?? preview);
            }
            router.refresh();
          }}
          onUploadError={() => setUploading(false)}
          appearance={{
            button:
              "w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ut-uploading:opacity-60",
            allowedContent: "hidden",
          }}
        />
      </div>
    </div>
  );
}
