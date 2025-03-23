
import React, { useState } from 'react';
import { Plus, Search, Filter, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/inventory/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock inventory data
const mockInventory = [
  {
    id: '1',
    name: 'Arroz Tipo 1 5kg',
    price: 22.90,
    stock: 3,
    threshold: 10,
    category: 'Alimentos',
  },
  {
    id: '2',
    name: 'Feijão Carioca 1kg',
    price: 8.50,
    stock: 15,
    threshold: 8,
    category: 'Alimentos',
  },
  {
    id: '3',
    name: 'Açúcar Refinado 1kg',
    price: 4.79,
    stock: 1,
    threshold: 5,
    category: 'Alimentos',
  },
  {
    id: '4',
    name: 'Café em Pó 500g',
    price: 12.90,
    stock: 4,
    threshold: 10,
    category: 'Alimentos',
  },
  {
    id: '5',
    name: 'Leite Integral 1L',
    price: 5.49,
    stock: 25,
    threshold: 8,
    category: 'Bebidas',
  },
  {
    id: '6',
    name: 'Refrigerante Cola 2L',
    price: 8.99,
    stock: 15,
    threshold: 5,
    category: 'Bebidas',
  },
  {
    id: '7',
    name: 'Água Mineral 500ml',
    price: 2.50,
    stock: 30,
    threshold: 10,
    category: 'Bebidas',
  },
  {
    id: '8',
    name: 'Detergente Líquido 500ml',
    price: 3.20,
    stock: 12,
    threshold: 5,
    category: 'Produtos de Limpeza',
  },
];

const InventoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filteredProducts = mockInventory.filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const lowStockProducts = filteredProducts.filter(
    (product) => product.stock <= product.threshold
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Estoque</h1>
        <Button asChild>
          <Link to="/estoque/novo">
            <Plus size={16} className="mr-2" />
            Adicionar Produto
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Filtrar
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos ({filteredProducts.length})</TabsTrigger>
          <TabsTrigger value="low-stock">Estoque Baixo ({lowStockProducts.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium">Nenhum produto encontrado</h3>
              <p>Tente alterar sua busca ou adicione novos produtos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="low-stock">
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium">Sem produtos com estoque baixo</h3>
              <p>Todos os seus produtos estão com estoque adequado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lowStockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryPage;
