
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  DollarSign, 
  Smartphone, 
  CheckCircle2, 
  Receipt
} from 'lucide-react';
import { CartItem } from './Cart';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onComplete: (paymentMethod: string) => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  items,
  onComplete
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const handleComplete = () => {
    if (!paymentMethod) return;
    
    setProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      onComplete(paymentMethod);
      setProcessing(false);
      toast.success('Venda finalizada com sucesso!');
    }, 1500);
  };
  
  const paymentMethods = [
    { id: 'cash', name: 'Dinheiro', icon: <DollarSign size={20} /> },
    { id: 'credit', name: 'Cartão de crédito', icon: <CreditCard size={20} /> },
    { id: 'debit', name: 'Cartão de débito', icon: <CreditCard size={20} /> },
    { id: 'pix', name: 'Pix', icon: <Smartphone size={20} /> }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Venda</DialogTitle>
          <DialogDescription>
            Selecione a forma de pagamento para concluir a venda.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors ${
                  paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                  {method.icon}
                </div>
                <span className="font-medium">{method.name}</span>
                {paymentMethod === method.id && (
                  <CheckCircle2 size={18} className="ml-auto text-primary" />
                )}
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Itens</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleComplete} 
            disabled={!paymentMethod || processing}
            className="gap-2"
          >
            {processing ? (
              <>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Processando
              </>
            ) : (
              <>
                <Receipt size={16} />
                Concluir Venda
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
