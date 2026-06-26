"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

interface ReelsCardProps {
    videoSrc: string;
    isCenter: boolean;
    onPlay?: () => void;
    onPause?: () => void;
}

export function ReelsCard({ videoSrc, isCenter, onPlay, onPause }: ReelsCardProps) {
    const t = useTranslations("OurGuests");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isCenter && isPlaying && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.muted = true;
            setIsPlaying(false);
        }
    }, [isCenter, isPlaying]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current || !isCenter) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            onPause?.();
        } else {
            videoRef.current.muted = false;
            videoRef.current.play();
            setIsPlaying(true);
            onPlay?.();
        }
    };

    return (
        <div
            className="relative overflow-hidden bg-black"
            style={{
                width: "306px",
                height: "544px",
                borderRadius: "32px",
                border: isCenter ? "3px solid #BF9C66" : "3px solid transparent",
                flexShrink: 0,
            }}
        >
            <div className="absolute top-4 left-4 bg-[#DCDCDC] px-3 py-1 rounded-full text-xs font-bold text-gray-700 z-20">
                Reels
            </div>

            <video
                ref={videoRef}
                src={videoSrc}
                preload="auto"
                muted                 
                className="w-full h-full object-cover rounded-[32px]"
                loop
                playsInline
            />

            <div className="absolute bottom-6 left-0 w-full px-4 flex items-center justify-center gap-2 z-20">
                <a
                    href="https://www.instagram.com/samyak.uz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white/90 backdrop-blur-md rounded-[47px] px-5 py-2.5 text-[#133C1E] flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap"
                    style={{ flex: 1, maxWidth: "220px", height: "41px" }}
                >
                    <Image
                        src="/logos/Instagram_logo.svg"
                        alt="Instagram"
                        width={18}
                        height={18}
                        className="shrink-0"
                    />
                    <span className="truncate">{t("button")}</span>
                    <FaArrowRightLong className="shrink-0" size={12} />
                </a>

                {isCenter && (
                    <button
                        onClick={togglePlay}
                        className="bg-white rounded-full flex items-center justify-center shrink-0 hover:bg-gray-100 transition"
                        style={{ width: "41px", height: "41px" }}
                    >
                        {isPlaying
                            ? <FaPause size={12} className="text-[#0B2018]" />
                            : <FaPlay size={12} className="text-[#0B2018]" />
                        }
                    </button>
                )}
            </div>
        </div>
    );
}