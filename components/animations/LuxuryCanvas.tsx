'use client';

import { useEffect, useRef } from 'react';

type Line = {
    id: number;
    startFrac: number;
    edge: number;
    length: number;
    angle: number;
    speed: number;
    phase: number;
    alpha: number;
    width: number;
};

function buildLines(count: number): Line[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        startFrac: Math.random(),
        edge: i % 4,
        length: 60 + Math.random() * 140,
        angle: -35 + Math.random() * 70,
        speed: 12 + Math.random() * 28,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.18 + Math.random() * 0.42,
        width: 0.6 + Math.random() * 1.0,
    }));
}

export default function LuxuryCanvas({
    visible,
    lineCount = 36,
    color = '201,168,76',
}: {
    visible: boolean;
    lineCount?: number;
    color?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const linesRef = useRef<Line[]>(buildLines(lineCount));
    const rafRef = useRef<number>(0);
    const t0Ref = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent ? parent.clientWidth : window.innerWidth;
            canvas.height = parent ? parent.clientHeight : window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = (ts: number) => {
            if (!t0Ref.current) t0Ref.current = ts;
            const elapsed = (ts - t0Ref.current) / 1000;
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            linesRef.current.forEach((ln) => {
                const drift = (elapsed * ln.speed) % (Math.max(W, H) * 1.6);
                let ox: number, oy: number;
                if (ln.edge === 0) { ox = -ln.length + drift; oy = ln.startFrac * H; }
                else if (ln.edge === 1) { ox = ln.startFrac * W; oy = H + ln.length - drift; }
                else if (ln.edge === 2) { ox = W + ln.length - drift; oy = ln.startFrac * H; }
                else { ox = ln.startFrac * W; oy = -ln.length + drift; }

                const rad = (ln.angle * Math.PI) / 180;
                const ex = ox + Math.cos(rad) * ln.length;
                const ey = oy + Math.sin(rad) * ln.length;
                const pulse = 0.55 + 0.45 * Math.sin(elapsed * 1.2 + ln.phase);
                const alpha = ln.alpha * pulse;

                const grad = ctx.createLinearGradient(ox, oy, ex, ey);
                grad.addColorStop(0, `rgba(${color},0)`);
                grad.addColorStop(0.3, `rgba(${color},${alpha})`);
                grad.addColorStop(0.7, `rgba(${color},${alpha})`);
                grad.addColorStop(1, `rgba(${color},0)`);

                ctx.beginPath();
                ctx.moveTo(ox, oy);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = grad;
                ctx.lineWidth = ln.width;
                ctx.stroke();

                const mx = (ox + ex) / 2;
                const my = (oy + ey) / 2;
                ctx.beginPath();
                ctx.arc(mx, my, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color},${alpha * 0.85})`;
                ctx.fill();
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}
        />
    );
}