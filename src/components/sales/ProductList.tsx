import React, { useState } from 'react';
import { Search, Plus, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  stock: number;
}

interface ProductListProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddProduct }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={categoryFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(null)}
            className="whitespace-nowrap"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
        
    <ScrollArea className="flex-1 -mx-4 px-4">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Nenhum produto encontrado
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <div className="flex gap-3 py-2">
                <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package size={20} className="text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-muted-foreground text-sm">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {product.stock} unid.
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => onAddProduct(product)}
                  disabled={product.stock <= 0}
                  className="shrink-0"
                >
                  <Plus size={18} />
                </Button>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProductList;
