import { signIn } from "@/authserver"
import {useState} from "react";

export default function Googlesignin() {
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={() => {
        setLoading(true);
        signIn("google")
      }}
    >
      <button type="submit" className="button w-full">{loading ? "Войти с помощью Google" : "Загрузка..."}</button>
    </form>
  )
}