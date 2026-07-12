import { getTranslations } from "next-intl/server";

export default async function LocalBusinessJsonLd() {
    const t = await getTranslations("seo.business");

    const data = {
        "@context": "https://schema.org",
        "@type": "GroceryStore",
        name: "Samyak",
        alternateName: "Samyak.uz",
        image: "https://samyak.uz/og-image.png",
        url: "https://samyak.uz",
        telephone: "+998888775555",
        address: {
            "@type": "PostalAddress",
            streetAddress: "улица Амира Темура, 17А",
            addressLocality: "Самарканд",
            addressCountry: "UZ",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 39.652903,
            longitude: 66.957825
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
        },
        sameAs: [
            "https://www.instagram.com/samyak.uz/",
            "https://yandex.ru/maps/org/samyak_uz/14048181921/",
        ],
        description: t("description")
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}