import { useState } from 'react'
import { Search, User, CreditCard, Building, AlertTriangle, Globe, TrendingUp, GraduationCap, Calendar, FileText } from 'lucide-react'

function ManualModeView({ onSelectIntent }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const apps = [
    { 
      id: 'credit_card_transactions', 
      name: 'Credit Card Management', 
      icon: CreditCard,
      description: 'View transactions, manage limits, and handle disputes',
      color: 'bg-blue-500'
    },
    { 
      id: 'fraud_alert', 
      name: 'Fraud Alert', 
      icon: AlertTriangle,
      description: 'Report and investigate suspicious activities',
      color: 'bg-red-500'
    },
    { 
      id: 'mortgage_application', 
      name: 'Mortgage Application', 
      icon: Building,
      description: 'Process new mortgage applications and refinancing',
      color: 'bg-green-500'
    },
    { 
      id: 'international_transfer', 
      name: 'International Transfer', 
      icon: Globe,
      description: 'Handle cross-border payments and currency exchange',
      color: 'bg-purple-500'
    },
    { 
      id: 'account_upgrade', 
      name: 'Account Upgrade', 
      icon: TrendingUp,
      description: 'Upgrade accounts to Premier or Advance tiers',
      color: 'bg-yellow-500'
    },
    { 
      id: 'business_loan', 
      name: 'Business Loan', 
      icon: Building,
      description: 'Commercial lending and business account services',
      color: 'bg-indigo-500'
    },
    { 
      id: 'portfolio_review', 
      name: 'Portfolio Review', 
      icon: TrendingUp,
      description: 'Investment portfolio analysis and advice',
      color: 'bg-teal-500'
    },
    { 
      id: 'student_loan', 
      name: 'Student Loan', 
      icon: GraduationCap,
      description: 'Student loan applications and management',
      color: 'bg-pink-500'
    },
    { 
      id: 'standing_order', 
      name: 'Standing Order', 
      icon: Calendar,
      description: 'Set up and manage recurring payments',
      color: 'bg-gray-500'
    },
    { 
      id: 'overdraft_request', 
      name: 'Overdraft Request', 
      icon: FileText,
      description: 'Apply for or extend overdraft facilities',
      color: 'bg-orange-500'
    }
  ]
  
  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">HSBC Banking Services</h1>
        <p className="text-gray-600">
          No customer connected. Search for a customer or select a service to begin.
        </p>
      </div>
      
      {/* Customer Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <User className="h-5 w-5 mr-2 text-gray-600" />
          Customer Search
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter customer ID, name, or account number..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Search Customer
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Tip: Once a customer is connected, services will automatically show relevant customer data
        </p>
      </div>
      
      {/* Service Selection */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-3">Available Services</h2>
        
        {/* Service Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        
        {/* Service Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredApps.map(app => {
            const Icon = app.icon
            return (
              <button
                key={app.id}
                onClick={() => onSelectIntent(app.id)}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all hover:border-red-500 text-left group"
              >
                <div className={`inline-flex p-2 rounded-lg ${app.color} text-white mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{app.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{app.description}</p>
              </button>
            )
          })}
        </div>
        
        {filteredApps.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No services found matching "{searchTerm}"
          </div>
        )}
      </div>
      
      {/* Help Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Manual Mode:</strong> You're currently in manual mode. Services will open in their default state. 
          To enable automatic customer context, connect to a customer call from the main dashboard.
        </p>
      </div>
    </div>
  )
}

export default ManualModeView
