import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Main } from "@/templates/Main";
import HomePage from "./home";
export default function Index() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  return (
    <Main>
      <HomePage/>
    </Main>
  );
}
