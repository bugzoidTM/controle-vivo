
import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface AlertItem {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
}

interface InventoryAlertProps {
  items: AlertItem[];
}

const InventoryAlert: React.FC<InventoryAlertProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={20} className="text-amber-500" />
          <h3 className="font-medium">Alertas de Estoque</h3>
        </div>
        
        <div className="space-y-3">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                  {item.quantity} unidades
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${Math.min(100, (item.quantity / item.threshold) * 100)}%` }}
                />
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </CardContent>
      
      {items.length > 3 && (
        <CardFooter className="pt-2 pb-4">
          <Button variant="ghost" size="sm" className="ml-auto" asChild>
            <Link to="/estoque">
              Ver todos
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default InventoryAlert;
