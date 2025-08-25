import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined and fallback to 'tr' if not
  const currentLocale = locale || 'tr';
  
  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default
  };
});

export const locales = ['tr', 'en'] as const;
export const defaultLocale = 'tr' as const;
