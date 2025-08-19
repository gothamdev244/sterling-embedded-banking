import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import { 
  CreditCard,
  AttachMoney as DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart as BarChart3,
  Calculate as Calculator,
  CheckCircle,
  Error as AlertCircle,
  AccessTime as Clock,
  Description as FileText,
  Business as Building,
  Percent,
  CalendarToday as Calendar,
  Phone,
  Info,
  Security as Shield,
  Person as User,
  NorthEast as ArrowUpRight,
  SouthEast as ArrowDownRight
} from '@mui/icons-material';

const OverdraftRequestView = ({ context, onKMSOpen }) => {
  const [actions, setActions] = useState([
    { id: 1, label: 'Account Assessment', status: 'completed', description: 'Account history reviewed' },
    { id: 2, label: 'Credit Evaluation', status: 'in_progress', description: 'Checking creditworthiness' },
    { id: 3, label: 'Limit Determination', status: 'pending', description: 'Calculating suitable limit' },
    { id: 4, label: 'Overdraft Setup', status: 'pending', description: 'Facility activation' }
  ]);

  const [requestedAmount, setRequestedAmount] = useState(1000);
  const [selectedOption, setSelectedOption] = useState('arranged');

  const customer = {
    name: context.customerName || context.name || 'Unknown Customer',
    accountNumber: context.accountNumber || 'Unknown',
    phoneNumber: context.phone || 'Not provided',
    email: context.email || 'Not provided',
    address: context.location || 'Not provided',
    accountType: context.accountType || context.tier || 'Unknown',
    riskLevel: context.riskProfile || 'medium',
    verificationStatus: context.verificationStatus || 'verified'
  };

  const accountHistory = {
    averageBalance: 2850,
    minimumBalance: -120,
    monthlyIncome: 3200,
    monthlyExpenses: 2800,
    overdraftHistory: 3,
    accountAge: 18,
    directDebits: 8
  };

  const overdraftOptions = [
    {
      id: 'arranged',
      name: 'Arranged Overdraft',
      maxLimit: 1500,
      dailyFee: 0,
      interestRate: 19.9,
      features: [
        'No daily fees',
        'Interest only on amount used',
        'Text alerts when approaching limit',
        'Can be increased up to £3,000'
      ],
      recommended: true,
      annualCost: 199
    },
    {
      id: 'emergency',
      name: 'Emergency Overdraft Buffer',
      maxLimit: 500,
      dailyFee: 0,
      interestRate: 15.9,
      features: [
        'Emergency use only',
        'Lower interest rate',
        'Automatic approval',
        'No monthly fees'
      ],
      recommended: false,
      annualCost: 80
    }
  ];

  const spendingAnalysis = {
    lastMonth: [
      { category: 'Direct Debits', amount: 1250, percentage: 45, trend: 'stable' },
      { category: 'Shopping', amount: 680, percentage: 24, trend: 'up' },
      { category: 'Dining', amount: 420, percentage: 15, trend: 'up' },
      { category: 'Transport', amount: 280, percentage: 10, trend: 'stable' },
      { category: 'Other', amount: 170, percentage: 6, trend: 'down' }
    ],
    totalSpent: 2800,
    riskFactors: [
      'Increasing discretionary spending',
      'Low savings buffer'
    ]
  };

  const creditAssessment = {
    creditScore: 'Good (720)',
    incomeVerification: 'Confirmed',
    employmentStatus: 'Permanent',
    existingCredit: 2800,
    recommendedLimit: 1200,
    approvalProbability: 'High'
  };

  const overdraftCosts = {
    monthlyUsage: 15,
    averageUsed: 400,
    estimatedMonthlyCost: 13.25,
    comparisonWithFees: 75
  };

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleApproveOverdraft = () => {
    updateActionStatus(2, 'completed', 'Credit check passed');
    updateActionStatus(3, 'in_progress', 'Determining overdraft limit');
    
    setTimeout(() => {
      updateActionStatus(3, 'completed', `£${creditAssessment.recommendedLimit} limit approved`);
      updateActionStatus(4, 'in_progress', 'Setting up overdraft facility...');
      
      setTimeout(() => {
        updateActionStatus(4, 'completed', 'Overdraft facility active');
      }, 1500);
    }, 2000);
  };

  const selectedOverdraft = overdraftOptions.find(opt => opt.id === selectedOption);

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Overdraft Request Assessment</h1>
            <p className="text-sm text-gray-600 mt-1">Credit Facility • Financial Safety Net</p>
          </div>
          <Badge variant="outline" className="text-xs">
            OVD-2025-4729
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Account Analysis */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Account Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Avg Balance</p>
                  <p className="text-lg font-semibold text-blue-900">£{accountHistory.averageBalance.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Monthly Income</p>
                  <p className="text-lg font-semibold text-green-900">£{accountHistory.monthlyIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <TrendingDown className="h-6 w-6 text-red-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Monthly Expenses</p>
                  <p className="text-lg font-semibold text-red-900">£{accountHistory.monthlyExpenses.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <Clock className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Account Age</p>
                  <p className="text-lg font-semibold text-purple-900">{accountHistory.accountAge} months</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-sm text-amber-900 font-medium">
                      Account shows {accountHistory.overdraftHistory} overdraft incidents in last 12 months
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Customer demonstrates good financial management overall
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spending Breakdown */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Spending Analysis (Last Month)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {spendingAnalysis.lastMonth.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.category}</p>
                        {item.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 text-red-500" />
                        ) : item.trend === 'down' ? (
                          <ArrowDownRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold">£{item.amount}</p>
                      <p className="text-sm text-gray-600">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Monthly Spend</p>
                  <p className="text-lg font-semibold">£{spendingAnalysis.totalSpent}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly Surplus</p>
                  <p className="text-lg font-semibold text-green-600">
                    £{accountHistory.monthlyIncome - spendingAnalysis.totalSpent}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overdraft Options */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Available Overdraft Options
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {overdraftOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOption === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{option.name}</h4>
                          {option.recommended && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-gray-600">Max Limit</p>
                            <p className="font-semibold">£{option.maxLimit.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Interest Rate</p>
                            <p className="font-semibold">{option.interestRate}% APR</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Est. Annual Cost</p>
                            <p className="font-semibold">£{option.annualCost}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Credit Assessment */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Credit Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <p className="text-lg font-semibold text-green-900">{creditAssessment.creditScore}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Employment</p>
                  <p className="text-lg font-semibold text-blue-900">{creditAssessment.employmentStatus}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Existing Credit</p>
                  <p className="text-lg font-semibold text-purple-900">£{creditAssessment.existingCredit}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Recommended Limit</p>
                  <p className="text-lg font-semibold">£{creditAssessment.recommendedLimit}</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">
                      Approval Probability: {creditAssessment.approvalProbability}
                    </p>
                    <p className="text-sm text-green-800 mt-1">
                      Customer meets all criteria for overdraft facility up to £{creditAssessment.recommendedLimit}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Calculator */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Overdraft Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Requested Overdraft Amount</label>
                  <div className="mt-1 flex items-center">
                    <span className="px-3 py-2 bg-gray-50 border border-r-0 rounded-l-lg">£</span>
                    <input 
                      type="number"
                      value={requestedAmount}
                      onChange={(e) => setRequestedAmount(e.target.value)}
                      className="w-full px-3 py-2 border rounded-r-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Expected Monthly Usage</p>
                    <p className="text-lg font-semibold text-yellow-900">{overdraftCosts.monthlyUsage} days</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average Amount Used</p>
                    <p className="text-lg font-semibold text-blue-900">£{overdraftCosts.averageUsed}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Estimated Costs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Interest</span>
                      <span className="font-medium">£{overdraftCosts.estimatedMonthlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Cost</span>
                      <span className="font-medium">£{(overdraftCosts.estimatedMonthlyCost * 12).toFixed(0)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-green-600">
                        <span>Savings vs Unauthorised</span>
                        <span className="font-semibold">£{overdraftCosts.comparisonWithFees}/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <ActionProgress actions={actions} />

          {/* Approval Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Overdraft Decision</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleApproveOverdraft}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Overdraft
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Request More Info
              </Button>
              <Button variant="outline" className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Recalculate Limit
              </Button>
            </CardContent>
          </Card>

          {/* Application Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Application Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Requested Amount</span>
                <span className="font-medium">£{requestedAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recommended Limit</span>
                <span className="font-medium">£{creditAssessment.recommendedLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium">{selectedOverdraft?.interestRate}% APR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Credit Score</span>
                <Badge className="bg-green-100 text-green-800">Good</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approval Status</span>
                <Badge className="bg-green-100 text-green-800">Likely</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              {spendingAnalysis.riskFactors.map((factor, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-900">{factor}</span>
                </div>
              ))}
              <div className="mt-3 p-2 bg-green-50 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-900">Regular income verified</span>
                </div>
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
                onClick={() => onKMSOpen('OVERDRAFT_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Overdraft Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('COST_CALCULATOR')}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Cost Calculator
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('FINANCIAL_ADVISOR')}
              >
                <User className="h-4 w-4 mr-2" />
                Financial Advice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverdraftRequestView;
