
import { signOut} from "@/auth"

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button className="cursor-pointer rounded-4xl bg-primer w-[100px] hover:bg-second button-glow" type="submit">SignOut</button>
        </form>
    )
}