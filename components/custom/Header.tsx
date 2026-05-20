'use client';

import { useEffect, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { FaChevronDown } from "react-icons/fa6";
import { TbMenu } from "react-icons/tb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [currentLang, setCurrentLang] = useState<string | null>(null);
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

    return (
        <header className="w-full bg-transparent">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">

                <Link href={"/"}>
                    <img src="/Samyak_logo.webp" alt="Samyak" width={150} height={50} />
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

                    <button className="w-18 h-13 bg-[#66666666] hover:bg-[#bcbcbc]/60 transition-colors rounded-full flex justify-center items-center cursor-pointer">
                        <TbMenu className="w-20 h-8 text-white hover:text-[#66666666]" />
                    </button>
                </div>
            </div>
        </header>
    );
}