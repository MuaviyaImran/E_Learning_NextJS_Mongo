import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useRouter } from "next/router";
import Head from "next/head";

const ChatReply = () => {
  const session = useSession().data;
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { commentID } = router.query;

  useEffect(() => {
    if (commentID) fetchChat();
  }, [session]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const fetchChat = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/getChat?id=${commentID}`, {
        method: "GET",
      });
      const chat = await response.json();
      setChats(chat);
      setLoading(false);
      // Handle the retrieved chat document
    } catch (error) {
      console.error("Error retrieving chat:", error);
      setLoading(false);
      // Handle error
    }
  };

  const saveChat = async () => {
    try {
      setLoading(true);

      const reply = {
        profilePic: session?.user?.image,
        createdByID: session?.user?.id,
        createdByName: session.user.name,
        msg: message,
      };

      const response = await fetch("/api/addReply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentID, reply }),
      });
      if (response.ok) {
        fetchChat();
        // Handle success or perform additional actions
        setLoading(false);
        setMessage("");
      } else {
        showToast("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error saving chat:", error);
      setLoading(false);
      // Handle error
    }
  };
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <ToastContainer />
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center px-5 py-3">
          <PulseLoader color="#FF8B4B" size={20} />
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="mx-4 mt-3">
              <div className="text-center">
                <h1 className="text-black-100 font-courierPrime  font-bold ">
                  {
                    <>
                      <div className="flex items-center justify-start">
                        <img
                          src={chats?.profilePic}
                          alt="profilePic"
                          className="h-20 w-20 rounded-full "
                        />
                        <span className="px-2 text-[20px] slg:text-[30px] xl:text-[45px]">
                          {chats?.createdByName}
                        </span>
                      </div>
                      <div className="px-2 text-[28px] slg:text-[26px] xl:text-[36px]">
                        {chats?.msg}
                      </div>
                    </>
                  }
                </h1>
              </div>
            </div>
            {chats?.replies?.length === 0 ? (
              // Render a placeholder or empty state when chats array is empty
              <div className="py-10 text-center text-[28px] slg:text-[26px] xl:text-[36px]">
                No Replies Found Yet.
              </div>
            ) : (
              chats?.replies?.map((chat) => (
                <div
                  key={chat?._id}
                  className="mx-4 my-4 overflow-auto rounded-2xl bg-[#FDDDD2]"
                >
                  <div className="flex w-full items-center rounded-2xl px-4 pt-2">
                    <img
                      src={chat?.profilePic}
                      alt="profilePic"
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="px-2">{chat?.msg}</span>
                  </div>
                  <div className="px-4 pb-2 text-right text-[12px] text-black">
                    {new Date(chat?.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
          {session?.user?.role !== "user" ? (
            <footer>
              <div className="mx-auto max-w-md">
                <div className="flex">
                  <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type your Query..."
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    disabled={message === ""}
                    onClick={saveChat}
                    type="button"
                    className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white
                   hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                  >
                    Send
                  </button>
                </div>
              </div>
            </footer>
          ) : null}
        </>
      )}
    </>
  );
};

export default ChatReply;
