import SignInPage from "./content"
import {auth} from "@/auth";
import {redirect} from "next/navigation"

export default async function() {
  const user = await auth();
  if (user) {
    redirect("/lk");
  }
  return <SignInPage />
}