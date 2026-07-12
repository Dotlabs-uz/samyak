import { getLocale, getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import type { Metadata } from "next";

const SITE_URL = "https://samyak.uz";
const locales = ["ru", "uz", "en", "zh"] as const;

const ogLocaleMap: Record<string, string> = {
    ru: "ru_RU",
    uz: "uz_UZ",
    en: "en_US",
    zh: "zh_CN",
};

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("seo.home");

    const languages = Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
    );

    return {
        metadataBase: new URL(SITE_URL),
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `${SITE_URL}/${locale}`,
            languages,
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `${SITE_URL}/${locale}`,
            siteName: "Samyak",
            locale: ogLocaleMap[locale] ?? "ru_RU",
            images: [
                {
                    url: `${SITE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: "Samyak — Premium Import Products",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: [`${SITE_URL}/og-image.png`],
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div style={{ overflowX: "clip" }}>
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}