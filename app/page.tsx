'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { BiWorld } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import { PiStarFourFill } from "react-icons/pi";
import { GiSevenPointedStar } from "react-icons/gi";
import { TiStarburst } from "react-icons/ti";
import { RiBox3Fill } from "react-icons/ri";

import { HeroIntro } from '@/components/animations/HeroIntro';
import { PhilosophyIntro } from '@/components/animations/PhilosophyIntro';
import { GiftCard } from '@/components/custom/GiftCard';
import ProductCard from '@/components/custom/ProductCard';
import { ReelsCard } from '@/components/custom/ReelsCard';
import { Reveal } from '@/components/animations/Reveal';

const categories = [
    { key: "snacks", iconColor: "#BF9C66", Icon: PiStarFourFill },
    { key: "fruits", iconColor: "#50D541", Icon: TiStarburst },
    { key: "vegetables", iconColor: "#CE2B53", Icon: RiBox3Fill },
    { key: "drinks", iconColor: "#FCB100", Icon: GiSevenPointedStar },
    { key: "dairy", iconColor: "#E1CDAD", Icon: PiStarFourFill },
    { key: "household", iconColor: "#E1CDAD", Icon: PiStarFourFill },
    { key: "vitamins", iconColor: "#50D541", Icon: TiStarburst },
    { key: "supplements", iconColor: "#50D541", Icon: TiStarburst },
]

