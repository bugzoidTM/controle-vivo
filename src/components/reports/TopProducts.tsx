
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ProductItem {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

interface TopProductsProps {
  products: ProductItem[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Produtos Mais Vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Sem dados para mostrar
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id}>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.quantity} unidades vendidas
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {product.revenue.toFixed(2)}</p>
                  </div>
                </div>
                {index < products.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopProducts;
