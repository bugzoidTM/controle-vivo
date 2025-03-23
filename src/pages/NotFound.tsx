
import React from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fade-in">
      <Package size={80} className="text-muted-foreground mb-6 opacity-20" />
      <h1 className="text-4xl font-bold mb-2">Página não encontrada</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        A página que você está tentando acessar não existe ou foi movida.
      </p>
      <Button asChild>
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Voltar ao Início
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
