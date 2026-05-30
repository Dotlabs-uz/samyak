"use client"

import { useRef, useEffect, useState } from "react"
import { motion, MotionValue, useTransform, useInView } from "framer-motion"
import Image from "next/image"

export function PhilosophyTitle({
    words,
    progress,
}: {
    words: string[]
    progress: MotionValue<number>
}) {
    const step = 0.65 / words.length

    return (
        <div>
            <h1 className="font-oceanic text-[42px] sm:text-[60px] md:text-[80px] leading-[0.9] uppercase text-center text-[#133B1D] tracking-tighter">
                {words.map((word, i) => (
                    <WordLine key={i} word={word} index={i} progress={progress} step={step} />
                ))}
            </h1>
        </div>
    )
}

function WordLine({
    word,
    index,
    progress,
    step,
}: {
    word: string
    index: number
    progress: MotionValue<number>
    step: number
}) {
    const start = 0.08 + index * step
    const end = start + step * 0.85
    const color = useTransform(progress, [start, end], ["#133B1D", "#BF9C66"])
    const y = useTransform(progress, [0, start], [40, 0])
    const opacity = useTransform(progress, [0, start * 0.6], [0, 1])

    return (
        <motion.span
            className="block relative overflow-hidden"
            style={{ fontWeight: 1000, opacity, y }}
        >
            <motion.span style={{ color }}>{word}</motion.span>
        </motion.span>
    )
}

function findPremiumIdx(words: string[]) {
    const idx = words.findIndex((w) => {
        const lower = w.toLowerCase()
        return (
            lower.includes("premium") ||
            lower.includes("sifat") ||
            lower.includes("quality") ||
            lower.includes("качество") ||
            lower.includes("премиум")
        )
    })
    return idx >= 0 ? idx : 1
}

function BadgeContent({ direction }: { direction: 1 | -1 }) {
    return (
        <div className="relative w-full h-full">
            <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 * direction }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
                <Image src="/bubbles/figur4.png" alt="" fill className="object-contain" />
            </motion.div>

            <motion.div
                className="absolute inset-[-25%]"
                animate={{ rotate: -360 * direction, y: [0, -8, 0] }}
                transition={{
                    rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                <Image src="/bubbles/lays.png" alt="Lays" fill className="object-contain" />
            </motion.div>
        </div>
    )
}

function LaysBadge({
    className,
    direction = 1,
    started = true,
}: {
    className?: string
    delay?: number
    direction?: 1 | -1
    started?: boolean
}) {
    return (
        <motion.div
            className={`relative pointer-events-none aspect-square ${className ?? ""}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={started ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <BadgeContent direction={direction} />
        </motion.div>
    )
}

export function PhilosophyIntro({ words }: { words: string[] }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.35 })
    const targetIdx = findPremiumIdx(words)

    const [visibleCount, setVisibleCount] = useState(0)
    const [goldIdx, setGoldIdx] = useState(-1)
    const [settled, setSettled] = useState(false)
    const [showDecor, setShowDecor] = useState(false)

    useEffect(() => {
        if (!inView) return

        const timers: ReturnType<typeof setTimeout>[] = []

        words.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleCount(i + 1), i * 190))
        })

        const p2 = words.length * 190 + 280

        timers.push(setTimeout(() => setShowDecor(true), p2))

        words.forEach((_, i) => {
            timers.push(setTimeout(() => setGoldIdx(i), p2 + i * 210))
        })

        const p3 = p2 + words.length * 210 + 280
        const stepsBack = words.length - 1 - targetIdx

        for (let s = 0; s <= stepsBack; s++) {
            const wi = words.length - 1 - s

            timers.push(
                setTimeout(() => {
                    setGoldIdx(wi)

                    if (wi === targetIdx) {
                        timers.push(setTimeout(() => setSettled(true), 80))
                    }
                }, p3 + s * 155)
            )
        }

        return () => timers.forEach(clearTimeout)
    }, [inView, words, targetIdx])

    return (
        <div
            ref={ref}
            className="relative w-full min-h-[55vh] md:min-h-[65vh] overflow-visible flex items-center justify-center py-10 md:py-16"
        >
            <motion.div
                className="absolute top-[2%] left-[2%] w-[200px] sm:w-[300px] pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={showDecor ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Image src="/bubbles/bubble1.svg" alt="" width={400} height={120} className="w-full" />
            </motion.div>

            <motion.div
                className="absolute bottom-[2%] right-[2%] w-[200px] sm:w-[300px] pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={showDecor ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
            >
                <Image src="/bubbles/bubble2.svg" alt="" width={400} height={120} className="w-full" />
            </motion.div>

            <div className="absolute right-[5%] top-[15%] md:top-[30%] md:right-[8%] -translate-y-1/2 z-10">
                <LaysBadge
                    className="w-[80px] sm:w-[120px] md:w-[180px]"
                    direction={-1}
                    started={showDecor}
                />
            </div>

            <div className="absolute left-[5%] top-[85%] md:top-[70%] md:left-[8%] -translate-y-1/2 z-10">
                <LaysBadge
                    className="w-[80px] sm:w-[120px] md:w-[180px]"
                    direction={1}
                    started={showDecor}
                />
            </div>

            <h1 className="font-oceanic text-[42px] sm:text-[60px] md:text-[80px] leading-[0.9] uppercase text-center tracking-tighter select-none px-4 text-[#133B1D]">
                {words.map((word, i) => {
                    const isGold = settled ? i === targetIdx : goldIdx === i

                    return (
                        <motion.span
                            key={i}
                            className="block"
                            initial={{ opacity: 0, y: 32 }}
                            animate={
                                visibleCount > i
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 32 }
                            }
                            transition={{
                                duration: 0.42,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                                fontWeight: 1000,
                                color: isGold ? "#BF9C66" : "#133B1D",
                                transition: "color 0.22s ease",
                            }}
                        >
                            {word}
                        </motion.span>
                    )
                })}
            </h1>
        </div>
    )
}