import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useSession } from "next-auth/react";
import { PulseLoader } from "react-spinners";
import { Button, Card, Input, List, message, Image, Progress } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import Head from "next/head";
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

  const handleUploadFile = () => {
    if (bookFile) {
      setLoading(true);
      setIsFilled(true);
      const name = bookFile.name;
      const storageRef = ref(storage, `Books/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, bookFile);
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
            //url is download url of file
            const body = {
              title: title,
              author: author,
              description: description,
              book: url,
              uploadedByUserID: session.user.id,
              uploadedByName: session.user.name,
              email: session.user.email,
              role: session.user.role,
            };

            try {
              const response = await fetch("/api/uploadBook", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
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
          });
        }
      );
    } else {
      message.error("File not found");
    }
  };
  if (session?.user?.role === "user") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Head>
        <title>Upload Book</title>
      </Head>
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold">
            You are not Authorized to access this Page
          </div>
          <p className="text-gray-600">
            Please contact the administrator for assistance.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <Head>
        <title>Upload Book</title>
      </Head>
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
                <form>
                  <label className="mb-4 block">
                    <span className="text-gray-700">Title:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                  <label className="mb-4 block">
                    <span className="text-gray-700">Author:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </label>
                  <label className="mb-4 block">
                    <span className="text-gray-700">Description:</span>
                    <textarea
                      className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
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
                      className="mt-1 block w-full rounded-md border border-[#0086DC] p-3 shadow-sm ring-[#0086DC] focus:border-[#0086DC] focus:ring-[#0086DC]"
                      onChange={(e) => setBookFile(e.target.files[0])}
                    />
                  </label>
                  <div className="text-center ">
                    <button
                      onClick={handleUploadFile}
                      disabled={!isFilled}
                      type="button"
                      className={`rounded-md  bg-[#0086DC] px-4 py-2 text-white ${
                        isFilled
                          ? "cursor-pointer hover:bg-[#0086DC]"
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
      </div>
    );
  }
};

export default BookUploadForm;
