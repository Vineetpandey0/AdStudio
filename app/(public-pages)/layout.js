import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export const metadata = {
    title: 'AdStudio - PrebuiltUI',
    description: 'Design AI assistants that research, plan, and execute tasks — all powered by your prompts.',
    appleWebApp: {
        title: 'AdStudio - PrebuiltUI',
    },
};

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
