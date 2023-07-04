import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import BottomBar from "../components/bottomBar";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PulseLoader from "react-spinners/PulseLoader";

const CourseCard = ({ course }) => {
  const router = useRouter();
  const handleButton = () => {
    router.push({
      pathname: "/courseDetails",
      query: { courseID: course._id },
    });
  };
  return (
    <div className="cursor-pointer overflow-hidden rounded-md bg-white shadow-md hover:bg-[#FFC1A3]">
      <div className="mb-6 bg-gray-200">
        <img
          src="/assets/images/Online-Course.png"
          alt={course.title}
          className="object-cover"
        />
      </div>
      <div className="px-5 ">
        <h2 className="mb-2 text-xl font-semibold">{course.courseName}</h2>
        <p className="mb-2  text-gray-600">Email: {course.email}</p>
        <p className="mb-2 text-gray-600">Details: {course.details}</p>
        <p className="mb-2 text-gray-600">Enrolled: {course.enrolled.length}</p>
        <p className="mb-2 text-gray-600">Uploaded By: {course.name}</p>
      </div>
      <div className="text-center ">
        <button
          type="submit"
          className='i"cursor-pointer mb-3 rounded-md bg-[#FFC1A3] px-4 py-2 
            text-white hover:bg-[black]'
          onClick={handleButton}
        >
          Details
        </button>
      </div>
    </div>
  );
};

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const session = useSession().data;
  useEffect(() => {
    getCourses();
  }, [session]);

  const getCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getCourses", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCourses(data); // Assuming the API response returns the books array directly
        setLoading(false);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <ToastContainer />
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-2xl font-semibold">Course's Collection</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="visible flex items-center justify-center">
              <PulseLoader color="#FF854A" size={20} />
            </div>
          ) : (
            courses?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
      <footer className="bottom-0">
        <BottomBar />
      </footer>
    </>
  );
};

export default CoursePage;
