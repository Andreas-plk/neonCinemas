'use client';
import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import {FaPlayCircle} from "react-icons/fa";
import {dummyTrailers} from "@/assets/assets";
import {getYouTubeEmbedUrl} from "@/lib/utils";
const VideoPlayerButton = () => {
    const trailerUrl=getYouTubeEmbedUrl(dummyTrailers[0].videoUrl)|| "";

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button className="group my-button button-glow !w-[150]" onClick={() => setIsOpen(true)}>Watch Trailer
                <FaPlayCircle
                    className="drop-shadow-black drop-shadow-md group-hover:drop-shadow-none transition-all duration-700"/>
            </Button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="relative w-full max-w-4xl aspect-video mx-4 bg-black rounded-lg overflow-hidden">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-white text-3xl font-bold z-10 hover:text-red-400 cursor-pointer"
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <iframe
                            src={trailerUrl}
                            title="Trailer"
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoPlayerButton
