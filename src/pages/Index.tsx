
import React, { useState, useEffect } from 'react';
import { BarChart3, ShoppingCart, Package, AlertCircle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentSales from '@/components/dashboard/RecentSales';
import InventoryAlert from '@/components/dashboard/InventoryAlert';
import QuickActions from '@/components/dashboard/QuickActions';
import OnboardingDialog from '@/components/onboarding/OnboardingDialog';

const Dashboard: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    // Check if first time visitor
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);
  
  // Mock data
  const recentSales = [
    { id: '1', time: '14:35', total: 'R$ 42,50', items: 3, paymentMethod: 'Dinheiro' },
    { id: '2', time: '13:20', total: 'R$ 85,75', items: 7, paymentMethod: 'Cartão' },
    { id: '3', time: '11:45', total: 'R$ 12,00', items: 1, paymentMethod: 'Pix' },
  ];
  
  const inventoryAlerts = [
    { id: '1', name: 'Arroz Tipo 1', quantity: 3, threshold: 10 },
    { id: '2', name: 'Feijão Carioca', quantity: 2, threshold: 8 },
    { id: '3', name: 'Açúcar Refinado', quantity: 1, threshold: 5 },
    { id: '4', name: 'Café em Pó', quantity: 4, threshold: 10 },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao MeuComércio</h1>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Vendas Hoje"
          value="R$ 325,50"
          icon={<ShoppingCart size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Itens Vendidos"
          value="27"
          icon={<Package size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Produtos Baixo Estoque"
          value="4"
          icon={<AlertCircle size={24} />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <QuickActions />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentSales sales={recentSales} />
        <InventoryAlert items={inventoryAlerts} />
      </div>
      
      <OnboardingDialog 
        open={showOnboarding} 
        onOpenChange={setShowOnboarding} 
      />
    </div>
  );
};

export default Dashboard;
