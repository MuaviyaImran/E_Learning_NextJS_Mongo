import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { useRouter } from "next/router";
import showToast from "../lib/toast";
import Navbar from "../components/navbar";
import { PDFDocument, rgb } from "pdf-lib";
import Head from "next/head";

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { quizID, courseName } = router.query;

  useEffect(() => {
    if (quizID) getQuiz();
  }, [quizID]);

  useEffect(() => {
    if (certificateUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = certificateUrl;
      downloadLink.download = "certificate.pdf";
      downloadLink.click();
    }
  }, [certificateUrl]);

  const getQuiz = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizID: quizID,
        }),
      });
      const data = await response.json();
      setQuizData(data.quizData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[currentQuestionIndex] = optionIndex;
      return updatedOptions;
    });
  };
  const generateCertificate = async () => {
    const existingPdfBytes = await fetch("/certificate.pdf").then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    const textX = width / 4;
    const textY = height / 2;
    const textX2 = width / 3;
    const textY2 = height / 3.3;

    firstPage.drawText(session.user.name, {
      x: textX,
      y: textY,
      size: 40,
      color: rgb(1, 1, 1),
      opacity: 1,
    });

    firstPage.drawText(`Course Name: ${courseName}`, {
      x: textX2,
      y: textY2,
      size: 25,
      color: rgb(1, 1, 1),
      opacity: 1,
    });
    const modifiedPdfBytes = await pdfDoc.save();

    const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
      type: "application/pdf",
    });
    const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
    setCertificateUrl(modifiedPdfUrl);
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOption) {
        score++;
      }
    });

    const scorePercentage = ((score / quizData.questions.length) * 100).toFixed(
      2
    );
    if (scorePercentage > 60) {
      showToast(
        `Your score: ${scorePercentage}% Congratulations on your Success`
      ).then(() => {
        generateCertificate().then(async () => {
          const body = {
            courseName: courseName,
            quizID: quizID,
            studentID: session?.user?.id,
            studentName: session?.user?.name,
            quizStatus: "Pass",
          };
          try {
            setLoading(true);
            const response = await fetch("/api/saveQuizRecord", {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json", // Set the Content-Type header to application/json
              },
            });
            const data = await response.json();
            if (data.success) {
              setLoading(false);
            }
          } catch (error) {
            console.error("Error uploading profile picture:", error);
            setLoading(false);
          }
          router.push("/");
        });
      });
    } else {
      showToast(`Your score: ${scorePercentage}% Better Luck Next Time`).then(
        async () => {
          const body = {
            courseName: courseName,
            quizID: quizID,
            studentID: session?.user?.id,
            studentName: session?.user?.name,
            quizStatus: "Fail",
          };
          try {
            setLoading(true);
            const response = await fetch("/api/saveQuizRecord", {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json", // Set the Content-Type header to application/json
              },
            });
            const data = await response.json();
            if (data.success) {
              setLoading(false);
            }
          } catch (error) {
            console.error("Error uploading profile picture:", error);
            setLoading(false);
          }
          router.push("/");
        }
      );
    }
  };

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <Navbar />
      <div className="mx-auto max-w-md">
        <ToastContainer />
        {loading ? (
          <div className="visible flex items-center justify-center">
            <PulseLoader color="#FF854A" size={20} />
          </div>
        ) : (
          <div className="flex h-screen flex-col justify-center">
            <h1 className="mb-4 text-2xl font-semibold">
              Quiz for Course "{courseName}"
            </h1>

            {/* Display the current question */}
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold">
                Question {currentQuestionIndex + 1}
              </h2>
              <p>{currentQuestion?.question}</p>
            </div>

            {/* Display the options */}
            <div className="mb-6 cursor-pointer">
              {currentQuestion?.options.map((option, index) => (
                <div
                  key={index}
                  className={`rounded-md border p-3 ${
                    selectedOptions[currentQuestionIndex] === index
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="mb-6">
              {currentQuestionIndex > 0 && (
                <button
                  className="mr-2 rounded-md bg-indigo-500 px-4 py-2 text-white"
                  onClick={() =>
                    setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
                  }
                >
                  Previous
                </button>
              )}

              {currentQuestionIndex < quizData?.questions?.length - 1 ? (
                <button
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white"
                  onClick={() =>
                    setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white"
                  onClick={handleSubmitQuiz}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
