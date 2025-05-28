
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

interface SystemAlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title: string;
  description: string;
  className?: string;
}

export const SystemAlert = ({ 
  variant = 'default', 
  title, 
  description, 
  className 
}: SystemAlertProps) => {
  const getIcon = () => {
    switch (variant) {
      case 'destructive':
        return <XCircle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertVariant = () => {
    return variant === 'destructive' ? 'destructive' : 'default';
  };

  const getCustomStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-600';
      case 'warning':
        return 'border-orange-200 bg-orange-50 text-orange-800 [&>svg]:text-orange-600';
      default:
        return '';
    }
  };

  return (
    <Alert 
      variant={getAlertVariant()} 
      className={`${getCustomStyles()} ${className}`}
    >
      {getIcon()}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
