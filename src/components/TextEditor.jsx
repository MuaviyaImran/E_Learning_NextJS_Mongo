import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = ({ onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Write something...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], // Custom toolbar options
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
        ],
      },
    });

    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });

    return () => {
      quill.off("text-change");
    };
  }, []);

  const handleDownload = () => {
    const text = editorRef.current.querySelector(".ql-editor").textContent;
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text_content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <div ref={editorRef} />
      <button onClick={handleDownload}>Download Notes As File</button>
    </div>
  );
};

export default TextEditor;
