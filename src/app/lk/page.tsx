"use server";

import {auth} from "@/auth"
import {redirect} from "next/navigation"
import SignOutButton from "@/app/lk/signout";
import {connection} from "next/server";

export default async function() {
  await connection();
  const user = await auth();
  if (!user) {
    redirect("/lk/signin");
  }

  return (
    <div className="stdcontainer flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <img src={user.user!.image!} alt="" className="mx-auto rounded-full" />
        <h1 className="font-bold text-xl mx-auto w-fit">{user.user!.name!}</h1>
      </div>
      <nav className="flex flex-col max-w-52 w-full mx-auto">
        <SignOutButton />
      </nav>
    </div>
  )
}