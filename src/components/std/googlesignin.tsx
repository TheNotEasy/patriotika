import { signIn } from "@/authserver"

export default function Googlesignin() {
  return (
    <form
      action={() => signIn("google")}
    >
      <button type="submit" className="button w-full">Войти с помощью Google</button>
    </form>
  )
}