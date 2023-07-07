import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { PulseLoader } from "react-spinners";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const Profile = () => {
  const session = useSession().data;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
  }, [selectedFile]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfileData();
    }
  }, [session]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/getLoggedUser?userID=${session?.user?.id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json(); // Convert the response to JSON
      setProfile(data.profile);
      setFName(data.profile?.firstname);
      setLName(data.profile?.lastname);
      setRole(data.profile?.role);
      setEducation(data.profile?.education);
      setPhone(data.profile?.phone);
      setEmail(data.profile?.email);
      setProfilePic(data.profile?.profilePic);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (selectedFile) {
      const name = selectedFile.name;
      const storageRef = ref(storage, `profilePic/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              showToast("Upload is paused");
              break;
            case "running":
              showToast("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            const requestBody = {
              fname: Fname,
              lname: Lname,
              profilePic: url,
              role: role,
              education: education,
              phone: phone,
              userID: session?.user?.id,
              email: email,
            };
            try {
              const response = await fetch("/api/updateProfile", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                  "Content-Type": "application/json", // Set the Content-Type header to application/json
                },
              });
              const data = await response.json();
              if (data.success) {
                showToast("Profile Updated");
                setLoading(false);
              }
            } catch (error) {
              console.error("Error uploading profile picture:", error);
              setLoading(false);
            }
          });
        }
      );
    } else {
      const requestBody = {
        fname: Fname,
        lname: Lname,
        role: role,
        education: education,
        phone: phone,
        userID: session?.user?.id,
        email: email,
      };
      try {
        const response = await fetch("/api/updateProfile", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to application/json
          },
        });
        const data = await response.json();
        if (data.success) {
          showToast("Profile Updated");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />
      <Head>
        <title>Profile</title>
      </Head>
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <PulseLoader color="#FF854A" size={20} />
          </div>
        ) : (
          <div className="">
            <div className="flex items-center justify-center px-4">
              <ToastContainer />
              <div className="hidden md:block md:w-1/2">
                <div className="relative">
                  <img
                    className="flex items-center justify-center rounded-full object-cover object-center"
                    src={profilePic}
                    alt="Profile Picture"
                  />
                </div>
              </div>

              <div className="mx-auto max-w-md p-6">
                <h2 className="mb-4 text-2xl font-[700]">Your Profile</h2>
                <form onSubmit={handleFormSubmit}>
                  <label className="mb-4 block">
                    <span className="text-gray-700">First Name:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                      value={Fname}
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </label>
                  <label className="mb-4 block">
                    <span className="text-gray-700">Last Name:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                      value={Lname}
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </label>
                  <label className="mb-4 block">
                    <span className="text-gray-700">Phone:</span>
                    <input
                      className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                      value={phone}
                      type="phone"
                      maxLength={11}
                      id="number"
                      placeholder="Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                  <label className="mb-4 block">
                    <span className="text-gray-700">Email:</span>
                    <input
                      disabled
                      type="text"
                      className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>

                  <label className="mb-4 block">
                    <span className="text-gray-700">Your Role:</span>
                    <input
                      disabled
                      className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                      value={role || ""}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </label>
                  {education && (
                    <label className="mb-4 block">
                      <span className="text-gray-700">Education:</span>
                      <input
                        name="role"
                        className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </label>
                  )}
                  <label className="mb-4 block">
                    <span className="text-gray-700">Profile Pic:</span>
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      name="book"
                      className="mt-1 block w-full rounded-md border border-[#FFC1A3] p-3 shadow-sm ring-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </label>
                  <div className="flex items-center justify-center self-center">
                    <button
                      type="submit"
                      className=" mt-12  rounded-md border border-[#FFC1A3] px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-[#FFC1A3] focus:border-[#FFC1A3] focus:ring-[#FFC1A3]"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
