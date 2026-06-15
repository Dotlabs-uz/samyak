'use client';

import { useEffect, useRef, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';
import { TbMenu } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import { FaArrowRightLong, FaPhone, FaRegStar, FaHeadphones } from 'react-icons/fa6';
import { FaInstagram, FaTelegram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { CiGift } from 'react-icons/ci';
import { BiSolidDish } from 'react-icons/bi';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const socialLinks = [
    { icon: <FaInstagram size={15} />, label: 'Instagram', href: 'https://www.instagram.com/samyakuz/' },
    { icon: <FaTelegram size={15} />, label: 'Telegram', href: '#' },
    { icon: <FaFacebook size={15} />, label: 'Facebook', href: '#' },
    { icon: <FaYoutube size={15} />, label: 'YouTube', href: '#' },
];

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
    return Array.from({ length: count }, (_, i) => {
        const edge = i % 4;
        return {
            id: i,
            startFrac: Math.random(),
            edge,
            length: 60 + Math.random() * 140,
            angle: -35 + Math.random() * 70,
            speed: 12 + Math.random() * 28,
            phase: Math.random() * Math.PI * 2,
            alpha: 0.18 + Math.random() * 0.42,
            width: 0.6 + Math.random() * 1.0,
        };
    });
}

function LuxuryCanvas({ visible }: { visible: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const linesRef = useRef<Line[]>(buildLines(36));
    const rafRef = useRef<number>(0);
    const t0Ref = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
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
                if (ln.edge === 0) {      
                    ox = -ln.length + drift;
                    oy = ln.startFrac * H;
                } else if (ln.edge === 1) { 
                    ox = ln.startFrac * W;
                    oy = H + ln.length - drift;
                } else if (ln.edge === 2) {
                    ox = W + ln.length - drift;
                    oy = ln.startFrac * H;
                } else {                
                    ox = ln.startFrac * W;
                    oy = -ln.length + drift;
                }

                const rad = (ln.angle * Math.PI) / 180;
                const ex = ox + Math.cos(rad) * ln.length;
                const ey = oy + Math.sin(rad) * ln.length;

                const pulse = 0.55 + 0.45 * Math.sin(elapsed * 1.2 + ln.phase);
                const alpha = ln.alpha * pulse;

                const grad = ctx.createLinearGradient(ox, oy, ex, ey);
                grad.addColorStop(0, `rgba(201,168,76,0)`);
                grad.addColorStop(0.3, `rgba(201,168,76,${alpha})`);
                grad.addColorStop(0.7, `rgba(201,168,76,${alpha})`);
                grad.addColorStop(1, `rgba(201,168,76,0)`);

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
                ctx.fillStyle = `rgba(201,168,76,${alpha * 0.85})`;
                ctx.fill();
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.7s ease',
            }}
        />
    );
}

