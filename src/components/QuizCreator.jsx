import { useState } from "react";
import axios from "axios";
import showToast from "../lib/toast";
import { ToastContainer } from "react-toastify";

const QuizCreator = ({ selectedQuizObject }) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const handleNumQuestionsChange = (e) => {
    const count = Number(e.target.value);
    setNumQuestions(count);
    setQuestions(
      new Array(count).fill({
        question: "",
        options: ["", "", "", ""],
        correctOption: 0,
      })
    );
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = Number(e.target.value);
    setQuestions(updatedQuestions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the questions array to the API endpoint
      const courseID = selectedQuizObject[0].courseID;
      const response = await axios.post("/api/quiz", { questions, courseID });
      showToast(response.data); // Log the response from the API

      // Reset the form or navigate to another page
      // ...
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <ToastContainer />
      <div className="mb-4">
        <label htmlFor="numQuestions" className="font-semibold">
          Number of Questions:
        </label>
        <input
          type="number"
          id="numQuestions"
          min="1"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          required
          className="mt-1 block w-full rounded-md border-black p-3 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      {questions.map((question, index) => (
        <div
          key={index}
          className="bottom-1 mb-6 border-2 border-black p-5 ring-black"
        >
          <label htmlFor={`question${index + 1}`} className="font-bold">
            Question {index + 1}:
          </label>
          <input
            type="text"
            id={`question${index + 1}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(e, index)}
            required
            className="mt-1 block w-full rounded-md border-black p-3 shadow-sm ring-black focus:border-black focus:ring-black"
          />
          {question.options.map((option, optionIndex) => (
            <div className="mt-4">
              <span className="font-bold">Option {optionIndex + 1}:</span>
              
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, index, optionIndex)}
                required
                className="mt-1 block w-full rounded-md border-black p-3 shadow-sm focus:border-black focus:ring-black"
              />
              
            </div>
          ))}
          <label
            htmlFor={`correctOption${index + 1}`}
            className="font-bold"
          >
            Correct Option:
          </label>
          <select
            id={`correctOption${index + 1}`}
            value={question.correctOption}
            onChange={(e) => handleCorrectOptionChange(e, index)}
            required
            className="mt-1 block w-full rounded-md border-black p-3 shadow-sm focus:border-black focus:ring-black"
          >
            {question.options.map((_, optionIndex) => (
              <option key={optionIndex} value={optionIndex}>
                Option {optionIndex + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 font-semibold text-white hover:bg-indigo-600"
      >
        Create Quiz Questions
      </button>
    </form>
  );
};

export default QuizCreator;
