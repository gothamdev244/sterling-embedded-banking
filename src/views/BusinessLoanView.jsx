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
  Business as Building2,
  TrendingUp,
  Description as FileText,
  Calculate as Calculator,
  AccessTime as Clock,
  CheckCircle,
  AttachMoney as DollarSign,
  BarChart as BarChart3,
  CalendarToday as Calendar,
  GetApp as Download,
  Error as AlertCircle,
  Group as Users,
  CreditCard,
  Percent
} from '@mui/icons-material';

const BusinessLoanView = ({ context, onKMSOpen }) => {
  // Check if we're in manual mode (no customer context)
  const isManualMode = !context?.customerId;
  // Manual Mode View
  if (isManualMode) {
    const quickActions = [
      {
        id: 'loan-calculator',
        icon: Calculator,
        label: 'Loan Calculator',
        description: 'Calculate loan eligibility and repayments',
        badge: 'popular',
        stats: [
          { label: 'Max Loan', value: '£5M' },
          { label: 'Min APR', value: '6.5%' }
        ]
      },
      {
        id: 'application-status',
        icon: FileText,
        label: 'Application Status',
        description: 'Check business loan application progress',
        actionText: 'Check Status'
      },
      {
        id: 'eligibility-check',
        icon: CheckCircle,
        label: 'Eligibility Check',
        description: 'Quick business loan eligibility assessment',
        badge: 'recommended'
      },
      {
        id: 'loan-products',
        icon: Building2,
        label: 'Loan Products',
        description: 'Browse business financing options'
      },
      {
        id: 'documents',
        icon: Download,
        label: 'Document Checklist',
        description: 'Required documents for loan application',
        badge: 'helpful'
      },
      {
        id: 'financial-health',
        icon: BarChart3,
        label: 'Financial Health Check',
        description: 'Assess business financial readiness'
      }
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Business Loan Center"
          icon={Building2}
          description="Complete business financing solutions and support"
        />
        
        <CustomerSearchCard
          searchFields={['Business Name', 'Registration Number', 'Application ID', 'Tax ID']}
          onSearch={(searchData) => console.log('Search:', searchData)}
          title="Business Verification"
          description="Enter business details to access loan services and applications"
        />
        
        <QuickActionGrid
          title="Business Financing Services"
          description="Tools and resources for business loan applications"
          actions={quickActions}
          columns={3}
          onActionClick={(action) => {
            if (onKMSOpen) {
              onKMSOpen(`BUSINESS-${action.id.toUpperCase()}`)
            }
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-900 mb-2">Business Support</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Business Banking Specialists: +44 3457 60 60 60</li>
              <li>• Commercial lending up to £25 million</li>
              <li>• Decision within 5 business days</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const [actions, setActions] = useState([
    { id: 1, label: 'Business Review', status: 'completed', description: '3-year trading history verified', timestamp: new Date(Date.now() - 300000).toISOString() },
    { id: 2, label: 'Financial Assessment', status: 'completed', description: 'Financial metrics approved', timestamp: new Date(Date.now() - 180000).toISOString() },
    { id: 3, label: 'Credit Decision', status: 'completed', description: 'Equipment loan approved', timestamp: new Date(Date.now() - 60000).toISOString() },
    { id: 4, label: 'Loan Setup', status: 'in_progress', description: 'Commercial Banking upgrade activated', timestamp: new Date().toISOString() }
  ]);

  const [loanData, setLoanData] = useState({
    amount: 500000,
    term: 5,
    purpose: 'equipment_financing',
    collateral: 'machinery'
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

  const businessDetails = {
    name: 'Johnson Manufacturing Ltd',
    sector: 'Manufacturing - CNC Machinery',
    tradingYears: 8,
    turnover: 2500000,
    employees: 35,
    creditRating: 'A',
    bankingHistory: 'Excellent - 8 years'
  };

  const financialMetrics = {
    monthlyRevenue: 208000,
    monthlyExpenses: 145000,
    netProfit: 63000,
    cashFlow: 'Strong - Seasonal Peaks Q2/Q4',
    debtServiceRatio: 2.8,
    coverageRatio: 3.2
  };

  const loanOptions = [
    {
      id: 1,
      type: 'Equipment Finance - Seasonal Payments',
      rate: 5.8,
      term: 5,
      monthlyPayment: 9500,
      features: ['Aligned with Q2/Q4 peaks', 'CNC machinery collateral', 'Interest-only off-season'],
      recommended: true
    },
    {
      id: 2,
      type: 'Standard Equipment Loan',
      rate: 6.2,
      term: 5,
      monthlyPayment: 9800,
      features: ['Fixed monthly payments', 'Standard terms', 'Equipment ownership'],
      recommended: false
    }
  ];

  const requiredDocuments = [
    { name: 'Business Accounts (8 years)', status: 'uploaded', risk: 'low' },
    { name: 'Management Accounts', status: 'uploaded', risk: 'low' },
    { name: 'CNC Equipment Quotes', status: 'uploaded', risk: 'medium' },
    { name: 'Machinery Valuation', status: 'uploaded', risk: 'high' },
    { name: 'Cash Flow Projections', status: 'uploaded', risk: 'medium' }
  ];

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleApprovalDecision = () => {
    updateActionStatus(2, 'completed', 'Financial metrics approved');
    updateActionStatus(3, 'in_progress', 'Processing £500K equipment loan');
    
    setTimeout(() => {
      updateActionStatus(3, 'completed', 'Equipment loan approved');
      updateActionStatus(4, 'in_progress', 'Commercial Banking upgrade activated');
    }, 2500);
  };

  const handleCommercialUpgrade = () => {
    alert('Commercial Banking upgrade complete! Your dedicated relationship manager will ccaas you within 48 hours with treasury solutions and enhanced lending facilities.');
  };

  const handleActionClick = (actionId) => {
    const action = actions.find(a => a.id === actionId);
    if (action && action.status === 'in_progress') {
      if (actionId === 4) {
        // Complete the loan setup
        updateActionStatus(4, 'completed', 'Commercial Banking upgrade complete');
      }
    }
  };

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Manufacturing Equipment Finance</h1>
            <p className="text-sm text-gray-600 mt-1">CNC Machinery Expansion • £500,000 + Commercial Banking Upgrade</p>
          </div>
          <Badge variant="outline" className="text-xs">
            LOAN: BL-2025-4891
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Business Overview */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Business Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Business Name</p>
                    <p className="font-semibold">{businessDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sector</p>
                    <p className="font-medium">{businessDetails.sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trading Period</p>
                    <p className="font-medium">{businessDetails.tradingYears} years</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Annual Turnover</p>
                    <p className="font-semibold text-green-600">£{businessDetails.turnover.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Credit Rating</p>
                    <Badge className="bg-green-100 text-green-800">{businessDetails.creditRating}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Employees</p>
                    <p className="font-medium">{businessDetails.employees}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Analysis */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Financial Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-lg font-semibold text-green-900">£{financialMetrics.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly Expenses</p>
                  <p className="text-lg font-semibold">£{financialMetrics.monthlyExpenses.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Net Profit</p>
                  <p className="text-lg font-semibold text-blue-900">£{financialMetrics.netProfit.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Debt Service Coverage</p>
                  <p className="text-lg font-semibold text-green-900">{financialMetrics.debtServiceRatio}x</p>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Strong Financial Performance</p>
                    <p className="text-sm text-green-800 mt-1">
                      Consistent profitability with excellent debt service coverage ratio
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Structure */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Proposed Loan Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {loanOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`p-4 border rounded-lg ${
                      option.recommended ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{option.type}</h4>
                          {option.recommended && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-gray-600">Interest Rate</p>
                            <p className="font-semibold">{option.rate}% APR</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Term</p>
                            <p className="font-semibold">{option.term} years</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Monthly Payment</p>
                            <p className="font-semibold">
                              {typeof option.monthlyPayment === 'number' 
                                ? `£${option.monthlyPayment}` 
                                : option.monthlyPayment
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Loan Amount</span>
                  <span className="font-semibold text-lg">£{loanData.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">Purpose</span>
                  <span className="font-medium">CNC Machinery Equipment Purchase</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">Expected ROI Increase</span>
                  <span className="font-medium text-green-600">40% Production Capacity</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentation Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {doc.status === 'uploaded' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      )}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className={`text-xs ${
                          doc.risk === 'high' ? 'text-red-600' : 
                          doc.risk === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {doc.risk.toUpperCase()} Priority
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={doc.status === 'uploaded' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }
                    >
                      {doc.status === 'uploaded' ? 'Received' : 'Required'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <ActionProgress actions={actions} onActionClick={handleActionClick} />

          {/* Decision Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Credit Decision</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleApprovalDecision}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve £500K Equipment Loan
              </Button>
              <Button variant="outline" className="w-full" onClick={handleCommercialUpgrade}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Upgrade to Commercial Banking
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Equipment Inspection
              </Button>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan to Turnover</span>
                <span className="font-medium">31%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment to Income</span>
                <span className="font-medium text-green-600">29%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Rating</span>
                <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
              </div>
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
                onClick={() => onKMSOpen('BUSINESS_LOAN_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Business Loan Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('EXPANSION_FINANCE')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Expansion Finance
              </Button>
            </CardContent>
          </Card>

          {/* Action Button */}
          <ActionButton 
            primaryAction={{
              label: "Complete Loan Setup",
              onClick: () => console.log("Complete loan setup"),
              icon: Building2
            }}
            secondaryAction={{
              label: "Schedule Relationship Manager Call",
              onClick: () => console.log("Schedule call")
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessLoanView;
