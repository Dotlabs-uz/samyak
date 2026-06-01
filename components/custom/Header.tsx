'use client';

import { useEffect, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { FaChevronDown } from "react-icons/fa6";
import { TbMenu } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const navLinks = [
    { href: "#philosophy", label: "О нас" },
    { href: "#products", label: "Продукты" },
    { href: "#gifts", label: "Подарки" },
    { href: "#gastronomy", label: "Гастрономия" },
    { href: "#guests", label: "Отзывы" },
];

export default function Header() {
    const [currentLang, setCurrentLang] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const lang = document.cookie.match(/locale=(\w{2,5})/)?.[1] || "uz";
        setCurrentLang(lang);
    }, []);

    const languages = [
        { code: "ru", label: "RU" },
        { code: "en", label: "EN" },
        { code: "uz", label: "UZ" },
    ];

    const handleLangChange = (code: string) => {
        document.cookie = `locale=${code}; path=/; max-age=31536000`;
        setCurrentLang(code);
        router.refresh();
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            <header className="w-full bg-transparent">
                <div className="max-w-[1440px] mx-auto px-4 2xl:px-0 py-5 flex justify-between items-center">

                    <Link href={"/"}>
                        <img src="/logos/Samyak_logo.svg" alt="Samyak" width={150} height={50} />
                    </Link>

                    <div className="flex items-center gap-3.5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="bg-[#66666666] hover:bg-[#bcbcbc] transition-colors text-white font-semibold font-involve text-sm rounded-full px-2 py-3.5 flex items-center gap-1.5 uppercase outline-none min-w-[30px] justify-center select-none cursor-pointer h-13">
                                    {languages.find((l) => l.code === currentLang)?.label || "UZ"}
                                    <FaChevronDown className="w-3.5 h-3.5 opacity-70" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="bg-[#66666666] border border-[#1a3b2a]/10 rounded-2xl min-w-[110px] p-1.5 shadow-md backdrop-blur-md"
                            >
                                <ul className="flex flex-col gap-0.5">
                                    {languages.map(({ code, label }) => (
                                        <li key={code}>
                                            <DropdownMenuItem
                                                onClick={() => handleLangChange(code)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer font-medium text-sm text-white hover:bg-[#bcbcbc]/40 focus:bg-[#bcbcbc]/40 outline-none transition-colors"
                                            >
                                                {currentLang === code && (
                                                    <IoCheckmark className="text-white w-4 h-4" />
                                                )}
                                                <span className={currentLang === code ? "font-bold" : ""}>{label}</span>
                                            </DropdownMenuItem>
                                        </li>
                                    ))}
                                </ul>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button
                            onClick={() => setMenuOpen(true)}
                            className="w-18 h-13 bg-[#66666666] hover:bg-[#bcbcbc]/60 transition-colors rounded-full flex justify-center items-center cursor-pointer"
                            aria-label="Open menu"
                        >
                            <TbMenu className="w-20 h-8 text-white" />
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-50 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMenuOpen(false)}
                />

                <div
                    className={`absolute top-0 right-0 h-full w-[85vw] max-w-[360px] bg-[#133C1E] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex items-center justify-between px-6 py-5">
                        <Link href={"/"} onClick={() => setMenuOpen(false)}>
                            <img src="/logos/Samyak_logo.svg" alt="Samyak" width={120} height={40} className="brightness-0 invert" />
                        </Link>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close menu"
                        >
                            <IoClose className="text-white w-6 h-6" />
                        </button>
                    </div>
                    
                    <div className="mx-6 h-px bg-white/10" />

                    <nav className="flex-1 flex flex-col px-6 pt-8 gap-2">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="group flex items-center justify-between py-4 px-4 rounded-2xl hover:bg-white/8 transition-colors"
                                style={{
                                    transitionDelay: menuOpen ? `${idx * 60}ms` : '0ms',
                                }}
                            >
                                <span className="font-oceanic text-white text-2xl font-bold tracking-tight group-hover:text-[#BF9C66] transition-colors">
                                    {link.label}
                                </span>
                                <FaArrowRightLong className="text-white group-hover:text-[#BF9C66] transition-colors text-lg" />
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}