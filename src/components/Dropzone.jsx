import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import showToast from "../lib/toast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import PulseLoader from "react-spinners/PulseLoader";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const Dropzone = () => {
  const session = useSession().data;
  const router = useRouter();
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [details, setDetails] = useState("");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    setTeacherName(session?.user?.name);
  }, [session]);

  async function action() {
    if (!file || !courseName || !details) {
      showToast("Empty Fields Found");
    } else {
      setLoading(true);
      const name = file.name;
      const storageRef = ref(storage, `Course/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              showToast("Upload is paused");
              break;
            case "running":
              showToast("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            const body = {
              courseName: courseName,
              details: details,
              name: teacherName,
              videoURL: url,
              userID: session.user.id,
              email: session.user.email,
              role: session.user.role,
            };
            try {
              const response = await fetch("/api/uploadCourse", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
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
          });
        }
      );
    }
  }

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
                  className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </label>
              <label className="mb-4 block">
                <span className="text-gray-700">Description:</span>
                <textarea
                  className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </label>
              <label className="mb-4 block">
                <span className="text-gray-700">Teacher Name:</span>
                <input
                  disabled
                  type="text"
                  className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                  value={session?.user?.name || ""}
                />
              </label>
            </div>
          </section>
          <span className="text-gray-700">Upload Video:</span>
          <input
            type="file"
            accept=".mp4,.avi,.mov,.mkv"
            name="video"
            className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className=" mt-8 flex items-center justify-center self-center font-[700] text-[red]">
            {file.length > 0 && (
              <div>
                <p>
                  <span>Selected File: </span>
                  {file[0].name}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center self-center">
            <button
              onClick={action}
              type="submit"
              className=" mt-12  rounded-md border border-[#0086DC] px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
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
