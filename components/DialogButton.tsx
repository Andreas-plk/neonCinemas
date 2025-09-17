
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CinemaFormBlock from "@/components/CinemaFormBlock";
const DialogButton = ({tmdbId}:{tmdbId:number}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button  className="my-button button-glow !w-full">Import</Button>
            </DialogTrigger>
            <DialogContent className="!max-w-2xl w-full flex flex-col justify-center items-center max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader>
                    <DialogTitle>Δημιουργία Προβολών</DialogTitle>
                </DialogHeader>

                {/* Εδώ περνάμε το tmdbId για να ξέρει ποια ταινία αφορά */}
                <CinemaFormBlock movieId={tmdbId} />
            </DialogContent>
        </Dialog>
    );
}
export default DialogButton
