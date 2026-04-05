import { Poppins } from 'next/font/google';
import './globals.css';
import LenisScroll from '@/components/lenis-scroll';
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
    
    return (
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: '#3b82f6',
                    colorInputBackground: 'rgba(255, 255, 255, 0.05)',
                    colorInputText: '#fff',
                    colorText: '#ffffff',
                    colorTextSecondary: '#9ca3af',
                    colorTextOnPrimaryBackground: '#ffffff',
                },
                elements: {
                    card: 'bg-[#0f072e] border border-white/10 backdrop-blur-2xl shadow-xl text-white',
                    headerTitle: 'font-headline text-[#e9e1ff] text-2xl',
                    headerSubtitle: 'text-gray-400',
                    socialButtonsBlockButton: 'border border-white/10 hover:bg-white/5 transition-all text-white',
                    socialButtonsBlockButtonText: 'font-semibold text-white',
                    formButtonPrimary: 'font-semibold tracking-wide bg-blue-600 hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.4)]',
                    footerActionLink: 'text-blue-400 hover:text-blue-300',
                    footerActionText: 'text-gray-400',
                    dividerLine: 'bg-white/10',
                    dividerText: 'text-gray-500',
                    formFieldInput: 'border-white/10 bg-white/5 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl',
                    formFieldLabel: 'text-white font-medium mb-1',
                    formFieldLabelRow: 'mb-1',
                    formFieldAction: 'text-blue-400 hover:text-blue-300',
                    identityPreviewText: 'text-white',
                    identityPreviewEditButtonIcon: 'text-white'
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
