import Dropzone from "@/components/Dropzone";
import Navbar from "../components/navbar";
import { useSession } from "next-auth/react";

export default function UploadCourse() {

  const session = useSession().data;
  
  if (session?.user?.role === "user") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold">
            You are not Authorized to access this Page
          </div>
          <p className="text-gray-600">
            Please contact the administrator for assistance.
          </p>
        </div>
      </div>
    );
  } else {
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
  );}
}
