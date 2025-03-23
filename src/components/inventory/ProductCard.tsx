
import React from 'react';
import { Package, Edit, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  threshold: number;
  category: string;
  image?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  stock,
  threshold,
  category,
  image
}) => {
  const isLowStock = stock <= threshold;
  
  return (
    <Card className="overflow-hidden hover-scale">
      <div className="relative">
        <div className="h-40 bg-secondary flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <Package size={40} className="text-muted-foreground opacity-20" />
          )}
        </div>
        
        {isLowStock && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 flex gap-1 items-center">
              <AlertTriangle size={12} />
              Estoque Baixo
            </Badge>
          </div>
        )}
        
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 left-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
          asChild
        >
          <Link to={`/estoque/editar/${id}`}>
            <Edit size={14} />
          </Link>
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-medium line-clamp-1">{name}</h3>
          <p className="text-muted-foreground text-sm">{category}</p>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-muted-foreground">Disponível</p>
            <p className={`font-medium ${isLowStock ? 'text-amber-600' : ''}`}>
              {stock} unidades
            </p>
          </div>
          <p className="font-bold">
            R$ {price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
