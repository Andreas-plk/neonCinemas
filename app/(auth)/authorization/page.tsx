import FlipForm from "@/components/FlipForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";


const LoginForm = async () => {

    const session = await auth();
    if (session) {
        redirect("/")
    }
  return  (
            <div className="mt-4 md:mt-10">
               <FlipForm/>
            </div>
    )
}
export default LoginForm
