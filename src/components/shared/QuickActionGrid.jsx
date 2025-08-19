import React from 'react'
import { ArrowRight } from 'lucide-react'

const QuickActionGrid = ({ 
  title = "Available Services",
  description = "Select a service to proceed without customer context",
  actions = [],
  columns = 3,
  onActionClick
}) => {
  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action)
    }
  }

  const getGridCols = () => {
    switch(columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 md:grid-cols-3'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
        
        <div className="p-6">
          <div className={`grid ${getGridCols()} gap-4`}>
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id || index}
                  onClick={() => handleActionClick(action)}
                  className="relative group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-red-200 transition-all duration-200 text-left"
                  disabled={action.disabled}
                >
                  {/* Status Badge */}
                  {action.badge && (
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        action.badge === 'new' ? 'bg-green-100 text-green-800' :
                        action.badge === 'popular' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {action.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg mb-4 group-hover:bg-red-100 transition-colors">
                    {Icon && <Icon className="h-6 w-6 text-red-600" />}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {action.label}
                    </h3>
                    {action.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {action.description}
                      </p>
                    )}
                    
                    {/* Stats or Additional Info */}
                    {action.stats && (
                      <div className="pt-2 space-y-1">
                        {action.stats.map((stat, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">{stat.label}</span>
                            <span className="font-medium text-gray-900">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Link */}
                    <div className="pt-3 flex items-center text-sm font-medium text-red-600 group-hover:text-red-700">
                      <span>{action.actionText || 'Access Service'}</span>
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Disabled Overlay */}
                  {action.disabled && (
                    <div className="absolute inset-0 bg-gray-50 bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500 font-medium">
                        {action.disabledText || 'Unavailable'}
                      </span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Additional Information */}
          {actions.some(a => a.requiresAuth) && (
            <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Some services require additional authentication or customer context for full functionality.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuickActionGrid
