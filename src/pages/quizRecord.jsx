import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import Head from "next/head";
const PaymentHistory = () => {
  const session = useSession().data;
  const [quizRecord, setQuizRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizRecord = async () => {
      setLoading(true);
      const url = `/api/getQuizRecord`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setQuizRecord(data);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving transaction history:", error);
      }
    };
    if (session?.user?.id) fetchQuizRecord();
  }, [session]);

  return (
    <>
      <Head>
        <title>Quiz Record</title>
      </Head>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center px-5 py-3">
          <PulseLoader color="#FF8B4B" size={20} />
        </div>
      ) : (
        <div className="w-full">
          <div className="mx-4 mt-3">
            <div className="text-center">
              <h1 className="text-black-100 font-courierPrime text-[27px] font-bold slg:text-[35px] xl:text-[55px]">
                Quiz Record
              </h1>
            </div>
          </div>
          {/* Table of history */}
          <div className="mx-4 my-8 overflow-auto rounded-xl">
            <table className="flextable-auto w-full  bg-[#FDDDD2] shadow-xl">
              <thead className="border-b-2 border-dashed border-[#44576D] py-3">
                <tr>
                  <th className="whitespace-nowrap px-2  py-2 font-courierPrime text-[15px] text-[#FF0000] md:py-4 md:text-[18px] slg:text-[24px]">
                    #
                  </th>
                  <th className="whitespace-nowrap px-2  py-2 font-courierPrime text-[15px] text-[#FF0000] md:py-4 md:text-[18px] slg:text-[24px]">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-2  py-2 font-courierPrime text-[15px] text-[#FF0000] md:py-4 md:text-[18px] slg:text-[24px]">
                    Student Name
                  </th>
                  <th className="whitespace-nowrap px-2  py-2 font-courierPrime text-[15px] text-[#FF0000] md:py-4 md:text-[18px] slg:text-[24px]">
                    Course Name
                  </th>
                  <th className="whitespace-nowrap px-2  py-2 font-courierPrime text-[15px] text-[#FF0000] md:py-4 md:text-[18px] slg:text-[24px]">
                    Conducted On
                  </th>
                  <th className="whitespace-nowrap px-2  py-2 font-courierPrime text-[15px] text-[#FF0000] md:py-4 md:text-[18px] slg:text-[24px]">
                    Quiz ID
                  </th>
                  <th className="whitespace-nowrap px-2  font-courierPrime text-[15px] text-[#FF0000] md:py-4 md:text-[18px] slg:text-[24px]">
                    Student ID
                  </th>
                </tr>
              </thead>
              <tbody className="py-4">
                {quizRecord?.length > 0 &&
                  quizRecord?.map((item, index) => {
                    const serialNumber = index + 1;
                    return (
                      <tr key={item._id}>
                        <td className="text-black-100 px-2 py-2 text-center font-courierPrime text-[12px] font-bold md:py-6 md:text-[18px] slg:px-7 slg:text-[22px]">
                          {serialNumber}
                        </td>
                        <td className="text-black-100 whitespace-nowrap px-2 text-center font-courierPrime text-[12px] md:py-6 md:text-[18px] slg:px-7 slg:text-[22px]">
                          {item.quizStatus === "Pass" ? (
                            <span className="flex items-center justify-center text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-6 w-6 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-6 w-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </span>
                          )}
                        </td>
                        <td className="text-black-100 whitespace-nowrap px-2  text-center font-courierPrime text-[12px] md:py-6 md:text-[18px] slg:px-7 slg:text-[22px]">
                          {item.studentName}
                        </td>
                        <td className="text-black-100 whitespace-nowrap px-2  text-center font-courierPrime text-[12px] md:py-6 md:text-[18px] slg:px-7 slg:text-[22px]">
                          {item.courseName}
                        </td>
                        <td className="text-black-100 whitespace-nowrap px-2  text-center font-courierPrime text-[12px] md:py-6 md:text-[18px] slg:px-7 slg:text-[22px]">
                          {item.date.split("T")[0]}
                        </td>
                        <td className="text-black-100 whitespace-nowrap px-2  text-center font-courierPrime text-[12px] md:py-6 md:text-[18px] slg:px-7 slg:text-[22px]">
                          {item.quizID}
                        </td>
                        <td className="text-black-100 whitespace-nowrap px-2  text-center font-courierPrime text-[12px] md:py-6 md:text-[18px] slg:px-7 slg:text-[22px]">
                          {item.studentID}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentHistory;
