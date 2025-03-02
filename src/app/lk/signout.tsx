"use client";

import {signOut} from "@/authserver";

export default function() {
  return <button className="button !bg-destructive" onClick={async () => {
    await signOut()
  }}>Выйти с аккаунта</button>
}