import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import AppHeader from '../components/shared/AppHeader'
import { Calculator, CreditCard, DollarSign, FileText, CheckCircle, AlertCircle, Info } from 'lucide-react'

const PersonalLoanView = ({ context, onKMSOpen }) => {
  const [loanAmount, setLoanAmount] = useState(25000)
  const [loanTerm, setLoanTerm] = useState(36)
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [loanPurpose, setLoanPurpose] = useState('')
  const [prequalified, setPrequalified] = useState(false)
  const [estimatedRate, setEstimatedRate] = useState(8.99)
  const [actionStatus, setActionStatus] = useState(null) // null, 'processing', 'success', 'error'
  const [actionMessage, setActionMessage] = useState('')

  // Determine if we have customer context for dual-mode behavior
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'

  useEffect(() => {
    console.log('[PersonalLoanView] Rendering with context:', context, 'mode:', mode)
  }, [context, mode])

  // Loan calculator
  const calculateMonthlyPayment = () => {
    const principal = loanAmount
    const annualRate = estimatedRate / 100
    const monthlyRate = annualRate / 12
    const numPayments = loanTerm
    
    if (monthlyRate === 0) return (principal / numPayments).toFixed(2)
    
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1)
    return payment.toFixed(2)
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = (monthlyPayment * loanTerm).toFixed(2)
  const totalInterest = (totalPayment - loanAmount).toFixed(2)

  // Handle final action submission
  const handleFinalAction = async (actionType) => {
    setActionStatus('processing')
    setActionMessage('Processing your request...')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success
      setActionStatus('success')
      setActionMessage(`${actionType} completed successfully!`)
      
      // Reset after 3 seconds
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    } catch (error) {
      setActionStatus('error')
      setActionMessage(`Failed to process ${actionType}. Please try again.`)
      
      // Reset after 3 seconds
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    }
  }

  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50">
        <AppHeader 
          title="Personal Finance Application" 
          subtitle="Apply for personal loans and financing solutions"
        />
        
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Customer Search Required</h3>
                <p className="text-sm text-blue-700">Connect with a customer to process loan applications and view personalized rates.</p>
              </div>
            </div>
          </div>

          {/* Loan Calculator Tool */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loan-amount">Loan Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="loan-amount"
                      type="number"
                      placeholder="25,000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="loan-term">Loan Term (months)</Label>
                  <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                      <SelectItem value="72">72 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                    <p className="text-xl font-bold text-green-600">${monthlyPayment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-xl font-bold text-orange-600">${totalInterest}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Payment</p>
                    <p className="text-xl font-bold text-blue-600">${totalPayment}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Loan Products */}
          <Card>
            <CardHeader>
              <CardTitle>Available Loan Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">Personal Loan</h4>
                  <p className="text-sm text-gray-600 mb-3">Unsecured financing for major purchases, debt consolidation, or personal needs.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Amount: £1,000 - £50,000</p>
                    <p>• Rate: 6.9% - 24.9% APR</p>
                    <p>• Term: 12 - 84 months</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">Debt Consolidation</h4>
                  <p className="text-sm text-gray-600 mb-3">Combine multiple debts into one manageable monthly payment.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Amount: £5,000 - £50,000</p>
                    <p>• Rate: 5.9% - 19.9% APR</p>
                    <p>• Term: 24 - 72 months</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Context mode - customer-specific loan application
  return (
    <div className="h-full bg-gray-50">
      <AppHeader 
        title="Personal Finance Application" 
        subtitle={`Processing loan application for ${context.customerName || 'Customer'}`}
        showCustomerInfo={true}
        customerName={context.customerName}
        customerId={context.customerId}
      />
      
      <div className="p-6 space-y-6">
        {/* Customer Financial Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Financial Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Credit Score</p>
                    <p className="text-2xl font-bold text-green-800">742</p>
                    <p className="text-xs text-green-600">Excellent</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Monthly Income</p>
                    <p className="text-2xl font-bold text-blue-800">£4,850</p>
                    <p className="text-xs text-blue-600">Verified</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-700">Debt-to-Income</p>
                    <p className="text-2xl font-bold text-orange-800">22%</p>
                    <p className="text-xs text-orange-600">Good</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pre-qualified Offers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Pre-qualified Offers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                  <span className="text-sm font-medium text-green-700">6.9% APR</span>
                </div>
                <h4 className="font-semibold text-green-900 mb-2">Personal Loan - Premier Rate</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-green-600">Amount</p>
                    <p className="font-medium text-green-900">£25,000</p>
                  </div>
                  <div>
                    <p className="text-green-600">Term</p>
                    <p className="font-medium text-green-900">36 months</p>
                  </div>
                  <div>
                    <p className="text-green-600">Monthly Payment</p>
                    <p className="font-medium text-green-900">£732</p>
                  </div>
                  <div>
                    <p className="text-green-600">Total Interest</p>
                    <p className="font-medium text-green-900">£1,352</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  Accept This Offer
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">Alternative</Badge>
                  <span className="text-sm font-medium text-gray-700">8.9% APR</span>
                </div>
                <h4 className="font-semibold mb-2">Personal Loan - Standard Rate</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Amount</p>
                    <p className="font-medium">£25,000</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Term</p>
                    <p className="font-medium">48 months</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Monthly Payment</p>
                    <p className="font-medium">£612</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Interest</p>
                    <p className="font-medium">£4,376</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Consider This Option
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Application Progress</span>
                <span className="text-sm text-gray-600">75% Complete</span>
              </div>
              <Progress value={75} className="w-full" />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Personal Information Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Income Documentation Reviewed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Credit Check Completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span>Waiting for Final Documentation</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Action Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actionStatus && (
                <div className={`p-4 rounded-lg border ${
                  actionStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                  actionStatus === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                  'bg-blue-50 border-blue-200 text-blue-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {actionStatus === 'success' && <CheckCircle className="h-5 w-5" />}
                    {actionStatus === 'error' && <AlertCircle className="h-5 w-5" />}
                    {actionStatus === 'processing' && <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>}
                    <span className="font-medium">{actionMessage}</span>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleFinalAction('Application Approval')}
                  disabled={actionStatus === 'processing'}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve Application
                </Button>
                <Button 
                  onClick={() => handleFinalAction('Application Review')}
                  disabled={actionStatus === 'processing'}
                  variant="outline"
                >
                  Send for Review
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleFinalAction('Document Request')}
                  disabled={actionStatus === 'processing'}
                  variant="outline"
                >
                  Request Documents
                </Button>
                <Button 
                  onClick={() => handleFinalAction('Application Hold')}
                  disabled={actionStatus === 'processing'}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  Place on Hold
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('personal-loan-requirements')}
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm">Requirements</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('loan-calculator')}
          >
            <Calculator className="h-5 w-5" />
            <span className="text-sm">Calculator</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-sm">Credit Report</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('loan-terms')}
          >
            <Info className="h-5 w-5" />
            <span className="text-sm">Terms & Rates</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PersonalLoanView
