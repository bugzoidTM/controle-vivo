
import React from 'react';
import { ShoppingCart, Package, BarChart4, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: <ShoppingCart size={24} />,
      label: 'Nova Venda',
      path: '/vendas/nova',
      color: 'bg-blue-50 text-blue-500',
    },
    {
      icon: <Package size={24} />,
      label: 'Adicionar Produto',
      path: '/estoque/novo',
      color: 'bg-green-50 text-green-500',
    },
    {
      icon: <BarChart4 size={24} />,
      label: 'Ver Relatórios',
      path: '/relatorios',
      color: 'bg-purple-50 text-purple-500',
    },
    {
      icon: <PlusCircle size={24} />,
      label: 'Mais Ações',
      path: '/configuracoes',
      color: 'bg-gray-50 text-gray-500',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="hover-scale flex flex-col items-center justify-center p-4 rounded-lg bg-card text-center"
            >
              <div className={`w-12 h-12 mb-2 rounded-full flex items-center justify-center ${action.color}`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
