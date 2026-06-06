"use client"

import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { IoSparklesSharp, IoClose } from "react-icons/io5"
import { FaArrowRightLong } from "react-icons/fa6"
import categoryFeatures from '@/data/features.json'

const FIGURES = [
    "/bubbles/figur1.png",
    "/bubbles/figur2.png",
    "/bubbles/figur3.png",
    "/bubbles/figur4.png",
]

const ProductCard = ({
    image,
    category,
    index = 0,
    name,
    price,
    description,
}: {
    image: string
    category: string
    index?: number
    name?: string
    price?: string
    description?: string
}) => {
    const locale = useLocale()
    const t = useTranslations("Products")
    const [open, setOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const figur = FIGURES[index % FIGURES.length]
    const features = (categoryFeatures[category as keyof typeof categoryFeatures] ?? categoryFeatures.supplements)[locale as 'ru' | 'uz' | 'en']

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
                            className="relative flex-1 flex flex-col justify-center px-16 py-14 bg-[#133C1E] overflow-hidden"
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#BF9C66]/8 pointer-events-none" />
                            <div className="absolute top-20 -right-10 w-[200px] h-[200px] rounded-full bg-white/5 pointer-events-none" />

                            <motion.span
                                className="text-[#BF9C66] uppercase tracking-[0.3em] text-xs font-avantgarde font-bold mb-5 block"
                                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {t(`categories.${category}`)}
                            </motion.span>
                            <motion.h2
                                className="font-oceanic text-5xl xl:text-6xl text-white font-extrabold leading-[1.05] mb-7"
                                initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.38, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {name}
                            </motion.h2>
                            <motion.p
                                className="font-involve text-white/65 text-lg leading-relaxed max-w-[460px] mb-10"
                                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.46, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {description}
                            </motion.p>
                            <motion.div
                                className="flex flex-col gap-3 mb-12"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.54, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {features.map((f) => (
                                    <div key={f} className="flex items-center gap-3 text-white/75 font-involve text-base">
                                        <IoSparklesSharp className="text-[#BF9C66] shrink-0" size={14} />
                                        {f}
                                    </div>
                                ))}
                            </motion.div>
                            <motion.div
                                className="flex items-end gap-8"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.62, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div>
                                    <span className="text-white/40 text-xs font-avantgarde uppercase tracking-widest block mb-2">{t('price_label')}</span>
                                    <span className="text-[#BF9C66] text-4xl font-oceanic font-extrabold">{price}</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="relative flex-1 flex items-center justify-center bg-[#F0EDE8] overflow-hidden"
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="absolute w-[600px] h-[600px] pointer-events-none select-none"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Image src={figur} alt="" fill className="object-contain opacity-30" />
                            </motion.div>
                            <motion.div
                                className="absolute w-[360px] h-[360px] pointer-events-none select-none"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                            >
                                <Image src={figur} alt="" fill className="object-contain opacity-15" />
                            </motion.div>
                            <motion.img
                                src={image} alt={name}
                                className="relative z-10 w-[400px] h-[400px] object-contain drop-shadow-2xl"
                                initial={{ scale: 0.6, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.6, opacity: 0, y: 60 }}
                                transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.div
                                className="absolute bottom-14 right-14 bg-white rounded-2xl px-6 py-4 shadow-xl"
                                initial={{ opacity: 0, y: 24, scale: 0.85 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.7, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="text-[#133C1E] font-oceanic font-bold text-xl">{price}</span>
                                <span className="text-[#BF9C66] text-xs font-avantgarde block mt-0.5">{t(`categories.${category}`)}</span>
                            </motion.div>
                        </motion.div>

                        <motion.button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#133C1E] border border-white/20 flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            style={{ zIndex: 10000 }}
                        >
                            <IoClose size={22} />
                        </motion.button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )

    const mobileSheet = (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setOpen(false)}
                        style={{
                            position: "fixed",
                            top: 0, left: 0,
                            width: "100vw", height: "100vh",
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(6px)",
                            zIndex: 9998,
                        }}
                    />

                    <motion.div
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            width: "100vw",
                            maxHeight: "88dvh",
                            zIndex: 9999,
                            background: "#133C1E",
                            borderRadius: "28px 28px 0 0",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "12px 0 8px",
                            flexShrink: 0,
                        }}>
                            <div style={{ width: 40, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.2)" }} />
                        </div>

                        <div style={{
                            margin: "0 16px",
                            borderRadius: 20,
                            background: "#F0EDE8",
                            height: 200,
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <motion.div
                                style={{ position: "absolute", width: 220, height: 220 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Image src={figur} alt="" fill style={{ objectFit: "contain", opacity: 0.2 }} />
                            </motion.div>
                            <motion.img
                                src={image} alt={name}
                                style={{ width: 150, height: 150, objectFit: "contain", position: "relative", zIndex: 1 }}
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>

                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            overflowX: "hidden",
                            padding: "16px 20px 40px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 14,
                            WebkitOverflowScrolling: "touch",
                            boxSizing: "border-box",
                            width: "100%",
                        }}>
                            <motion.div
                                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <span style={{ display: "block", color: "#BF9C66", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
                                    {t(`categories.${category}`)}
                                </span>
                                <h2 className="font-oceanic" style={{ color: "white", fontSize: 22, fontWeight: 800, lineHeight: 1.2, margin: 0, wordBreak: "break-word", overflowWrap: "break-word" }}>
                                    {name}
                                </h2>
                            </motion.div>

                            <motion.p
                                className="font-involve"
                                style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6, margin: 0, wordBreak: "break-word", overflowWrap: "break-word" }}
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.27, duration: 0.4 }}
                            >
                                {description}
                            </motion.p>

                            <motion.div
                                style={{ display: "flex", flexDirection: "column", gap: 8 }}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.34, duration: 0.4 }}
                            >
                                {features.map((f) => (
                                    <div key={f} className="font-involve" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
                                        <IoSparklesSharp style={{ color: "#BF9C66", flexShrink: 0 }} size={11} />
                                        <span style={{ wordBreak: "break-word" }}>{f}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <span className="font-avantgarde" style={{ display: "block", color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
                                    {t('price_label')}
                                </span>
                                <span className="font-oceanic" style={{ color: "#BF9C66", fontSize: 24, fontWeight: 800 }}>
                                    {price}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="relative flex flex-col items-center justify-between p-3 md:p-4 rounded-3xl hover:shadow-xl transition cursor-pointer h-[240px] md:h-[320px] group"
            >
                <div className="relative flex items-center justify-center w-full h-[130px] md:h-[180px] shrink-0">
                    <div className="absolute w-[110px] h-[110px] md:w-[160px] md:h-[160px] pointer-events-none select-none transition-transform duration-700 group-hover:rotate-12">
                        <Image src={figur} alt="" fill className="object-contain opacity-70" />
                    </div>
                    <img
                        src={image} alt={name}
                        className="relative z-10 w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <h3 className="text-sm md:text-xl font-semibold font-oceanic text-[#BF9C66] text-center line-clamp-2">
                    {name}
                </h3>
                <div className="flex gap-2 md:gap-4 text-xs md:text-sm text-[#5C5C5C] flex-wrap justify-center">
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#BF9C66]" />
                        {t("halal")}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#BF9C66]" />
                        {t("gelatin_free")}
                    </div>
                </div>
            </div>

            {typeof window !== "undefined" && createPortal(
                isMobile ? mobileSheet : desktopModal,
                document.body
            )}
        </>
    )
}

export default ProductCard
