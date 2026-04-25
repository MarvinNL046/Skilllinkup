"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_FILES = 8;
const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export default function ServiceGallery() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const isDup = (file, list) => list.some((f) => f.name === file.name);

    const accepted = [];
    for (const file of newFiles) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: unsupported file type`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(`${file.name}: exceeds ${MAX_FILE_SIZE_MB}MB limit`);
        continue;
      }
      if (isDup(file, uploadedFiles) || isDup(file, accepted)) continue;
      accepted.push(file);
    }

    if (uploadedFiles.length + accepted.length > MAX_FILES) {
      const remaining = Math.max(0, MAX_FILES - uploadedFiles.length);
      toast.error(`Maximum ${MAX_FILES} images. Skipped ${accepted.length - remaining}.`);
      accepted.length = remaining;
    }

    if (accepted.length > 0) {
      setUploadedFiles((prev) => [...prev, ...accepted]);
    }
    // Reset input so re-selecting the same file works
    event.target.value = "";
  };

  // delete handler
  const handleFileDelete = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName),
    );
  };
  return (
    <>
      <div className="ps-widget bgc-white bdrs12 p30 mb30 overflow-hidden relative">
        <div className="bdrb1 pb15 mb30">
          <h5 className="list-title">Gallery</h5>
        </div>
        <div className="col-xl-9">
          <div className="flex mb30 flex-wrap gap-3">
            {uploadedFiles.map((item, i) => (
              <div
                key={i}
                className="gallery-item bdrs4 overflow-hidden relative"
              >
                <Image
                  height={119}
                  width={136}
                  className="object-fit-cover"
                  src={URL.createObjectURL(item)}
                  style={{ height: "166px", width: " 190px" }}
                  alt="gallery"
                />
                <div className="del-edit">
                  <div className="flex justify-center">
                    <a className="icon me-2">
                      <span className="flaticon-pencil" />
                    </a>
                    <a
                      className="icon"
                      onClick={() => handleFileDelete(item.name)}
                    >
                      <span className="flaticon-delete" />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="gallery-item bdrs4 overflow-hidden">
              <label>
                <a>
                  <Image
                    height={119}
                    width={136}
                    className="w-full h-auto"
                    src="/images/gallery/g-1.png"
                    alt="gallery"
                  />
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple
                  />
                </a>
              </label>
            </div>
          </div>
          <p className="text">
            Up to {MAX_FILES} images. Max file size {MAX_FILE_SIZE_MB}MB.
            Supported formats: .jpg, .png, .webp.
          </p>
          <a className="ud-btn btn-thm mt-2">
            Save
            <i className="fal fa-arrow-right-long" />
          </a>
        </div>
      </div>
    </>
  );
}
