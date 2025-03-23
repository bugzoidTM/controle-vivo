
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SalesByPeriod from '@/components/reports/SalesByPeriod';
import TopProducts from '@/components/reports/TopProducts';
import InventoryStatus from '@/components/reports/InventoryStatus';

// Mock data for sales by period
const mockDailyData = [
  { name: '08:00', value: 120 },
  { name: '10:00', value: 300 },
  { name: '12:00', value: 220 },
  { name: '14:00', value: 500 },
  { name: '16:00', value: 250 },
  { name: '18:00', value: 400 },
];

const mockWeeklyData = [
  { name: 'Seg', value: 1200 },
  { name: 'Ter', value: 900 },
  { name: 'Qua', value: 1300 },
  { name: 'Qui', value: 1600 },
  { name: 'Sex', value: 1800 },
  { name: 'Sáb', value: 2100 },
  { name: 'Dom', value: 800 },
];

const mockMonthlyData = [
  { name: 'Semana 1', value: 4200 },
  { name: 'Semana 2', value: 5800 },
  { name: 'Semana 3', value: 4900 },
  { name: 'Semana 4', value: 6300 },
];

// Mock data for top products
const mockTopProducts = [
  { id: '1', name: 'Arroz Tipo 1 5kg', quantity: 38, revenue: 871.02 },
  { id: '2', name: 'Refrigerante Cola 2L', quantity: 25, revenue: 224.75 },
  { id: '3', name: 'Café em Pó 500g', quantity: 22, revenue: 283.80 },
  { id: '4', name: 'Leite Integral 1L', quantity: 20, revenue: 109.80 },
  { id: '5', name: 'Feijão Carioca 1kg', quantity: 18, revenue: 153.00 },
];

// Mock data for inventory status
const mockInventoryStatus = [
  { name: 'Estoque Normal', value: 24, color: '#4CAF50' },
  { name: 'Estoque Baixo', value: 5, color: '#FFC107' },
  { name: 'Sem Estoque', value: 3, color: '#F44336' },
];

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          Exportar Dados
        </Button>
      </div>
      
      <div className="grid gap-6">
        <SalesByPeriod
          dailyData={mockDailyData}
          weeklyData={mockWeeklyData}
          monthlyData={mockMonthlyData}
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          <TopProducts products={mockTopProducts} />
          <InventoryStatus 
            data={mockInventoryStatus} 
            total={32} 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
