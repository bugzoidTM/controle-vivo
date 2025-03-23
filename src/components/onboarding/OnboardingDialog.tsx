
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from '../Logo';

interface OnboardingStep {
  title: string;
  description: string;
  image: string;
}

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      title: 'Bem-vindo ao MeuComércio',
      description: 'Gerencie seu negócio de forma simples e eficiente. Vamos mostrar como começar a usar o aplicativo.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Registre suas vendas',
      description: 'Adicione produtos ao carrinho, registre vendas e acompanhe seus rendimentos diários.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Controle seu estoque',
      description: 'Adicione novos produtos, atualize quantidades e receba alertas quando o estoque estiver baixo.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Visualize relatórios',
      description: 'Acompanhe o desempenho do seu negócio com relatórios simples e intuitivos.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={steps[currentStep].image}
            alt={steps[currentStep].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <Logo size="lg" />
          </div>
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">{steps[currentStep].title}</DialogTitle>
            <DialogDescription className="mt-2">
              {steps[currentStep].description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center mt-6 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full mx-1 transition-all ${
                  index === currentStep
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <DialogFooter className="flex sm:flex-row gap-2 mt-4">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft size={16} className="mr-1" />
                Anterior
              </Button>
            ) : (
              <Button variant="outline" onClick={handleSkip}>
                Pular
              </Button>
            )}

            <Button onClick={handleNext} className="flex-1">
              {currentStep === steps.length - 1 ? (
                <>
                  <Check size={16} className="mr-1" />
                  Começar
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight size={16} className="ml-1" />
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingDialog;
