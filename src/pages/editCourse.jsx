import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useSession } from "next-auth/react";
import { PulseLoader } from "react-spinners";
import VidPlayer from "../components/videoPlayer";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const CourseDetails = () => {
  const router = useRouter();
  const session = useSession().data;
  const [courseDetails, setCourseDetails] = useState();
  const [courseDesc, setCourseDesc] = useState();
  const [courseTitle, setCourseTitle] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState([]);
  const { courseID } = router.query;

  const getCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/getSingleCourse?courseID=${courseID}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCourseDetails(data); // Assuming the API response returns the books array directly
        setCourseDesc(data.details);
        setCourseTitle(data.courseName);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
    }
  };
  useEffect(() => {
    if (courseID) {
      getCourseDetails();
    }
  }, [session]);

  const editCourse = async () => {
    if (file) {
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
              courseName: courseTitle,
              details: courseDesc,
              name: session.user.name,
              videoURL: url,
              userID: session.user.id,
              email: session.user.email,
              role: session.user.role,
            };
            try {
              const response = await fetch(
                `/api/editCourse?courseID=${courseID}`,
                {
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
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
    } else {
      const body = {
        courseName: courseTitle,
        details: courseDesc,
        name: session.user.name,
        videoURL: courseDetails.videoURL,
        userID: session.user.id,
        email: session.user.email,
        role: session.user.role,
      };
      try {
        const response = await fetch(`/api/editCourse?courseID=${courseID}`, {
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
    }
  };

  // const handleQuizConduct = () => {
  //   if (courseDetails.quizID) {
  //     router.push({
  //       pathname: "/quizPage",
  //       query: { quizID: courseDetails.quizID,courseName: courseDetails?.courseName },
  //     });
  //   }
  // };

  return (
    <div className="">
      <header>
        <Navbar />
      </header>
      <div className="flex items-center justify-center px-4">
        <ToastContainer />
        {loading ? (
          <div className="visible flex items-center justify-center">
            <PulseLoader color="#FF854A" size={20} />
          </div>
        ) : (
          <>
            <div className="hidden md:block md:w-1/2">
              <VidPlayer videoUrl={courseDetails?.videoURL} />
            </div>
            <div className="mx-auto max-w-md p-6">
              <h2 className="mb-4 text-2xl">Course Details</h2>
              <form>
                <label className="mb-4 block">
                  <span className="text-gray-700">Title:</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </label>

                <label className="mb-4 block">
                  <span className="text-gray-700">Description:</span>
                  <textarea
                    className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                  ></textarea>
                </label>

                <span className="text-gray-700">Upload Video:</span>
                <input
                  type="file"
                  accept=".mp4,.avi,.mov,.mkv"
                  name="video"
                  className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </form>
              <div className="text-center ">
                <button
                  onClick={editCourse}
                  type="button"
                  className={`cursor-pointer  rounded-md bg-[#0086DC] px-4 py-2 text-white hover:bg-[#0086DC]
                      `}
                >
                  Edit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
