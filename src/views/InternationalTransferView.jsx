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
  Public as Globe,
  Send,
  AttachMoney as DollarSign,
  TrendingUp,
  AccessTime as Clock,
  CheckCircle,
  Error as AlertCircle,
  Description as FileText,
  Calculate as Calculator,
  ArrowForward as ArrowRight,
  Business as Building,
  CreditCard,
  Info,
  Refresh as RefreshCw
} from '@mui/icons-material';

const InternationalTransferView = ({ context, onKMSOpen }) => {
  // Check if we're in manual mode (no customer context)
  const isManualMode = !context?.customerId;
  
  // Manual Mode View - When no customer is connected
  if (isManualMode) {
    const quickActions = [
      {
        id: 'new-transfer',
        icon: Send,
        label: 'New Transfer',
        description: 'Send money internationally',
        badge: 'popular',
        stats: [
          { label: 'Countries', value: '200+' },
          { label: 'Currencies', value: '50+' }
        ]
      },
      {
        id: 'track-transfer',
        icon: Clock,
        label: 'Track Transfer',
        description: 'Monitor transfer status and delivery',
        actionText: 'Track Now'
      },
      {
        id: 'exchange-rates',
        icon: TrendingUp,
        label: 'Exchange Rates',
        description: 'Live currency rates and calculator',
        badge: 'live'
      },
      {
        id: 'beneficiaries',
        icon: Building,
        label: 'Beneficiaries',
        description: 'Manage saved transfer recipients'
      },
      {
        id: 'transfer-limits',
        icon: Info,
        label: 'Transfer Limits',
        description: 'View limits and requirements',
        badge: 'helpful'
      },
      {
        id: 'swift-bic',
        icon: Globe,
        label: 'SWIFT/BIC Finder',
        description: 'Find bank codes for transfers'
      }
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="International Money Transfer"
          icon={Globe}
          description="Fast, secure cross-border payments and currency exchange"
        />
        
        <CustomerSearchCard
          searchFields={['Customer ID', 'Account Number', 'Transfer Reference', 'IBAN']}
          onSearch={(searchData) => console.log('Search:', searchData)}
          title="Transfer Services"
          description="Enter customer details to access transfer history and services"
        />
        
        <QuickActionGrid
          title="International Banking Services"
          description="Complete suite of cross-border payment solutions"
          actions={quickActions}
          columns={3}
          onActionClick={(action) => {
            if (onKMSOpen) {
              onKMSOpen(`TRANSFER-${action.id.toUpperCase()}`)
            }
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Transfer Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Same-day transfers to most countries</li>
              <li>• Competitive exchange rates with no hidden fees</li>
              <li>• International Banking: +44 1226 261 261</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  // Determine which customer story we're showing
  const isVictoria = context.customerName?.includes('Victoria') || context.customerName?.includes('Pemberton');
  const isSarah = context.customerName?.includes('Sarah') || context.customerName?.includes('Chen');
  
  const [actions, setActions] = useState([
    { id: 1, label: 'Compliance Check', status: 'completed', description: 'AML verification passed' },
    { id: 2, label: 'Rate Calculation', status: 'in_progress', description: 'Applying preferential rates' },
    { id: 3, label: 'Transfer Processing', status: 'pending', description: 'Ready to initiate' },
    { id: 4, label: 'Confirmation', status: 'pending', description: 'Awaiting completion' }
  ]);

  // Dynamic transfer data based on customer
  const [transferData, setTransferData] = useState(
    isVictoria ? {
      amount: 350000,
      currency: 'EUR',
      sourceCurrency: 'GBP',
      targetCurrency: 'EUR',
      recipient: '',
      purpose: 'property_purchase',
      urgency: 'same_day'
    } : {
      amount: 2000000,
      currency: 'HKD',
      targetCurrency: 'SGD',
      recipient: '',
      purpose: 'investment',
      urgency: 'same_day'
    }
  );

  // Dynamic customer data
  const customer = isVictoria ? {
    name: context.customerName || 'Victoria Pemberton',
    accountNumber: 'PRM-456789',
    phoneNumber: '+44 161 234 5678',
    email: 'victoria.pemberton@email.com',
    address: 'Manchester, UK',
    accountType: 'Premier Banking',
    riskLevel: 'low',
    verificationStatus: 'verified'
  } : {
    name: context.customerName || 'Sarah Chen Wei',
    accountNumber: 'JAD-789234',
    phoneNumber: '+852 2234 5678',
    email: 'sarah.chenwei@email.com',
    address: 'Hong Kong',
    accountType: 'Jade Banking',
    riskLevel: 'low',
    verificationStatus: 'verified'
  };

  // Dynamic exchange rates
  const exchangeRates = isVictoria ? {
    current: 1.168,
    bankRate: 1.155,
    premierRate: 1.168,
    savings: 4550  // Savings on €350K transfer
  } : {
    current: 0.173,
    bankRate: 0.168,
    jadeRate: 0.173,
    savings: 10000  // Significant savings on HK$2M transfer
  };

  // Dynamic recipient details
  const recipientDetails = isVictoria ? {
    name: 'German Property Solicitor Account',
    bank: 'Deutsche Bank AG',
    accountNumber: 'DE89-3704-0044-0532-0130-00',
    swiftCode: 'DEUTDEFF',
    country: 'Germany',
    purpose: 'Property Purchase - Berlin Residential'
  } : {
    name: 'HSBC Singapore Investment Account',
    bank: 'HSBC Singapore',
    accountNumber: 'SGD-INV-2847',
    swiftCode: 'HSBCSGSG',
    country: 'Singapore',
    purpose: 'Portfolio Diversification - Singapore REITs & Bonds'
  };

  const complianceChecks = [
    { check: 'Identity Verification', status: 'passed', icon: CheckCircle },
    { check: 'Sanctions Screening', status: 'passed', icon: CheckCircle },
    { check: 'Purpose of Transfer', status: 'verified', icon: CheckCircle },
    { check: 'Source of Funds', status: 'verified', icon: CheckCircle }
  ];

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const calculateTransferAmount = () => {
    if (isVictoria) {
      // For Victoria: GBP to EUR
      const gbpAmount = transferData.amount / exchangeRates.premierRate;
      return `£${gbpAmount.toFixed(2).toLocaleString()} → €${transferData.amount.toLocaleString()}`;
    } else {
      // For Sarah: HKD to SGD
      return (transferData.amount * exchangeRates.jadeRate).toFixed(2);
    }
  };

  const handleInitiateTransfer = () => {
    if (isVictoria) {
      updateActionStatus(2, 'completed', 'Premier preferential rate applied');
      updateActionStatus(3, 'in_progress', 'Processing €350K property transfer...');
      
      setTimeout(() => {
        updateActionStatus(3, 'completed', 'Transfer completed to Germany');
        updateActionStatus(4, 'completed', 'Property purchase confirmation sent');
      }, 3000);
    } else {
      updateActionStatus(2, 'completed', 'Jade preferential rate applied');
      updateActionStatus(3, 'in_progress', 'Processing HK$2M investment transfer...');
      
      setTimeout(() => {
        updateActionStatus(3, 'completed', 'Transfer completed to Singapore');
        updateActionStatus(4, 'completed', 'Investment consultation scheduled');
      }, 3000);
    }
  };

  const handleScheduleInvestmentConsult = () => {
    if (isVictoria) {
      alert('Property completion documentation sent to German solicitor. Transfer confirmation will be emailed within 24 hours.');
    } else {
      alert('Investment consultation with Singapore portfolio specialists scheduled for 48 hours from now. You will receive confirmation via email.');
    }
  };

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {isVictoria ? 'Premier Banking International Transfer' : 'Jade Banking International Transfer'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {isVictoria ? 'Property Purchase • €350K → Germany Real Estate' : 'Investment Diversification • HK$2M → Singapore Portfolio'}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            REF: INT-2025-8492
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Transfer Details */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Send className="h-4 w-4" />
                Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Amount to Send</label>
                    <div className="mt-1 flex items-center gap-2">
                      <input 
                        type="number" 
                        value={transferData.amount}
                        onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                        className="px-3 py-2 border rounded-lg font-semibold text-lg w-full"
                      />
                      <Badge className="bg-gray-100 text-gray-800">
                        {isVictoria ? 'EUR' : 'HKD'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Recipient Receives</label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg font-semibold text-lg w-full">
                        {calculateTransferAmount()}
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">
                        {isVictoria ? 'EUR' : 'SGD'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-amber-900 font-medium">
                        {isVictoria ? 'Premier Preferential Rate' : 'Jade Preferential Rate'}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-amber-900">
                        {isVictoria ? `1 GBP = ${exchangeRates.premierRate} EUR` : `1 HKD = ${exchangeRates.jadeRate} SGD`}
                      </p>
                      <p className="text-xs text-amber-700">
                        {isVictoria ? `Save £${exchangeRates.savings} vs standard rate` : `Save HK$${exchangeRates.savings} vs standard rate`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Transfer Purpose</label>
                    <select className="mt-1 w-full px-3 py-2 border rounded-lg" 
                            defaultValue={isVictoria ? 'property_purchase' : 'investment'}>
                      {isVictoria ? (
                        <>
                          <option value="property_purchase">Property Purchase</option>
                          <option>Real Estate Investment</option>
                          <option>International Property</option>
                          <option>Residential Purchase</option>
                        </>
                      ) : (
                        <>
                          <option value="investment">Investment Diversification</option>
                          <option>Singapore REITs Investment</option>
                          <option>Portfolio Rebalancing</option>
                          <option>Cross-Border Investment</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Transfer Speed</label>
                    <select className="mt-1 w-full px-3 py-2 border rounded-lg" defaultValue=""  onChange={() => {}}>
                      {isVictoria ? (
                        <>
                          <option>Same Day (Free - Premier)</option>
                          <option>Instant (£50)</option>
                          <option>Standard (1-2 days)</option>
                        </>
                      ) : (
                        <>
                          <option>Same Day (Free - Jade)</option>
                          <option>Instant (HK$200)</option>
                          <option>Standard (1-2 days)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipient Information */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="h-4 w-4" />
                Recipient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Recipient Name</p>
                  <p className="font-medium">{recipientDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bank</p>
                  <p className="font-medium">{recipientDetails.bank}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-mono">{recipientDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SWIFT Code</p>
                  <p className="font-mono">{recipientDetails.swiftCode}</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">
                      {isVictoria ? 'Transfer Purpose' : 'Investment Purpose'}
                    </p>
                    <p className="text-blue-700 mt-1">{recipientDetails.purpose}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <Building className="h-4 w-4 mr-2" />
                  Use Saved Recipient
                </Button>
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add New Recipient
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Security */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Compliance Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-3">
                {complianceChecks.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <item.icon className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-900">{item.check}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">
                      {isVictoria ? 'International Property Transfer' : 'HSBC to HSBC Transfer'}
                    </p>
                    <p className="text-blue-700 mt-1">
                      {isVictoria 
                        ? 'Expedited processing for property transactions with compliance verification'
                        : 'Instant processing between HSBC accounts globally with no intermediary bank fees'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Transfer Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleInitiateTransfer}
              >
                <Send className="h-4 w-4 mr-2" />
                {isVictoria ? 'Process €350K Property Transfer' : 'Process HK$2M Investment Transfer'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleScheduleInvestmentConsult}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {isVictoria ? 'Property Documentation' : 'Schedule Investment Consult'}
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Set Regular Transfers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <ActionProgress actions={actions} />

          {/* Transfer Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Transfer Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange Rate</span>
                <span className="font-medium">
                  {isVictoria ? exchangeRates.premierRate : exchangeRates.jadeRate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer Fee</span>
                <span className="font-medium text-green-600">
                  {isVictoria ? 'FREE (Premier)' : 'FREE (Jade)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Arrival</span>
                <span className="font-medium">
                  {isVictoria ? 'Today, 3 PM CET' : 'Today, 5 PM SGT'}
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total to Receive</span>
                  <span className="font-semibold text-lg">
                    {isVictoria ? calculateTransferAmount() : `SGD ${calculateTransferAmount()}`}
                  </span>
                </div>
                <div className="mt-2 p-2 bg-amber-50 rounded text-xs text-amber-900">
                  💰 {isVictoria 
                    ? `Premier Banking saves you £${exchangeRates.savings.toLocaleString()} vs standard rates`
                    : `Jade Banking saves you HK$${exchangeRates.savings.toLocaleString()} vs standard rates`}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchange Rate Alert */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Rate Alerts</CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Current Alert</p>
                  <p className="text-sm font-medium">
                    {isVictoria ? 'GBP/EUR > 1.170' : 'HKD/SGD > 0.175'}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Set New Alert
                </Button>
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
                onClick={() => onKMSOpen(isVictoria ? 'INTL_PROPERTY_PURCHASE' : 'WIRE_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                {isVictoria ? 'Property Transfer Guide' : 'Wire Transfer Guide'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen(isVictoria ? 'UK_EU_TRANSFER_REGS' : 'FX_RATES')}
              >
                <Calculator className="h-4 w-4 mr-2" />
                {isVictoria ? 'UK-EU Transfer Rules' : 'FX Rate Calculator'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InternationalTransferView;
