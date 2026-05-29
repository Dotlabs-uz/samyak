'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BiWorld } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { ReelsCard } from '@/components/custom/ReelsCard';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import { IoSparklesSharp } from "react-icons/io5";
import { GiftCard } from '@/components/custom/GiftCard';
import ProductCard from '@/components/custom/ProductCard';
import { PiStarFourFill } from "react-icons/pi";
import { GiSevenPointedStar } from "react-icons/gi";
import { TiStarburst } from "react-icons/ti";
import { RiBox3Fill } from "react-icons/ri";
import { Reveal } from '@/components/animations/Reveal';

const categories = [
    { key: "snacks", color: "bg-[#E1CDAD]", icon: <PiStarFourFill style={{ color: "#E1CDAD" }} size={20} /> },
    { key: "fruits", color: "bg-[#50D541]", icon: <TiStarburst style={{ color: "#50D541" }} size={20} /> },
    { key: "vegetables", color: "bg-[#CE2B53]", icon: <RiBox3Fill style={{ color: "#CE2B53" }} size={20} /> },
    { key: "drinks", color: "bg-blue-400", icon: <GiSevenPointedStar style={{ color: "#FCB100" }} size={20} /> },
    { key: "dairy", color: "bg-[#E1CDAD]", icon: <PiStarFourFill style={{ color: "#E1CDAD" }} size={20} /> },
    { key: "household", color: "bg-[#E1CDAD]", icon: <PiStarFourFill style={{ color: "#E1CDAD" }} size={20} /> },
    { key: "vitamins", color: "bg-[#50D541]", icon: <TiStarburst style={{ color: "#50D541" }} size={20} /> },
    { key: "supplements", color: "bg-[#50D541]", icon: <TiStarburst style={{ color: "#50D541" }} size={20} /> },
]

