"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

interface ReelsCardProps {
    videoSrc: string;
    isCenter: boolean;
    autoplay: any;
}

export function ReelsCard({
    videoSrc,
    isCenter,
    autoplay
}: ReelsCardProps) {
    const t = useTranslations("OurGuests");

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            autoplay.play();
        } else {
            videoRef.current.play();
            autoplay.stop();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex justify-center items-center transition-all duration-500">
            <div
                className={`relative w-full max-w-[306px] h-[544px] overflow-hidden rounded-[32px] bg-black border-[3px] transition-all duration-500
                    ${isCenter
                        ? "border-[#BF9C66] scale-100"
                        : "border-transparent scale-95 opacity-70"
                    }`}
            >
                <div className="absolute top-4 left-4 bg-[#DCDCDC] px-3 py-1 rounded-full text-xs font-bold text-gray-700 z-20">
                    Reels
                </div>

                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                />

                <div className="absolute bottom-6 left-0 w-full px-6 flex items-center justify-center gap-2">
                    <a
                        href="https://www.instagram.com/samyakuz/"
                        target="_blank"
                        className="bg-white/90 backdrop-blur-md rounded-[47px] px-6 py-3 text-[#133C1E] flex items-center justify-center gap-2 whitespace-nowrap"
                        style={{ width: "204px", height: "41px" }}
                    >
                        <span className="truncate">{t("button")}</span>

                        <FaArrowRightLong className="shrink-0" />
                    </a>

                    <button
                        onClick={togglePlay}
                        className="bg-white rounded-full flex items-center justify-center"
                        style={{ width: "41px", height: "41px" }}
                    >
                        {isPlaying ? (
                            <FaPause
                                size={12}
                                className="text-[#0B2018]"
                            />
                        ) : (
                            <FaPlay
                                size={12}
                                className="text-[#0B2018]"
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}