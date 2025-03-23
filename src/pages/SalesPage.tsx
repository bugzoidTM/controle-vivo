
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductList, { Product } from '@/components/sales/ProductList';
import Cart, { CartItem } from '@/components/sales/Cart';
import PaymentDialog from '@/components/sales/PaymentDialog';
import { toast } from 'sonner';

// Mock products data
const mockProducts: Product[] = [
  { id: '1', name: 'Arroz Tipo 1 5kg', price: 22.90, category: 'Alimentos', stock: 20 },
  { id: '2', name: 'Feijão Carioca 1kg', price: 8.50, category: 'Alimentos', stock: 15 },
  { id: '3', name: 'Açúcar Refinado 1kg', price: 4.79, category: 'Alimentos', stock: 18 },
  { id: '4', name: 'Café em Pó 500g', price: 12.90, category: 'Alimentos', stock: 10 },
  { id: '5', name: 'Leite Integral 1L', price: 5.49, category: 'Bebidas', stock: 25 },
  { id: '6', name: 'Refrigerante Cola 2L', price: 8.99, category: 'Bebidas', stock: 15 },
  { id: '7', name: 'Água Mineral 500ml', price: 2.50, category: 'Bebidas', stock: 30 },
  { id: '8', name: 'Detergente Líquido 500ml', price: 3.20, category: 'Produtos de Limpeza', stock: 12 },
  { id: '9', name: 'Papel Higiênico 4 rolos', price: 6.90, category: 'Higiene Pessoal', stock: 8 },
  { id: '10', name: 'Sabonete em Barra 90g', price: 2.30, category: 'Higiene Pessoal', stock: 20 },
  { id: '11', name: 'Escova de Dentes', price: 4.99, category: 'Higiene Pessoal', stock: 15 },
  { id: '12', name: 'Caderno Universitário', price: 15.90, category: 'Papelaria', stock: 7 },
];

const SalesPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  
  const handleAddProduct = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );
    
    if (existingItemIndex !== -1) {
      // Product already in cart, increase quantity
      const newItems = [...cartItems];
      if (newItems[existingItemIndex].quantity < product.stock) {
        newItems[existingItemIndex].quantity += 1;
        setCartItems(newItems);
      } else {
        toast.warning('Quantidade máxima em estoque atingida');
      }
    } else {
      // Add new product to cart
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId
    );
    
    if (existingItemIndex !== -1) {
      const newItems = [...cartItems];
      const product = newItems[existingItemIndex].product;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        newItems.splice(existingItemIndex, 1);
      } else if (quantity <= product.stock) {
        // Update quantity if within stock limits
        newItems[existingItemIndex].quantity = quantity;
      } else {
        toast.warning('Quantidade máxima em estoque atingida');
        return;
      }
      
      setCartItems(newItems);
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };
  
  const handleCheckout = () => {
    setPaymentDialogOpen(true);
  };
  
  const handleCompleteSale = (paymentMethod: string) => {
    // Update product stock
    const updatedProducts = [...products];
    
    cartItems.forEach((item) => {
      const productIndex = updatedProducts.findIndex(p => p.id === item.product.id);
      if (productIndex !== -1) {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          stock: updatedProducts[productIndex].stock - item.quantity
        };
      }
    });
    
    setProducts(updatedProducts);
    setCartItems([]);
    setPaymentDialogOpen(false);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="mr-1">
            <Link to="/">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Nova Venda</h1>
        </div>
      </div>
      
      <div className="flex-1 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProductList 
            products={products} 
            onAddProduct={handleAddProduct} 
          />
        </div>
        
        <div>
          <Cart 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
      
      <PaymentDialog 
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        items={cartItems}
        onComplete={handleCompleteSale}
      />
    </div>
  );
};

export default SalesPage;
