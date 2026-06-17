"use client"

import { useRef, useState } from "react"
import { motion, MotionValue, useTransform, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"

let sharedAc: AudioContext | null = null

function getAudioContext(): AudioContext {
    if (!sharedAc) {
        sharedAc = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return sharedAc
}

function playWordSound(idx: number, volume = 0.3) {
    try {
        const ac = getAudioContext()
        if (ac.state === 'suspended') return
        const gain = ac.createGain()
        gain.connect(ac.destination)
        gain.gain.setValueAtTime(0, ac.currentTime)
        gain.gain.linearRampToValueAtTime(volume, ac.currentTime + 0.003)
        const osc = ac.createOscillator()
        osc.connect(gain)
        const freq = 300 + idx * 18
        osc.frequency.setValueAtTime(freq, ac.currentTime)
        osc.frequency.exponentialRampToValueAtTime(freq * 0.6, ac.currentTime + 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08)
        osc.type = 'sine'
        osc.start(ac.currentTime)
        osc.stop(ac.currentTime + 0.09)
    } catch (e) { }
}

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

function BadgeContent({ direction, image }: { direction: 1 | -1; image: string }) {
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
                <Image src={image} alt="Badge" fill className="object-contain" />
            </motion.div>
        </div>
    )
}

function ProductBadge({
    className,
    direction = 1,
    started = true,
    image,
}: {
    className?: string
    direction?: 1 | -1
    started?: boolean
    image: string
}) {
    return (
        <motion.div
            className={`relative pointer-events-none aspect-square ${className ?? ""}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={started ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <BadgeContent direction={direction} image={image} />
        </motion.div>
    )
}

export function PhilosophyIntro({ words }: { words: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const targetIdx = findPremiumIdx(words)
    const firedSounds = useRef<Set<number>>(new Set())
    const firedGoldSounds = useRef<Set<number>>(new Set())

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const wordCount = words.length
    const wordStart = (i: number) => 0.05 + (i / wordCount) * 0.55
    const wordEnd = (i: number) => wordStart(i) + 0.08
    const decorStart = 0.15
    const laysStart = 0.68
    const goldStart = (i: number) => 0.68 + (i / wordCount) * 0.15
    const goldEnd = (i: number) => goldStart(i) + 0.04

    const [progress, setProgress] = useState(0)
    const [showDecor, setShowDecor] = useState(false)
    const [showLays, setShowLays] = useState(false)

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setProgress(v)
        setShowDecor(v >= decorStart)
        setShowLays(v >= laysStart)

        words.forEach((_, i) => {
            const threshold = wordStart(i) + 0.02
            if (v >= threshold && !firedSounds.current.has(i)) {
                firedSounds.current.add(i)
                playWordSound(i)
            }
            if (v < wordStart(i) && firedSounds.current.has(i)) {
                firedSounds.current.delete(i)
            }
        })

        words.forEach((_, i) => {
            const threshold = goldStart(i) + 0.01
            if (v >= threshold && !firedGoldSounds.current.has(i)) {
                firedGoldSounds.current.add(i)
                playWordSound(i, 0.2)
            }
            if (v < goldStart(i) && firedGoldSounds.current.has(i)) {
                firedGoldSounds.current.delete(i)
            }
        })
    })

    function getWordStyle(i: number) {
        const start = wordStart(i)
        const end = wordEnd(i)
        const raw = Math.min(1, Math.max(0, (progress - start) / (end - start)))
        const opacity = raw
        const y = (1 - raw) * 32

        const gStart = goldStart(i)
        const gEnd = goldEnd(i)
        const goldRaw = Math.min(1, Math.max(0, (progress - gStart) / (gEnd - gStart)))

        const isSettled = progress >= 0.88
        const isGold = isSettled
            ? i === targetIdx
            : goldRaw > 0 && goldRaw < 1
                ? true
                : i === targetIdx && progress >= goldStart(targetIdx)

        return { opacity, y, isGold }
    }

    const scrollHeight = `${(wordCount + 4) * 60}vh`

    return (
        <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
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
                    <ProductBadge
                        className="w-[80px] sm:w-[120px] md:w-[180px]"
                        direction={-1}
                        started={showLays}
                        image="/bubbles/badgeimg1.png"
                    />
                </div>

                <div className="absolute left-[5%] top-[85%] md:top-[70%] md:left-[8%] -translate-y-1/2 z-10">
                    <ProductBadge
                        className="w-[80px] sm:w-[120px] md:w-[180px]"
                        direction={1}
                        started={showLays}
                        image="/bubbles/badgeimg2.png"
                    />
                </div>

                <h1 className="font-oceanic text-[52px] sm:text-[68px] md:text-[80px] leading-[0.9] uppercase text-center tracking-tighter select-none px-4 text-[#133B1D]">
                    {words.map((word, i) => {
                        const { opacity, y, isGold } = getWordStyle(i)
                        return (
                            <span
                                key={i}
                                className="block"
                                style={{
                                    opacity,
                                    transform: `translateY(${y}px)`,
                                    fontWeight: 1000,
                                    color: isGold ? "#BF9C66" : "#133B1D",
                                    transition: "color 0.22s ease",
                                }}
                            >
                                {word}
                            </span>
                        )
                    })}
                </h1>
            </div>
        </div>
    )
}