
import { signOut} from "@/auth"

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button className="border cursor-pointer" type="submit">SignOut</button>
        </form>
    )
}