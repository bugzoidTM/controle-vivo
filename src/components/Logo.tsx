
import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', hideText = false }) => {
  const iconSize = {
    sm: 16,
    md: 24,
    lg: 32,
  }[size];

  const fontSize = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag 
        size={iconSize} 
        className="text-primary" 
      />
      {!hideText && (
        <span className={`font-bold ${fontSize} tracking-tight`}>MeuComércio</span>
      )}
    </div>
  );
};

export default Logo;
