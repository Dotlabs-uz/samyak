"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function HeroIntro({ t, onTitleDone, onDescDone }: { t: any; onTitleDone: () => void; onDescDone: () => void }) {
    const [titleStarted, setTitleStarted] = useState(false)
    const [visibleCountTags, setVisibleCountTags] = useState(0)
    const [visibleCountTitle, setVisibleCountTitle] = useState(0)
    const [goldIdx, setGoldIdx] = useState(-1)
    const [settled, setSettled] = useState(false)

    const tags = [t("tagImport"), t("tagPremium"), t("tagTabiiy")]
    const rawTitle: string = t("title")
    const words = rawTitle.split(" ")

    const targetIdx = (() => {
        const idx = words.findIndex(w =>
            w.toLowerCase().replace(/[^a-z']/g, "").includes("sog") ||
            w.toLowerCase().includes("healthy") ||
            w.toLowerCase().includes("здоровой")
        )
        return idx >= 0 ? idx : 0
    })()

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = []
        tags.forEach((_, i) => {
            timers.push(setTimeout(() => {
                setVisibleCountTags(i + 1)
                if (i === tags.length - 1) {
                    timers.push(setTimeout(() => setTitleStarted(true), 250))
                }
            }, 100 + i * 280))
        })
        return () => timers.forEach(clearTimeout)
    }, [])

    useEffect(() => {
        if (!titleStarted) return
        const timers: ReturnType<typeof setTimeout>[] = []

        words.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleCountTitle(i + 1), i * 190))
        })

        const p2 = words.length * 190 + 280
        words.forEach((_, i) => {
            timers.push(setTimeout(() => setGoldIdx(i), p2 + i * 210))
        })

        const p3 = p2 + words.length * 210 + 280
        const stepsBack = (words.length - 1) - targetIdx
        for (let s = 0; s <= stepsBack; s++) {
            const wi = words.length - 1 - s
            timers.push(setTimeout(() => {
                setGoldIdx(wi)
                if (wi === targetIdx) {
                    timers.push(setTimeout(() => { setSettled(true); onTitleDone(); onDescDone(); }, 80))
                }
            }, p3 + s * 155))
        }
        return () => timers.forEach(clearTimeout)
    }, [titleStarted])

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 md:gap-3 font-avantgarde font-bold text-[15px] md:text-[20px] tracking-[0.08em] uppercase text-[#133C1E] mb-4 md:mb-6">
                {tags.map((tag, i) => (
                    <span key={i} className="flex items-center gap-2 md:gap-3">
                        <motion.span
                            initial={{ opacity: 0, y: 14 }}
                            animate={visibleCountTags > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-block"
                        >
                            {tag}
                        </motion.span>
                        {i < tags.length - 1 && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={visibleCountTags > i ? { opacity: 0.5 } : { opacity: 0 }}
                                transition={{ duration: 0.2, delay: 0.15 }}
                            >
                                •
                            </motion.span>
                        )}
                    </span>
                ))}
            </div>

            <h1 className="font-oceanic font-extrabold text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] text-[#133C1E] tracking-normal leading-[1.05] mb-6 max-w-[720px]">
                {words.map((word, i) => {
                    const isGold = settled ? i === targetIdx : goldIdx === i
                    return (
                        <span key={i}>
                            <motion.span
                                initial={{ opacity: 0, y: 24 }}
                                animate={visibleCountTitle > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block"
                                style={{ color: isGold ? "#BF9C66" : "inherit", transition: "color 0.22s ease" }}
                            >
                                {word}
                            </motion.span>
                            {i < words.length - 1 ? "\u00A0" : ""}
                        </span>
                    )
                })}
            </h1>
        </div>
    )
}