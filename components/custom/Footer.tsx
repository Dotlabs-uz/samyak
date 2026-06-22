'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer id="footer" className="w-full relative select-none font-sans overflow-x-hidden">
            <div className="relative w-full pt-20">
                <div className="absolute bottom-0 left-0 w-full h-[450px] md:h-[540px] bg-[#133C1E] rounded-t-[40px] z-10" />

                <div className="max-w-[1440px] mx-auto relative px-4 2xl:px-0 pb-14 z-20">

                    <div className="bg-[#F1F4F8] rounded-[40px] flex flex-col lg:flex-row justify-between items-stretch gap-8 shadow-[0_15px_45px_rgba(0,0,0,0.04)] mb-14 overflow-hidden">

                        <div className="flex flex-col justify-between items-start w-full lg:max-w-md pt-8 pb-8 px-6 sm:px-10 lg:pt-[30px] lg:pb-[30px] lg:pl-[45px] lg:pr-0 gap-8">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[44px] md:text-[54px] font-oceanic font-black text-[#133C1E] tracking-tight leading-[1.05] whitespace-pre-line">
                                    {t("addressesTitle")}
                                </h3>
                                <p className="text-base md:text-xl font-manrope font-bold text-black tracking-tight pt-1">
                                    {t("address")}
                                </p>
                            </div>

                            <div className="flex flex-col items-start gap-4 w-full mt-auto">
                                <div className="text-3xl md:text-[38px] font-manrope font-bold text-black tracking-tighter">
                                    +998 (88) 877-55-55
                                </div>

                                <Link href={"https://www.google.com/maps?cid=2775368452645345711&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=ru&source=embed"} className="bg-[#BF9C66] hover:bg-[#BF9C66]/90 text-white text-sm rounded-full px-8 py-3.5 w-fit transition-colors cursor-pointer outline-none font-avantgarde">
                                    {t("openMap")}
                                </Link>
                            </div>
                        </div>

                        <div className="w-full lg:w-[62%] px-4 pb-6 sm:px-6 lg:pt-[18px] lg:pb-[18px] lg:pr-[20px] lg:pl-0 shrink-0">
                            <div className="w-full h-[280px] md:h-[350px] lg:h-full lg:min-h-[380px] rounded-[32px] overflow-hidden relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3071.8607682351335!2d66.9577656!3d39.65284789999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19ea185c8a9d%3A0x268416e734c059af!2sSAMYAK!5e0!3m2!1sru!2s!4v1779305474761!5m2!1sru!2s"
                                    className="absolute inset-0 w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 w-screen overflow-hidden flex items-center h-28 md:h-36 lg:h-44 bottom-5">
                        <div className="flex whitespace-nowrap min-w-full shrink-0 items-center animate-marquee">
                            {Array(4).fill(null).map((_, outerIdx) => (
                                <div key={outerIdx} className="flex items-center shrink-0 w-screen h-30 relative">
                                    <Image
                                        src="/Footer_img.svg"
                                        alt="Samyak patterns"
                                        fill
                                        className="object-cover object-left md:object-center"
                                        sizes="100vw"
                                        priority
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-16 md:h-24" />

                </div>
            </div>

            <div className="w-full bg-[#BF9C66] text-[#3C3120] relative z-10">
                <div className="max-w-[1440px] mx-auto px-4 2xl:px-0 pt-14 pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:mb-16">
                        <h2 className="text-[56px] font-oceanic font-black leading-[1.15] max-w-xl whitespace-pre-line tracking-tight text-[#3C3120]">
                            {t("invite")}
                        </h2>

                        <div className="flex gap-10">
                            <nav className="md:hidden flex flex-col text-sm md:text-base pt-2 shrink-0 text-black font-manrope">
                                <Link href="/" className="hover:opacity-70 transition-opacity">{t("home")}</Link>
                                <Link href="#products" className="hover:opacity-70 transition-opacity">{t("products")}</Link>
                                <Link href="#philosophy" className="hover:opacity-70 transition-opacity">{t("about")}</Link>
                                <Link href="#guests" className="hover:opacity-70 transition-opacity">{t("feedback")}</Link>
                                <Link href="#footer" className="hover:opacity-70 transition-opacity">{t("contact")}</Link>
                            </nav>

                            <div className="flex flex-col md:items-end text-sm md:text-base pt-2 shrink-0 text-black font-manrope">
                                <a href="https://www.instagram.com/samyak.uz/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Instagram</a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex select-none shrink-0">
                            <Image
                                src="/logos/SamyakWhite_logo.svg"
                                alt="Samyak Logo"
                                width={200}
                                height={100}
                                className="h-20 w-auto object-contain"
                                priority
                            />
                        </div>

                        <nav className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 text-black text-sm tracking-wide font-involve">
                            <Link href="/" className="hover:opacity-70 transition-opacity">{t("home")}</Link>
                            <Link href="#products" className="hover:opacity-70 transition-opacity">{t("products")}</Link>
                            <Link href="#philosophy" className="hover:opacity-70 transition-opacity">{t("about")}</Link>
                            <Link href="#guests" className="hover:opacity-70 transition-opacity">{t("feedback")}</Link>
                            <Link href="#footer" className="hover:opacity-70 transition-opacity">{t("contact")}</Link>
                        </nav>
                    </div>

                    <div className="border-t border-[#78603C] text-black pt-5 flex flex-col lg:flex-row justify-center items-center gap-4 text-[11px] text-center lg:text-left font-semibold font-involve">
                        <div>
                            {t.rich("rights", {
                                link: (chunks) => (
                                    <a
                                        href="https://dotlabs.uz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {chunks}
                                    </a>
                                ),
                            })}
                        </div>

                        <span className="hidden lg:block">|</span>

                        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-1 gap-y-0.5 font-involve">
                            <span className="cursor-pointer hover:underline">{t("cookie")}</span>
                            <span>,</span>
                            <span className="cursor-pointer hover:underline">{t("spam")}</span>
                            <span>,</span>
                            <span className="cursor-pointer hover:underline">{t("privacy")}</span>
                            <span>,</span>
                            <span className="cursor-pointer hover:underline">{t("agreement")}</span>
                            <span>,</span>
                            <span className="cursor-pointer hover:underline">{t("legal")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}