import Image from "next/image";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PulseLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import QuizCreator from "../components/QuizCreator";

const CreateQuiz = () => {
  const session = useSession().data;
  const [loading, setLoading] = useState(false);
  const [quizTitles, setQuizTitles] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedQuizObject, setSelectedQuizObject] = useState();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (session?.user?.name) getQuizDetails();
  }, [session]);

  const getQuizDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/getAllQuizNames?name=${session?.user?.name}`,
        {
          method: "GET",
        }
      );
      const data = await response.json(); // Convert the response to JSON
      setQuizTitles(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedOption !== "") {
      const quizObject = quizTitles?.filter(
        (item) => item.courseName === selectedOption
      );
      setSelectedQuizObject(quizObject);
    }
  }, [selectedOption]);
  return (
    <Main
      meta={
        <Meta
          title="Create Quiz"
          description="Learn more about our e-learning platform"
        />
      }
    >
      <ToastContainer />
      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <PulseLoader color="#FF854A" size={20} />
        </div>
      ) : (
        <div className="p-5">
          <div className="flex justify-center ">
            <div className="pt-5 font-bold">
              <div className="flex items-center space-x-2">
                <span className="">Teacher Name:</span>
                <span className="font-normal">{session?.user?.name}</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <label htmlFor="options" className="font-bold">
                  Select Quiz Title:
                </label>
                <select
                  id="options"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="rounded-md border border-gray-300 px-2 py-1"
                >
                  <option value="">Choose an option</option>
                  {quizTitles?.map((quizTitle) => {
                    const title = quizTitle.courseName;
                    return (
                      <option key={quizTitle._id} value={title}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-5">
            <QuizCreator selectedQuizObject={selectedQuizObject} />
          </div>
        </div>
      )}
    </Main>
  );
};

export default CreateQuiz;
