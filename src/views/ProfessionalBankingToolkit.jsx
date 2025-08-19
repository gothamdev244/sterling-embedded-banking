import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import AppHeader from '../components/shared/AppHeader'
import { Briefcase, Calculator, Globe, Building, TrendingUp, Award, Target, DollarSign, Users, CheckCircle, AlertTriangle, FileText } from 'lucide-react'

const ProfessionalBankingToolkit = ({ context, onKMSOpen }) => {
  const [selectedTool, setSelectedTool] = useState('loan-calculator')
  const [actionStatus, setActionStatus] = useState(null)
  const [actionMessage, setActionMessage] = useState('')
  
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState(50000)
  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(7.5)
  const [loanType, setLoanType] = useState('personal')
  
  // Currency Converter State
  const [fromCurrency, setFromCurrency] = useState('GBP')
  const [toCurrency, setToCurrency] = useState('USD')
  const [amount, setAmount] = useState(1000)

  // Determine if we have customer context for dual-mode behavior
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'

  useEffect(() => {
    console.log('[ProfessionalBankingToolkit] Rendering with context:', context, 'mode:', mode)
  }, [context, mode])

  // Handle professional action
  const handleProfessionalAction = async (actionType) => {
    setActionStatus('processing')
    setActionMessage(`Processing ${actionType}...`)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setActionStatus('success')
      setActionMessage(`${actionType} completed successfully!`)
      
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    } catch (error) {
      setActionStatus('error')
      setActionMessage(`Failed to process ${actionType}. Please try again.`)
      
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    }
  }

  // Advanced loan calculation
  const calculateLoanPayment = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm
    
    if (monthlyRate === 0) return (principal / numPayments).toFixed(2)
    
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1)
    return payment.toFixed(2)
  }

  // Currency conversion (mock rates)
  const exchangeRates = {
    'GBP': { 'USD': 1.27, 'EUR': 1.17, 'JPY': 188.5, 'CHF': 1.13 },
    'USD': { 'GBP': 0.79, 'EUR': 0.92, 'JPY': 148.2, 'CHF': 0.89 },
    'EUR': { 'GBP': 0.85, 'USD': 1.09, 'JPY': 161.3, 'CHF': 0.97 }
  }

  const convertCurrency = () => {
    if (fromCurrency === toCurrency) return amount.toFixed(2)
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1
    return (amount * rate).toFixed(2)
  }

  // Sales Performance Data
  const salesData = {
    thisMonth: {
      products: 47,
      revenue: '£234,500',
      target: '£200,000',
      achievement: 117
    },
    topProducts: [
      { name: 'Personal Loans', sales: 18, revenue: '£89,500' },
      { name: 'Credit Cards', sales: 15, revenue: '£67,200' },
      { name: 'Mortgages', sales: 8, revenue: '£45,800' },
      { name: 'Business Accounts', sales: 6, revenue: '£32,000' }
    ]
  }

  // Product Recommendations
  const recommendations = [
    {
      customer: 'Sarah Johnson',
      recommendation: 'Premier Credit Card',
      reason: 'High income, excellent credit score',
      potential: '£2,400 annual fee',
      confidence: 92
    },
    {
      customer: 'Michael Chen',
      recommendation: 'Business Loan',
      reason: 'Expanding business, strong cash flow',
      potential: '£45,000 facility',
      confidence: 87
    }
  ]

  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50">
        <AppHeader 
          title="Professional Banking Toolkit" 
          subtitle="Advanced tools for professional banking agents"
        />
        
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Professional Agent Tools</h3>
                <p className="text-sm text-blue-700">Connect with customers to access advanced banking tools and personalized product recommendations.</p>
              </div>
            </div>
          </div>

          {/* Professional Tools Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Banking Toolkit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Advanced Calculators</p>
                      <p className="text-lg font-bold text-green-800">12 Tools</p>
                    </div>
                    <Calculator className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700">Currency Pairs</p>
                      <p className="text-lg font-bold text-purple-800">25 Markets</p>
                    </div>
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-700">Performance KPIs</p>
                      <p className="text-lg font-bold text-orange-800">Real-time</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tool Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Banking Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="h-6 w-6 text-blue-600" />
                    <h4 className="font-medium">Advanced Loan Calculations</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Sophisticated loan calculations with multiple scenarios, rate comparisons, and amortization schedules.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Multi-scenario loan modeling</p>
                    <p>• Rate comparison tools</p>
                    <p>• Amortization schedules</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-6 w-6 text-green-600" />
                    <h4 className="font-medium">Corporate Account Management</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Comprehensive tools for managing corporate clients, business loans, and commercial banking products.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Business account analytics</p>
                    <p>• Corporate loan structures</p>
                    <p>• Commercial product suite</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Context mode - Professional agent with customer
  return (
    <div className="h-full bg-gray-50">
      <AppHeader 
        title="Professional Banking Toolkit" 
        subtitle={`Professional tools for ${context.customerName || 'Customer'}`}
        showCustomerInfo={true}
        customerName={context.customerName}
        customerId={context.customerId}
      />
      
      <div className="p-6 space-y-6">
        {/* Action Status */}
        {actionStatus && (
          <div className={`p-4 rounded-lg border ${
            actionStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            actionStatus === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              {actionStatus === 'success' && <CheckCircle className="h-5 w-5" />}
              {actionStatus === 'error' && <AlertTriangle className="h-5 w-5" />}
              {actionStatus === 'processing' && <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>}
              <span className="font-medium">{actionMessage}</span>
            </div>
          </div>
        )}

        {/* Tool Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Professional Banking Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              <Button 
                variant={selectedTool === 'loan-calculator' ? 'default' : 'outline'}
                onClick={() => setSelectedTool('loan-calculator')}
                className="h-auto p-3 flex flex-col items-center gap-1"
              >
                <Calculator className="h-4 w-4" />
                <span className="text-xs">Loan Calculator</span>
              </Button>
              <Button 
                variant={selectedTool === 'currency-converter' ? 'default' : 'outline'}
                onClick={() => setSelectedTool('currency-converter')}
                className="h-auto p-3 flex flex-col items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs">Currency</span>
              </Button>
              <Button 
                variant={selectedTool === 'performance' ? 'default' : 'outline'}
                onClick={() => setSelectedTool('performance')}
                className="h-auto p-3 flex flex-col items-center gap-1"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">Performance</span>
              </Button>
              <Button 
                variant={selectedTool === 'recommendations' ? 'default' : 'outline'}
                onClick={() => setSelectedTool('recommendations')}
                className="h-auto p-3 flex flex-col items-center gap-1"
              >
                <Target className="h-4 w-4" />
                <span className="text-xs">Recommendations</span>
              </Button>
            </div>

            {/* Advanced Loan Calculator */}
            {selectedTool === 'loan-calculator' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Advanced Loan Calculator</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="loan-amount">Loan Amount (£)</Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loan-term">Term (months)</Label>
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loan-type">Loan Type</Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                        <SelectItem value="mortgage">Mortgage</SelectItem>
                        <SelectItem value="auto">Auto Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-blue-600">Monthly Payment</p>
                      <p className="text-xl font-bold text-blue-800">£{calculateLoanPayment()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Interest</p>
                      <p className="text-xl font-bold text-blue-800">£{(calculateLoanPayment() * loanTerm - loanAmount).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Payment</p>
                      <p className="text-xl font-bold text-blue-800">£{(calculateLoanPayment() * loanTerm).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Multi-Currency Converter */}
            {selectedTool === 'currency-converter' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Multi-Currency Converter</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="from-currency">From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="to-currency">To</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600">Converted Amount</p>
                  <p className="text-2xl font-bold text-green-800">{convertCurrency()} {toCurrency}</p>
                  <p className="text-xs text-green-600 mt-1">Rate: 1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency] || 1} {toCurrency}</p>
                </div>
              </div>
            )}

            {/* Sales Performance */}
            {selectedTool === 'performance' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Sales Performance Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-purple-600">Products Sold</p>
                    <p className="text-2xl font-bold text-purple-800">{salesData.thisMonth.products}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-600">Revenue</p>
                    <p className="text-2xl font-bold text-green-800">{salesData.thisMonth.revenue}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-600">Target</p>
                    <p className="text-2xl font-bold text-blue-800">{salesData.thisMonth.target}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-orange-600">Achievement</p>
                    <p className="text-2xl font-bold text-orange-800">{salesData.thisMonth.achievement}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Top Performing Products</h4>
                  {salesData.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{product.name}</span>
                      <div className="text-right">
                        <p className="text-sm">{product.sales} sales</p>
                        <p className="text-xs text-gray-600">{product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Recommendations */}
            {selectedTool === 'recommendations' && (
              <div className="space-y-4">
                <h3 className="font-semibold">AI-Powered Product Recommendations</h3>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{rec.customer}</h4>
                        <Badge className="bg-blue-100 text-blue-800">
                          {rec.confidence}% Confidence
                        </Badge>
                      </div>
                      <p className="font-semibold text-green-600 mb-1">{rec.recommendation}</p>
                      <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                      <p className="text-sm font-medium text-purple-600">{rec.potential}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Professional Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleProfessionalAction('Generate Proposal')}
            disabled={actionStatus === 'processing'}
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm">Generate Proposal</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleProfessionalAction('Schedule Follow-up')}
            disabled={actionStatus === 'processing'}
          >
            <Users className="h-5 w-5" />
            <span className="text-sm">Schedule Follow-up</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('professional-banking-guide')}
          >
            <Award className="h-5 w-5" />
            <span className="text-sm">Professional Guide</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleProfessionalAction('Update Certification')}
            disabled={actionStatus === 'processing'}
          >
            <Target className="h-5 w-5" />
            <span className="text-sm">Update Certification</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalBankingToolkit
