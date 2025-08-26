import { useState, useEffect } from 'react'
import { DollarSign, CreditCard, TrendingUp, Search, RefreshCw, Eye, EyeOff } from 'lucide-react'

function QuickBalanceCheckView({ context, onKMSOpen }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showBalances, setShowBalances] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'
  
  // Mock account data
  const accounts = hasContext ? [
    { 
      id: 'CHK-001', 
      type: 'Checking', 
      name: 'HSBC Premier Checking',
      number: '****4892',
      balance: 15234.67,
      available: 14234.67,
      currency: 'USD',
      lastActivity: '2 hours ago'
    },
    { 
      id: 'SAV-001', 
      type: 'Savings', 
      name: 'HSBC Advance Savings',
      number: '****7823',
      balance: 45678.90,
      available: 45678.90,
      currency: 'USD',
      lastActivity: '1 day ago'
    },
    { 
      id: 'CC-001', 
      type: 'Credit Card', 
      name: 'HSBC Cash Rewards Mastercard',
      number: '****3456',
      balance: -2345.67,
      available: 7654.33,
      limit: 10000,
      currency: 'USD',
      lastActivity: '3 hours ago'
    },
    { 
      id: 'INV-001', 
      type: 'Investment', 
      name: 'HSBC Investment Account',
      number: '****9012',
      balance: 125678.45,
      available: 125678.45,
      currency: 'USD',
      lastActivity: '1 week ago'
    }
  ] : []
  
  const filteredAccounts = accounts.filter(acc => 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.number.includes(searchTerm)
  )
  
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
  const totalAvailable = accounts.reduce((sum, acc) => sum + acc.available, 0)
  
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  const getAccountIcon = (type) => {
    switch(type) {
      case 'Credit Card':
        return <CreditCard className="h-5 w-5" />
      case 'Investment':
        return <TrendingUp className="h-5 w-5" />
      default:
        return <DollarSign className="h-5 w-5" />
    }
  }
  
  const getBalanceColor = (balance) => {
    if (balance < 0) return 'text-red-600'
    if (balance > 10000) return 'text-green-600'
    return 'text-gray-900'
  }
  
  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50 p-6" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Quick Balance Check
              </h1>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Connect a customer to view their account balances and transaction history.
              </p>
            </div>
            
            {/* Manual Search */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Customer Account Search
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter customer ID or account number..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                  Search
                </button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                <p><strong>Features available:</strong></p>
                <ul className="mt-2 space-y-1">
                  <li>• Real-time balance inquiries</li>
                  <li>• Multi-account overview</li>
                  <li>• Available balance vs current balance</li>
                  <li>• Recent transaction summaries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-full bg-gray-50 p-6" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                  Quick Balance Check
                </h1>
                <p className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                  Customer: {context.customerName || 'Unknown'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBalances(!showBalances)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showBalances ? 'Hide' : 'Show'} Balances
              </button>
              <button
                onClick={handleRefresh}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${refreshing ? 'opacity-50' : ''}`}
                disabled={refreshing}
                style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>Total Balance</p>
              <p className="text-2xl font-bold text-blue-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                {showBalances ? formatCurrency(totalBalance) : '••••••'}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>Total Available</p>
              <p className="text-2xl font-bold text-green-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                {showBalances ? formatCurrency(totalAvailable) : '••••••'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            />
          </div>
        </div>
        
        {/* Accounts List */}
        <div className="space-y-4">
          {filteredAccounts.map(account => (
            <div
              key={account.id}
              className={`bg-white rounded-lg shadow-sm border ${selectedAccount?.id === account.id ? 'border-blue-500' : 'border-gray-200'} p-6 cursor-pointer hover:shadow-md transition-all`}
              onClick={() => setSelectedAccount(account)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${account.type === 'Credit Card' ? 'bg-purple-100 text-purple-600' : account.type === 'Investment' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {getAccountIcon(account.type)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                      {account.name}
                    </h3>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                      {account.type} • {account.number}
                    </p>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                      Last activity: {account.lastActivity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    {account.type === 'Credit Card' ? 'Outstanding' : 'Current Balance'}
                  </p>
                  <p className={`text-xl font-bold ${getBalanceColor(account.balance)}`} style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    {showBalances ? formatCurrency(Math.abs(account.balance)) : '••••••'}
                  </p>
                  {account.type === 'Credit Card' && (
                    <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                      Available: {showBalances ? formatCurrency(account.available) : '••••••'}
                    </p>
                  )}
                </div>
              </div>
              
              {selectedAccount?.id === account.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>Available Balance</p>
                      <p className="font-semibold" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                        {showBalances ? formatCurrency(account.available) : '••••••'}
                      </p>
                    </div>
                    {account.limit && (
                      <div>
                        <p className="text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>Credit Limit</p>
                        <p className="font-semibold" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                          {showBalances ? formatCurrency(account.limit) : '••••••'}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>Currency</p>
                      <p className="font-semibold" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>{account.currency}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6 flex gap-2">
          <button 
            onClick={() => onKMSOpen('balance-inquiry-procedures')}
            className="text-sm text-blue-600 hover:underline"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Balance Inquiry Procedures
          </button>
          <span className="text-gray-400">•</span>
          <button 
            onClick={() => onKMSOpen('account-types-guide')}
            className="text-sm text-blue-600 hover:underline"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Account Types Guide
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickBalanceCheckView
