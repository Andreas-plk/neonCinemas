"use client";
import { useState } from "react";



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
            <button
                onClick={handleImport}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Importing..." : "Import Movie"}
            </button>
            {success && <p className="text-green-500 mt-2">Movie imported!</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
