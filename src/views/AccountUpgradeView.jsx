import React, { useState } from 'react';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionButton from '../components/actions/ActionButton';
import ActionProgress from '../components/actions/ActionProgress';
import AppHeader from '../components/shared/AppHeader';
import CustomerSearchCard from '../components/shared/CustomerSearchCard';
import QuickActionGrid from '../components/shared/QuickActionGrid';
import { 
  TrendingUp,
  Star,
  Check as CheckCircle,
  Info as AlertCircle,
  CreditCard,
  Public as Globe,
  AttachMoney as DollarSign,
  LocalAtm as Wallet,
  Phone,
  Flight as Plane,
  Business as Building,
  Shield,
  ChevronRight,
  Diamond,
  AccountBalance,
  Assessment
} from '@mui/icons-material';

const AccountUpgradeView = ({ context, onKMSOpen }) => {
  // Check if we're in manual mode (no customer context)
  const isManualMode = !context?.customerId;
  
  // Manual Mode View - When no customer is connected
  if (isManualMode) {
    const quickActions = [
      {
        id: 'eligibility-check',
        icon: Assessment,
        label: 'Eligibility Check',
        description: 'Check upgrade eligibility instantly',
        badge: 'recommended',
        stats: [
          { label: 'Premier', value: '£50K+' },
          { label: 'Jade', value: '£500K+' }
        ]
      },
      {
        id: 'compare-accounts',
        icon: AccountBalance,
        label: 'Compare Accounts',
        description: 'View all account types and benefits',
        actionText: 'View Comparison'
      },
      {
        id: 'premier-benefits',
        icon: Star,
        label: 'Premier Banking',
        description: 'Exclusive benefits for Premier customers',
        badge: 'popular'
      },
      {
        id: 'jade-banking',
        icon: Diamond,
        label: 'Jade Banking',
        description: 'Ultra-high net worth services',
        badge: 'exclusive'
      },
      {
        id: 'travel-perks',
        icon: Plane,
        label: 'Travel Benefits',
        description: 'Lounge access and travel insurance'
      },
      {
        id: 'wealth-planning',
        icon: TrendingUp,
        label: 'Wealth Planning',
        description: 'Investment and financial planning services'
      }
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Account Upgrade Center"
          icon={Star}
          description="Discover premium banking services and exclusive benefits"
        />
        
        <CustomerSearchCard
          searchFields={['Customer ID', 'Account Number', 'Phone Number', 'Email']}
          onSearch={(searchData) => console.log('Search:', searchData)}
          title="Account Services"
          description="Enter customer details to check upgrade eligibility and benefits"
        />
        
        <QuickActionGrid
          title="Premium Banking Services"
          description="Explore account upgrades and exclusive banking tiers"
          actions={quickActions}
          columns={3}
          onActionClick={(action) => {
            if (onKMSOpen) {
              onKMSOpen(`UPGRADE-${action.id.toUpperCase()}`)
            }
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">Upgrade Support</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Premier Banking: +44 800 924 3311</li>
              <li>• Instant eligibility assessment available</li>
              <li>• Dedicated relationship managers for Premier & Jade</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  const [actions, setActions] = useState([
    { id: 1, label: 'Eligibility Check', status: 'completed', description: 'Customer qualifies for Premier' },
    { id: 2, label: 'Account Comparison', status: 'in_progress', description: 'Reviewing upgrade benefits' },
    { id: 3, label: 'Documentation', status: 'pending', description: 'Ready to proceed' },
    { id: 4, label: 'Upgrade Processing', status: 'pending', description: 'Awaiting confirmation' }
  ]);

  const [selectedAccount, setSelectedAccount] = useState(null);

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

  const currentAccountDetails = {
    type: 'HSBC Advance',
    monthlyFee: 0,
    minimumBalance: 1750,
    overdraftLimit: 500,
    internationalTransfers: '£4 per transfer',
    atmWithdrawals: 'Free in UK'
  };

  const accountOptions = [
    {
      id: 'premier',
      name: 'HSBC Premier',
      monthlyFee: 0,
      minimumBalance: 50000,
      recommended: true,
      benefits: [
        'Premier World Elite Mastercard',
        'Worldwide Travel Insurance',
        'Global transfers in 19 currencies',
        'Premier relationship manager',
        'Airport lounge access',
        'Preferential mortgage rates'
      ],
      requirements: [
        '£50,000+ in savings/investments',
        'OR £75,000+ annual income',
        'OR £100,000+ mortgage'
      ]
    },
    {
      id: 'jade',
      name: 'HSBC Jade',
      monthlyFee: 0,
      minimumBalance: 500000,
      recommended: false,
      benefits: [
        'Jade Debit & Credit Cards',
        'Dedicated Jade Centre access',
        'Priority Pass unlimited lounges',
        'Exclusive lifestyle privileges',
        'Wealth planning services',
        'Global investment opportunities'
      ],
      requirements: [
        '£500,000+ in investments',
        'OR £750,000+ in mortgages',
        'Invitation only'
      ]
    }
  ];

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleAccountSelection = (accountId) => {
    setSelectedAccount(accountId);
    updateActionStatus(2, 'completed', 'Account comparison complete');
    updateActionStatus(3, 'in_progress', 'Preparing documentation');
  };

  const handleUpgradeConfirmation = () => {
    updateActionStatus(3, 'completed', 'Documentation verified');
    updateActionStatus(4, 'in_progress', 'Processing account upgrade');
    
    setTimeout(() => {
      updateActionStatus(4, 'completed', 'Account upgraded successfully');
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Professional Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Account Upgrade Assessment</h1>
              <p className="text-sm text-gray-500 mt-1">Premium Banking Services Eligibility</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
              REF: UPG-2025-8734
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Customer Context */}
        <CustomerContext customer={customer} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Current Account Overview */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-gray-500" />
                  Current Account Details
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{currentAccountDetails.type}</p>
                    <p className="text-sm text-gray-600">Active since March 2018</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    Current Plan
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Fee</p>
                    <p className="font-semibold text-gray-900">£{currentAccountDetails.monthlyFee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Minimum Balance</p>
                    <p className="font-semibold text-gray-900">£{currentAccountDetails.minimumBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overdraft Limit</p>
                    <p className="font-semibold text-gray-900">£{currentAccountDetails.overdraftLimit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">International Transfers</p>
                    <p className="font-semibold text-gray-900">{currentAccountDetails.internationalTransfers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade Options */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  Available Upgrade Options
                </h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                {accountOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAccount === option.id 
                        ? 'border-gray-400 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAccountSelection(option.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          option.id === 'jade' ? 'bg-green-50' : 'bg-gray-100'
                        }`}>
                          <Star className={`h-5 w-5 ${
                            option.id === 'jade' ? 'text-green-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{option.name}</h4>
                          <p className="text-sm text-gray-600">
                            Minimum Balance: £{option.minimumBalance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {option.recommended && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {option.benefits.slice(0, 4).map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-gray-400 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                        <div className="space-y-1">
                          {option.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <ChevronRight className="h-3 w-3 text-gray-400 mt-0.5" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedAccount === option.id && (
                      <div className="mt-4 pt-4 border-t">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpgradeConfirmation();
                          }}
                          className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors"
                        >
                          Proceed with {option.name} Upgrade
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Assessment */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  Eligibility Assessment
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Income Requirement</p>
                        <p className="text-sm text-gray-600">Annual income: £82,000</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-700">Met</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Account History</p>
                        <p className="text-sm text-gray-600">5+ years with HSBC</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-700">Met</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-gray-900">Minimum Balance</p>
                        <p className="text-sm text-gray-600">Current average: £35,000</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-amber-700">Review</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Recommendation:</strong> Customer qualifies for HSBC Premier based on income criteria. 
                    Consider investment options to meet balance requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Progress Tracker */}
            <ActionProgress actions={actions} />

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="px-6 py-4 space-y-2">
                <button 
                  onClick={() => onKMSOpen('PREMIER_BENEFITS')}
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors"
                >
                  View Full Benefits Comparison
                </button>
                <button 
                  onClick={() => onKMSOpen('ELIGIBILITY_CALCULATOR')}
                  className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Run Eligibility Calculator
                </button>
                <button 
                  onClick={() => onKMSOpen('SCHEDULE_APPOINTMENT')}
                  className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Schedule Branch Appointment
                </button>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
              </div>
              <div className="px-6 py-4 space-y-2">
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => onKMSOpen('ACCOUNT_GUIDE')}
                >
                  <Building className="inline h-4 w-4 mr-2" />
                  Account Types Guide
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => onKMSOpen('PREMIER_TRAVEL')}
                >
                  <Plane className="inline h-4 w-4 mr-2" />
                  Premier Travel Benefits
                </button>
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => onKMSOpen('WEALTH_PLANNING')}
                >
                  <DollarSign className="inline h-4 w-4 mr-2" />
                  Wealth Planning Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpgradeView;
