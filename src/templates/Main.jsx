
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sideBar";

export function Main(props) {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  if (session.status === "loading") {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {props.meta}

      <header>
        <Navbar />
      </header>

      <div className="flex-1 flex">
        <Sidebar className="overflow-y-hidden"/>
        <main className="flex-1 content ">
          {props.children}
        </main>
      </div>
    </div>
  );
}
