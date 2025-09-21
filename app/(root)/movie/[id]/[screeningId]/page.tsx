import CinemaSeats from "@/components/CinemaSeats";
import {getScreening} from "@/app/actions";


const Page = async ({params}:{params:Promise<{id:string,screeningId:string}>}) => {
    const {id,screeningId} = await params;
    const screening = await getScreening(screeningId);
    console.log(screening);
    console.log(screeningId);
    if (!screening) {
        return ;
    }
    return (
        <div className="m-3 md:m-7 p-1">
            <h1 className="uppercase font-semibold text-center text-3xl">select seats</h1>
            <div className="flex flex-col items-center mb-9 w-full md:w-3/4">
                <svg viewBox="0 0 300 50" className=" w-[400] md:w-[1000px] md:h-[90px]" preserveAspectRatio="none">
                    <path d="M 0 50 Q 150 0 300 50" stroke="#D4A373" fill="none" strokeWidth="4" />
                </svg>
                <span className="text-sm uppercase text-text/70 mt-1">screen</span>
            </div>
            <CinemaSeats rows={screening.room.rows} seatsPerRow={screening.room.seatsPerRow} sections={screening.room.sections} screeningId={screeningId} id={id}/>
          </div>
    )
}
export default Page
