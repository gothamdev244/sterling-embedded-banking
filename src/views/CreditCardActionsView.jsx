import React, { useState } from 'react';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionButton from '../components/actions/ActionButton';
import ActionProgress from '../components/actions/ActionProgress';
import ActionForm from '../components/actions/ActionForm';
import AppHeader from '../components/shared/AppHeader';
import CustomerSearchCard from '../components/shared/CustomerSearchCard';
import QuickActionGrid from '../components/shared/QuickActionGrid';
import { 
  CreditCard,
  Lock,
  LockOpen as Unlock,
  Refresh as RefreshCw,
  TrendingUp,
  Security as Shield,
  Public as Globe,
  Flight as Plane,
  AttachMoney as DollarSign,
  Settings,
  Warning as AlertTriangle,
  Phone,
  Description as FileText,
  CalendarToday as Calendar,
  LocationOn as MapPin,
  Timeline as Activity,
  CheckCircle,
  Info
} from '@mui/icons-material';

const CreditCardActionsView = ({ context, onKMSOpen }) => {
  // Check if we're in manual mode (no customer context)
  const isManualMode = !context?.customerId;
  const [actions, setActions] = useState([
    { id: 1, label: 'Card Security Status', status: 'completed', description: 'Card is currently active' },
    { id: 2, label: 'Transaction Limits', status: 'pending', description: 'Review and update limits' },
    { id: 3, label: 'Travel Settings', status: 'pending', description: 'Configure international usage' }
  ]);

  const [cardLocked, setCardLocked] = useState(false);
  const [selectedLimitType, setSelectedLimitType] = useState('');
  const [travelDates, setTravelDates] = useState({ start: '', end: '' });

  const handleCustomerSearch = (searchData) => {
    console.log('Customer search:', searchData)
    // In a real app, this would trigger a search API call
    // For now, we'll just log it
    alert(`Searching for ${searchData.type}: ${searchData.value}`)
  }

  const handleQuickAction = (action) => {
    console.log('Quick action selected:', action)
    // Handle the action based on its ID
    switch(action.action) {
      case 'card-types':
        // Navigate to card types view
        break
      case 'application-status':
        // Navigate to application status
        break
      case 'security-guide':
        // Open security guidelines
        if (onKMSOpen) {
          onKMSOpen('KMS-SECURITY-001')
        }
        break
      case 'fee-schedule':
        // Show fee information
        break
      case 'benefits':
        // Show card benefits
        break
      case 'report-lost':
        // Start lost card flow
        break
      default:
        console.log('Unknown action:', action.action)
    }
  }

  // Manual Mode View - When no customer is connected
  if (isManualMode) {
    const quickActions = [
      {
        id: 'card-types',
        icon: CreditCard,
        label: 'Card Products',
        description: 'View available credit card types and features',
        action: 'card-types',
        badge: 'popular',
        stats: [
          { label: 'Card Types', value: '12' },
          { label: 'Premium Cards', value: '4' }
        ]
      },
      {
        id: 'application-status',
        icon: FileText,
        label: 'Application Status',
        description: 'Check credit card application progress',
        action: 'application-status',
        actionText: 'Check Status'
      },
      {
        id: 'security-guide',
        icon: Shield,
        label: 'Security Guidelines',
        description: 'Card security best practices and fraud prevention',
        action: 'security-guide',
        badge: 'recommended'
      },
      {
        id: 'fee-schedule',
        icon: DollarSign,
        label: 'Fees & Charges',
        description: 'View current fee structure and charges',
        action: 'fee-schedule'
      },
      {
        id: 'benefits',
        icon: TrendingUp,
        label: 'Card Benefits',
        description: 'Rewards, cashback, and exclusive offers',
        action: 'benefits',
        badge: 'new'
      },
      {
        id: 'report-lost',
        icon: AlertTriangle,
        label: 'Report Lost Card',
        description: 'Emergency card blocking and replacement',
        action: 'report-lost',
        actionText: 'Report Now'
      }
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Professional App Header */}
        <AppHeader
          title="Credit Card Management Portal"
          icon={CreditCard}
          description="Comprehensive credit card services and account management platform"
        />
        
        {/* Customer Search Section */}
        <CustomerSearchCard
          searchFields={['Card Number', 'Customer ID', 'Account Number', 'Name']}
          onSearch={handleCustomerSearch}
          title="Customer Verification"
          description="Enter customer details to access account-specific credit card services"
        />
        
        {/* Quick Actions Grid */}
        <QuickActionGrid
          title="Self-Service Options"
          description="Available services without customer authentication"
          actions={quickActions}
          columns={3}
          onActionClick={handleQuickAction}
        />
        
        {/* Information Footer */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Service Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Full account access requires customer authentication</li>
              <li>• Emergency card services available 24/7</li>
              <li>• For immediate assistance, ccaas: +44 3457 404 404</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Context Mode View - Original detailed view when customer is connected
  const customer = {
    name: context?.customerName || 'James Smith',
    accountNumber: context?.accountNumber || 'ACC-789012',
    phoneNumber: context?.phone || '+44 7700 900123',
    email: context?.email || 'james.smith@email.com',
    address: context?.location || 'London, UK',
    accountType: context?.accountType || context?.customerTier || 'Premier',
    riskLevel: 'low',
    verificationStatus: 'verified'
  };

  const cardDetails = {
    number: '•••• •••• •••• 4521',
    type: 'HSBC Premier World Elite',
    status: cardLocked ? 'Temporarily Locked' : 'Active',
    expiryDate: '08/2026',
    creditLimit: 15000,
    availableCredit: 8750,
    currentBalance: 6250,
    lastTransaction: '2 hours ago'
  };

  const currentLimits = {
    daily: { atm: 500, purchase: 2500, online: 1500 },
    monthly: { total: 15000, international: 5000 }
  };

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleLockCard = async () => {
    updateActionStatus(1, 'in-progress', 'Processing card lock request...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCardLocked(true);
    updateActionStatus(1, 'completed', 'Card has been temporarily locked');
    return Promise.resolve();
  };

  const handleUnlockCard = async () => {
    updateActionStatus(1, 'in-progress', 'Processing card unlock request...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCardLocked(false);
    updateActionStatus(1, 'completed', 'Card has been unlocked successfully');
    return Promise.resolve();
  };

  const handleUpdateLimit = async (limitType, newValue) => {
    updateActionStatus(2, 'in-progress', `Updating ${limitType} limit...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateActionStatus(2, 'completed', `${limitType} limit updated to £${newValue}`);
    return Promise.resolve();
  };

  const handleSetTravelNotification = async () => {
    if (!travelDates.start || !travelDates.end) {
      throw new Error('Please select travel dates');
    }
    updateActionStatus(3, 'in-progress', 'Setting travel notification...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateActionStatus(3, 'completed', `Travel notification set from ${travelDates.start} to ${travelDates.end}`);
    return Promise.resolve();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Professional Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Credit Card Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage card settings, security, and limits</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
              REF: CC-2025-4521
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Customer Context */}
        <CustomerContext customer={customer} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Card Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card Status & Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  Card Status & Security
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Card Number</span>
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="font-mono font-semibold text-gray-900">{cardDetails.number}</p>
                    <p className="text-xs text-gray-500 mt-1">{cardDetails.type}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Status</span>
                      <Shield className="h-4 w-4 text-gray-400" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${
                      cardLocked ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {cardDetails.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Last used: {cardDetails.lastTransaction}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {!cardLocked ? (
                    <ActionButton
                      label="Lock Card Temporarily"
                      onClick={handleLockCard}
                      variant="destructive"
                      icon={Lock}
                      requiresConfirmation={true}
                      confirmationMessage="Lock your card immediately? This will block all transactions."
                      successMessage="Card locked successfully"
                      className="w-full"
                    />
                  ) : (
                    <ActionButton
                      label="Unlock Card"
                      onClick={handleUnlockCard}
                      variant="default"
                      icon={Unlock}
                      requiresConfirmation={true}
                      confirmationMessage="Unlock your card to resume all transactions?"
                      successMessage="Card unlocked successfully"
                      className="w-full"
                    />
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton
                      label="Report Lost/Stolen"
                      onClick={() => onKMSOpen('CARD_LOST_STOLEN')}
                      variant="outline"
                      icon={AlertTriangle}
                      successMessage="Report initiated"
                    />
                    <ActionButton
                      label="Replace Card"
                      onClick={() => onKMSOpen('CARD_REPLACEMENT')}
                      variant="outline"
                      icon={RefreshCw}
                      successMessage="Replacement requested"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Limits */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Transaction Limits</h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-700">Daily Limits</h4>
                      {Object.entries(currentLimits.daily).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{key}</p>
                            <p className="text-sm text-gray-600">Current: £{value}</p>
                          </div>
                          <button
                            onClick={() => setSelectedLimitType(key)}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            Modify
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-700">Monthly Limits</h4>
                      {Object.entries(currentLimits.monthly).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{key}</p>
                            <p className="text-sm text-gray-600">Current: £{value}</p>
                          </div>
                          <button
                            onClick={() => setSelectedLimitType(key)}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            Modify
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedLimitType && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">Update {selectedLimitType} limit:</p>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="New limit amount"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 focus:outline-none"
                          id={`limit-${selectedLimitType}`}
                        />
                        <ActionButton
                          label="Update"
                          onClick={() => {
                            const input = document.getElementById(`limit-${selectedLimitType}`);
                            return handleUpdateLimit(selectedLimitType, input.value);
                          }}
                          variant="default"
                          icon={TrendingUp}
                          successMessage="Limit updated successfully"
                        />
                        <ActionButton
                          label="Cancel"
                          onClick={() => setSelectedLimitType('')}
                          variant="outline"
                          successMessage=""
                          showSuccessMessage={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Travel & International Settings */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Travel & International Usage</h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">International Usage Status</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Card is currently enabled for international transactions
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-700">Set Travel Notification</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={travelDates.start}
                          onChange={(e) => setTravelDates(prev => ({ ...prev, start: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">End Date</label>
                        <input
                          type="date"
                          value={travelDates.end}
                          onChange={(e) => setTravelDates(prev => ({ ...prev, end: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <ActionButton
                      label="Set Travel Notification"
                      onClick={handleSetTravelNotification}
                      variant="default"
                      icon={Plane}
                      successMessage="Travel notification set successfully"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton
                      label="Disable International"
                      onClick={() => Promise.resolve()}
                      variant="outline"
                      icon={Globe}
                      requiresConfirmation={true}
                      confirmationMessage="Disable international usage? You won't be able to use your card abroad."
                      successMessage="International usage disabled"
                    />
                    <ActionButton
                      label="Set Allowed Countries"
                      onClick={() => onKMSOpen('COUNTRY_SETTINGS')}
                      variant="outline"
                      icon={MapPin}
                      successMessage="Country settings opened"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Additional Card Services</h3>
              </div>
              <div className="px-6 py-4 space-y-3">
                <ActionButton
                  label="Request Credit Limit Increase"
                  onClick={() => onKMSOpen('CREDIT_LIMIT_INCREASE')}
                  variant="outline"
                  icon={TrendingUp}
                  successMessage="Credit limit request initiated"
                  className="w-full justify-start"
                />
                <ActionButton
                  label="Set Up Auto-Pay"
                  onClick={() => onKMSOpen('AUTO_PAY_SETUP')}
                  variant="outline"
                  icon={RefreshCw}
                  successMessage="Auto-pay setup opened"
                  className="w-full justify-start"
                />
                <ActionButton
                  label="Add Authorized User"
                  onClick={() => onKMSOpen('AUTHORIZED_USER')}
                  variant="outline"
                  icon={Phone}
                  successMessage="Authorized user form opened"
                  className="w-full justify-start"
                />
                <ActionButton
                  label="Request PIN Reset"
                  onClick={() => onKMSOpen('PIN_RESET')}
                  variant="outline"
                  icon={Lock}
                  successMessage="PIN reset initiated"
                  className="w-full justify-start"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Card Info & Progress */}
          <div className="space-y-6">
            {/* Card Summary */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Card Summary</h3>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Credit Limit</span>
                  <span className="font-semibold text-gray-900">£{cardDetails.creditLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available Credit</span>
                  <span className="font-semibold text-green-700">£{cardDetails.availableCredit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Balance</span>
                  <span className="font-semibold text-gray-900">£{cardDetails.currentBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expiry Date</span>
                  <span className="font-semibold text-gray-900">{cardDetails.expiryDate}</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-600 h-2 rounded-full"
                      style={{ width: `${(cardDetails.currentBalance / cardDetails.creditLimit) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {Math.round((cardDetails.currentBalance / cardDetails.creditLimit) * 100)}% of credit used
                  </p>
                </div>
              </div>
            </div>

            {/* Action Progress */}
            <ActionProgress actions={actions} />

            {/* Quick Resources */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
              </div>
              <div className="px-6 py-4 space-y-2">
                <button 
                  onClick={() => onKMSOpen('CARD_SECURITY_GUIDE')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Shield className="inline h-4 w-4 mr-2" />
                  Card Security Guide
                </button>
                <button 
                  onClick={() => onKMSOpen('DISPUTE_TRANSACTION')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <AlertTriangle className="inline h-4 w-4 mr-2" />
                  Dispute a Transaction
                </button>
                <button 
                  onClick={() => onKMSOpen('REWARDS_PROGRAM')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Activity className="inline h-4 w-4 mr-2" />
                  Rewards Program
                </button>
                <button 
                  onClick={() => onKMSOpen('STATEMENT_REQUEST')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <FileText className="inline h-4 w-4 mr-2" />
                  Request Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardActionsView;
