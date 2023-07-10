import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const session = useSession().data;
  const [isUSer, setIsUser] = useState(false);

  useEffect(() => {
    setIsUser(session?.user?.role === "user");
  }, [session]);

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <aside className="w-1/5 bg-[black] text-white">
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="text-white hover:text-[#0086DC]">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/cvMaker" className="text-white hover:text-[#0086DC]">
              CV Maker
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:text-[#0086DC]">
              Profile
            </Link>
          </li>
          {isUSer === true ? null : (
            <li>
              <Link
                href="/createQuiz"
                className="text-white hover:text-[#0086DC]"
              >
                Create Quiz
              </Link>
            </li>
          )}
          {isUSer === true ? null : (
            <li>
              <Link href="/users" className="text-white hover:text-[#0086DC]">
                Users
              </Link>
            </li>
          )}

          <li>
            <Link href="/teachers" className="text-white hover:text-[#0086DC]">
              Teachers
            </Link>
          </li>
          <li>
            <Link href="/courses" className="text-white hover:text-[#0086DC]">
              Courses
            </Link>
          </li>
          {isUSer === true ? null : (
            <li>
              <Link
                href="/uploadCourse"
                className="text-white hover:text-[#0086DC]"
              >
                Upload Courses
              </Link>
            </li>
          )}
          <li>
            <Link href="/books" className="text-white hover:text-[#0086DC]">
              Books
            </Link>
          </li>
          {isUSer === true ? null : (
            <li>
              <Link
                href="/uploadBooks"
                className="text-white hover:text-[#0086DC]"
              >
                Upload Books
              </Link>
            </li>
          )}
          <li>
            <Link href="/chat" className="text-white hover:text-[#0086DC]">
              Chat
            </Link>
          </li>
          {isUSer === true ? null : (
            <li>
              <Link
                href="/quizRecord"
                className="text-white hover:text-[#0086DC]"
              >
                Quiz Record
              </Link>
            </li>
          )}
          {isUSer === true ? null : (
            <li>
              <Link
                href="/myUploads"
                className="text-white hover:text-[#0086DC]"
              >
                My Uploads
              </Link>
            </li>
          )}

          <li>
            <Link href="/about" className="text-white hover:text-[#0086DC]">
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="text-white hover:text-[#0086DC]"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
