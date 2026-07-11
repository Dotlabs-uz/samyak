'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { IoCheckmark } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';
import { TbMenu } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import { FaArrowRightLong, FaPhone, FaRegStar, FaHeadphones } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { CiGift } from 'react-icons/ci';
import { BiSolidDish } from 'react-icons/bi';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LuxuryCanvas from '@/components/animations/LuxuryCanvas';

const socialLinks = [
    { icon: <FaInstagram size={15} />, label: 'Instagram', href: 'https://www.instagram.com/samyak.uz/' },
];

export default function Header() {
    const t = useTranslations('Header');
    const [currentLang, setCurrentLang] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [logoVisible, setLogoVisible] = useState(true);
    const lastScrollYRef = useRef(0);
    const router = useRouter();

    useEffect(() => {
        const lang = document.cookie.match(/locale=(\w{2,5})/)?.[1] || 'uz';
        setCurrentLang(lang);
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        if (menuOpen) {
            html.style.overflowX = 'hidden';
            body.style.overflowX = 'hidden';
        } else {
            html.style.overflowX = '';
            body.style.overflowX = '';
        }
        return () => {
            html.style.overflowX = '';
            body.style.overflowX = '';
        };
    }, [menuOpen]);

    useEffect(() => {
        lastScrollYRef.current = window.scrollY;

        const THRESHOLD = 6;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const diff = currentY - lastScrollYRef.current;

            if (currentY <= 0) {
                setHeaderVisible(true);
                setLogoVisible(true);
            } else if (diff > THRESHOLD) {
                setHeaderVisible(false);
                setLogoVisible(false);
            } else if (diff < -THRESHOLD) {
                setHeaderVisible(true);
            }

            lastScrollYRef.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) setHeaderVisible(true);
    }, [menuOpen]);

    const languages = [
        { code: 'ru', label: 'RU' },
        { code: 'en', label: 'EN' },
        { code: 'uz', label: 'UZ' },
        { code: 'zh', label: 'ZH' },
    ];

    const handleLangChange = (code: string) => {
        document.cookie = `locale=${code}; path=/; max-age=31536000`;
        setCurrentLang(code);
        router.refresh();
    };

    const navLinks = [
        { href: '#products', labelKey: 'nav.products.label', descKey: 'nav.products.desc', icon: <BsBoxSeam size={18} /> },
        { href: '#gifts', labelKey: 'nav.gifts.label', descKey: 'nav.gifts.desc', icon: <CiGift size={20} /> },
        { href: '#gastronomy', labelKey: 'nav.gastronomy.label', descKey: 'nav.gastronomy.desc', icon: <BiSolidDish size={18} /> },
        { href: '#guests', labelKey: 'nav.reviews.label', descKey: 'nav.reviews.desc', icon: <FaRegStar size={16} /> },
        { href: '#footer', labelKey: 'nav.contact.label', descKey: 'nav.contact.desc', icon: <FaHeadphones size={16} /> },
    ];

    const PanelContent = () => (
        <>
            <div className="flex items-center justify-between px-5 py-4 shrink-0">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                    <img src="/logos/SamyakWhite_logo.svg" alt="Samyak" width={130} height={44} />
                </Link>
                <button
                    onClick={() => setMenuOpen(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer text-[#C9A84C] hover:bg-[#C9A84C]/15"
                    style={{ border: '1.5px solid #C9A84C' }}
                    aria-label="Close menu"
                >
                    <IoClose size={18} />
                </button>
            </div>

            {!isMobile && (
                <div className="mx-4 mb-3 rounded-2xl overflow-hidden flex shrink-0" style={{ background: '#F5F0E6', minHeight: 100 }}>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700, color: '#1a2e14', lineHeight: 1.2 }}>
                                {t('promo.title')}
                            </p>
                            <p style={{ fontSize: 12, color: '#4a5e3a', fontWeight: 500, marginTop: 3, marginBottom: 10 }}>
                                {t('promo.subtitle')}
                            </p>
                        </div>
                        <Link
                            href={"#philosophy"}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 text-[#8B6914] font-semibold transition-colors hover:bg-[#C9A84C]/10 w-fit px-3 py-1.5 rounded-lg"
                            style={{ fontSize: 12, border: '1.5px solid #C9A84C' }}
                        >
                            {t('promo.cta')} <FaArrowRightLong size={11} />
                        </Link>
                    </div>
                    <div
                        className="w-28 flex items-center justify-center relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #e8dfc8, #d4c89a)' }}
                    >
                        <span style={{ fontSize: 44, filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.2))', transform: 'rotate(-8deg)' }}>🌍</span>
                        <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 18, opacity: 0.75 }}>📦</span>
                    </div>
                </div>
            )}

            <nav className="flex flex-col gap-1.5 px-4 shrink-0">
                {navLinks.map((link, idx) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-3 py-3 group"
                        style={{
                            background: '#1C4D28',
                            opacity: menuOpen ? 1 : 0,
                            transform: menuOpen
                                ? 'translate(0,0)'
                                : isMobile
                                    ? 'translateY(-12px)'
                                    : 'translateX(20px)',
                            transition: `opacity 0.38s ease ${0.1 + idx * 0.05}s, transform 0.38s cubic-bezier(0.22,1,0.36,1) ${0.1 + idx * 0.05}s, background 0.18s`,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#225e30')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#1C4D28')}
                    >
                        <div
                            className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[#C9A84C]"
                            style={{ background: '#133C1E', border: '1.5px solid #2a6035' }}
                        >
                            {link.icon}
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                            <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700, color: '#C9A84C', lineHeight: 1.2 }}>
                                {t(link.labelKey)}
                            </span>
                            <span style={{ fontSize: 11, color: '#8aad8e', fontWeight: 500, marginTop: 1 }}>
                                {t(link.descKey)}
                            </span>
                        </div>
                        <FaArrowRightLong size={12} style={{ color: '#C9A84C', flexShrink: 0 }} />
                    </Link>
                ))}
            </nav>

            <div className="flex gap-2 mx-3 mt-3 mb-4 shrink-0 min-w-0">
                <div className="flex-1 min-w-0 rounded-2xl p-3 overflow-hidden" style={{ background: '#1C4D28' }}>
                    <p style={{ fontSize: 10, color: '#C9A84C', fontWeight: 700, marginBottom: 8, letterSpacing: 0.3 }}>
                        {t('social.title')}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                        {socialLinks.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[#C9A84C] transition-colors hover:bg-[#225e30] shrink-0"
                                style={{ background: '#133C1E', border: '1.5px solid #2a6035' }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex-1 min-w-0 rounded-2xl p-3 flex flex-col justify-center gap-1 overflow-hidden" style={{ background: '#1C4D28' }}>
                    <a
                        href="tel:+998952245522"
                        className="flex items-center gap-1.5 min-w-0 transition-colors hover:text-white"
                        style={{ color: '#C9A84C', fontSize: 11, fontWeight: 700 }}
                    >
                        <FaPhone size={10} className="shrink-0" />
                        <span className="truncate">+998 (88) 877-55-55</span>
                    </a>
                    <div className="flex items-center gap-1.5 min-w-0" style={{ color: '#8aad8e', fontSize: 10, fontWeight: 500 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', border: '1.5px solid #8aad8e', flexShrink: 0 }} />
                        <span className="truncate">{t('social.hours')}</span>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <header
                className="w-full bg-transparent fixed top-0 left-0 z-50 overflow-x-hidden"
            >
                <div className="max-w-[1440px] mx-auto px-4 2xl:px-0 py-5 flex justify-between items-center">
                    <div
                        style={{
                            opacity: logoVisible ? 1 : 0,
                            transform: logoVisible ? 'translateY(0)' : 'translateY(-20px)',
                            transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                            pointerEvents: logoVisible ? 'auto' : 'none',
                        }}
                    >
                        <Link href="/">
                            <img src="/logos/Samyak_logo.svg" alt="Samyak" width={150} height={50} />
                        </Link>
                    </div>

                    <div
                        className="flex items-center gap-3.5"
                        style={{
                            opacity: headerVisible ? 1 : 0,
                            transform: headerVisible ? 'translateY(0)' : 'translateY(-16px)',
                            transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                            pointerEvents: headerVisible ? 'auto' : 'none',
                        }}
                    >
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

            <div
                className="fixed inset-0 z-60"
                style={{ pointerEvents: 'none', overflow: 'hidden' }}
            >
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
                            <line key={i}
                                x1={`${-20 + i * 18}%`} y1="0%"
                                x2={`${10 + i * 18}%`} y2="100%"
                                stroke="#C9A84C" strokeWidth="1"
                            />
                        ))}
                    </svg>

                    <svg className="absolute top-0 left-0" width="160" height="160"
                        style={{ opacity: menuOpen ? 0.5 : 0, transition: 'opacity 0.9s ease 0.25s' }}>
                        <path d="M0 100 L0 0 L100 0" fill="none" stroke="#C9A84C" strokeWidth="0.9" />
                        <path d="M0 50 L0 0 L50 0" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
                        <circle cx="0" cy="0" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
                    </svg>
                    <svg className="absolute bottom-0 left-0" width="160" height="160"
                        style={{ opacity: menuOpen ? 0.5 : 0, transition: 'opacity 0.9s ease 0.35s' }}>
                        <path d="M0 60 L0 160 L100 160" fill="none" stroke="#C9A84C" strokeWidth="0.9" />
                        <circle cx="0" cy="160" r="4" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
                    </svg>
                </div>

                <div
                    className="hidden lg:flex absolute top-0 right-0 h-full w-[420px] bg-[#133C1E] flex-col border-l-2 border-[#C9A84C]"
                    style={{
                        borderRadius: '18px 0 0 18px',
                        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.52s cubic-bezier(0.22,1,0.36,1)',
                        pointerEvents: menuOpen ? 'auto' : 'none',
                        overflowY: 'auto',
                    }}
                >
                    <PanelContent />
                </div>

                {isMobile && (
                    <div
                        className="absolute top-0 left-0 right-0 flex flex-col bg-[#133C1E] border-b-2 border-[#C9A84C]"
                        style={{
                            borderRadius: '0 0 24px 24px',
                            maxHeight: '92dvh',
                            width: '100vw',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            transform: menuOpen ? 'translateY(0)' : 'translateY(-105%)',
                            transition: 'transform 0.48s cubic-bezier(0.22,1,0.36,1)',
                            pointerEvents: menuOpen ? 'auto' : 'none',
                        }}
                    >
                        <PanelContent />
                    </div>
                )}
            </div>
        </>
    );
}
