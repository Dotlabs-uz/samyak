import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Samyak — Premium Import Products | Самарканд',
    description: 'Samyak — premium импортные продукты: шоколад, мёд, чай, кофе, БАД. Доставка по Узбекистану. Халяль, без глютена.',
    keywords: ['samyak', 'самьяк', 'самарканд', 'premium', 'import', 'halal', 'шоколад', 'мёд', 'чай'],
    openGraph: {
        title: 'Samyak — Premium Import Products',
        description: 'Выбор лучших мировых брендов. Халяль. Без глютена. Самарканд.',
        url: 'https://samyak.uz',
        siteName: 'Samyak',
        images: [{ url: 'https://samyak.uz/Samyak_logo.svg', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Samyak — Premium Import Products',
        description: 'Лучшие мировые бренды в Самарканде.',
        images: ['https://samyak.uz/Samyak_logo.svg'],
    },
    alternates: { canonical: 'https://samyak.uz' },
    robots: { index: true, follow: true },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div style={{ overflowX: 'clip' }}>
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}