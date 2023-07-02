import { Form, Preview } from "./cvMaker/components";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import styles from "../styles/cvMaker.module.css";
import Navbar from "../components/navbar";
function App() {
  const { language } = useSelector((state) => state.language);
  const { top, right, bottom, left } = useSelector(
    (state) => state.site.margins
  );

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const getPageMargins = () => {
    return `@page { margin: ${top}px ${right}px ${bottom}px ${left}px !important; }`;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <><header>
    <Navbar />
  </header>
    <div className={styles.app}>
      <Form handlePrint={handlePrint} />
      <div className={styles.print}>
        <style>{getPageMargins()}</style>
        <Preview ref={printRef} />
      </div>
    </div></>
    
  );
}

export default App;
