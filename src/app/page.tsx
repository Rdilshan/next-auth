
import { signOut, signIn } from "@/auth"
import { auth } from "../auth"

export default async function Home() {
  const session = await auth()

  if (!session) {
    return (
      <div>
        <form
          action={async () => {
            "use server"
            await signIn()
          }}
        >
          <button type="submit">Sign in</button>
        </form>
      </div>
    )
  }

  return (
    <>
      <div>
        <div>
          <img src={(session as any).user.image} alt="User Avatar" />
        </div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </>
  );
}
