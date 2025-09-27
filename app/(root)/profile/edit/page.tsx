import {auth} from "@/auth";
import {redirect} from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";



const Page =async () => {

    const session = await auth();
    if(!session) {
        redirect('/')
    }
    return (
        <div className="p-5 md:p-25 space-y-6 md:space-y-8">
            <h1 className="text-center font-semibold text-3xl">Update Profile</h1>
            <UpdateProfileForm />
        </div>
    )
}
export default Page
