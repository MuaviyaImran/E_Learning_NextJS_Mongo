import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import BottomBar from "../components/bottomBar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useSession } from "next-auth/react";
import { PulseLoader } from "react-spinners";
const BookUploadForm = () => {
  const router = useRouter();
  const session = useSession().data;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [bookFile, setBookFile] = useState(null);

  useEffect(() => {
    setIsFilled(title && author && description && bookFile);
  }, [title, author, description, bookFile]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Form validation logic goes here
    setLoading(true);
    setIsFilled(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("book", bookFile);
    formData.append("uploadedByUserID", session.user.id);
    formData.append("uploadedByName", session.user.name);

    try {
      const response = await fetch("/api/uploadBook", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showToast("Book uploaded successfully.");
        router.push("/");
      } else {
        const data = await response.json();
        showToast(data.message);
      }
    } catch (error) {
      console.error("catch", error);
      showToast("Failed to upload book.");
    }
    setLoading(false);
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
              <img
                className="h-full w-full object-cover object-center"
                src="/assets/images/uploadBook.jpeg"
                alt="Book Cover"
              />
            </div>
            <div className="mx-auto max-w-md p-6">
              <h2 className="mb-4 text-2xl">Upload Book</h2>
              <form onSubmit={handleFormSubmit}>
                <label className="mb-4 block">
                  <span className="text-gray-700">Title:</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label className="mb-4 block">
                  <span className="text-gray-700">Author:</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </label>
                <label className="mb-4 block">
                  <span className="text-gray-700">Description:</span>
                  <textarea
                    className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>

                <label className="mb-4 block">
                  <span className="text-gray-700">Book File:</span>
                  <input
                    type="file"
                    accept=".pdf,.epub"
                    name="book"
                    className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                    onChange={(e) => setBookFile(e.target.files[0])}
                  />
                </label>
                <div className="text-center ">
                  <button
                    disabled={!isFilled}
                    type="submit"
                    className={`rounded-md  bg-[#FFC1A3] px-4 py-2 text-white ${
                      isFilled
                        ? "cursor-pointer hover:bg-[#FFC1A3]"
                        : "cursor-not-allowed"
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>

      <footer className=" bottom-0 ">
        <BottomBar />
      </footer>
    </div>
  );
};

export default BookUploadForm;
