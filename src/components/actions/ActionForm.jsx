import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertCircle, Info } from 'lucide-react';

const ActionForm = ({ 
  title, 
  description, 
  urgency = 'normal',
  children,
  alerts = [],
  info = null
}) => {
  const getUrgencyBadge = () => {
    const variants = {
      'critical': 'destructive',
      'high': 'destructive',
      'normal': 'secondary',
      'low': 'outline'
    };
    
    const colors = {
      'critical': 'text-red-700',
      'high': 'text-orange-700',
      'normal': 'text-gray-700',
      'low': 'text-gray-500'
    };

    return (
      <Badge variant={variants[urgency]} className={colors[urgency]}>
        {urgency === 'critical' && '🔴'} {urgency.toUpperCase()} PRIORITY
      </Badge>
    );
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {getUrgencyBadge()}
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 && (
          <div className="space-y-2 mb-4">
            {alerts.map((alert, index) => (
              <div 
                key={index}
                className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{alert}</p>
              </div>
            ))}
          </div>
        )}

        {info && (
          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">{info}</p>
          </div>
        )}

        <div className="space-y-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionForm;
