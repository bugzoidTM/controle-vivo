
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm, { ProductFormValues } from '@/components/inventory/ProductForm';
import { toast } from 'sonner';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Mock inventory data (same as in InventoryPage)
const mockInventory = [
  {
    id: '1',
    name: 'Arroz Tipo 1 5kg',
    price: '22.90',
    stock: '3',
    threshold: '10',
    category: 'Alimentos',
  },
  {
    id: '2',
    name: 'Feijão Carioca 1kg',
    price: '8.50',
    stock: '15',
    threshold: '8',
    category: 'Alimentos',
  },
  {
    id: '3',
    name: 'Açúcar Refinado 1kg',
    price: '4.79',
    stock: '1',
    threshold: '5',
    category: 'Alimentos',
  },
];

const InventoryEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [product, setProduct] = useState<ProductFormValues | null>(null);
  
  useEffect(() => {
    // Find product in mock data
    const foundProduct = mockInventory.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct({
        name: foundProduct.name,
        price: foundProduct.price,
        stock: foundProduct.stock,
        threshold: foundProduct.threshold,
        category: foundProduct.category,
        description: '',
      });
    } else {
      toast.error('Produto não encontrado');
      navigate('/estoque');
    }
  }, [id, navigate]);
  
  const handleSubmit = (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Product updated:', values);
      toast.success('Produto atualizado com sucesso!');
      setIsSubmitting(false);
      navigate('/estoque');
    }, 1500);
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Product deleted:', id);
      toast.success('Produto excluído com sucesso!');
      setIsDeleting(false);
      navigate('/estoque');
    }, 1500);
  };
  
  if (!product) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="loading-dots text-2xl">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="mr-1">
            <Link to="/estoque">
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Editar Produto</h1>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="text-destructive">
              <Trash2 size={18} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o produto
                do seu inventário.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground"
              >
                {isDeleting ? (
                  <>
                    <div className="loading-dots mr-2">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Excluindo...
                  </>
                ) : (
                  'Sim, excluir produto'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm 
            defaultValues={product}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryEditPage;
