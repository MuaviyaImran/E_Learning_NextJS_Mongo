import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import showToast from "../lib/toast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import PulseLoader from "react-spinners/PulseLoader";

const Dropzone = ({ className }) => {
  const session = useSession().data;
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [details, setDetails] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  useEffect(() => {
    setTeacherName(session?.user?.name);
  }, [session]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "video/*",
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const action = async () => {
    const file = files[0];
    if (!file || !courseName || !details) {
      showToast("Empty Fields Found");
    } else {
      setLoading(true);
      const formData = new FormData();

      formData.append("file", file);
      formData.append("courseName", courseName);
      formData.append("details", details);
      formData.append("name", teacherName);
      formData.append("email", session?.user?.email);
      formData.append("userID", session?.user?.id);
      formData.append("role", session?.user?.role);
      console.log(formData);
      if (formData) {
        try {
          const response = await fetch("/api/uploadCourse", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            router.push("/");
          } else {
            showToast(err, "Error occurred while uploading course");
            setLoading(false);
          }
        } catch (err) {
          console.error("error", err);
          setLoading(false);
          showToast(err, "Error occurred while uploading course");
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="visible flex items-center justify-center">
          <PulseLoader color="#FF854A" size={20} />
        </div>
      ) : (
        <>
          <section className="mt-10">
            <div className="flex flex-col gap-4">
              <label className="mb-4 block">
                <span className="text-gray-700">Course Name:</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </label>
              <label className="mb-4 block">
                <span className="text-gray-700">Description:</span>
                <textarea
                  className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </label>
              <label className="mb-4 block">
                <span className="text-gray-700">Teacher Name:</span>
                <input
                  disabled
                  type="text"
                  className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                  value={session?.user?.name || ""}
                />
              </label>
            </div>
          </section>
          <span className="text-gray-700">Upload Video:</span>
          <div {...getRootProps({ className: className })}>
            <input {...getInputProps({ name: "file" })} />
            <div className="flex cursor-pointer flex-col items-center justify-center gap-4">
              <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p className="text-center">
                  Drag & drop files here, or click to select files
                </p>
              )}
            </div>
          </div>
          <div className=" mt-8 flex items-center justify-center self-center font-[700] text-[red]">
            {files.length > 0 && (
              <div>
                <p>
                  <span>Selected File: </span>
                  {files[0].name}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center self-center">
            <button
              onClick={action}
              type="submit"
              className=" mt-12  rounded-md border border-[#FFC1A3] px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
            >
              Upload Course
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Dropzone;
