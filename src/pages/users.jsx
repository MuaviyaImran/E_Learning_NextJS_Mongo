import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import PulseLoader from "react-spinners/PulseLoader";

const Card = ({ users }) => {
  const {
    firstname,
    lastname,
    email,
    role,
    createdAt,
    phone,
    profilePic,
    education,
  } = users;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  return (
    <div className="rounded-lg border-[#FFC1A3] bg-white p-6 shadow-xl hover:bg-[#FFC1A3]">
      <div className="mb-4 flex items-center justify-center">
        <img
          className="h-24 w-24 rounded-full object-cover"
          src={profilePic}
          alt="Profile"
        />
      </div>
      <h2 className="mb-2 text-2xl font-bold">{`${firstname} ${lastname}`}</h2>
      <p className="text-[black]-500 mb-2 font-[700]">
        Email: <span className=" font-[400]">{email}</span>
      </p>
      <p className="mb-2 font-[700] text-[black]">
        Role: <span className=" font-[400]">{role}</span>
      </p>
      <p className="mb-2 font-[700] text-[black]">
        Qualification: <span className=" font-[400]">{education}</span>
      </p>
      <p className="mb-2 font-[700] text-[black]">
        Contact: <span className=" font-[400]">{phone}</span>
      </p>
      <p className="mb-2 font-[700] text-[black]">
        Joined On: <span className=" font-[400]">{formattedDate}</span>
      </p>
    </div>
  );
};

const CardList = () => {
  const session = useSession();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getUsersList", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } else {
        setUsers([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
    }
  };
  useEffect(() => {
    getUsers();
  }, [session]);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-2xl font-semibold">User's Collection</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="visible flex items-center justify-center">
              <PulseLoader color="#FF854A" size={20} />
            </div>
          ) : (
            users?.map((item) => <Card key={item._id} users={item} />)
          )}
        </div>
      </div>
    </>
  );
};

export default CardList;
