import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  CreditCard, 
  Home, 
  Calculator,
  FileText,
  User,
  Briefcase
} from 'lucide-react'

export default function EligibilityCheckView({ context, onKMSOpen }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceType: '',
    annualIncome: '',
    employmentStatus: '',
    creditScore: '',
    existingDebt: '',
    requestedAmount: '',
    purpose: ''
  })
  const [eligibilityResult, setEligibilityResult] = useState(null)
  const [isChecking, setIsChecking] = useState(false)

  const hasCustomerContext = !!(context?.customerId && context?.customerId !== '')
  const customerName = context?.customerName || 'Customer'

  const serviceTypes = [
    { id: 'personal_loan', name: 'Personal Loan', icon: DollarSign, description: 'Unsecured personal lending' },
    { id: 'credit_card', name: 'Credit Card', icon: CreditCard, description: 'Credit card application' },
    { id: 'mortgage', name: 'Mortgage', icon: Home, description: 'Home loan eligibility' },
    { id: 'business_loan', name: 'Business Loan', icon: Briefcase, description: 'Business financing' },
    { id: 'account_upgrade', name: 'Account Upgrade', icon: User, description: 'Premium account eligibility' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const runEligibilityCheck = async () => {
    setIsChecking(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock eligibility calculation
    const income = parseInt(formData.annualIncome) || 0
    const requestedAmount = parseInt(formData.requestedAmount) || 0
    const creditScore = parseInt(formData.creditScore) || 700
    
    let eligibility = 'eligible'
    let maxAmount = Math.floor(income * 0.3)
    let recommendations = []
    
    if (creditScore < 600) {
      eligibility = 'not_eligible'
      recommendations.push('Improve credit score to 650+ for better eligibility')
    } else if (requestedAmount > maxAmount) {
      eligibility = 'partial'
      recommendations.push(`Consider reducing amount to £${maxAmount.toLocaleString()}`)
    }
    
    if (formData.employmentStatus === 'unemployed') {
      eligibility = 'not_eligible'
      recommendations.push('Employment verification required')
    }
    
    setEligibilityResult({
      status: eligibility,
      maxAmount,
      approvedAmount: eligibility === 'eligible' ? requestedAmount : Math.min(requestedAmount, maxAmount * 0.8),
      recommendations,
      nextSteps: eligibility === 'eligible' ? ['Complete application', 'Provide documentation'] : ['Review requirements', 'Improve eligibility factors']
    })
    
    setIsChecking(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800 border-green-200'
      case 'partial': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'not_eligible': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'eligible': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'partial': return <AlertCircle className="h-5 w-5 text-amber-600" />
      case 'not_eligible': return <AlertCircle className="h-5 w-5 text-red-600" />
      default: return <Calculator className="h-5 w-5 text-gray-600" />
    }
  }

  const selectedService = serviceTypes.find(s => s.id === formData.serviceType)

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Eligibility Assessment</h1>
            <p className="text-sm text-gray-600">
              {hasCustomerContext ? `Assessment for ${customerName}` : 'Check eligibility for banking services'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onKMSOpen?.('eligibility-guide')}>
              <FileText className="h-4 w-4 mr-2" />
              Guidelines
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
            <span className="text-sm text-gray-600">{currentStep}/3</span>
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Select Service Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => {
                      const Icon = service.icon
                      return (
                        <div
                          key={service.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.serviceType === service.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('serviceType', service.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                              <h3 className="font-medium text-gray-900">{service.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      disabled={!formData.serviceType}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Financial Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="annualIncome">Annual Income (£)</Label>
                      <Input
                        id="annualIncome"
                        type="number"
                        placeholder="50000"
                        value={formData.annualIncome}
                        onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="employmentStatus">Employment Status</Label>
                      <select
                        id="employmentStatus"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.employmentStatus}
                        onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                      >
                        <option value="">Select status</option>
                        <option value="employed">Employed</option>
                        <option value="self_employed">Self-employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="retired">Retired</option>
                        <option value="student">Student</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="creditScore">Credit Score (Optional)</Label>
                      <Input
                        id="creditScore"
                        type="number"
                        placeholder="750"
                        value={formData.creditScore}
                        onChange={(e) => handleInputChange('creditScore', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="existingDebt">Existing Debt (£)</Label>
                      <Input
                        id="existingDebt"
                        type="number"
                        placeholder="5000"
                        value={formData.existingDebt}
                        onChange={(e) => handleInputChange('existingDebt', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="requestedAmount">Requested Amount (£)</Label>
                      <Input
                        id="requestedAmount"
                        type="number"
                        placeholder="10000"
                        value={formData.requestedAmount}
                        onChange={(e) => handleInputChange('requestedAmount', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="purpose">Purpose</Label>
                      <select
                        id="purpose"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.purpose}
                        onChange={(e) => handleInputChange('purpose', e.target.value)}
                      >
                        <option value="">Select purpose</option>
                        <option value="home_improvement">Home Improvement</option>
                        <option value="debt_consolidation">Debt Consolidation</option>
                        <option value="education">Education</option>
                        <option value="vacation">Vacation</option>
                        <option value="business">Business</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      disabled={!formData.annualIncome || !formData.employmentStatus}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Eligibility Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!eligibilityResult ? (
                    <div className="text-center py-8">
                      <Button onClick={runEligibilityCheck} disabled={isChecking}>
                        {isChecking ? 'Checking Eligibility...' : 'Run Eligibility Check'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Status */}
                      <div className={`p-4 rounded-lg border ${getStatusColor(eligibilityResult.status)}`}>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(eligibilityResult.status)}
                          <div>
                            <h3 className="font-semibold">
                              {eligibilityResult.status === 'eligible' && 'Congratulations! You are eligible'}
                              {eligibilityResult.status === 'partial' && 'Partial Eligibility'}
                              {eligibilityResult.status === 'not_eligible' && 'Not Currently Eligible'}
                            </h3>
                            <p className="text-sm mt-1">
                              {selectedService && `For ${selectedService.name} - £${formData.requestedAmount}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Approved Amount */}
                      {eligibilityResult.status !== 'not_eligible' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h4 className="font-medium text-green-900">Approved Amount</h4>
                            <p className="text-2xl font-bold text-green-700">
                              £{eligibilityResult.approvedAmount?.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900">Maximum Eligible</h4>
                            <p className="text-2xl font-bold text-blue-700">
                              £{eligibilityResult.maxAmount?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {eligibilityResult.recommendations?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                          <ul className="space-y-2">
                            {eligibilityResult.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                                <span className="text-sm text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Next Steps */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Next Steps</h4>
                        <div className="flex flex-wrap gap-2">
                          {eligibilityResult.nextSteps?.map((step, index) => (
                            <Badge key={index} variant="outline" className="px-3 py-1">
                              {step}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(2)}>
                          Modify Details
                        </Button>
                        {eligibilityResult.status !== 'not_eligible' && (
                          <Button>Proceed with Application</Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            {hasCustomerContext && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-500">Customer</Label>
                    <p className="font-medium">{customerName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Account</Label>
                    <p className="text-sm">{context.accountNumber || 'Not available'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Tier</Label>
                    <Badge variant="outline">{context.customerTier || 'Standard'}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Requirements
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Payment Calculator
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Customer Documents
                </Button>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Access eligibility guidelines and assessment criteria.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onKMSOpen?.('eligibility-help')}
                >
                  Open Help Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
