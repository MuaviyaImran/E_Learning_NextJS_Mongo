import Dropzone from "@/components/Dropzone";
import Navbar from "../components/navbar";
export default function UploadCourse() {
  return (
    <><header>
    <Navbar />
  </header>
  
    <section className="px-32 py-10">
      <div className="container">
        <h1 className="text-3xl font-bold">Upload Course</h1>
        <Dropzone className="mt-10 border border-neutral-200 p-8" />
      </div>
    </section></>
  );
}
