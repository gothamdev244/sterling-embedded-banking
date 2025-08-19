import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import ActionButton from '../components/actions/ActionButton';
import AppHeader from '../components/shared/AppHeader';
import CustomerSearchCard from '../components/shared/CustomerSearchCard';
import QuickActionGrid from '../components/shared/QuickActionGrid';
import { 
  Home,
  Calculate as Calculator,
  Description as FileText,
  TrendingUp,
  AttachMoney as DollarSign,
  CalendarToday as Calendar,
  CheckCircle,
  Error as AlertCircle,
  AccessTime as Clock,
  Business as Building,
  Percent,
  CreditCard,
  GetApp as Download,
  Person as User,
  ChevronRight,
  Assessment,
  House,
  Info
} from '@mui/icons-material';

const MortgageApplicationView = ({ context, onKMSOpen }) => {
  // Check if we're in manual mode (no customer context)
  const isManualMode = !context?.customerId;
  
  // Manual Mode View - When no customer is connected
  if (isManualMode) {
    const quickActions = [
      {
        id: 'calculator',
        icon: Calculator,
        label: 'Mortgage Calculator',
        description: 'Calculate monthly payments and affordability',
        badge: 'popular',
        stats: [
          { label: 'Rates from', value: '4.29%' },
          { label: 'Max LTV', value: '95%' }
        ]
      },
      {
        id: 'application-status',
        icon: FileText,
        label: 'Application Status',
        description: 'Check mortgage application progress',
        actionText: 'Check Status'
      },
      {
        id: 'affordability',
        icon: Assessment,
        label: 'Affordability Check',
        description: 'Quick affordability assessment',
        badge: 'recommended'
      },
      {
        id: 'property-valuation',
        icon: House,
        label: 'Property Valuation',
        description: 'Book property valuation appointment'
      },
      {
        id: 'first-time-buyer',
        icon: Home,
        label: 'First-Time Buyer',
        description: 'Special rates and guidance for first buyers',
        badge: 'new'
      },
      {
        id: 'mortgage-advisor',
        icon: User,
        label: 'Book Advisor',
        description: 'Schedule mortgage advisor consultation'
      }
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Mortgage Application Center"
          icon={Home}
          description="Complete mortgage solutions from application to approval"
        />
        
        <CustomerSearchCard
          searchFields={['Customer ID', 'Application Reference', 'Property Address', 'Phone Number']}
          onSearch={(searchData) => console.log('Search:', searchData)}
          title="Mortgage Services"
          description="Enter customer details to access mortgage applications and services"
        />
        
        <QuickActionGrid
          title="Mortgage Services"
          description="Tools and resources for mortgage applications and management"
          actions={quickActions}
          columns={3}
          onActionClick={(action) => {
            if (onKMSOpen) {
              onKMSOpen(`MORTGAGE-${action.id.toUpperCase()}`)
            }
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Mortgage Support</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Mortgage Helpline: +44 800 169 6333</li>
              <li>• Decision in principle within 15 minutes</li>
              <li>• Exclusive rates for existing customers</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  const [actions, setActions] = useState([
    { id: 1, label: 'Eligibility Check', status: 'completed', description: 'Pre-qualification complete' },
    { id: 2, label: 'Document Collection', status: 'in_progress', description: 'Gathering required documents' },
    { id: 3, label: 'Property Valuation', status: 'pending', description: 'Awaiting property assessment' },
    { id: 4, label: 'Final Approval', status: 'pending', description: 'Credit committee review' }
  ]);

  const [applicationData, setApplicationData] = useState({
    propertyValue: 450000,
    depositAmount: 90000,
    loanAmount: 360000,
    term: 25,
    selectedRate: null
  });

  const customer = {
    name: context.customerName || context.name || 'Unknown Customer',
    accountNumber: context.accountNumber || 'Unknown',
    phoneNumber: context.phone || 'Not provided',
    email: context.email || 'Not provided',
    address: context.location || 'Not provided',
    accountType: context.accountType || context.tier || 'Unknown',
    riskLevel: context.riskProfile || 'low',
    verificationStatus: context.verificationStatus || 'verified'
  };

  const mortgageOptions = [
    {
      id: 1,
      type: '2 Year Fixed',
      rate: 4.89,
      monthlyPayment: 1976,
      features: ['No early repayment charges after 2 years', 'Free valuation', 'Cashback £500'],
      recommended: false
    },
    {
      id: 2,
      type: '5 Year Fixed',
      rate: 4.49,
      monthlyPayment: 1923,
      features: ['Rate security for 5 years', 'Free legal services', 'Cashback £1000'],
      recommended: true
    },
    {
      id: 3,
      type: 'Tracker',
      rate: 4.29,
      monthlyPayment: 1897,
      features: ['Follows Bank of England base rate', 'No early repayment charges', 'Flexible overpayments'],
      recommended: false
    }
  ];

  const requiredDocuments = [
    { name: 'Proof of Income', status: 'uploaded', items: ['3 months payslips', 'P60', 'Bank statements'] },
    { name: 'Proof of Deposit', status: 'uploaded', items: ['Savings account statement'] },
    { name: 'Proof of Identity', status: 'pending', items: ['Passport', 'Driving license'] },
    { name: 'Proof of Address', status: 'pending', items: ['Utility bill', 'Council tax'] }
  ];

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleRateSelection = (option) => {
    setApplicationData(prev => ({ ...prev, selectedRate: option }));
    updateActionStatus(2, 'completed', 'All documents verified');
    updateActionStatus(3, 'in_progress', 'Scheduling property valuation');
  };

  const calculateLTV = () => {
    return ((applicationData.loanAmount / applicationData.propertyValue) * 100).toFixed(1);
  };

  const calculateAffordability = () => {
    // Mock affordability calculation
    return {
      monthlyIncome: 6500,
      monthlyExpenses: 2800,
      affordabilityRatio: 34,
      status: 'PASS'
    };
  };

  const affordability = calculateAffordability();

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Mortgage Application Processing</h1>
            <p className="text-sm text-gray-600 mt-1">First-Time Buyer Application • Decision in Principle</p>
          </div>
          <Badge variant="outline" className="text-xs">
            APP ID: MTG-2025-001248
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Property & Loan Details */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Home className="h-4 w-4" />
                Property & Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Property Value</p>
                    <p className="text-xl font-semibold">£{applicationData.propertyValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deposit Amount</p>
                    <p className="text-xl font-semibold text-green-600">£{applicationData.depositAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-xl font-semibold">£{applicationData.loanAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Loan to Value (LTV)</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold">{calculateLTV()}%</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Excellent
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-900">
                    With 20% deposit, customer qualifies for our best rates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affordability Assessment */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Affordability Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly Income</p>
                  <p className="text-lg font-semibold">£{affordability.monthlyIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly Commitments</p>
                  <p className="text-lg font-semibold">£{affordability.monthlyExpenses.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="text-sm text-green-900 font-medium">Affordability Status</p>
                  <p className="text-xs text-green-700">Debt-to-income ratio: {affordability.affordabilityRatio}%</p>
                </div>
                <Badge className="bg-green-600">
                  {affordability.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Rate Options */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Available Mortgage Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {mortgageOptions.map(option => (
                <div 
                  key={option.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    applicationData.selectedRate?.id === option.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleRateSelection(option)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{option.type}</h4>
                        {option.recommended && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-gray-600">Interest Rate</p>
                          <p className="text-lg font-semibold">{option.rate}% APR</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Monthly Payment</p>
                          <p className="text-lg font-semibold">£{option.monthlyPayment}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        {option.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={applicationData.selectedRate?.id === option.id ? "default" : "outline"}
                      className="ml-4"
                    >
                      {applicationData.selectedRate?.id === option.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Document Checklist */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Document Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{doc.name}</p>
                        <Badge 
                          variant="outline"
                          className={doc.status === 'uploaded' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }
                        >
                          {doc.status === 'uploaded' ? 'Uploaded' : 'Required'}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        {doc.items.join(' • ')}
                      </div>
                    </div>
                    {doc.status === 'pending' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Application Progress */}
          <ActionProgress actions={actions} />

          {/* Action Button */}
          <ActionButton 
            primaryAction={{
              label: "Complete Application",
              onClick: () => console.log("Complete mortgage application"),
              icon: Home
            }}
            secondaryAction={{
              label: "Schedule Valuation",
              onClick: () => console.log("Schedule property valuation")
            }}
          />

          {/* Key Metrics */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Application Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">First-Time Buyer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Term</span>
                <span className="font-medium">{applicationData.term} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Decision</span>
                <Badge className="bg-green-100 text-green-800">
                  Pre-Approved
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timeline</span>
                <span className="font-medium">5-7 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full justify-start bg-gray-800 hover:bg-gray-700"
                onClick={() => onKMSOpen('MORTGAGE_DECISION')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Issue Decision in Principle
              </Button>
              <Button 
                variant="outline"
                className="w-full justify-start"
                onClick={() => onKMSOpen('VALUATION_BOOKING')}
              >
                <Building className="h-4 w-4 mr-2" />
                Book Valuation
              </Button>
              <Button 
                variant="outline"
                className="w-full justify-start"
                onClick={() => onKMSOpen('MORTGAGE_ADVISOR')}
              >
                <User className="h-4 w-4 mr-2" />
                Schedule Advisor Call
              </Button>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Resources</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('MORTGAGE_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                First-Time Buyer Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('MORTGAGE_CALCULATOR')}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Mortgage Calculator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MortgageApplicationView;
