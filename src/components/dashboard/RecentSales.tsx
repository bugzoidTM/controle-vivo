
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface SaleItem {
  id: string;
  time: string;
  total: string;
  items: number;
  paymentMethod: string;
}

interface RecentSalesProps {
  sales: SaleItem[];
}

const RecentSales: React.FC<RecentSalesProps> = ({ sales }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Vendas Recentes</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {sales.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Nenhuma venda registrada hoje
            </p>
          ) : (
            sales.map((sale) => (
              <div key={sale.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{sale.total}</p>
                    <p className="text-sm text-muted-foreground">
                      {sale.items} {sale.items === 1 ? 'item' : 'itens'} • {sale.paymentMethod}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {sale.time}
                  </div>
                </div>
                <Separator />
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="ml-auto" asChild>
          <Link to="/vendas">
            Ver todas
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentSales;
