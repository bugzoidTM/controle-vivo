
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MobileNav from '../navigation/MobileNav';
import AppSidebar from '../navigation/AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-background">
      {!isMobile && <AppSidebar />}
      
      <div className="flex-1 flex flex-col min-h-screen">
        {isMobile && (
          <MobileNav 
            isOpen={sidebarOpen} 
            onOpenChange={setSidebarOpen} 
          />
        )}
        
        <main className="flex-1 p-4 sm:p-6 overflow-auto pb-16">
          <Outlet />
        </main>
        
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
            <div className="flex justify-around py-2">
              <AppSidebar isMobileMenu />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
