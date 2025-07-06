import { useIsMobile } from "@/hooks/use-mobile";
import DesktopSidebar from "./desktop-sidebar";
import MobileNavigation from "./mobile-navigation";
import TopHeader from "./top-header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation - Fixed at bottom */}
      {isMobile && <MobileNavigation />}
      
      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && <DesktopSidebar />}
        
        {/* Main Content */}
        <main className="flex-1 md:ml-0 pb-16 md:pb-0">
          <TopHeader />
          {children}
        </main>
      </div>
    </div>
  );
}
