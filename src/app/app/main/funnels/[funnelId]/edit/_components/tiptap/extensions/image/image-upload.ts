import { createImageUpload } from "./upload-image";
import { toast } from "sonner";
import { uploadFile } from "@/lib/supabase/client";

const onUpload = (file: File) => {
  const promise = uploadFile(file, `business/bus_ug5cz5vymkqqdnqcbi4m5mw5/funnel-images`);

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async ({ data, error }) => {
        // Successfully uploaded image
        if (data && !error) {
          const url = data.path;
          console.log(url)
          // preload the image
          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
        } else if (error) {
          throw new Error(error.message || "Error uploading image. Please try again.");
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          reject(e);
          return e.message;
        },
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});