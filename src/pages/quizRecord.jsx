
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";

const PaymentHistory= () => {
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
    <Navbar/>
      {loading ? (
        <div className="flex justify-center items-center px-5 py-3">
          <PulseLoader color="#FF8B4B" size={20} />
        </div>
      ) : (
        <div className="w-full">
          <div className="mx-4 mt-3">
            <div className="text-center">
              <h1 className="text-black-100 text-[27px] font-courierPrime font-bold slg:text-[35px] xl:text-[55px]">
                Quiz Record
              </h1>
            </div>
          </div>
          {/* Table of history */}
          <div className="mx-4 overflow-auto rounded-xl my-8">
            <table className="flextable-auto w-full  bg-[#FDDDD2] shadow-xl">
              <thead className="border-b-2 border-dashed border-[#44576D] py-3">
                <tr>
                  <th className="md:py-4 px-2  text-[#FF0000] font-courierPrime md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap py-2">
                    #
                  </th>
                  <th className="md:py-4 px-2  text-[#FF0000] font-courierPrime md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap py-2">
                    Status
                  </th>
                  <th className="md:py-4 px-2  text-[#FF0000] font-courierPrime md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap py-2">
                    Student Name
                  </th>
                  <th className="md:py-4 px-2  text-[#FF0000] font-courierPrime md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap py-2">
                    Course Name
                  </th>
                  <th className="md:py-4 px-2  text-[#FF0000] font-courierPrime md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap py-2">
                    Conducted On
                  </th>
                  <th className="md:py-4 px-2  text-[#FF0000] font-courierPrime md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap py-2">
                    Quiz ID
                  </th>
                  <th className="md:py-4 px-2  text-[#FF0000] font-courierPrime md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap">
                    Student ID
                  </th>
                </tr>
              </thead>
              <tbody className="py-4">
                {quizRecord?.length > 0 &&
                  quizRecord?.map((item, index) => {
                    const serialNumber = index + 1;
                    const expires = new Date(
                      new Date(item.created * 1000).getTime() +
                        30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString();
                    return (
                      <tr key={item.id}>
                        <td className="md:py-6 slg:px-7 px-2 font-courierPrime text-center text-black-100 slg:text-[22px] font-bold md:text-[18px] py-2 text-[12px]">
                          {serialNumber}
                        </td>
                        <td className="md:py-6 slg:px-7 px-2 font-courierPrime text-center text-black-100 slg:text-[22px] md:text-[18px] text-[12px] whitespace-nowrap">
                          {item.quizStatus === "Pass" ? (
                            <span className="flex items-center text-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500 mr-2"
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
                                className="h-6 w-6 text-red-500 mr-2"
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
                        <td className="md:py-6 slg:px-7 px-2  font-courierPrime text-center text-black-100 slg:text-[22px] md:text-[18px] text-[12px] whitespace-nowrap">
                          {item.studentName}
                        </td>
                        <td className="md:py-6 slg:px-7 px-2  font-courierPrime text-center text-black-100 slg:text-[22px] md:text-[18px] text-[12px] whitespace-nowrap">
                          {item.courseName}
                        </td>
                        <td className="md:py-6 slg:px-7 px-2  font-courierPrime text-center text-black-100 slg:text-[22px] md:text-[18px] text-[12px] whitespace-nowrap">
                          {item.date.split("T")[0]}
                        </td>
                        <td className="md:py-6 slg:px-7 px-2  font-courierPrime text-center text-black-100 slg:text-[22px] md:text-[18px] text-[12px] whitespace-nowrap">
                          {item.quizID}
                        </td>
                        <td className="md:py-6 slg:px-7 px-2  font-courierPrime text-center text-black-100 slg:text-[22px] md:text-[18px] text-[12px] whitespace-nowrap">
                          {item.studentID}
                        </td>
                        {/* <td
                          className=" md:py-6 slg:px-7 px-2 font-courierPrime text-center text-black-100 slg:text-[14px] md:text-[14px] text-[12px] whitespace-nowrap cursor-pointer"
                          
                        >
                          <a className="bg-white py-2 px-5 text-[black] rounded-lg"
                            href={item.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >

                            View
                          </a>
                        </td> */}
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
