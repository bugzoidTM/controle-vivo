
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SaleData {
  name: string;
  value: number;
}

interface SalesByPeriodProps {
  dailyData: SaleData[];
  weeklyData: SaleData[];
  monthlyData: SaleData[];
}

type PeriodType = 'daily' | 'weekly' | 'monthly';

const SalesByPeriod: React.FC<SalesByPeriodProps> = ({
  dailyData,
  weeklyData,
  monthlyData,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('daily');

  const periodLabels = {
    daily: 'Hoje',
    weekly: 'Esta Semana',
    monthly: 'Este Mês',
  };

  const getData = () => {
    switch (selectedPeriod) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Vendas por Período</CardTitle>
          <div className="flex gap-2">
            {(['daily', 'weekly', 'monthly'] as PeriodType[]).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {periodLabels[period]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesByPeriod;
