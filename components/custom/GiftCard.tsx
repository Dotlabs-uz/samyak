import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";

type GiftCardProps = {
    title: string;
    price: string;
    description: string;
    active?: boolean;
};

export function GiftCard({
    title,
    price,
    description,
    active = false,
}: GiftCardProps) {
    const i = useTranslations("Gift");

    return (
        <div
            className={clsx(
                "group rounded-[28px] border overflow-hidden cursor-pointer transition-all duration-500",
                active
                    ? "bg-[#133C1E] border-[#133C1E]"
                    : "bg-white border-black/10 hover:bg-[#133C1E] hover:border-[#133C1E]"
            )}
        >
            <div className="p-5">
                <div className="rounded-2xl overflow-hidden">
                    <img
                        src="/products/Gift.png"
                        alt={title}
                        className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </div>

            <div className="px-6 pb-7 flex flex-col items-center text-center gap-3">
                <span className="text-[#BF9C66] text-xs uppercase tracking-[0.25em] font-avantgarde font-semibold">
                    {i("badge")}
                </span>

                <h3
                    className={clsx(
                        "font-oceanic font-extrabold text-[34px] leading-[1.1] transition-colors duration-500",
                        active
                            ? "text-[#EAEAEA]"
                            : "text-[#133C1E] group-hover:text-[#EAEAEA]"
                    )}
                >
                    {title}
                </h3>

                <p
                    className={clsx(
                        "text-[15px] transition-colors duration-500",
                        active
                            ? "text-[#ADADAD]"
                            : "text-[#689674] group-hover:text-[#ADADAD]"
                    )}
                >
                    {price}
                </p>

                <p
                    className={clsx(
                        "text-sm leading-relaxed max-w-[260px] transition-colors duration-500",
                        active
                            ? "text-[#EAEAEA]"
                            : "group-hover:text-[#EAEAEA]"
                    )}
                >
                    {description}
                </p>

                <button
                    className={clsx(
                        "mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all w-full cursor-pointer justify-center",
                        "border-[#BF9C66] text-[#BF9C66]",
                    )}
                >
                    {i("button")}
                    <FaArrowRightLong size={14} />
                </button>
            </div>
        </div>
    );
}