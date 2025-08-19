import React from 'react'

const AppHeader = ({ title, subtitle, description, icon: Icon, showCustomerInfo = false, customerName, customerId }) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-start space-x-4">
          {Icon && (
            <div className="flex-shrink-0">
              <div className="p-3 bg-red-50 rounded-lg">
                <Icon className="h-8 w-8 text-red-600" />
              </div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {title}
            </h1>
            {(subtitle || description) && (
              <p className="mt-1 text-sm text-gray-600">
                {subtitle || description}
              </p>
            )}
            {showCustomerInfo && (customerName || customerId) && (
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-md border border-blue-200">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                  Connected Customer
                </span>
                {customerName && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-blue-700">{customerName}</span>
                  </>
                )}
                {customerId && (
                  <>
                    <span>•</span>
                    <span>ID: {customerId}</span>
                  </>
                )}
              </div>
            )}
            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                System Online
              </span>
              <span>•</span>
              <span>HSBC Banking Services</span>
              <span>•</span>
              <span>Version 2.4.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
