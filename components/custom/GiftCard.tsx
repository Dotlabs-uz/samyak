"use client"

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import Image from "next/image";

const FIGURES = [
    "/bubbles/figur1.png",
    "/bubbles/figur2.png",
    "/bubbles/figur3.png",
    "/bubbles/figur4.png",
];

type GiftCardProps = {
    title: string;
    image: string;
    active?: boolean;
    onClick?: () => void;
};

export function GiftCard({ title, image, active = false, onClick }: GiftCardProps) {
    const i = useTranslations("Gift");
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [figur] = useState(() => FIGURES[Math.floor(Math.random() * FIGURES.length)]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const desktopModal = (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", zIndex: 9998 }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        style={{ position: "fixed", inset: 0, display: "flex", zIndex: 9999 }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="flex-1 bg-[#133C1E] flex flex-col justify-center px-16 relative overflow-hidden"
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#BF9C66]/5 pointer-events-none" />
                            <span className="text-[#BF9C66] uppercase tracking-[0.3em] text-xs font-avantgarde font-bold mb-5 block relative z-10">
                                {i("badge")}
                            </span>
                            <h2 className="font-oceanic text-5xl xl:text-6xl text-white font-extrabold leading-[1.05] relative z-10">
                                {title}
                            </h2>
                        </motion.div>

                        <motion.div
                            className="flex-1 bg-[#F0EDE8] flex items-center justify-center relative overflow-hidden"
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="absolute w-[600px] h-[600px] pointer-events-none"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Image src={figur} alt="" fill className="object-contain opacity-30" />
                            </motion.div>
                            <motion.img
                                src={image} alt={title}
                                className="w-[400px] h-[400px] object-contain relative z-10"
                                initial={{ scale: 0.6, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.6, opacity: 0, y: 60 }}
                                transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </motion.div>

                        <motion.button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#133C1E] border border-white/20 flex items-center justify-center text-white z-10000 hover:bg-[#1f5a2d] transition cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <IoClose size={22} />
                        </motion.button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    const mobileSheet = (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 9998 }}
                    />
                    <motion.div
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: "fixed", bottom: 0, left: 0, width: "100vw", zIndex: 9999, background: "#133C1E", borderRadius: "28px 28px 0 0", padding: 20 }}
                    >
                        <div className="flex justify-center mb-4"><div className="w-10 h-1 rounded-full bg-white/20" /></div>
                        <div className="bg-[#F0EDE8] rounded-[20px] p-6 flex justify-center relative overflow-hidden">
                            <motion.div className="absolute w-[220px] h-[220px]" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                                <Image src={figur} alt="" fill className="object-contain opacity-20" />
                            </motion.div>
                            <img src={image} alt={title} className="w-[180px] h-[180px] object-contain relative z-10" />
                        </div>
                        <div className="mt-5">
                            <span className="text-[#BF9C66] uppercase tracking-[0.2em] text-xs block mb-2">{i("badge")}</span>
                            <h2 className="font-oceanic text-white text-2xl font-extrabold">{title}</h2>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <div onClick={onClick} className={clsx("group rounded-[28px] border overflow-hidden cursor-pointer transition-all duration-500", active ? "bg-[#133C1E] border-[#133C1E]" : "bg-white border-black/10 hover:bg-[#133C1E] hover:border-[#133C1E]")}>
            <div className="p-3">
                <div style={{ width: "100%", height: 163, borderRadius: 21, background: "#eaeae8", overflow: "hidden" }} className="flex items-center justify-center relative">
                    <Image src={figur} alt="" width={100} height={100} className="absolute opacity-50" />
                    <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain" }} className="transition-transform duration-300 group-hover:scale-105 relative z-10" />
                </div>
                <div className="flex flex-col items-center text-center gap-3 pt-3">
                    <span className="text-[#BF9C66] text-xs uppercase tracking-[0.25em] font-avantgarde font-semibold">{i("badge")}</span>
                    <h3 className={clsx("font-oceanic font-extrabold text-[34px] leading-[1.1] transition-colors duration-500", active ? "text-[#EAEAEA]" : "text-[#133C1E] group-hover:text-[#EAEAEA]")}>
                        {title}
                    </h3>
                    <button onClick={(e) => { e.stopPropagation(); setOpen(true); }} className="mt-2 flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all w-full cursor-pointer justify-center border-[#BF9C66] text-[#BF9C66]">
                        {i("button")} <FaArrowRightLong size={14} />
                    </button>
                </div>
            </div>
            {typeof window !== "undefined" && createPortal(isMobile ? mobileSheet : desktopModal, document.body)}
        </div>
    );
}