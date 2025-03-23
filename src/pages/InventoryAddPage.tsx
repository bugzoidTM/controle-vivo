
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm, { ProductFormValues } from '@/components/inventory/ProductForm';
import { toast } from 'sonner';

const InventoryAddPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Product added:', values);
      toast.success('Produto adicionado com sucesso!');
      setIsSubmitting(false);
      navigate('/estoque');
    }, 1500);
  };
  
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="mr-1">
            <Link to="/estoque">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Adicionar Produto</h1>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryAddPage;
