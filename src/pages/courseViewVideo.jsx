import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useSession } from "next-auth/react";
import { PulseLoader } from "react-spinners";
import VidPlayer from "../components/videoPlayer";
import TextEditor from "../components/TextEditor";

const CourseDetails = () => {
  const router = useRouter();
  const session = useSession().data;
  const [courseDetails, setCourseDetails] = useState();
  const [loading, setLoading] = useState(false);

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
  const handleQuizConduct = () => {
    if (courseDetails.quizID) {
      router.push({
        pathname: "/quizPage",
        query: {
          quizID: courseDetails.quizID,
          courseName: courseDetails?.courseName,
        },
      });
    }
  };
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
                    disabled
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                    value={courseDetails?.courseName}
                  />
                </label>
                <label className="mb-4 block">
                  <span className="text-gray-700">Uploaded By:</span>
                  <input
                    disabled
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                    value={courseDetails?.name}
                  />
                </label>
                <label className="mb-4 block">
                  <span className="text-gray-700">Description:</span>
                  <textarea
                    disabled
                    className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                    value={courseDetails?.details}
                  ></textarea>
                </label>
                <label className="mb-4 block">
                  <span className="text-gray-700">Enrolled:</span>
                  <input
                    disabled
                    type="text"
                    name="book"
                    className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                    value={(courseDetails?.enrolled.length).toString()}
                  />
                </label>
                <label className="mb-4 block">
                  <span className="text-gray-700">Email:</span>
                  <input
                    disabled
                    type="text"
                    name="book"
                    className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                    value={courseDetails?.email}
                  />
                </label>
                {courseDetails?.quizID ? (
                  <div className="text-center">
                    <button
                      onClick={handleQuizConduct}
                      type="button"
                      className="cursor-pointer rounded-md bg-[#0086DC] px-4 py-2 text-white hover:bg-[black]"
                    >
                      Conduct Quiz
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </>
        )}
      </div>
      <footer>
        <div>
          <TextEditor onChange={handleEditorChange} />
        </div>
      </footer>
    </div>
  );
};
const handleEditorChange = (content) => {};
export default CourseDetails;
