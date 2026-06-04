"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

const FIGURES = [
    "/bubbles/figur1.png",
    "/bubbles/figur2.png",
    "/bubbles/figur3.png",
    "/bubbles/figur4.png",
]

const ProductCard = ({
    image,
    category,
    index = 0,
}: {
    image: string;
    category: string;
    index?: number;
}) => {
    const t = useTranslations("Products");

    const figur = FIGURES[index % FIGURES.length];

    return (
        <div className="relative flex flex-col items-center justify-between p-4 rounded-3xl hover:shadow-xl transition cursor-pointer h-[320px]">
            <div className="relative flex items-center justify-center mb-6 w-full h-[180px] shrink-0">
                <div className="absolute w-[160px] h-[160px] pointer-events-none select-none">
                    <Image
                        src={figur}
                        alt=""
                        fill
                        className="object-contain opacity-70"
                    />
                </div>

                <img
                    src={image.replace('/public', '')}
                    alt={t(`categories.${category}`)}
                    className="relative z-10 w-full h-full object-contain drop-shadow-xl"
                />
            </div>

            <h3 className="text-xl font-semibold font-oceanic text-[#BF9C66] mb-3 text-center">
                {t(`categories.${category}`)}
            </h3>

            <div className="flex gap-4 text-sm text-[#5C5C5C] flex-wrap justify-center">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#BF9C66]" />
                    {t("halal")}
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#BF9C66]" />
                    {t("gelatin_free")}
                </div>
            </div>
        </div>
    );
};

export default ProductCard
