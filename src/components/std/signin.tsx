import { signIn } from "@/authserver"

export default function SignIn() {
  return (
    <form
      action={() => signIn("google")}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
}