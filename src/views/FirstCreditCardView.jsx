import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import { 
  CreditCard,
  CardGiftcard as Gift,
  Percent,
  Security as Shield,
  Public as Globe,
  Flight as Plane,
  AttachMoney as DollarSign,
  TrendingUp,
  CheckCircle,
  Error as AlertCircle,
  AccessTime as Clock,
  Description as FileText,
  Business as Building,
  Calculate as Calculator,
  Star,
  Phone,
  Person as User,
  Info,
  CalendarToday as Calendar,
  Bolt as Zap,
  EmojiEvents as Award
} from '@mui/icons-material';

const FirstCreditCardView = ({ context, onKMSOpen }) => {
  const [actions, setActions] = useState([
    { id: 1, label: 'Eligibility Check', status: 'completed', description: 'Income and credit verified' },
    { id: 2, label: 'Card Selection', status: 'in_progress', description: 'Reviewing suitable options' },
    { id: 3, label: 'Application Processing', status: 'pending', description: 'Credit approval pending' },
    { id: 4, label: 'Card Issuance', status: 'pending', description: 'Physical card delivery' }
  ]);

  const [selectedCard, setSelectedCard] = useState('cashback');

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

  const eligibilityProfile = {
    age: 24,
    annualIncome: 28000,
    employmentStatus: 'Permanent',
    creditHistory: 'Building',
    currentAccount: '6 months',
    creditScore: 'Fair (650-700)',
    eligibleCards: 3
  };

  const cardOptions = [
    {
      id: 'cashback',
      name: 'HSBC Cashback Credit Card',
      apr: 22.9,
      creditLimit: 1200,
      annualFee: 0,
      cashbackRate: 1.0,
      introOffer: '5% cashback for first 3 months',
      features: [
        '1% cashback on all purchases',
        'No annual fee',
        'CCAASless payments',
        'Mobile app integration',
        'Purchase protection'
      ],
      benefits: [
        'Build credit history',
        'Monthly statements',
        'Online account management'
      ],
      recommended: true,
      suitability: 'Perfect for first-time credit card users'
    },
    {
      id: 'student',
      name: 'HSBC Student Credit Card',
      apr: 18.9,
      creditLimit: 800,
      annualFee: 0,
      cashbackRate: 0.5,
      introOffer: 'No interest for 6 months',
      features: [
        'Lower APR for students',
        'Financial education resources',
        'Spending alerts',
        'Emergency cash advance',
        'Fraud protection'
      ],
      benefits: [
        'Credit building tools',
        'Student-friendly terms',
        'Flexible payments'
      ],
      recommended: false,
      suitability: 'Ideal for students and young professionals'
    },
    {
      id: 'rewards',
      name: 'HSBC Rewards Credit Card',
      apr: 24.9,
      creditLimit: 1500,
      annualFee: 25,
      cashbackRate: 0,
      introOffer: '10,000 bonus points',
      features: [
        'Earn 1 point per £1 spent',
        'Bonus points at partner retailers',
        'Flexible redemption options',
        'Travel insurance included',
        'Purchase protection'
      ],
      benefits: [
        'Rewards catalog access',
        'Priority customer service',
        'Special offers'
      ],
      recommended: false,
      suitability: 'Best for frequent spenders seeking rewards'
    }
  ];

  const creditEducation = {
    tips: [
      'Keep credit utilization below 30%',
      'Always pay at least the minimum amount',
      'Pay on time to build credit history',
      'Monitor your credit score regularly'
    ],
    firstCardGuidance: [
      'Start with small purchases you can afford',
      'Set up automatic payments',
      'Use credit card for regular expenses',
      'Review statements monthly'
    ]
  };

  const applicationRequirements = [
    { item: 'Valid ID (Passport/Driving License)', status: 'verified', required: true },
    { item: 'Proof of Address', status: 'verified', required: true },
    { item: 'Employment Verification', status: 'verified', required: true },
    { item: 'Bank Statements (3 months)', status: 'pending', required: true },
    { item: 'Credit Check Authorization', status: 'pending', required: true }
  ];

  const projectedBenefits = {
    monthlySpending: 800,
    annualCashback: 96,
    creditScoreImprovement: '50-100 points',
    timeframe: '6-12 months'
  };

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleProcessApplication = () => {
    updateActionStatus(2, 'completed', 'Card selection confirmed');
    updateActionStatus(3, 'in_progress', 'Processing application...');
    
    setTimeout(() => {
      updateActionStatus(3, 'completed', 'Application approved');
      updateActionStatus(4, 'in_progress', 'Preparing card for delivery');
      
      setTimeout(() => {
        updateActionStatus(4, 'completed', 'Card dispatched - arrives in 5-7 days');
      }, 1500);
    }, 2500);
  };

  const selectedCardDetails = cardOptions.find(card => card.id === selectedCard);

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">First Credit Card Application</h1>
            <p className="text-sm text-gray-600 mt-1">Credit Building • Financial Growth</p>
          </div>
          <Badge variant="outline" className="text-xs">
            CCA-2025-8935
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Eligibility Overview */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Eligibility Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Annual Income</p>
                  <p className="text-lg font-semibold text-green-900">£{eligibilityProfile.annualIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Employment</p>
                  <p className="text-lg font-semibold text-blue-900">{eligibilityProfile.employmentStatus}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Credit Score Range</p>
                  <p className="text-lg font-semibold text-purple-900">{eligibilityProfile.creditScore}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-gray-600">Account History</p>
                  <p className="text-lg font-semibold text-amber-900">{eligibilityProfile.currentAccount}</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">
                      Eligible for {eligibilityProfile.eligibleCards} credit card options
                    </p>
                    <p className="text-sm text-green-800 mt-1">
                      Customer meets all basic criteria for first credit card
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Options */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Recommended Credit Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {cardOptions.map(card => (
                  <div 
                    key={card.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCard === card.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCard(card.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{card.name}</h4>
                          {card.recommended && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{card.suitability}</p>
                        
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="p-2 bg-gray-50 rounded text-center">
                            <p className="text-xs text-gray-600">APR</p>
                            <p className="font-semibold">{card.apr}%</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded text-center">
                            <p className="text-xs text-gray-600">Credit Limit</p>
                            <p className="font-semibold">£{card.creditLimit}</p>
                          </div>
                          <div className="p-2 bg-gray-50 rounded text-center">
                            <p className="text-xs text-gray-600">Annual Fee</p>
                            <p className="font-semibold">{card.annualFee === 0 ? 'FREE' : `£${card.annualFee}`}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-3">
                          <div className="flex items-center gap-2">
                            <Gift className="h-4 w-4 text-amber-600" />
                            <p className="text-sm text-amber-900 font-medium">
                              Welcome Offer: {card.introOffer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Key Features</p>
                        <div className="space-y-1">
                          {card.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Additional Benefits</p>
                        <div className="space-y-1">
                          {card.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <Star className="h-3 w-3 text-blue-600" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Requirements */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Application Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {applicationRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {req.status === 'verified' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      )}
                      <div>
                        <p className="font-medium">{req.item}</p>
                        {req.required && (
                          <p className="text-xs text-red-600">Required</p>
                        )}
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={req.status === 'verified' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }
                    >
                      {req.status === 'verified' ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Application Process</p>
                    <p className="text-blue-700 mt-1">
                      Once all documents are verified, your application will be processed within 2-3 business days. 
                      Card delivery takes 5-7 working days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Education */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4" />
                Credit Building Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Essential Tips</h4>
                  <div className="space-y-2">
                    {creditEducation.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">First Card Guidance</h4>
                  <div className="space-y-2">
                    {creditEducation.firstCardGuidance.map((guidance, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{guidance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Expected Credit Score Improvement</p>
                  <p className="text-lg font-semibold text-green-900">{projectedBenefits.creditScoreImprovement}</p>
                  <p className="text-xs text-gray-600">in {projectedBenefits.timeframe}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Projected Annual Cashback</p>
                  <p className="text-lg font-semibold text-blue-900">£{projectedBenefits.annualCashback}</p>
                  <p className="text-xs text-gray-600">based on £{projectedBenefits.monthlySpending}/month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <ActionProgress actions={actions} />

          {/* Application Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Application Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleProcessApplication}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Process Application
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Review Terms
              </Button>
              <Button variant="outline" className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Payment Calculator
              </Button>
            </CardContent>
          </Card>

          {/* Selected Card Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Application Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Card</span>
                <span className="font-medium">{selectedCardDetails?.name.split(' ')[1]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Credit Limit</span>
                <span className="font-medium">£{selectedCardDetails?.creditLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">APR</span>
                <span className="font-medium">{selectedCardDetails?.apr}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Fee</span>
                <span className="font-medium text-green-600">
                  {selectedCardDetails?.annualFee === 0 ? 'FREE' : `£${selectedCardDetails?.annualFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cashback Rate</span>
                <span className="font-medium">{selectedCardDetails?.cashbackRate}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Expected Timeline</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium">Application Processing</p>
                  <p className="text-gray-600">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">Card Production</p>
                  <p className="text-gray-600">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium">Card Delivery</p>
                  <p className="text-gray-600">5-7 working days</p>
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
                onClick={() => onKMSOpen('CREDIT_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Credit Card Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('CREDIT_SCORE')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Credit Score Info
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('RESPONSIBLE_CREDIT')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Responsible Credit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirstCreditCardView;
