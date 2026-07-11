import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const locales = ['en', 'ru', 'uz', 'zh'];
    const cookieStore = await cookies();
    let locale = cookieStore.get("locale")?.value || 'uz';

    if (!locales.includes(locale)) {
        locale = "uz";
    }

    return {
        locale,
        messages: (await import(`../langs/${locale}.json`)).default
    };
});