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
            <Link href="/" className="text-white hover:text-[#FFC1A3]">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/cvMaker" className="text-white hover:text-[#FFC1A3]">
              CV Maker
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:text-[#FFC1A3]">
              Profile
            </Link>
          </li>
          {isUSer === true ? null : (
            <li>
              <Link
                href="/createQuiz"
                className="text-white hover:text-[#FFC1A3]"
              >
                Create Quiz
              </Link>
            </li>
          )}
          {isUSer === true ? null : (<li>
            <Link href="/users" className="text-white hover:text-[#FFC1A3]">
              Users
            </Link>
          </li>)}

          <li>
            <Link href="/teachers" className="text-white hover:text-[#FFC1A3]">
              Teachers
            </Link>
          </li>
          <li>
            <Link href="/courses" className="text-white hover:text-[#FFC1A3]">
              Courses
            </Link>
          </li>
          {isUSer === true ? null : (<li>
            <Link
              href="/uploadCourse"
              className="text-white hover:text-[#FFC1A3]"
            >
              Upload Courses
            </Link>
          </li>)}
          <li>
            <Link href="/books" className="text-white hover:text-[#FFC1A3]">
              Books
            </Link>
          </li>
          {isUSer === true ? null : (<li>
            <Link
              href="/uploadBooks"
              className="text-white hover:text-[#FFC1A3]"
            >
              Upload Books
            </Link>
          </li>)}
          {isUSer === true ? null : (<li>
            <Link
              href="/quizRecord"
              className="text-white hover:text-[#FFC1A3]"
            >
              Quiz Record
            </Link>
          </li>)}
          {isUSer === true ? null : (<li>
            <Link
              href="/myUploads"
              className="text-white hover:text-[#FFC1A3]"
            >
              My Uploads
            </Link>
          </li>)}

          <li>
            <Link href="/about" className="text-white hover:text-[#FFC1A3]">
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
              className="text-white hover:text-[#FFC1A3]"
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