export default function Header() {
    const t = useTranslations('Header');
    const [currentLang, setCurrentLang] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const lang = document.cookie.match(/locale=(\w{2,5})/)?.[1] || 'uz';
        setCurrentLang(lang);
    }, []);

    const languages = [
        { code: 'ru', label: 'RU' },
        { code: 'en', label: 'EN' },
        { code: 'uz', label: 'UZ' },
    ];

    const handleLangChange = (code: string) => {
        document.cookie = `locale=${code}; path=/; max-age=31536000`;
        setCurrentLang(code);
        router.refresh();
    };

    const navLinks = [
        { href: '#products', labelKey: 'nav.products.label', descKey: 'nav.products.desc', icon: <BsBoxSeam size={20} /> },
        { href: '#gifts', labelKey: 'nav.gifts.label', descKey: 'nav.gifts.desc', icon: <CiGift size={22} /> },
        { href: '#gastronomy', labelKey: 'nav.gastronomy.label', descKey: 'nav.gastronomy.desc', icon: <BiSolidDish size={20} /> },
        { href: '#guests', labelKey: 'nav.reviews.label', descKey: 'nav.reviews.desc', icon: <FaRegStar size={18} /> },
        { href: '#contact', labelKey: 'nav.contact.label', descKey: 'nav.contact.desc', icon: <FaHeadphones size={18} /> },
    ];

    return (
        <>
            <header className="w-full bg-transparent relative z-50 overflow-x-hidden">
                <div className="max-w-[1440px] mx-auto px-4 2xl:px-0 py-5 flex justify-between items-center">
                    <Link href="/">
                        <img src="/logos/Samyak_logo.svg" alt="Samyak" width={150} height={50} />
                    </Link>

                    <div className="flex items-center gap-3.5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="bg-[#66666666] hover:bg-[#bcbcbc] transition-colors text-white font-semibold text-sm rounded-full px-3 py-2 flex items-center gap-1.5 uppercase outline-none select-none cursor-pointer h-11">
                                    {languages.find((l) => l.code === currentLang)?.label || 'UZ'}
                                    <FaChevronDown className="w-3 h-3 opacity-70" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="bg-[#66666666] border border-white/10 rounded-2xl min-w-[100px] p-1.5 shadow-md backdrop-blur-md"
                            >
                                <ul className="flex flex-col gap-0.5">
                                    {languages.map(({ code, label }) => (
                                        <li key={code}>
                                            <DropdownMenuItem
                                                onClick={() => handleLangChange(code)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer font-medium text-sm text-white hover:bg-white/20 focus:bg-white/20 outline-none transition-colors"
                                            >
                                                {currentLang === code && <IoCheckmark className="text-white w-4 h-4" />}
                                                <span className={currentLang === code ? 'font-bold' : ''}>{label}</span>
                                            </DropdownMenuItem>
                                        </li>
                                    ))}
                                </ul>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button
                            onClick={() => setMenuOpen(true)}
                            className="w-16 h-11 bg-[#66666666] hover:bg-[#bcbcbc]/60 transition-colors rounded-full flex justify-center items-center cursor-pointer"
                            aria-label="Open menu"
                        >
                            <TbMenu className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="fixed inset-0 z-60 overflow-hidden" style={{ pointerEvents: 'none' }}>
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(4,14,7,0.86)',
                        opacity: menuOpen ? 1 : 0,
                        transition: 'opacity 0.55s cubic-bezier(0.22,1,0.36,1)',
                        pointerEvents: menuOpen ? 'auto' : 'none',
                        overflow: 'hidden',
                    }}
                >
                    <LuxuryCanvas visible={menuOpen} />

                    <svg
                        className="absolute inset-0 w-full h-full"
                        style={{ opacity: 0.035 }}
                        preserveAspectRatio="none"
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                            <line
                                key={i}
                                x1={`${-20 + i * 18}%`} y1="0%"
                                x2={`${10 + i * 18}%`} y2="100%"
                                stroke="#C9A84C" strokeWidth="1"
                            />
                        ))}
                    </svg>

                    <svg
                        className="absolute top-0 left-0"
                        width="160" height="160"
                        style={{ opacity: menuOpen ? 0.5 : 0, transition: 'opacity 0.9s ease 0.25s' }}
                    >
                        <path d="M0 100 L0 0 L100 0" fill="none" stroke="#C9A84C" strokeWidth="0.9" />
                        <path d="M0 50  L0 0 L50  0" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
                        <circle cx="0" cy="0" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
                    </svg>

                    <svg
                        className="absolute bottom-0 left-0"
                        width="160" height="160"
                        style={{ opacity: menuOpen ? 0.5 : 0, transition: 'opacity 0.9s ease 0.35s' }}
                    >
                        <path d="M0 60 L0 160 L100 160" fill="none" stroke="#C9A84C" strokeWidth="0.9" />
                        <circle cx="0" cy="160" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
                    </svg>

                    <svg
                        className="absolute bottom-0 right-[420px]"
                        width="120" height="120"
                        style={{ opacity: menuOpen ? 0.4 : 0, transition: 'opacity 0.9s ease 0.4s' }}
                    >
                        <path d="M120 60 L120 120 L20 120" fill="none" stroke="#C9A84C" strokeWidth="0.9" />
                        <circle cx="120" cy="120" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
                    </svg>
                </div>

                <div
                    className="absolute top-0 right-0 h-full w-[420px] max-w-[95vw] bg-[#133C1E] flex flex-col border-l-2 border-[#C9A84C]"
                    style={{
                        borderRadius: '18px 0 0 18px',
                        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.52s cubic-bezier(0.22,1,0.36,1)',
                        pointerEvents: menuOpen ? 'auto' : 'none',
                        overflowY: 'auto',
                    }}
                >
                    <div className="flex items-center justify-between px-5 py-5 shrink-0">
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            <img src="/logos/SamyakWhite_logo.svg" alt="Samyak" width={150} height={50} />
                        </Link>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer text-[#C9A84C] hover:bg-[#C9A84C]/15"
                            style={{ border: '1.5px solid #C9A84C' }}
                            aria-label="Close menu"
                        >
                            <IoClose size={20} />
                        </button>
                    </div>

                    <div className="mx-4 mb-3 rounded-2xl overflow-hidden flex shrink-0" style={{ background: '#F5F0E6', minHeight: 100 }}>
                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                <p style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#1a2e14', lineHeight: 1.2 }}>
                                    {t('promo.title')}
                                </p>
                                <p style={{ fontSize: 12, color: '#4a5e3a', fontWeight: 500, marginTop: 3, marginBottom: 12 }}>
                                    {t('promo.subtitle')}
                                </p>
                            </div>
                            <button
                                className="flex items-center gap-2 text-[#8B6914] font-semibold transition-colors hover:bg-[#C9A84C]/10 w-fit px-3 py-1.5 rounded-lg"
                                style={{ fontSize: 12, border: '1.5px solid #C9A84C' }}
                            >
                                {t('promo.cta')} <FaArrowRightLong size={11} />
                            </button>
                        </div>
                        <div
                            className="w-28 flex items-center justify-center relative overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #e8dfc8, #d4c89a)' }}
                        >
                            <span style={{ fontSize: 48, filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.2))', transform: 'rotate(-8deg)' }}>🌍</span>
                            <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 20, opacity: 0.75 }}>📦</span>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1.5 px-4 shrink-0">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-4 rounded-2xl px-4 py-3.5 group"
                                style={{
                                    background: '#1C4D28',
                                    opacity: menuOpen ? 1 : 0,
                                    transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                                    transition: `opacity 0.38s ease ${0.12 + idx * 0.055}s, transform 0.38s cubic-bezier(0.22,1,0.36,1) ${0.12 + idx * 0.055}s, background 0.18s`,
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#225e30')}
                                onMouseLeave={e => (e.currentTarget.style.background = '#1C4D28')}
                            >
                                <div
                                    className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-[#C9A84C]"
                                    style={{ background: '#133C1E', border: '1.5px solid #2a6035' }}
                                >
                                    {link.icon}
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700, color: '#C9A84C', lineHeight: 1.2 }}>
                                        {t(link.labelKey)}
                                    </span>
                                    <span style={{ fontSize: 11.5, color: '#8aad8e', fontWeight: 500, marginTop: 2 }}>
                                        {t(link.descKey)}
                                    </span>
                                </div>
                                <FaArrowRightLong size={14} style={{ color: '#C9A84C', flexShrink: 0 }} />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex gap-2.5 mx-4 mt-3 mb-4 shrink-0">
                        <div className="flex-1 rounded-2xl p-3.5" style={{ background: '#1C4D28' }}>
                            <p style={{ fontSize: 11, color: '#C9A84C', fontWeight: 700, marginBottom: 10, letterSpacing: 0.3 }}>
                                {t('social.title')}
                            </p>
                            <div className="flex gap-2">
                                {socialLinks.map(s => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#C9A84C] transition-colors hover:bg-[#225e30]"
                                        style={{ background: '#133C1E', border: '1.5px solid #2a6035' }}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 rounded-2xl p-3.5 flex flex-col justify-center gap-1.5" style={{ background: '#1C4D28' }}>
                            <div className="flex items-center gap-2" style={{ color: '#C9A84C', fontSize: 13.5, fontWeight: 700 }}>
                                <FaPhone size={13} />
                                +998 (95) 224-55-22
                            </div>
                            <div className="flex items-center gap-2" style={{ color: '#8aad8e', fontSize: 11.5, fontWeight: 500 }}>
                                <div style={{ width: 7, height: 7, borderRadius: '50%', border: '1.5px solid #8aad8e', flexShrink: 0 }} />
                                {t('social.hours')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