export default function Home() {
    const t = useTranslations("Hero");
    const p = useTranslations("Philosophy")
    const o = useTranslations("OurGuests")
    const g = useTranslations("Gastronomy")
    const i = useTranslations("Gift")
    const r = useTranslations("Products")

    const [api, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState("snacks")

    const autoplay = useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: false,
        })
    );

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setActiveIndex(api.selectedScrollSnap());
        };

        onSelect();

        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    return (
        <div className="container mx-auto max-w-[1440px] px-4 2xl:px-0 overflow-hidden">
            <section className="w-full h-dvh overflow-hidden relative pt-5 lg:pt-16 pb-6">

                <div className="relative w-full lg:hidden">
                    <div className="absolute top-0 right-0 w-full h-[330px] bg-[#133C1E] rounded-t-[200px] z-0" />

                    <div className="relative z-10 w-full flex justify-center pt-10 mb-6">
                        <div className="relative w-full max-w-[320px] h-[280px]">
                            <Image
                                src="/Hero_img.webp"
                                alt="Samyak Products"
                                fill
                                className="object-contain object-bottom"
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 mb-12">
                    <div className="lg:col-span-6 flex flex-col items-start z-10 text-left">
                        <Reveal direction="up" delay={0}>
                            <div className="flex items-center gap-2 md:gap-3 font-avantgarde font-bold text-[15px] md:text-[20px] tracking-[0.08em] uppercase text-[#133C1E] mb-4 md:mb-6">
                                <span>{t("tagImport")}</span>
                                <span>•</span>
                                <span>{t("tagPremium")}</span>
                                <span>•</span>
                                <span>{t("tagTabiiy")}</span>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={0.1}>
                            <h1 className="font-oceanic font-extrabold text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] text-[#133C1E] tracking-normal leading-[1.05] mb-6 max-w-[720px]">
                                {t.rich("title", {
                                    gold: (chunks) => (
                                        <span className="text-[#BF9C66]">{chunks}</span>
                                    ),
                                    br: () => <br />
                                })}
                            </h1>
                        </Reveal>

                        <Reveal direction="up" delay={0.2}>
                            <p className="font-involve font-medium text-[18px] md:text-[20px] leading-[1.45] text-[#133C1E] tracking-normal max-w-[620px] mb-8 md:mb-10">
                                {t.rich("description", {
                                    br: () => <br />
                                })}
                            </p>
                        </Reveal>

                        <Reveal direction="up" delay={0.3}>
                            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                                <button className="bg-[#133C1E] hover:bg-[#133C1E]/90 text-white font-avantgarde font-normal text-[16px] rounded-full px-8 py-4 min-w-[160px] transition-colors cursor-pointer outline-none">
                                    {t("btnStore")}
                                </button>

                                <button className="border border-[#133C1E]/30 hover:border-[#133C1E] text-[#133C1E] font-avantgarde font-normal text-[16px] rounded-full px-8 py-4 min-w-[160px] flex items-center justify-center gap-2 transition-colors cursor-pointer outline-none bg-transparent">
                                    {t("btnCatalog")}
                                    <IoIosArrowRoundForward size={25} />
                                </button>
                            </div>
                        </Reveal>
                    </div>

                    <motion.div
                        className="lg:col-span-6 w-full justify-center lg:justify-end relative mt-6 lg:mt-0 hidden lg:flex"
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="absolute bottom-[-100px] right-0 w-full max-w-[639px] h-[460px] sm:h-[620px] lg:h-[650px] bg-[#133C1E] rounded-t-[500px] z-0" />

                        <div className="relative z-10 w-full max-w-[620px] sm:max-w-[700px] lg:max-w-[820px] h-[400px] sm:h-[500px] flex items-end justify-center px-4 sm:px-6">
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
                    </motion.div>
                </div>

                <Reveal direction="up" delay={0.4}>
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
                </Reveal>
            </section>

            <section className="relative py-10 px-4 lg:px-0 overflow-visible">
                <div className="relative mb-24 mx-auto px-4">
                    <Image
                        src="/bubbles/bubble1.svg" alt="bubble" width={250} height={60}
                        className="absolute -top-16 left-[5%] w-[150px] xl:w-[250px] hidden md:block"
                    />
                    <Image
                        src="/bubbles/bubble2.svg" alt="bubble" width={250} height={60}
                        className="absolute -bottom-10 right-[5%] xl:right-[10%] w-[150px] xl:w-[250px] hidden md:block"
                    />

                    <Image
                        src="/bubbles/lays.svg" alt="Lays" width={200} height={200}
                        className="absolute left-0 lg:left-20 bottom-0 w-[100px] lg:w-[200px] hidden md:block"
                    />
                    <Image
                        src="/bubbles/lays.svg" alt="Lays" width={200} height={200}
                        className="absolute right-0 lg:-right-10 bottom-0 lg:bottom-30 w-[100px] lg:w-[200px] hidden md:block"
                    />

                    <Reveal direction="up" delay={0}>
                        <h1 className="font-oceanic text-[42px] sm:text-[60px] md:text-[80px] leading-[0.9] uppercase text-center text-[#133B1D] tracking-tighter">
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
                    </Reveal>
                </div>

                <div
                    className="w-full rounded-[32px] flex flex-col md:flex-row items-start relative mt-20 min-h-[400px]"
                    style={{
                        background: '#133C1E',
                        boxShadow: '0px 159px 129.4px 0px #02270C inset'
                    }}
                >
                    <div className="absolute top-[-30px] right-5 z-20 pointer-events-none lg:right-5 md:right-3 sm:right-2 lg:scale-100 md:scale-80 sm:scale-60">
                        <Image src="/bubbles/bubble3.svg" alt="bubble" width={250} height={50} />
                    </div>

                    <div className="relative -mt-12 lg:-mt-30 shrink-0 z-20 md:ml-6 lg:ml-25">
                        <Image
                            src="/person.png"
                            alt="Person"
                            width={400}
                            height={400}
                            className="object-contain scale-x-[-1] md:w-[280px] lg:w-[400px]"
                        />
                    </div>

                    <div className="flex-1 z-10 flex flex-col items-start pt-8 md:pt-10 lg:pt-16 pr-6 md:pr-8 lg:pr-16 pl-6 md:pl-0">
                        <Reveal direction="up" delay={0}>
                            <h3 className="font-avantgarde text-[#BF9C66] text-lg font-bold uppercase tracking-widest mb-2">
                                {p("label")}
                            </h3>
                        </Reveal>

                        <Reveal direction="up" delay={0.1}>
                            <h2 className="font-oceanic text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                                {p("subTitle")}
                            </h2>
                        </Reveal>

                        <Reveal direction="up" delay={0.2}>
                            <p className="font-avantgarde text-base md:text-[15px] lg:text-lg mb-6 max-w-xl text-white">
                                {p("text")}
                            </p>
                        </Reveal>

                        <Reveal direction="up" delay={0.3}>
                            <div className="flex items-center gap-4 pb-5">
                                <button className="bg-[#BF9C66] text-white px-5 py-3 rounded-full hover:bg-[#a88a58] transition cursor-pointer">
                                    {p("button")}
                                </button>

                                <button className="border border-white text-white px-5 py-3 rounded-full hover:bg-white/10 transition cursor-pointer">
                                    {p("button")}
                                </button>
                            </div>
                        </Reveal>
                    </div>

                    <div className="hidden md:block absolute bottom-2 left-0 w-full pointer-events-none">
                        <Image
                            src="/Footer_img.svg"
                            alt="Pattern"
                            width={1920}
                            height={60}
                            className="w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white px-4 rounded-4xl">
                <Reveal direction="up" delay={0}>
                    <h2 className="text-center text-2xl font-bold text-[#C1A176] mb-10 tracking-widest uppercase">
                        {r("top_products")}
                    </h2>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition cursor-pointer
                        ${activeCategory === cat.key
                                        ? "bg-[#BF9C66] text-white border-[#BF9C66]"
                                        : "bg-white text-gray-700 border-gray-200 hover:bg-[#BF9C66] hover:text-white"
                                    }`}
                            >
                                {cat.icon}
                                <span>{r(`categories.${cat.key}`)}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[1, 2, 3, 4].map((i) => (
                            <ProductCard
                                key={i}
                                titleKey="item_title"
                                image="/products/lays.png"
                            />
                        ))}
                    </div>
                </Reveal>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => api?.scrollPrev()}
                        className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer"
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        onClick={() => api?.scrollNext()}
                        className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </section>

            <section className="w-full py-20 bg-[#F3F3F3]">
                <Reveal direction="up" delay={0}>
                    <div className="flex flex-col items-center text-center gap-5 mb-14">
                        <span className="text-[#BF9C66] text-xl uppercase font-avantgarde font-bold text-center block">
                            {i("badge")}
                        </span>

                        <h2 className="font-oceanic text-4xl md:text-6xl max-w-2xl text-[#133B1D] font-extrabold leading-[1.1]">
                            {i.raw("titleWords").map((word: any, idx: number) => (
                                <span
                                    key={idx}
                                    className={`${word.highlight ? "text-[#BF9C66]" : "text-[#133B1D]"} mr-2`}
                                    style={{ fontWeight: 1000 }}
                                >
                                    {word.text}
                                </span>
                            ))}
                        </h2>

                        <p className="text-[#363636] text-lg font-avantgarde max-w-lg">
                            {i("subtitle")}
                        </p>
                    </div>
                </Reveal>

                <Reveal direction="up" delay={0.15}>
                    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <GiftCard
                            title={i("items.tayyor.title")}
                            price={i("items.tayyor.price")}
                            description={i("items.tayyor.desc")}
                        />

                        <GiftCard
                            title={i("items.toy.title")}
                            price={i("items.toy.price")}
                            description={i("items.toy.desc")}
                        />

                        <GiftCard
                            title={i("items.premium.title")}
                            price={i("items.premium.price")}
                            description={i("items.premium.desc")}
                        />

                        <GiftCard
                            title={i("items.corporate.title")}
                            price={i("items.corporate.price")}
                            description={i("items.corporate.desc")}
                        />
                    </div>
                </Reveal>
            </section>

            <section className="relative w-full py-20 overflow-hidden">
                <div className="relative z-10 mx-auto mb-5">
                    <Reveal direction="up" delay={0}>
                        <div className="flex flex-col items-center text-center gap-4">
                            <span className="text-[#BF9C66] text-xl uppercase font-avantgarde font-bold text-center block">
                                {g('coffee.badge')}
                            </span>

                            <h2 className="text-4xl md:text-6xl max-w-2xl text-[#133C1E] font-extrabold font-oceanic">
                                {g('coffee.title')}
                            </h2>

                            <p className="text-[#363636] text-lg font-avantgarde max-w-lg mb-10">
                                {g('coffee.subtitle')}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.15}>
                        <div className="hidden md:grid grid-cols-[416fr_306fr_306fr_196fr] gap-4 w-full">
                            <img
                                src="/products/coffee1.png"
                                alt="coffee"
                                className="w-full h-[416px] object-cover rounded-[32px]"
                            />

                            <img
                                src="/products/coffee2.png"
                                alt="coffee"
                                className="w-full h-[416px] object-cover rounded-[32px]"
                            />

                            <img
                                src="/products/coffee3.png"
                                alt="coffee"
                                className="w-full h-[416px] object-cover rounded-[32px]"
                            />

                            <img
                                src="/products/coffee4.png"
                                alt="coffee"
                                className="w-full h-[416px] object-cover rounded-[32px]"
                            />
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.15}>
                        <div className="grid md:hidden grid-cols-3 gap-3 w-full">
                            <img
                                src="/products/coffee1.png"
                                alt="coffee"
                                className="col-span-1 w-full h-[197px] object-cover rounded-[15px]"
                            />

                            <img
                                src="/products/coffee4.png"
                                alt="coffee"
                                className="col-span-2 w-full h-[197px] object-cover rounded-[15px]"
                            />

                            <img
                                src="/products/coffee3.png"
                                alt="coffee"
                                className="col-span-2 w-full h-[197px] object-cover rounded-[15px]"
                            />

                            <img
                                src="/products/coffee2.png"
                                alt="coffee"
                                className="col-span-1 w-full h-[197px] object-cover rounded-[15px]"
                            />
                        </div>
                    </Reveal>
                </div>

                <div className="relative rounded-[32px] overflow-hidden">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('/products/Gastronomy_img.png')`
                            }}
                        />

                        <div
                            className="absolute inset-0"
                            style={{
                                background: `
                    linear-gradient(
                        180deg,
                        rgba(0, 0, 0, 0.92) 0%,
                        rgba(0, 0, 0, 0.78) 22%,
                        rgba(9, 24, 14, 0.68) 55%,
                        rgba(19, 60, 30, 0.38) 78%,
                        rgba(0, 0, 0, 0.88) 100%
                    )
                    `
                            }}
                        />

                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
                        <Reveal direction="up" delay={0}>
                            <div className="max-w-2xl">
                                <h3 className="text-[#BF9C66] text-xl font-semibold uppercase mb-5 font-avantgarde">
                                    {g('gastronomy.subtitle')}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 items-start mb-5 gap-10">
                                <h2 className="text-4xl md:text-6xl max-w-xl text-white font-oceanic">
                                    {g('gastronomy.title')}
                                </h2>

                                <p className="text-white text-base md:text-lg font-avantgarde max-w-sm">
                                    {g('gastronomy.description')}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={0.15}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="rounded-[28px] border border-white/10 bg-[#4242424D] backdrop-blur-[2px] p-7 md:p-8 min-h-[260px] flex flex-col justify-between"
                                    >
                                        <span className="text-[#BF9C66] text-lg uppercase font-bold font-avantgarde">
                                            {g('products.ready_set')}
                                        </span>

                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                            <h3 className="text-white text-3xl md:text-[38px] leading-[110%] font-oceanic max-w-[260px]">
                                                {g('products.cold_water')}
                                            </h3>

                                            <div className="max-w-[280px]">
                                                {['item1', 'item2', 'item3'].map((itemKey) => (
                                                    <div
                                                        key={itemKey}
                                                        className="flex items-start gap-3 text-[#E7E7E7]"
                                                    >
                                                        <span className="text-white text-xs mt-[3px] shrink-0">
                                                            <IoSparklesSharp />
                                                        </span>

                                                        <span className="text-sm leading-[160%] font-involve">
                                                            {g(`products.${itemKey}`)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 lg:px-0">
                <div className="relative">
                    <div className="absolute top-[-50px] left-5 md:top-10 md:-left-20 z-20 hidden md:block">
                        <Image src="/bubbles/bubble1.svg" alt="bubble" width={250} height={50} />
                    </div>

                    <Reveal direction="up" delay={0}>
                        <div className="flex flex-col md:flex-row justify-between items-start">
                            <div>
                                <p className="text-[#BF9C66] uppercase font-bold text-xl">
                                    {o("label")}
                                </p>
                            </div>

                            <div className="max-w-lg">
                                <h2 className="text-4xl md:text-6xl font-oceanic text-[#133C1E]">
                                    {o("title")}
                                </h2>
                                <p className="text-[#363636] font-avantgarde mt-4 text-lg">
                                    {o("description")}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => api?.scrollPrev()} className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer">
                                    <FaArrowLeft />
                                </button>
                                <button onClick={() => api?.scrollNext()} className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer">
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    plugins={[autoplay.current]}
                    className="w-full mx-auto mt-10"
                >
                    <CarouselContent className="items-center">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <CarouselItem
                                key={index}
                                className="basis-[306px] flex justify-center"
                            >
                                <ReelsCard
                                    videoSrc="/reels/video.mp4"
                                    isCenter={index === activeIndex}
                                    autoplay={autoplay.current}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </section>
        </div >
    );
}