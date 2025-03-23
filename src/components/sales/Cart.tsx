
import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from './ProductList';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-0 pt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Carrinho</h3>
          <div className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden py-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-8">
            <ShoppingCart size={40} className="mb-2 opacity-20" />
            <p>Seu carrinho está vazio</p>
            <p className="text-sm">Adicione produtos para iniciar uma venda</p>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id}>
                  <div className="flex justify-between gap-2 py-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        R$ {item.product.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      
                      <span className="w-8 text-center">{item.quantity}</span>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus size={14} />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onRemoveItem(item.product.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      
      <CardFooter className="flex-col pt-0">
        <div className="w-full mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          size="lg"
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          Finalizar Venda
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;
