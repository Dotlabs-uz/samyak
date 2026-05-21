'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BiWorld } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Home() {
    const t = useTranslations("Hero");
    const p = useTranslations("Philosophy")

    return (
        <div className="container mx-auto">
            <section className="w-full overflow-hidden relative pt-10 lg:pt-16 pb-6">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-0">

                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 mb-12">

                        <div className="lg:col-span-6 flex flex-col items-start z-10 text-left">

                            <div className="flex items-center gap-2 md:gap-3 font-avantgarde font-bold text-[20px] tracking-[0.08em] uppercase text-[#133C1E] mb-4 md:mb-6">
                                <span>{t("tagImport")}</span>
                                <span>•</span>
                                <span>{t("tagPremium")}</span>
                                <span>•</span>
                                <span>{t("tagTabiiy")}</span>
                            </div>

                            <h1 className="font-oceanic font-extrabold text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] text-[#133C1E] tracking-normal leading-[1.05] mb-6 max-w-[720px]">
                                {t.rich("title", {
                                    gold: (chunks) => (
                                        <span className="text-[#BF9C66]">
                                            {chunks}
                                        </span>
                                    ),
                                    br: () => <br />
                                })}
                            </h1>

                            <p className="font-involve font-medium text-[18px] md:text-[20px] leading-[1.45] text-[#133C1E] tracking-normal max-w-[620px] mb-8 md:mb-10">
                                {t.rich("description", {
                                    br: () => <br />
                                })}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                                <button className="bg-[#133C1E] hover:bg-[#133C1E]/90 text-white font-avantgarde font-normal text-[16px] rounded-full px-8 py-4 min-w-[160px] transition-colors cursor-pointer outline-none">
                                    {t("btnStore")}
                                </button>

                                <button className="border border-[#133C1E]/30 hover:border-[#133C1E] text-[#133C1E] font-avantgarde font-normal text-[16px] rounded-full px-8 py-4 min-w-[160px] flex items-center justify-center gap-2 transition-colors cursor-pointer outline-none bg-transparent">
                                    {t("btnCatalog")}

                                    <IoIosArrowRoundForward size={25} />
                                </button>
                            </div>

                        </div>

                        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end relative mt-6 lg:mt-0">

                            <div className="absolute bottom-[-100px] right-0 w-full max-w-[639px] h-[460px] sm:h-[620px] lg:h-[650px] bg-[#133C1E] rounded-t-[500px] z-0" />

                            <div className="relative z-10 w-full max-w-[620px] sm:max-w-[700px] lg:max-w-[820px] h-[400px] sm:h-[500px]  flex items-end justify-center px-4 sm:px-6">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/Hero_img.webp"
                                        alt="Samyak Products"
                                        fill
                                        className="object-contain object-bottom"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="relative w-full bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] px-6 py-6 md:py-8 mt-4 z-1000">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-center">
                            <div className="flex items-center gap-4">
                                <BiWorld size={40} />

                                <p className="font-involve font-normal text-[15px] text-black text-left">
                                    {t("feature1")}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <MdOutlineShoppingCart size={40} />

                                <p className="font-involve font-normal text-[15px] text-black text-left">
                                    {t("feature2")}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <FiBox size={40} />

                                <p className="font-involve font-normal text-[15px] text-black text-left">
                                    {t("feature3")}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <GoGift size={40} />

                                <p className="font-involve font-normal text-[15px] text-black text-left">
                                    {t("feature4")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-20 px-4 lg:px-0 overflow-visible">
                <div className="relative mb-24 max-w-7xl mx-auto px-4">
                    <Image
                        src="/bubble1.svg" alt="bubble" width={250} height={60}
                        className="absolute -top-16 left-[5%] w-[150px] xl:w-[250px] hidden md:block"
                    />
                    <Image
                        src="/bubble2.svg" alt="bubble" width={250} height={60}
                        className="absolute -bottom-10 right-[5%] xl:right-[10%] w-[150px] xl:w-[250px] hidden md:block"
                    />

                    <Image
                        src="/lays.svg" alt="Lays" width={200} height={200}
                        className="absolute left-0 lg:left-20 bottom-0 w-[100px] lg:w-[200px] hidden md:block"
                    />
                    <Image
                        src="/lays.svg" alt="Lays" width={200} height={200}
                        className="absolute right-0 lg:-right-10 bottom-0 lg:bottom-30 w-[100px] lg:w-[200px] hidden md:block"
                    />

                    <h1 className="font-oceanic text-[32px] sm:text-[60px] md:text-[80px] leading-[0.9] uppercase text-center text-[#133B1D] tracking-tighter">
                        {p.raw("titleWords").map((word: string, i: number) => (
                            <span
                                key={i}
                                className={`block ${i === 1 ? "text-[#BF9C66]" : ""}`}
                                style={{ fontWeight: 1000 }}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-0">
                    <div
                        className="w-full rounded-t-[32px] md:rounded-[32px] flex flex-col md:flex-row items-start relative mt-20 min-h-[400px]"
                        style={{
                            background: '#133C1E',
                            boxShadow: '0px 159px 129.4px 0px #02270C inset'
                        }}
                    >
                        <div className="absolute top-[-30px] right-5 md:top-10 md:-right-20 z-20 hidden md:block">
                            <Image src="/bubble3.svg" alt="bubble" width={250} height={50} />
                        </div>

                        <div className="relative -mt-12 md:-mt-30 shrink-0 z-20 ml-25">
                            <Image
                                src="/person.png"
                                alt="Person"
                                width={400}
                                height={400}
                                className="object-contain scale-x-[-1]"
                            />
                        </div>

                        <div className="flex-1 z-10 flex flex-col items-start pt-8 md:pt-16 pr-8 md:pr-16 pl-8 md:pl-0">
                            <h3 className="font-avantgarde text-[#BF9C66] text-lg font-bold uppercase tracking-widest mb-2">
                                {p("label")}
                            </h3>
                            <h2 className="font-oceanic text-3xl md:text-5xl font-bold mb-4 text-white">
                                {p("subTitle")}
                            </h2>
                            <p className="font-avantgarde text-base md:text-lg mb-6 max-w-xl text-white">
                                {p("text")}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <button className="bg-[#BF9C66] text-white px-8 py-3 rounded-full hover:bg-[#a88a58] transition cursor-pointer">
                                    {p("button")}
                                </button>
                                <button className="border border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition cursor-pointer">
                                    {p("button")}
                                </button>
                            </div>
                        </div>

                        <div className="absolute bottom-2 left-0 w-full pointer-events-none">
                            <Image
                                src="/Footer_img.svg"
                                alt="Pattern"
                                width={1920}
                                height={60}
                                className="w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

            </section>


        </div>
    );
}