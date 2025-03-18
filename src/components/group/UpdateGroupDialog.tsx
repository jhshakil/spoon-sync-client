"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Assuming you have a Firebase storage instance set up
import { imageUploadDB } from "@/lib/firebaseConfig";

const formSchema = z.object({
  _id: z.string(),
  name: z.string().min(3, {
    message: "Group name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  logo: z.string().optional(),
  banner: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UpdateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: FormValues) => void;
  groupData: {
    _id?: string;
    name: string;
    description: string;
    logo: string;
    banner: string;
  };
}

const UpdateGroupDialog = ({
  open,
  onOpenChange,
  onSubmit,
  groupData,
}: UpdateGroupDialogProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    groupData.logo || null
  );
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    groupData.banner || null
  );
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: groupData._id,
      name: groupData.name,
      description: groupData.description,
      logo: groupData.logo,
      banner: groupData.banner,
    },
  });

  // Logo dropzone
  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          setLogoPreview(URL.createObjectURL(acceptedFiles[0]));
          setLogoFiles(acceptedFiles);
        }
      },
    });

  // Banner dropzone
  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setBannerPreview(URL.createObjectURL(acceptedFiles[0]));
        setBannerFiles(acceptedFiles);
      }
    },
  });

  const clearLogo = () => {
    setLogoPreview(null);
    form.setValue("logo", "");
    setLogoFiles([]); // Clear the logo files
  };

  const clearBanner = () => {
    setBannerPreview(null);
    form.setValue("banner", "");
    setBannerFiles([]); // Clear the banner files
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Upload logo if exists
      if (logoFiles.length > 0) {
        const logoRef = ref(imageUploadDB, `groups/logos/${v4()}`);
        await uploadBytes(logoRef, logoFiles[0]).then(async (imgData) => {
          await getDownloadURL(imgData.ref).then((url) => (values.logo = url));
        });
      }

      // Upload banner if exists
      if (bannerFiles.length > 0) {
        const bannerRef = ref(imageUploadDB, `groups/banners/${v4()}`);
        await uploadBytes(bannerRef, bannerFiles[0]).then(async (imgData) => {
          await getDownloadURL(imgData.ref).then(
            (url) => (values.banner = url)
          );
        });
      }

      // Call the onSubmit callback with the updated values
      onSubmit?.(values);

      // Reset form and close dialog
      form.reset();
      setLogoPreview(null);
      setBannerPreview(null);
      setLogoFiles([]);
      setBannerFiles([]);
      onOpenChange(false);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [logoPreview, bannerPreview]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Update Group</DialogTitle>
          <DialogDescription>
            Update the details of your group. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter group name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed for your group.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what your group is about"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about the purpose and activities of your
                    group.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Logo</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center">
                        {logoPreview ? (
                          <div className="relative mb-3">
                            <div className="relative h-24 w-24 overflow-hidden rounded-full">
                              <Image
                                src={logoPreview || "/placeholder.svg"}
                                alt="Logo preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={clearLogo}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            {...getLogoRootProps()}
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="text-center p-4">
                              <div className="border p-2 rounded-md max-w-min mx-auto">
                                <UploadCloud size={20} />
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                <span className="font-semibold">Drag logo</span>
                              </p>
                              {logoFiles[0]?.name ? (
                                <p className="text-xs text-gray-500">
                                  {logoFiles[0].name}
                                </p>
                              ) : (
                                <p className="text-xs text-gray-500">
                                  Click to upload (PNG, JPG)
                                </p>
                              )}
                            </div>
                            <Input
                              {...getLogoInputProps()}
                              type="file"
                              className="hidden"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Square image recommended (1:1 ratio)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Banner</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center">
                        {bannerPreview ? (
                          <div className="relative mb-3">
                            <div className="relative h-24 w-full overflow-hidden rounded-md">
                              <Image
                                src={bannerPreview || "/placeholder.svg"}
                                alt="Banner preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={clearBanner}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            {...getBannerRootProps()}
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="text-center p-4">
                              <div className="border p-2 rounded-md max-w-min mx-auto">
                                <UploadCloud size={20} />
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                <span className="font-semibold">
                                  Drag banner
                                </span>
                              </p>
                              {bannerFiles[0]?.name ? (
                                <p className="text-xs text-gray-500">
                                  {bannerFiles[0].name}
                                </p>
                              ) : (
                                <p className="text-xs text-gray-500">
                                  Click to upload (PNG, JPG)
                                </p>
                              )}
                            </div>
                            <Input
                              {...getBannerInputProps()}
                              type="file"
                              className="hidden"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Recommended size: 820x312 pixels
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Group"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGroupDialog;
