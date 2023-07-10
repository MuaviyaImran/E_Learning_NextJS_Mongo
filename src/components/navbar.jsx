import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const isAboutRoute = router.pathname === "/about";
  const isCVMakerRoute = router.pathname === "/cvMaker";
  const isBookRoute = router.pathname === "/books";
  const isCoursesRoute = router.pathname === "/courses";
  const isDashBoardRoute = router.pathname === "/";
  const isProfileRoute = router.pathname === "/profile";

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className=" bg-black">
      <nav className="py-4">
        <ul className="flex justify-between border-none text-gray-700">
          <li
            className="ml-4 mr-3 h-[10px] w-[100px] cursor-pointer pt-1 xms:h-[20px] 
          xms:w-[125px] md:ml-16
          md:mr-6 md:h-[37px] 
          md:w-[191px] md:leading-9"
          >
            <img
              onClick={() => {
                router.push("/");
              }}
              src="/assets/images/logo.png"
              alt="AppLogo"
            />
          </li>
          <li className="flex font-courierPrime text-[13px] font-normal leading-9 text-black sm:text-[16px] md:text-[22px] md:leading-9">
            <React.Fragment>
              <Link
                className={`mr-2 cursor-pointer text-[white] hover:text-[#0086DC] sm:mr-6 ${
                  isProfileRoute
                    ? "border-none underline  decoration-[#0086DC] decoration-2 underline-offset-8"
                    : ""
                } `}
                href="/profile"
              >
                Profile
              </Link>
              <Link
                className={`mr-2 cursor-pointer text-[white] hover:text-[#0086DC] sm:mr-6 ${
                  isDashBoardRoute
                    ? "border-none underline  decoration-[#0086DC] decoration-2 underline-offset-8"
                    : ""
                } `}
                href="/"
              >
                Dashboard
              </Link>
              <Link
                className={`mr-2 cursor-pointer text-[white] hover:text-[#0086DC] sm:mr-6 ${
                  isCoursesRoute
                    ? "border-none underline  decoration-[#0086DC] decoration-2 underline-offset-8"
                    : ""
                } `}
                href="/courses"
              >
                Courses
              </Link>

              <Link
                className={`mr-2 cursor-pointer text-[white] hover:text-[#0086DC] sm:mr-6 ${
                  isBookRoute
                    ? "border-none underline  decoration-[#0086DC] decoration-2 underline-offset-8"
                    : ""
                } `}
                href="/books"
              >
                Books
              </Link>

              <Link
                className={`mr-2 cursor-pointer text-[white] hover:text-[#0086DC] sm:mr-6 ${
                  isCVMakerRoute
                    ? "border-none underline  decoration-[#0086DC] decoration-2 underline-offset-8"
                    : ""
                } `}
                href="/cvMaker"
              >
                CV Maker
              </Link>
              <Link
                href="/about"
                className={`mr-2 cursor-pointer text-[white] hover:text-[#0086DC] sm:mr-6 ${
                  isAboutRoute
                    ? "border-none underline  decoration-[#0086DC] decoration-2 underline-offset-8"
                    : ""
                } `}
              >
                About
              </Link>
              <RiLogoutBoxLine
                onClick={handleLogout}
                className="mt-1 cursor-pointer sm:mr-6"
                size={24}
                color="#bd1919"
              />
            </React.Fragment>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
