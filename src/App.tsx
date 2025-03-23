
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import Index from "./pages/Index";
import SalesPage from "./pages/SalesPage";
import InventoryPage from "./pages/InventoryPage";
import InventoryAddPage from "./pages/InventoryAddPage";
import InventoryEditPage from "./pages/InventoryEditPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/vendas" element={<SalesPage />} />
              <Route path="/vendas/nova" element={<SalesPage />} />
              <Route path="/estoque" element={<InventoryPage />} />
              <Route path="/estoque/novo" element={<InventoryAddPage />} />
              <Route path="/estoque/editar/:id" element={<InventoryEditPage />} />
              <Route path="/relatorios" element={<ReportsPage />} />
              <Route path="/configuracoes" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
