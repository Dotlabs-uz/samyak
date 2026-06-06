import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";

type GiftCardProps = {
    title: string;
    image: string;
    active?: boolean;
};

export function GiftCard({ title, image, active = false }: GiftCardProps) {
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
            <div className="p-3">
                <div
                    style={{
                        width: "100%",
                        height: 163,
                        borderRadius: 21,
                        background: "#eaeae8",
                        overflow: "hidden",
                    }}
                    className="flex items-center justify-center"
                >
                    <img
                        src={image}
                        alt={title}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        className="transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-col items-center text-center gap-3 pt-3">
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

                    <button
                        className={clsx(
                            "mt-2 flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all w-full cursor-pointer justify-center",
                            "border-[#BF9C66] text-[#BF9C66]"
                        )}
                    >
                        {i("button")}
                        <FaArrowRightLong size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}