"use client";
import { useState } from "react";
import{Button} from "@/components/ui/button";


export default function ImportButton({ tmdbId }: {tmdbId: number}) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleImport = async () => {
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/add_movie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tmdbId }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Import failed");

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button
                onClick={handleImport}
                disabled={loading}
                className="my-button button-glow !w-full"
            >
                {loading ? "Importing..." : "Import Movie"}
            </Button>
            {success && <p className="text-green-500 mt-2">Movie imported!</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
