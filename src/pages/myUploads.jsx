import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PulseLoader from "react-spinners/PulseLoader";

import Navbar from "../components/navbar";
const CourseCard = ({ course }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleButton = () => {
    console.log("Edit Pressed", course._id);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/deleteCourse?courseID=${course._id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        showToast(data.message); // Assuming the API response returns the books array directly
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
    <div className="cursor-pointer overflow-hidden rounded-md bg-white shadow-md hover:bg-[#FFC1A3]">
      <ToastContainer />
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
      <div className="flex justify-between px-4">
        <div className="text-center">
          <button
            type="submit"
            className="mb-3 mr-2 cursor-pointer rounded-md bg-[#FFC1A3] hover:bg-black px-4 py-2 text-white"
            onClick={handleButton}
          >
            Edit
          </button>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mb-3 cursor-pointer rounded-md bg-[#FFC1A3] px-4 py-2 text-white hover:bg-black"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
const BookCard = ({ book }) => {
  const [loading, setLoading] = useState(false);
  const handleButton = () => {
    console.log("Edit Pressed", book._id);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/deleteBook?bookID=${book._id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        showToast(data.message); // Assuming the API response returns the books array directly
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
    <div className="rounded-lg border-[#FFC1A3] bg-white shadow-xl hover:bg-[#FFC1A3]">
      <div className="mb-4 flex items-center justify-center">
        <img src="/assets/images/book.png" alt="Profile" />
      </div>
      <div className="px-6 pb-5">
        <p className="text-[black]-500 mb-2 font-[700]">{book.BookTitle}</p>
        <p className="mb-2 font-[700] text-[black]">
          Author: <span className=" font-[400]">{book.author}</span>
        </p>
        <p className="mb-2 font-[700] text-[black]">
          Description: <span className=" font-[400]">{book.description}</span>
        </p>
        <p className="mb-2 font-[700] text-[black]">
          Uploaded By:{" "}
          <span className=" font-[400]">{book.uploadedByName}</span>
        </p>
        <div className="flex justify-between px-4">
          <div className="text-center">
            <button
              type="submit"
              className="mb-3 mr-2 cursor-pointer rounded-md bg-[#FFC1A3] px-4 py-2 text-white hover:bg-black"
              onClick={handleButton}
            >
              Edit
            </button>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mb-3 cursor-pointer rounded-md bg-[#FFC1A3] px-4 py-2 text-white hover:bg-black"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UploadsPage = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const session = useSession().data;
  const [books, setBooks] = useState([]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // getMyUploadedCourses

  useEffect(() => {
    if (session?.user?.id) {
      getCourses();
      getBooks();
    }
  }, [session]);

  const getCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/getMyUploadedCourses?userID=${session?.user?.id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
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
  const getBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/getMyUploadedBooks?userID=${session?.user?.id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBooks(data); // Assuming the API response returns the books array directly
        setLoading(false);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container p-4">
        <h1 className="mb-4 flex justify-center text-[27px] font-bold">
          My Uploads
        </h1>

        <div className="flex space-x-4">
          <button
            className={`rounded-lg px-4 py-2 ${
              activeTab === "books" ? "bg-[#FFC1A3] hover:bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabClick("books")}
          >
            Books
          </button>
          <button
            className={`rounded-lg px-4 py-2 ${
              activeTab === "courses" ? "bg-[#FFC1A3] hover:bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabClick("courses")}
          >
            Courses
          </button>
        </div>

        {activeTab === "books" && (
          <div className="mt-4">
            <h2 className="mb-2 text-xl font-bold">Uploaded Books</h2>
            <ul>
              {/* Dummy data for books */}
              <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {loading ? (
                    <div className="visible flex items-center justify-center">
                      <PulseLoader color="#FF854A" size={20} />
                    </div>
                  ) : (
                    books?.map((book) => (
                      <BookCard key={book._id} book={book} />
                    ))
                  )}
                </div>
              </div>
            </ul>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="mt-4">
            <h2 className="mb-2 text-xl font-bold">Uploaded Courses</h2>
            <ul>
              {/* Dummy data for courses */}
              <div className="container mx-auto">
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
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadsPage;
