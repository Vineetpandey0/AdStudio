import DashboardNavbar from '@/components/dashNavbar';
import DashSidebar from '@/components/dashSidebar';
import Footer from '@/components/footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Top Navbar */}
      <DashboardNavbar />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <DashSidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}