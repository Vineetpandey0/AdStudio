import { Poppins } from 'next/font/google';
import './globals.css';
import LenisScroll from '@/components/lenis-scroll';
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
    
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: '#3b82f6',
                    colorBackground: '#0c0721',
                    colorInputBackground: 'rgba(255, 255, 255, 0.05)',
                    colorInputText: '#fff',
                },
                elements: {
                    card: 'bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl',
                    headerTitle: 'font-headline text-[#e9e1ff]',
                    headerSubtitle: 'text-gray-400',
                    socialButtonsBlockButton: 'border border-white/10 hover:bg-white/5 transition-all text-white',
                    socialButtonsBlockButtonText: 'font-semibold',
                    formButtonPrimary: 'font-semibold tracking-wide bg-blue-600 hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.4)]',
                    footerActionLink: 'text-blue-400 hover:text-blue-300',
                    dividerLine: 'bg-white/10',
                    dividerText: 'text-gray-500',
                    formFieldInput: 'border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl',
                    formFieldLabel: 'text-gray-300'
                }
            }}
        >
            <html lang='en'>
                <LenisScroll />
                <body className="antialiased text-white">{children}</body>
            </html>
        </ClerkProvider>
    );
}
