'use client'
import { Button } from "@/components/ui/button";
import {Map} from 'lucide-react'
interface CinemaMapButtonProps {
    address: string;
    label?: string;
}

export function CinemaMapButton({ address, label = "View on Google Maps" }: CinemaMapButtonProps) {
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(url, "_blank"); // open in new tab
    };

    return (
        <Button onClick={openGoogleMaps} variant="link"  className="cursor-pointer text-text" size="sm">
            <Map/>{label}
        </Button>
    );
}
