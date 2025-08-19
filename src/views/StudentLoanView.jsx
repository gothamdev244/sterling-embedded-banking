import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import AppHeader from '../components/shared/AppHeader';
import CustomerSearchCard from '../components/shared/CustomerSearchCard';
import QuickActionGrid from '../components/shared/QuickActionGrid';
import { 
  School as GraduationCap,
  Calculate as Calculator,
  Description as FileText,
  CalendarToday as Calendar,
  AttachMoney as DollarSign,
  TrendingUp,
  CheckCircle,
  Error as AlertCircle,
  AccessTime as Clock,
  Business as Building,
  Person as User,
  CreditCard,
  Percent,
  MenuBook as BookOpen,
  LocationOn as MapPin,
  Phone,
  Info,
  GetApp as Download,
  Assessment,
  AccountBalance
} from '@mui/icons-material';

const StudentLoanView = ({ context, onKMSOpen }) => {
  const [actions, setActions] = useState([
    { id: 1, label: 'Eligibility Assessment', status: 'completed', description: 'Student status verified' },
    { id: 2, label: 'Financial Evaluation', status: 'in_progress', description: 'Reviewing income and expenses' },
    { id: 3, label: 'Loan Structuring', status: 'pending', description: 'Determining optimal terms' },
    { id: 4, label: 'Approval & Setup', status: 'pending', description: 'Final loan arrangement' }
  ]);

  const [selectedLoanType, setSelectedLoanType] = useState('imperial_masters');
  
  // Check if we're in manual mode (no customer context)
  const isManualMode = !context?.customerId;
  
  // Manual Mode View - When no customer is connected
  if (isManualMode) {
    const quickActions = [
      {
        id: 'loan-calculator',
        icon: Calculator,
        label: 'Loan Calculator',
        description: 'Calculate student loan repayments',
        badge: 'popular',
        stats: [
          { label: 'Max Loan', value: '£50K' },
          { label: 'Min APR', value: '6.8%' }
        ]
      },
      {
        id: 'application-status',
        icon: FileText,
        label: 'Application Status',
        description: 'Check student loan application progress',
        actionText: 'Check Status'
      },
      {
        id: 'eligibility-check',
        icon: Assessment,
        label: 'Eligibility Check',
        description: 'Check student loan eligibility',
        badge: 'recommended'
      },
      {
        id: 'university-loans',
        icon: GraduationCap,
        label: 'University Loans',
        description: 'Partner university special rates'
      },
      {
        id: 'postgrad-loans',
        icon: BookOpen,
        label: 'Postgraduate Loans',
        description: 'Masters and PhD financing',
        badge: 'new'
      },
      {
        id: 'repayment-guide',
        icon: AccountBalance,
        label: 'Repayment Guide',
        description: 'Understanding loan repayment options'
      }
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Student Loan Services"
          icon={GraduationCap}
          description="Education financing solutions for undergraduate and postgraduate studies"
        />
        
        <CustomerSearchCard
          searchFields={['Student ID', 'Customer ID', 'Application Reference', 'University Email']}
          onSearch={(searchData) => console.log('Search:', searchData)}
          title="Student Finance"
          description="Enter student details to access loan applications and services"
        />
        
        <QuickActionGrid
          title="Student Financing Options"
          description="Complete education loan solutions and support"
          actions={quickActions}
          columns={3}
          onActionClick={(action) => {
            if (onKMSOpen) {
              onKMSOpen(`STUDENT-${action.id.toUpperCase()}`)
            }
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Student Support</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Student Finance Helpline: +44 800 169 2000</li>
              <li>• No payments while studying full-time</li>
              <li>• Special rates for partner universities</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

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

  const studentDetails = {
    university: 'Imperial College London',
    course: 'MSc Data Science',
    courseLength: 1,
    yearOfStudy: 1,
    expectedGraduation: '2026-09',
    previousDegree: 'Bachelor of Computer Science',
    workExperience: 2
  };

  const loanOptions = [
    {
      id: 'imperial_masters',
      name: 'Imperial College Masters Loan',
      maxAmount: 50000,
      interestRate: 6.8,
      term: 8,
      features: [
        'No payments while studying',
        '6-month grace period post-graduation',
        'Flexible repayment 5-10 years',
        'Parental guarantor accepted'
      ],
      monthlyPayment: 625,
      recommended: true
    },
    {
      id: 'postgraduate',
      name: 'Standard Postgraduate Loan',
      maxAmount: 35000,
      interestRate: 7.2,
      term: 6,
      features: [
        'Quick approval process',
        'Standard terms',
        'Online account management',
        'Payment holidays available'
      ],
      monthlyPayment: 583,
      recommended: false
    }
  ];

  const courseCosts = {
    tuitionFees: 32000,
    livingExpenses: 18000,
    booksAndMaterials: 1500,
    totalRequired: 51500,
    existingFunds: 1500,
    loanRequired: 50000
  };

  const careerProjections = {
    currentSalary: 45000,
    projectedSalary: 85000,
    industryGrowth: 12.5,
    employmentRate: 94,
    averageIncrease: 89
  };

  const eligibilityChecks = [
    { check: 'UK Residency', status: 'verified', icon: CheckCircle },
    { check: 'University Acceptance', status: 'verified', icon: CheckCircle },
    { check: 'Course Eligibility', status: 'verified', icon: CheckCircle },
    { check: 'Credit Assessment', status: 'verified', icon: CheckCircle },
    { check: 'Employment History', status: 'verified', icon: CheckCircle }
  ];

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleLoanApproval = () => {
    updateActionStatus(2, 'completed', 'Imperial College loan pre-approved');
    updateActionStatus(3, 'in_progress', 'Structuring £50K loan terms');
    
    setTimeout(() => {
      updateActionStatus(3, 'completed', '6.8% APR loan structured');
      updateActionStatus(4, 'in_progress', 'Processing with guarantors...');
      
      setTimeout(() => {
        updateActionStatus(4, 'completed', '£50K loan approved - 3-5 days processing');
      }, 2000);
    }, 2500);
  };

  const handleGuarantorSetup = () => {
    alert('Guarantor setup initiated. Your parents will receive documentation via email within 24 hours. Once signed and returned, your £50,000 loan will be finalized for Imperial College enrollment.');
  };

  const selectedOption = loanOptions.find(opt => opt.id === selectedLoanType);

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Imperial College Student Loan</h1>
            <p className="text-sm text-gray-600 mt-1">MSc Data Science • £50,000 Education Financing</p>
          </div>
          <Badge variant="outline" className="text-xs">
            SLN-2025-3471
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Student & Course Information */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student & Course Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">University</p>
                    <p className="font-semibold">{studentDetails.university}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course</p>
                    <p className="font-medium">{studentDetails.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course Duration</p>
                    <p className="font-medium">{studentDetails.courseLength} years</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Year of Study</p>
                    <p className="font-medium">Year {studentDetails.yearOfStudy} of {studentDetails.courseLength}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Graduation</p>
                    <p className="font-medium">{studentDetails.expectedGraduation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Work Experience</p>
                    <p className="font-medium">{studentDetails.workExperience} years</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-900 font-medium">
                    MBA program qualifies for Professional Development Loan benefits
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Breakdown */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Course Financing Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Tuition Fees</p>
                    <p className="text-lg font-semibold text-red-900">£{courseCosts.tuitionFees.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Living Expenses</p>
                    <p className="text-lg font-semibold text-yellow-900">£{courseCosts.livingExpenses.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Books & Materials</p>
                    <p className="text-lg font-semibold">£{courseCosts.booksAndMaterials.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Required</p>
                    <p className="text-lg font-semibold text-blue-900">£{courseCosts.totalRequired.toLocaleString()}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Funding Sources</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Existing Funds (Savings)</span>
                      <span className="font-medium text-green-600">£{courseCosts.existingFunds.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Required</span>
                      <span className="font-medium text-blue-600">£{courseCosts.loanRequired.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Funding</span>
                        <span>£{(courseCosts.existingFunds + courseCosts.loanRequired).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Options */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Available Loan Options
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {loanOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedLoanType === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedLoanType(option.id)}
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
                            <p className="text-sm text-gray-600">Max Amount</p>
                            <p className="font-semibold">£{option.maxAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Interest Rate</p>
                            <p className="font-semibold">{option.interestRate}% APR</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Monthly Payment</p>
                            <p className="font-semibold">£{option.monthlyPayment}</p>
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

          {/* Career Projections */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Post-Graduation Career Projections
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Current Salary</p>
                  <p className="text-lg font-semibold">£{careerProjections.currentSalary.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Projected Post-MBA</p>
                  <p className="text-lg font-semibold text-green-900">£{careerProjections.projectedSalary.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Industry Growth</p>
                  <p className="text-lg font-semibold text-blue-900">+{careerProjections.industryGrowth}%</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Employment Rate</p>
                  <p className="text-lg font-semibold text-purple-900">{careerProjections.employmentRate}%</p>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-green-900 font-medium">
                      Average salary increase: {careerProjections.averageIncrease}% after MBA completion
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Investment expected to pay for itself within 3-4 years
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eligibility Status */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Eligibility Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {eligibilityChecks.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <item.icon className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-900">{item.check}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Professional Development Loan Benefits</p>
                    <p className="text-blue-700 mt-1">
                      No interest charged while studying. Repayments begin 6 months after course completion.
                    </p>
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

          {/* Loan Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Loan Processing</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleLoanApproval}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Student Loan
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Request Documents
              </Button>
              <Button variant="outline" className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Recalculate Terms
              </Button>
            </CardContent>
          </Card>

          {/* Loan Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Loan Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Type</span>
                <span className="font-medium">{selectedOption?.name.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">£{courseCosts.loanRequired.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium">{selectedOption?.interestRate}% APR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Term</span>
                <span className="font-medium">{selectedOption?.term} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment</span>
                <span className="font-medium">£{selectedOption?.monthlyPayment}</span>
              </div>
            </CardContent>
          </Card>

          {/* Important Dates */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Important Dates</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Course Start</span>
                <span className="font-medium">Sep 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Graduation</span>
                <span className="font-medium">Jul 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">First Payment</span>
                <span className="font-medium">Jan 2027</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Final Payment</span>
                <span className="font-medium">Jan 2034</span>
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
                onClick={() => onKMSOpen('STUDENT_GUIDE')}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Student Loan Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('REPAYMENT_CALCULATOR')}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Repayment Calculator
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('CAREER_ADVICE')}
              >
                <User className="h-4 w-4 mr-2" />
                Career Guidance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentLoanView;