export default function Home() {
    const t = useTranslations("Hero");
    const p = useTranslations("Philosophy")
    const o = useTranslations("OurGuests")
    const g = useTranslations("Gastronomy")
    const i = useTranslations("Gift")
    const r = useTranslations("Products")

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState("snacks")
    const [productPage, setProductPage] = useState(0);
    const [giftCarouselIdx, setGiftCarouselIdx] = useState(0);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [activeCard, setActiveCard] = useState(-1);
    const [titleStarted, setTitleStarted] = useState(false);
    const [descVisible, setDescVisible] = useState(false);
    const [reelsPlaying, setReelsPlaying] = useState(false);

    const autoplay = useRef<{ stop: () => void; play: () => void }>({ stop: () => { }, play: () => { } });
    useEffect(() => {
        let paused = false;
        autoplay.current = {
            stop: () => { paused = true; },
            play: () => { paused = false; },
        };
        const interval = setInterval(() => {
            if (!paused) setActiveIndex(i => (i + 1) % 5);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    const startGreenAnimation = () => {
        if (animationStarted) return;

        setAnimationStarted(true);

        let current = 0;

        setActiveCard(0);

        const interval = setInterval(() => {
            current++;

            if (current >= 4) {
                clearInterval(interval);

                setTimeout(() => {
                    setActiveCard(-1);
                }, 500);

                return;
            }

            setActiveCard(current);
        }, 600);
    };

    return (
        <div className="container mx-auto max-w-[1440px] px-4 2xl:px-0">

            <section className="w-full relative pt-2 lg:pt-4 pb-0 mb-10 lg:mb-16 ">

                <div className="relative w-full lg:hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-full bg-[#133C1E] rounded-t-[200px] z-0"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 300, opacity: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />
                    <motion.div
                        className="relative z-10 w-full flex justify-start px-4 pt-2 mb-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative w-full max-w-[340px] h-[320px] -mb-10">
                            <Image
                                src="/Hero_img.webp"
                                alt="Samyak Products"
                                fill
                                className="object-contain object-bottom-left"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center lg:gap-6 min-w-0">
                    <div className="flex flex-col justify-center z-10 text-left py-6 lg:py-4 pr-0 lg:pr-8">
                        <HeroIntro
                            t={t}
                            onTitleDone={() => setTitleStarted(true)}
                            onDescDone={() => setDescVisible(true)}
                        />
                        <motion.p
                            className="font-involve font-medium text-[16px] md:text-[18px] leading-normal text-[#133C1E] tracking-normal max-w-[480px] mb-8"
                            initial={{ opacity: 0, y: 18 }}
                            animate={descVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {t("description")}
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
                            initial={{ opacity: 0, y: 18 }}
                            animate={descVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <button className="bg-[#133C1E] hover:bg-[#133C1E]/90 text-white font-avantgarde font-normal text-[16px] rounded-full px-8 py-4 min-w-[160px] transition-colors cursor-pointer outline-none">
                                {t("btnStore")}
                            </button>
                            <button className="border border-[#133C1E]/30 hover:border-[#133C1E] text-[#133C1E] font-avantgarde font-normal text-[16px] rounded-full px-8 py-4 min-w-[160px] flex items-center justify-center gap-2 transition-colors cursor-pointer outline-none bg-transparent">
                                {t("btnCatalog")}
                                <IoIosArrowRoundForward size={25} />
                            </button>
                        </motion.div>
                    </div>

                    <div className="relative hidden lg:block h-[600px] xl:h-[680px] min-w-0 overflow-visible">
                        <motion.div
                            className="absolute inset-x-0 bottom-0 top-6 bg-[#133C1E] rounded-tl-[400px] rounded-tr-[400px] z-0"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <motion.div
                            className="absolute left-0 right-0 -top-20 xl:-top-28 bottom-0 z-10"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="relative mx-auto h-full w-full max-w-full pl-2 xl:pl-4">
                                <Image
                                    src="/Hero_img.webp"
                                    alt="Samyak Products"
                                    fill
                                    className="object-contain object-bottom-left"
                                    sizes="(max-width: 1280px) 50vw, 720px"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                <Reveal direction="up" delay={0.4}>
                    <div className="relative w-full bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-6 py-6 md:py-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-center">
                            <div className="flex items-center gap-4">
                                <BiWorld size={36} />
                                <p className="font-involve font-normal text-[14px] text-black text-left">{t("feature1")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <MdOutlineShoppingCart size={36} />
                                <p className="font-involve font-normal text-[14px] text-black text-left">{t("feature2")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <FiBox size={36} />
                                <p className="font-involve font-normal text-[14px] text-black text-left">{t("feature3")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <GoGift size={36} />
                                <p className="font-involve font-normal text-[14px] text-black text-left">{t("feature4")}</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="relative" id="philosophy">
                <PhilosophyIntro words={p.raw("titleWords") as string[]} />
                <div
                    className="w-full rounded-[32px] flex flex-col md:flex-row items-start relative mt-8 lg:mt-12 min-h-[400px]"
                    style={{ background: '#133C1E', boxShadow: '0px 159px 129.4px 0px #02270C inset' }}
                >
                    <motion.div
                        className="absolute top-[-30px] right-5 z-20 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image src="/bubbles/bubble3.svg" alt="bubble" width={250} height={50} />
                    </motion.div>

                    <motion.div
                        className="relative -mt-12 lg:-mt-30 shrink-0 z-20 md:ml-6 lg:ml-25 overflow-x-hidden"
                        initial={{ x: 160, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image
                            src="/person.png"
                            alt="Person"
                            width={400}
                            height={400}
                            className="object-contain scale-x-[-1] md:w-[280px] lg:w-[400px]"
                        />
                        <div
                            className="absolute inset-0 md:hidden pointer-events-none"
                            style={{
                                background: 'linear-gradient(to bottom, transparent 40%, #133C1E 90%)'
                            }}
                        />
                    </motion.div>

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
                        <Image src="/Footer_img.svg" alt="Pattern" width={1920} height={60} className="w-full object-cover" />
                    </div>
                </div>
            </section>

            <section className="mt-20 py-16 bg-white px-4 rounded-4xl" id="products">
                <Reveal direction="up" delay={0}>
                    <h2 className="text-center text-2xl font-bold text-[#C1A176] mb-10 tracking-widest uppercase">
                        {r("top_products")}
                    </h2>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-avantgarde font-medium transition-all duration-200 cursor-pointer border ${isActive
                                        ? "bg-[#BF9C66] border-[#BF9C66] text-white"
                                        : "bg-white border-[#E5E5E5] text-[#133C1E] hover:border-[#BF9C66]"
                                        }`}
                                >
                                    <cat.Icon
                                        size={16}
                                        style={{ color: isActive ? "#fff" : cat.iconColor }}
                                    />
                                    {r(`categories.${cat.key}`)}
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {[1, 2, 3, 4].map((n, idx) => (
                        <motion.div
                            key={n}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ProductCard titleKey="item_title" image="/bubbles/lays.png" index={idx} />
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={() => setProductPage(prev => Math.max(0, prev - 1))} className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer">
                        <FaArrowLeft />
                    </button>
                    <button onClick={() => setProductPage(prev => prev + 1)} className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer">
                        <FaArrowRight />
                    </button>
                </div>
            </section>

            <section className="w-full py-20 bg-[#F3F3F3]" id="gifts">
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
                        <p className="text-[#363636] text-lg font-avantgarde max-w-lg">{i("subtitle")}</p>
                    </div>
                </Reveal>

                <div className="hidden md:grid mx-auto grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { title: i("items.tayyor.title"), price: i("items.tayyor.price"), description: i("items.tayyor.desc") },
                        { title: i("items.toy.title"), price: i("items.toy.price"), description: i("items.toy.desc") },
                        { title: i("items.premium.title"), price: i("items.premium.price"), description: i("items.premium.desc") },
                        { title: i("items.corporate.title"), price: i("items.corporate.price"), description: i("items.corporate.desc") },
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            onAnimationComplete={() => {
                                if (idx === 3) {
                                    startGreenAnimation();
                                }
                            }}
                        >
                            <GiftCard
                                title={card.title}
                                price={card.price}
                                description={card.description}
                                active={activeCard === idx}
                            />
                        </motion.div>
                    ))}
                </div>

                {(() => {
                    const giftCards = [
                        { title: i("items.tayyor.title"), price: i("items.tayyor.price"), description: i("items.tayyor.desc") },
                        { title: i("items.toy.title"), price: i("items.toy.price"), description: i("items.toy.desc") },
                        { title: i("items.premium.title"), price: i("items.premium.price"), description: i("items.premium.desc") },
                        { title: i("items.corporate.title"), price: i("items.corporate.price"), description: i("items.corporate.desc") },
                    ];
                    return (
                        <div className="md:hidden">
                            <div className="relative overflow-hidden">
                                <motion.div
                                    className="flex gap-4 px-4"
                                    animate={{ x: `-${giftCarouselIdx * (100 / giftCards.length)}%` }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ width: `${giftCards.length * 85}vw` }}
                                >
                                    {giftCards.map((card, idx) => (
                                        <div key={idx} style={{ width: '80vw', flexShrink: 0 }}>
                                            <GiftCard title={card.title} price={card.price} description={card.description} />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            <div className="flex justify-center gap-2 mt-4 mb-6">
                                {giftCards.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setGiftCarouselIdx(idx)}
                                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${giftCarouselIdx === idx ? 'bg-[#133C1E] w-6' : 'bg-[#133C1E]/30'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })()}

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setGiftCarouselIdx(prev => Math.max(0, prev - 1))}
                        className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer"
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        onClick={() => setGiftCarouselIdx(prev => Math.min(3, prev + 1))}
                        className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </section>

            <section className="relative w-full py-20 overflow-hidden" id="gastronomy">
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

                    <div className="hidden md:grid grid-cols-[416fr_306fr_306fr_196fr] gap-4 w-full">
                        {["/products/coffee1.png", "/products/coffee2.png", "/products/coffee3.png", "/products/coffee4.png"].map((src, idx) => (
                            <motion.img
                                key={src}
                                src={src}
                                alt="coffee"
                                className="w-full h-[416px] object-cover rounded-[32px]"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            />
                        ))}
                    </div>

                    <div className="grid md:hidden grid-cols-3 gap-3 w-full">
                        {[
                            { src: "/products/coffee1.png", span: "col-span-1" },
                            { src: "/products/coffee4.png", span: "col-span-2" },
                            { src: "/products/coffee3.png", span: "col-span-2" },
                            { src: "/products/coffee2.png", span: "col-span-1" },
                        ].map(({ src, span }, idx) => (
                            <motion.img
                                key={src}
                                src={src}
                                alt="coffee"
                                className={`${span} w-full h-[197px] object-cover rounded-[15px]`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 1.0, delay: idx * 0.25, ease: [0.22, 1, 0.36, 1] }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative rounded-[32px] overflow-hidden">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/products/Gastronomy_img.png')` }} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 22%, rgba(9,24,14,0.68) 55%, rgba(19,60,30,0.38) 78%, rgba(0,0,0,0.88) 100%)` }} />
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
                                <h2 className="text-4xl md:text-6xl max-w-xl text-white font-oceanic">{g('gastronomy.title')}</h2>
                                <p className="text-white text-base md:text-lg font-avantgarde max-w-sm">{g('gastronomy.description')}</p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((n, idx) => (
                                <motion.div
                                    key={n}
                                    className="rounded-[28px] border border-white/10 bg-[#4242424D] backdrop-blur-[2px] p-7 md:p-8 min-h-[260px] flex flex-col justify-between"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
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
                                                <div key={itemKey} className="flex items-start gap-3 text-[#E7E7E7]">
                                                    <span className="text-white text-xs mt-[3px] shrink-0"><IoSparklesSharp /></span>
                                                    <span className="text-sm leading-[160%] font-involve">{g(`products.${itemKey}`)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 overflow-hidden" id="guests">
                <div className="px-4 lg:px-0 relative mb-12">
                    <div className="absolute top-[-50px] left-5 md:top-10 z-20 hidden md:block">
                        <Image src="/bubbles/bubble1.svg" alt="bubble" width={250} height={50} />
                    </div>
                    <Reveal direction="up" delay={0}>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div>
                                <p className="text-[#BF9C66] uppercase font-bold text-xl">{o("label")}</p>
                            </div>
                            <div className="max-w-lg">
                                <h2 className="text-4xl md:text-6xl font-oceanic text-[#133C1E]">{o("title")}</h2>
                                <p className="text-[#363636] font-avantgarde mt-4 text-lg">{o("description")}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => setActiveIndex(i => (i - 1 + 5) % 5)}
                                    className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer"
                                >
                                    <FaArrowLeft />
                                </button>
                                <button
                                    onClick={() => setActiveIndex(i => (i + 1) % 5)}
                                    className="h-14 w-14 rounded-full bg-[#133C1E] flex items-center justify-center text-white hover:bg-[#1f5a2d] transition cursor-pointer"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="relative w-full flex items-center justify-center" style={{ height: "620px" }}>
                    <div className="relative flex items-center justify-center w-full">
                        {[0, 1, 2, 3, 4].map((cardIdx) => {
                            const total = 5;
                            let offset = cardIdx - activeIndex;
                            if (offset > 2) offset -= total;
                            if (offset < -2) offset += total;
                            const isCenter = offset === 0;
                            const isVisible = Math.abs(offset) <= 2;
                            if (!isVisible) return null;

                            const translateX = offset * 360;

                            const translateY = Math.abs(offset) === 0 ? 0
                                : Math.abs(offset) === 1 ? 60
                                    : 120;

                            const rotate = offset === 0 ? 0
                                : offset === -1 ? -4
                                    : offset === 1 ? 4
                                        : offset === -2 ? -8
                                            : 8;

                            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.5;
                            const zIndex = isCenter ? 10 : Math.abs(offset) === 1 ? 6 : 2;

                            return (
                                <div
                                    key={cardIdx}
                                    onClick={() => !isCenter && setActiveIndex(cardIdx)}
                                    className="absolute transition-all duration-500"
                                    style={{
                                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`,
                                        opacity,
                                        zIndex,
                                        cursor: isCenter ? "default" : "pointer",
                                        transformOrigin: "bottom center",
                                    }}
                                >
                                    <ReelsCard
                                        videoSrc="/reels/video.mp4"
                                        isCenter={isCenter}
                                        onPlay={() => autoplay.current.stop()}
                                        onPause={() => autoplay.current.play()}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}