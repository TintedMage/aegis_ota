"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

type DropzoneProps = {
  onFile?: (file: File | null) => void;
};

export function Dropzone({ onFile }: DropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file =
        acceptedFiles && acceptedFiles.length > 0 ? acceptedFiles[0] : null;
      setSelectedFile(file);
      onFile?.(file);
    },
    [onFile],
  );

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFile?.(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  const acceptConfig = { "application/octet-stream": [".bin"] };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptConfig,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="w-full cursor-pointer">
      <input {...getInputProps()} />

      <div
        className={cn(
          "relative p-3  w-full h-70  rounded-md border-2 border-dashed text-center transition-colors" +
            (isDragActive
              ? "border-amber-400"
              : "border-neutral-700 bg-transparent"),
        )}
      >
        {" "}
        <div
          className={cn(
            "flex flex-col w-full h-full items-center justify-center p-3",
            selectedFile ? " bg-neutral-800/60 rounded-md" : " ",
          )}
        >
          <CloudUpload className="h-8 w-8 text-amber-500/90 mb-5" />

          <div>
            <p className="font-medium">
              {selectedFile === null
                ? "Drop file here or click to browse"
                : `${selectedFile.name} `}
            </p>
            <p className="text-xs text-neutral-400 pt-2 font-heading">
              {selectedFile === null
                ? ".bin files only"
                : `${formatFileSize(selectedFile.size)}`}
            </p>

            {selectedFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="absolute top-5 right-5 shrink-0 p-0.5 rounded-md hover:bg-red-500/20 transition-colors"
                title="Remove file"
              >
                <X className="h-5 w-5 text-red-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropzone;
