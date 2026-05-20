import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

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
                    <Header />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}