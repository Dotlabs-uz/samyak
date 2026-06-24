'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

function useSway(duration = 6, delay = 0, deg = 1.5, origin = 'top center') {
    return {
        animate: {
            rotate: [0, deg, -deg * 0.6, deg * 0.4, 0] as [number, number, number, number, number],
            x: [0, 1.5, -1, 0.5, 0] as [number, number, number, number, number],
            y: [0, 0.5, -0.3, 0.2, 0] as [number, number, number, number, number],
        },
        transition: {
            duration,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay: delay + 1,
        },
        style: { transformOrigin: origin },
    };
}

function SunGlow({ className = '' }: { className?: string }) {
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background:
                        'radial-gradient(circle, rgba(255,245,160,0.55) 0%, rgba(255,220,70,0.3) 35%, rgba(255,185,40,0.12) 60%, transparent 75%)',
                    filter: 'blur(10px)',
                }}
                animate={{ opacity: [0.5, 0.85, 0.55], scale: [0.88, 1.1, 0.92] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute top-[16%] left-[16%] w-[40%] h-[40%] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,245,0.85) 0%, rgba(255,248,170,0.45) 55%, transparent 80%)',
                    filter: 'blur(2px)',
                }}
                animate={{ opacity: [0.6, 0.9, 0.65] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
        </div>
    );
}

export function SummerHeroCanopy() {
    return (
        <div className="absolute top-0 inset-x-0 pointer-events-none z-25 overflow-visible" style={{ height: 0 }}>

            <SunGlow className="top-[-6px] right-[34px] w-[70px] h-[70px] z-6 lg:top-[-15px] lg:right-[250px] lg:w-[170px] lg:h-[170px]" />

            <motion.div
                className="absolute top-0 right-0 pointer-events-none z-10 w-[200px] h-[202px] lg:w-[500px] lg:h-[505px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    {...useSway(8, 0, 0.7, 'top right')}
                >
                    <Image src="/seasons/summer/summer2.png" alt="" fill className="object-contain object-top-right" sizes="(min-width: 1024px) 500px, 200px" />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute pointer-events-none z-9 top-[-37px] right-[130px] w-[100px] h-[108px] lg:top-[-100px] lg:right-[350px] lg:w-[250px] lg:h-[270px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    {...useSway(6.5, 0.2, 1.3, 'top center')}
                >
                    <div className="relative w-full h-full" style={{ transform: 'rotate(16deg)' }}>
                        <Image src="/seasons/summer/summer5.png" alt="" fill className="object-contain -rotate-150" sizes="(min-width: 1024px) 250px, 100px" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute pointer-events-none z-9 top-[-37px] right-[296px] w-[100px] h-[108px] lg:top-[-100px] lg:right-[800px] lg:w-[250px] lg:h-[270px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    {...useSway(6.5, 0.2, 1.3, 'top center')}
                >
                    <div className="relative w-full h-full" style={{ transform: 'rotate(270deg)' }}>
                        <Image src="/seasons/summer/summer3.png" alt="" fill className="object-contain" sizes="(min-width: 1024px) 250px, 100px" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute pointer-events-none z-10 top-[-74px] right-[196px] w-[120px] h-[150px] lg:top-[-200px] lg:right-[530px] lg:w-[300px] lg:h-[375px]"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.1, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    {...useSway(7, 0.15, 1.2, 'top left')}
                >
                    <Image src="/seasons/summer/summer1.png" alt="" fill className="object-contain rotate-25" sizes="(min-width: 1024px) 300px, 120px" />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute pointer-events-none z-11 top-[-16px] right-[152px] w-[34px] h-[34px] lg:top-[-42px] lg:right-[410px] lg:w-[80px] lg:h-[80px]"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    animate={{ rotate: [0, 2, -1.5, 1, 0], y: [0, -2, 1, -0.5, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                    style={{ transformOrigin: 'center center' }}
                >
                    <Image src="/seasons/summer/summer6.png" alt="" fill className="object-contain" sizes="(min-width: 1024px) 80px, 34px" />
                </motion.div>
            </motion.div>

        </div>
    );
}

export function SummerHeroGreenEdge({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
    const isMobile = variant === 'mobile';

    return (
        <>
            <motion.div
                className={[
                    'absolute pointer-events-none z-5',
                    isMobile
                        ? 'bottom-[-48px] left-[-57px] w-[74px] h-[111px] rotate-25'
                        : 'bottom-[-130px] left-[-155px] w-[200px] h-[300px] rotate-25',
                ].join(' ')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.55, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    {...useSway(6, 0.5, 1.2, 'bottom left')}
                >
                    <div className="relative w-full h-full" style={{ transform: 'rotate(-24deg)' }}>
                        <Image src="/seasons/summer/summer3.png" alt="" fill className="object-contain" sizes="(min-width: 1024px) 200px, 74px" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className={[
                    'absolute pointer-events-none z-5',
                    isMobile
                        ? 'bottom-[-48px] left-[-41px] w-[111px] h-[148px] -rotate-25'
                        : 'bottom-[-130px] left-[-110px] w-[300px] h-[400px] -rotate-25',
                ].join(' ')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.68, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    {...useSway(6.5, 0.6, 1.1, 'bottom center')}
                >
                    <div className="relative w-full h-full" style={{ transform: 'rotate(-8deg)' }}>
                        <Image src="/seasons/summer/summer5.png" alt="" fill className="object-contain" sizes="(min-width: 1024px) 300px, 111px" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className={[
                    'absolute pointer-events-none z-6',
                    isMobile
                        ? 'bottom-[-41px] left-[-19px] w-[37px] h-[93px]'
                        : 'bottom-[-110px] left-[-50px] w-[100px] h-[250px]',
                ].join(' ')}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.88, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    animate={{ rotate: [0, 2.5, -1.8, 1.2, 0], y: [0, -1.5, 0.8, -0.4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    style={{ transformOrigin: 'center center' }}
                >
                    <Image src="/seasons/summer/summer6.png" alt="" fill className="object-contain" sizes="(min-width: 1024px) 100px, 37px" />
                </motion.div>
            </motion.div>

            <motion.div
                className={[
                    'absolute pointer-events-none z-5',
                    isMobile
                        ? 'bottom-[-19px] right-[-19px] w-[93px] h-[93px]'
                        : 'bottom-[-50px] right-[-50px] w-[250px] h-[250px]',
                ].join(' ')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.72, ease }}
            >
                <motion.div
                    className="relative w-full h-full"
                    {...useSway(6, 0.7, 1.2, 'bottom right')}
                >
                    <div className="relative w-full h-full" style={{ transform: 'rotate(100deg) scaleX(-1)' }}>
                        <Image src="/seasons/summer/summer4.png" alt="" fill className="object-contain" sizes="(min-width: 1024px) 250px, 93px" />
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}