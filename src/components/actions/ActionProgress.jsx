import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Circle, Clock, AlertCircle, Loader2 } from 'lucide-react';

const ActionProgress = ({ actions = [], onActionClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'completed': 'default',
      'in-progress': 'secondary',
      'failed': 'destructive',
      'pending': 'outline'
    };
    
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const completedCount = actions.filter(a => a.status === 'completed').length;
  const progressPercentage = actions.length > 0 
    ? Math.round((completedCount / actions.length) * 100) 
    : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Action Progress</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {completedCount} of {actions.length} completed
            </span>
            <Badge variant="outline">{progressPercentage}%</Badge>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div 
              key={action.id || index}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                action.status === 'in-progress' ? 'bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100' : 'border-gray-200'
              }`}
              onClick={() => onActionClick && action.status === 'in-progress' && onActionClick(action.id)}
            >
              {getStatusIcon(action.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{action.label}</p>
                  {getStatusBadge(action.status)}
                </div>
                {action.description && (
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                )}
                {action.timestamp && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {new Date(action.timestamp).toLocaleTimeString()}
                  </div>
                )}
                {action.error && (
                  <p className="text-sm text-red-600 mt-2">{action.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionProgress;
