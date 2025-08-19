import FlipForm from "@/components/FlipForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import Link from "next/link";


const LoginForm = async () => {

    const session = await auth();
    if (session) {
        redirect("/")
    }
  return  (
            <div className="mt-4 md:mt-10">
               <FlipForm/>
                <Link className="absolute right-1 bottom-1 text-xs text-text/90" href={"/admin"}>Admin</Link>
            </div>
    )
}
export default LoginForm
