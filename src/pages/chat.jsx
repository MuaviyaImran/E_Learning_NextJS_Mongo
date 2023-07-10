import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import { ToastContainer } from "react-toastify";
import showToast from "../lib/toast";
import { useRouter } from "next/router";
import Head from "next/head";
const Chat = () => {
  const session = useSession().data;
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchChat();
  }, [session]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const fetchChat = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/getChat`, {
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
      const chatData = {
        profilePic: session.user.image,
        createdByID: session.user.id,
        createdByName: session.user.name,
        msg: message,
      };

      const response = await fetch("/api/createchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatData),
      });
      if (response.ok) {
        fetchChat();
        // Handle success or perform additional actions
        setLoading(false);
        setMessage("");
      } else {
        showToast("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error saving chat:", error);
      setLoading(false);
      // Handle error
    }
  };
  const handleChatReply = (id) => {
    router.push({
      pathname: "/chatReply",
      query: { commentID: id },
    });
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
                <h1 className="text-black-100 font-courierPrime text-[27px] font-bold slg:text-[35px] xl:text-[55px]">
                  Discussions
                </h1>
              </div>
            </div>
            {chats?.map((chat) => {
              return (
                <div
                  key={chat._id}
                  onClick={() => handleChatReply(chat?._id)}
                  className="mx-4 my-4 cursor-pointer overflow-auto rounded-2xl bg-[#FDDDD2]"
                >
                  <div className="flex w-full items-center rounded-2xl  px-4 pt-2">
                    <img
                      src={chat?.profilePic}
                      alt="profilePic"
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="px-2 font-[700]">
                      {chat?.createdByName}
                    </span>
                    <span className="font-[500] text-[red]">
                      {chat?.replies.length}
                    </span>
                  </div>
                  <div className="px-16 ">{chat?.msg}</div>
                  <div className="px-4 pb-2 text-right text-[12px] text-black">
                    {new Date(chat?.created_at).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
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
        </>
      )}
    </>
  );
};

export default Chat;
