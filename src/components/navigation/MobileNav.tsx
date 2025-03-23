
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '../Logo';
import AppSidebar from './AppSidebar';

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onOpenChange }) => {
  return (
    <div className="border-b border-border py-3 px-4 flex items-center justify-between">
      <Logo />
      
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px]">
          <div className="h-full flex flex-col">
            <div className="py-4">
              <Logo />
            </div>
            <div className="flex-1">
              <AppSidebar />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
