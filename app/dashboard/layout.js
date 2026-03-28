import DashboardNavbar from '@/components/dashNavbar';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function Layout({ children }) {
    return (
        <>
            <DashboardNavbar />
            {children}
            <Footer />
        </>
    );
}
