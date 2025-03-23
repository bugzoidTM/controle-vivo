
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  BarChart4, 
  Settings, 
  ReceiptText,
  Zap
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton
} from '@/components/ui/sidebar';
import Logo from '../Logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  isMobileMenu?: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileMenu = false }) => {
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Início', 
      path: '/' 
    },
    { 
      icon: ShoppingCart, 
      label: 'Vendas', 
      path: '/vendas' 
    },
    { 
      icon: Package, 
      label: 'Estoque', 
      path: '/estoque' 
    },
    { 
      icon: BarChart4, 
      label: 'Relatórios', 
      path: '/relatorios' 
    },
    { 
      icon: Settings, 
      label: 'Configurações', 
      path: '/configuracoes' 
    }
  ];

  if (isMobileMenu) {
    return (
      <div className="w-full flex justify-around items-center">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center py-2 px-3 text-muted-foreground rounded-md transition-colors",
              isActive ? "text-primary" : "hover:text-foreground"
            )}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-2",
                    isActive ? "text-primary" : "text-sidebar-foreground"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full">
          <Zap size={16} className="mr-2" />
          Modo Offline
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
