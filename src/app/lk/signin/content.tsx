"use client";

import { signIn } from "@/authserver"
import GoogleSignIn from "@/components/std/googlesignin"

export default function SignInPage() {
  const resendAction = (formData: FormData) => {
    signIn("resend", formData)
  }

  return (
    <div className="stdcontainer flex flex-col gap-10">
      <form className="flex flex-col gap-10" action={resendAction}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">ПОЧТА</label>
          <input type="email" name="email" className="bg-emerald-200 p-4 rounded-xl" />
        </div>
        <button className="button">Войти</button>
      </form>
      <GoogleSignIn></GoogleSignIn>
    </div>
  )
}
