
import { signIn } from "@/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button className="border cursor-pointer" type="submit">Sign-in with Google</button>
        </form>
    )
}