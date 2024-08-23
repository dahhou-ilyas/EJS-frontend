import { Inter } from 'next/font/google';
import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Toaster } from "react-hot-toast";
import {getLocale} from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });


export const metadata = {
    title: "e-ESJ",
    description: "e-Espace Santé Jeunes",
  };
 

export default async function RootLayout({
  children,
 
}) {
    const messages = await getMessages();
    const locale = await getLocale();

    console.log(locale)
    
    return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Toaster position="bottom-center" />
           {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}