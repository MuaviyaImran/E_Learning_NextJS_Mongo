import { useEffect } from "react";
import { useState } from "react";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { useRouter } from "next/router";
import showToast from "../lib/toast";
import Head from "next/head";

const HomePage = () => {
  const session = useSession().data;
  const router = useRouter();
  const [userCount, setUserCount] = useState();
  const [teacherCount, setTeacherCount] = useState();
  const [bookCount, setBookCount] = useState();
  const [courseCount, setCourseCount] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAppUSerCount();
    getbooksCount();
    getCourseCount();
    setLoading(false);
  }, [session]);

  const getbooksCount = async () => {
    try {
      const response = await fetch("/api/getBooks", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setBookCount(data.length);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
    }
  };

  const getCourseCount = async () => {
    try {
      const response = await fetch("/api/getCourseCount", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCourseCount(data.courses.length);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
    }
  };

  const getAppUSerCount = async () => {
    try {
      const response = await fetch("/api/getAppUserCount", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUserCount(data.userCount);
        setTeacherCount(data.teacherCount);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
    }
  };

  const Card = ({ number, text, image, route }) => {
    const handleClick = () => {
      router.push(route);
    };
    return (
      <div
        onClick={handleClick}
        className="mx-auto max-w-sm cursor-pointer rounded-lg bg-white shadow-lg hover:bg-[#FFC1A3]"
      >
        <div className="p-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
            <img src={image} alt="" className="h-16 w-16" />
          </div>
          <div className="mt-4">
            <h3 className="text-center text-2xl font-[700]">{number}</h3>
            <p className="mt-2 text-center font-[500]">{text}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {loading ? (
        <div className="visible flex items-center justify-center">
          <PulseLoader color="#FF854A" size={20} />
        </div>
      ) : (
        <>
          <div className="m-7 text-center text-[40px] font-[700]">
            Learn Better, Grow Better
          </div>
          <div className="overflow-x-hidden ">
            <ToastContainer />
            <div className="flex flex-wrap justify-center">
              <div className="w-full p-4 sm:w-1/2 md:w-1/4 lg:w-1/4">
                <Card
                  number={teacherCount}
                  text="Teachers"
                  image="assets/images/teacher.svg"
                  route="/teachers"
                />
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/4 lg:w-1/4">
                <Card
                  number={userCount}
                  text="Users"
                  image="assets/images/user.svg"
                  route="/users"
                />
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/4 lg:w-1/4">
                <Card
                  number={bookCount}
                  text="Books"
                  image="assets/images/books.svg"
                  route="/books"
                />
              </div>
              <div className="w-full p-4 sm:w-1/2 md:w-1/4 lg:w-1/4">
                <Card
                  number={courseCount}
                  text="Courses"
                  image="assets/images/courses.svg"
                  route="/courses"
                />
              </div>
            </div>

            <div className="mt-2 w-full bg-[url('/assets/images/home-bg.svg')] bg-cover bg-scroll bg-no-repeat md:mt-20">
              <div className="flex flex-col items-center justify-center font-courierPrime">
                <div className="mt-14 w-full text-center text-4xl font-bold text-[red] xs:mt-16 md:mt-28 md:text-6xl">
                  Our Values
                </div>
                <div className="mb-12 mt-5 flex w-11/12 flex-col items-center justify-around lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
                  <div className="w-full  grow-0">
                    <AnimationOnScroll animateIn="animate__fadeInLeft overflow-hidden">
                      <div className="w-100 flex items-center">
                        <div
                          className="
                          relative 
                          h-[60px] w-[60px] shrink-0 rounded-full bg-[#F99B7D] bg-opacity-[21%]
                          sm:h-[80px] sm:w-[80px] 
                          md:h-[110px] md:w-[110px] 
                          lg:h-[147px] lg:w-[147px]"
                        >
                          <img
                            className="
                            absolute inset-0 m-auto h-[40px] w-[40px]
                            rounded-full object-cover
                            sm:h-[60px] sm:w-[60px] 
                            md:h-[90px] md:w-[90px] 
                            lg:h-[117px] lg:w-[117px]"
                            src="/assets/images/plane.svg"
                            alt="Image"
                          />
                        </div>

                        <div
                          className="
                          3xl:text-24 px-5 font-courierPrime
                          text-[14px] font-normal leading-[18px]
                          text-[black] sm:px-6 sm:text-[16px]
                          sm:leading-[22px] md:px-6 md:text-[18px]
                          md:leading-[24px] lg:px-7 lg:text-[20px]
                          lg:leading-[26px] xl:px-8 xl:text-[22px]
                          xl:leading-[28px] 2xl:px-9 2xl:text-[23px]
                          2xl:leading-[29px] 3xl:px-10 3xl:leading-[30px]"
                        >
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </div>
                      </div>
                    </AnimationOnScroll>
                    <AnimationOnScroll animateIn="animate__fadeInLeft">
                      <div className="w-100 mt-8 flex items-center">
                        <div
                          className="
                          relative 
                          h-[60px] w-[60px] shrink-0 rounded-full bg-[#F99B7D] bg-opacity-[21%]
                          sm:h-[80px] sm:w-[80px] 
                          md:h-[110px] md:w-[110px] 
                          lg:h-[147px] lg:w-[147px]"
                        >
                          <img
                            className="
                            absolute inset-0 m-auto h-[40px] w-[40px]
                            rounded-full object-cover
                            sm:h-[60px] sm:w-[60px] 
                            md:h-[90px] md:w-[90px] 
                            lg:h-[117px] lg:w-[117px] "
                            src="/assets/images/globe.svg"
                            alt="Image"
                          />
                        </div>

                        <div
                          className="
                          3xl:text-24 px-5 font-courierPrime
                          text-[14px] font-normal leading-[18px]
                          text-[black] sm:px-6 sm:text-[16px]
                          sm:leading-[22px] md:px-6 md:text-[18px]
                          md:leading-[24px] lg:px-7 lg:text-[20px]
                          lg:leading-[26px] xl:px-8 xl:text-[22px]
                          xl:leading-[28px] 2xl:px-9 2xl:text-[23px]
                          2xl:leading-[29px] 3xl:px-10 3xl:leading-[30px]"
                        >
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </div>
                      </div>
                    </AnimationOnScroll>
                    <AnimationOnScroll animateIn="animate__fadeInLeft">
                      <div className="w-100  mt-8 flex items-center">
                        <div
                          className="
                          relative 
                          h-[60px] w-[60px] shrink-0 rounded-full bg-[#F99B7D] bg-opacity-[21%]
                          sm:h-[80px] sm:w-[80px] 
                          md:h-[110px] md:w-[110px] 
                          lg:h-[147px] lg:w-[147px]"
                        >
                          <img
                            className="
                            absolute inset-0 m-auto h-[40px] w-[40px]
                            rounded-full object-cover
                            sm:h-[60px] sm:w-[60px] 
                            md:h-[90px] md:w-[90px] 
                            lg:h-[117px] lg:w-[117px]"
                            src="/assets/images/bulb.svg"
                            alt="Image"
                          />
                        </div>

                        <div
                          className="
                          3xl:text-24 px-5 font-courierPrime
                          text-[14px] font-normal leading-[18px]
                          text-[black] sm:px-6 sm:text-[16px]
                          sm:leading-[22px] md:px-6 md:text-[18px]
                          md:leading-[24px] lg:px-7 lg:text-[20px]
                          lg:leading-[26px] xl:px-8 xl:text-[22px]
                          xl:leading-[28px] 2xl:px-9 2xl:text-[23px]
                          2xl:leading-[29px] 3xl:px-10 3xl:leading-[30px]"
                        >
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </div>
                      </div>
                    </AnimationOnScroll>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-16">
              <AnimationOnScroll animateIn="animate__fadeInRight">
                <div className="flex flex-row">
                  <span className="mx-5 flex-col">
                    <div
                      className="
                      w-full font-courierPrime text-[30px] font-bold
                      text-[red]
                      sm:text-[37px] 
                      md:text-[42px]
                      lg:text-[60px]
                      xl:text-[80px]"
                    >
                      Our Story
                    </div>
                    <div
                      className="
                      mt-2 overflow-hidden  whitespace-normal
                      px-1 py-2 font-courierPrime text-[16px] font-normal 
                      leading-[22px] text-[black]
                      sm:text-[19px] sm:leading-[24px]
                      md:text-[22px] md:leading-[26px]
                      lg:text-[25px] lg:leading-[29px]
                      xl:text-[28px] xl:leading-[32px]
                      2xl:text-[32px] 2xl:leading-[36px]"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Fermentum odio eu feugiat pretium nibh ipsum
                      consequat. At elementum eu facilisis sed odio morbi. Est
                      ante in nibh mauris cursus. Purus faucibus ornare
                      suspendisse sed nisi lacus. Ullamcorper morbi tincidunt
                      ornare massa eget. Arcu vitae elementum curabitur vitae
                      nunc sed velit. Lobortis elementum nibh tellus molestie
                      nunc non blandit massa enim. Porta lorem mollis aliquam ut
                      porttitor leo. Duis at tellus at urna condimentum mattis.
                      Duis ut diam quam nulla. Platea dictumst quisque sagittis
                      purus sit amet volutpat consequat mauris. Cras semper
                      auctor neque vitae tempus quam. Iaculis eu non diam
                      phasellus vestibulum lorem sed risus.
                    </div>
                  </span>
                </div>
              </AnimationOnScroll>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
