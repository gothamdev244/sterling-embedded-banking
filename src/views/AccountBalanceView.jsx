import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import AppHeader from '../components/shared/AppHeader'
import CustomerSearchCard from '../components/shared/CustomerSearchCard'
import { Eye, EyeOff, Download, RefreshCw, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

const AccountBalanceView = ({ context, onKMSOpen }) => {
  const [showBalances, setShowBalances] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState('main')
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTime, setRefreshTime] = useState(new Date())

  // Determine if we have customer context for dual-mode behavior
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'

  useEffect(() => {
    console.log('[AccountBalanceView] Rendering with context:', context, 'mode:', mode)
  }, [context, mode])

  // Mock account data - in real app this would come from API
  const customerAccounts = [
    {
      id: 'main',
      name: 'Premier Current Account',
      number: '****1234',
      balance: 15847.50,
      currency: 'GBP',
      type: 'current',
      status: 'active',
      change: +234.50,
      changePercent: +1.5
    },
    {
      id: 'savings',
      name: 'Advance Savings Account',
      number: '****5678',
      balance: 42390.80,
      currency: 'GBP',
      type: 'savings',
      status: 'active',
      change: +1205.30,
      changePercent: +2.9
    },
    {
      id: 'credit',
      name: 'Premier Credit Card',
      number: '****9012',
      balance: -1567.25,
      currency: 'GBP',
      type: 'credit',
      status: 'active',
      change: -89.50,
      changePercent: -6.1,
      limit: 15000
    }
  ]

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setRefreshTime(new Date())
    }, 1500)
  }

  const handleExportStatement = () => {
    console.log('Exporting statement for account:', selectedAccount)
    // In real app, this would generate and download statement
  }

  const selectedAccountData = customerAccounts.find(acc => acc.id === selectedAccount)

  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50">
        <AppHeader 
          title="Account Balance" 
          subtitle="View account balances and transaction history"
        />
        
        <div className="p-6">
          <CustomerSearchCard 
            onCustomerFound={() => console.log('Customer search triggered')}
            placeholder="Enter customer ID, name, or account number to view balances..."
            searchLabel="Search Customer"
            helpText="Once a customer is connected, you can view their account balances and recent transactions."
          />

          {/* Available Services for Manual Mode */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Available Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">View Balance</h4>
                      <p className="text-sm text-gray-500">Check current account balances</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Download className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Download Statement</h4>
                      <p className="text-sm text-gray-500">Export account statements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Balance History</h4>
                      <p className="text-sm text-gray-500">View balance trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Context mode - customer is connected
  return (
    <div className="h-full bg-gray-50">
      <AppHeader 
        title="Account Balance" 
        subtitle={`${context.customerName || 'Customer'} - Account Overview`}
        showCustomerInfo={true}
        customerName={context.customerName}
        customerId={context.customerId}
      />
      
      <div className="p-6 space-y-6">
        {/* Account Selection */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {customerAccounts.map((account) => (
            <Button
              key={account.id}
              variant={selectedAccount === account.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAccount(account.id)}
              className="min-w-fit"
            >
              {account.name}
            </Button>
          ))}
        </div>

        {/* Main Balance Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{selectedAccountData.name}</CardTitle>
                <p className="text-sm text-gray-500">Account: {selectedAccountData.number}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBalances(!showBalances)}
                  className="p-2"
                >
                  {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="p-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {showBalances ? (
                      <>
                        {selectedAccountData.currency} {Math.abs(selectedAccountData.balance).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        {selectedAccountData.balance < 0 && <span className="text-red-600 ml-1">DR</span>}
                      </>
                    ) : (
                      '••••••••'
                    )}
                  </span>
                  <Badge variant={selectedAccountData.status === 'active' ? 'default' : 'secondary'}>
                    {selectedAccountData.status}
                  </Badge>
                </div>
                
                {showBalances && (
                  <div className="flex items-center gap-2 mt-2">
                    {selectedAccountData.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${selectedAccountData.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedAccountData.change > 0 ? '+' : ''}{selectedAccountData.currency} {Math.abs(selectedAccountData.change).toLocaleString('en-GB', { minimumFractionDigits: 2 })} 
                      ({selectedAccountData.changePercent > 0 ? '+' : ''}{selectedAccountData.changePercent}%)
                    </span>
                    <span className="text-sm text-gray-500">from last month</span>
                  </div>
                )}

                {selectedAccountData.type === 'credit' && showBalances && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Available Credit:</span>
                      <span className="font-medium">
                        {selectedAccountData.currency} {(selectedAccountData.limit + selectedAccountData.balance).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Credit Limit:</span>
                      <span>{selectedAccountData.currency} {selectedAccountData.limit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={handleExportStatement}
          >
            <Download className="h-5 w-5" />
            <span className="text-sm">Export Statement</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('account-balance-help')}
          >
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">Get Help</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">Balance History</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            <span className="text-sm">Set Alerts</span>
          </Button>
        </div>

        {/* Recent Transactions Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { desc: 'Online Purchase - Amazon', amount: -89.99, date: 'Today' },
                { desc: 'Salary Credit', amount: 3200.00, date: 'Yesterday' },
                { desc: 'Direct Debit - Utilities', amount: -156.40, date: '2 days ago' }
              ].map((transaction, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">{transaction.desc}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <span className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{selectedAccountData.currency} {Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-500 text-center">
          Last updated: {refreshTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default AccountBalanceView
