import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import BottomBar from "../components/bottomBar";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useSession } from "next-auth/react";
import PulseLoader from "react-spinners/PulseLoader";

const BookCard = ({ book }) => {

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
        <div className="text-center ">
          <a href={book.bookFile} target="_blank">
            <button
              type="submit"
              className='i"cursor-pointer rounded-md border-black bg-[#FFC1A3] px-4 py-2 text-white 
            ring-black hover:bg-[#000000]'
            >
              Download
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const session = useSession().data;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBooks();
  }, [session]);

  const getBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getBooks", {
        method: "GET",
      });
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
      <header>
        <Navbar />
      </header>
      <ToastContainer />
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-2xl font-semibold">Book's Collection</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="visible flex items-center justify-center">
              <PulseLoader color="#FF854A" size={20} />
            </div>
          ) : (
            books?.map((book) => <BookCard key={book._id.$oid} book={book} />)
          )}
        </div>
      </div>
      <footer className="bottom-0">
        <BottomBar />
      </footer>
    </>
  );
};

export default BooksPage;
