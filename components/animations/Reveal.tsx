'use client';
import { motion, Variants } from 'framer-motion';

export const Reveal = ({
    children,
    delay = 0,
    direction = "up"
}: {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right";
}) => {

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 60 : 0,
            x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.22, 1, 0.36, 1] as any
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};