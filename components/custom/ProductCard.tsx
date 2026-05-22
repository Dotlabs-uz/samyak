"use client"

import { useTranslations } from "next-intl"

const ProductCard = ({ image, titleKey }: any) => {
    const t = useTranslations("Products")

    return (
        <div className="relative flex flex-col items-center justify-center p-4 rounded-3xl hover:shadow-xl transition cursor-pointer">
            <img
                src={image}
                alt={t(titleKey)}
                className="w-48 h-auto object-contain mb-6"
            />

            <h3 className="text-xl font-semibold font-oneanic text-[#BF9C66] mb-3 text-center">
                {t(titleKey)}
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
    )
}

export default ProductCard