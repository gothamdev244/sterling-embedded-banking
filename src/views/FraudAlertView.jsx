import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionButton from '../components/actions/ActionButton';
import ActionProgress from '../components/actions/ActionProgress';
import ActionForm from '../components/actions/ActionForm';
import AppHeader from '../components/shared/AppHeader';
import CustomerSearchCard from '../components/shared/CustomerSearchCard';
import QuickActionGrid from '../components/shared/QuickActionGrid';
import { 
  Security as Shield, 
  Lock, 
  Phone, 
  Email as Mail, 
  Block as Ban,
  Warning as AlertTriangle,
  CreditCard,
  Refresh as RefreshCw,
  VerifiedUser as UserCheck,
  Description as FileText,
  AttachMoney as DollarSign,
  LocationOn as MapPin,
  AccessTime as Clock,
  CheckCircle,
  ChevronRight,
  Visibility as Eye,
  Error as AlertCircle,
  TrendingUp
} from '@mui/icons-material';

const FraudAlertView = ({ context, onKMSOpen }) => {
  // Check if we're in manual mode (no customer context)
  const isManualMode = !context?.customerId;
  const [actions, setActions] = useState([
    { id: 1, label: 'Security Review', status: 'in-progress', description: 'Analyzing transaction patterns' },
    { id: 2, label: 'Customer Verification', status: 'pending', description: 'Awaiting identity confirmation' },
    { id: 3, label: 'Transaction Assessment', status: 'pending', description: 'Review flagged transactions' },
    { id: 4, label: 'Resolution', status: 'pending', description: 'Determine appropriate action' }
  ]);

  const [verificationComplete, setVerificationComplete] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState('analyzing');

  // Professional fraud alert data
  const fraudAlert = {
    caseId: 'SEC-2025-0112-4521',
    priority: 'HIGH',
    detectedAt: new Date().toISOString(),
    riskScore: 8.7,
    totalAmount: 3456.78,
    location: 'Moscow, Russia',
    cardNumber: '•••• •••• •••• 4521',
    cardType: 'Premier World Elite',
    anomalyType: 'Geographic Anomaly'
  };

  const customer = {
    name: context?.customerName || 'James Smith',
    accountNumber: context?.accountNumber || 'ACC-789012',
    phoneNumber: context?.phone || '+44 7700 900123',
    email: context?.email || 'james.smith@email.com',
    address: context?.location || 'London, UK',
    accountType: context?.accountType || context?.customerTier || 'Premier',
    riskLevel: 'elevated',
    verificationStatus: verificationComplete ? 'verified' : 'pending'
  };

  const suspiciousTransactions = [
    { 
      id: 'TXN-8847291',
      timestamp: '14:30:22',
      merchant: 'Online Merchant RU',
      amount: 1234.56,
      location: 'Moscow, Russia',
      riskIndicator: 'HIGH',
      anomaly: 'Unusual Geography'
    },
    { 
      id: 'TXN-8847292',
      timestamp: '14:28:15',
      merchant: 'Digital Exchange Platform',
      amount: 999.99,
      location: 'Unknown',
      riskIndicator: 'HIGH',
      anomaly: 'High-Risk Merchant'
    },
    { 
      id: 'TXN-8847293',
      timestamp: '14:25:07',
      merchant: 'Digital Goods Store',
      amount: 1222.23,
      location: 'Russia',
      riskIndicator: 'MEDIUM',
      anomaly: 'Velocity Pattern'
    }
  ];

  const riskMetrics = [
    { label: 'Geographic Risk', value: 92, status: 'critical' },
    { label: 'Velocity Risk', value: 78, status: 'high' },
    { label: 'Merchant Risk', value: 85, status: 'high' },
    { label: 'Amount Risk', value: 64, status: 'medium' }
  ];

  // Manual Mode View - When no customer is connected
  if (isManualMode) {
    const quickActions = [
      {
        id: 'active-alerts',
        icon: AlertTriangle,
        label: 'Active Alerts',
        description: 'View and manage current fraud alerts',
        badge: 'urgent',
        stats: [
          { label: 'Active', value: '12' },
          { label: 'Critical', value: '3' }
        ]
      },
      {
        id: 'blocked-cards',
        icon: Ban,
        label: 'Blocked Cards',
        description: 'Manage temporarily blocked cards',
        actionText: 'View All'
      },
      {
        id: 'security-check',
        icon: Shield,
        label: 'Security Check',
        description: 'Verify customer identity and transactions',
        badge: 'recommended'
      },
      {
        id: 'risk-patterns',
        icon: TrendingUp,
        label: 'Risk Patterns',
        description: 'Review common fraud patterns and trends'
      },
      {
        id: 'report-fraud',
        icon: FileText,
        label: 'Report Fraud',
        description: 'File a new fraud investigation case',
        badge: 'new',
        actionText: 'Start Report'
      },
      {
        id: 'security-guide',
        icon: UserCheck,
        label: 'Security Guidelines',
        description: 'Best practices for fraud prevention'
      }
    ]

    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          title="Fraud Alert Management"
          icon={Shield}
          description="Real-time fraud detection and prevention system"
        />
        
        <CustomerSearchCard
          searchFields={['Card Number', 'Customer ID', 'Case ID', 'Phone Number']}
          onSearch={(searchData) => console.log('Search:', searchData)}
          title="Security Verification"
          description="Enter customer or case details to investigate fraud alerts"
        />
        
        <QuickActionGrid
          title="Fraud Prevention Services"
          description="Quick access to security and fraud management tools"
          actions={quickActions}
          columns={3}
          onActionClick={(action) => {
            if (onKMSOpen && action.action === 'security-guide') {
              onKMSOpen('FRAUD-GUIDE-001')
            }
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-900 mb-2">Fraud Hotline</h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Report suspicious activity: +44 3457 125 563</li>
              <li>• 24/7 Fraud Support available</li>
              <li>• Average response time: Under 2 minutes</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleSecurityAction = async (actionType) => {
    updateActionStatus(1, 'in-progress', `Executing ${actionType}...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateActionStatus(1, 'completed', `${actionType} completed`);
    return Promise.resolve();
  };

  const handleCCAASCustomer = async () => {
    updateActionStatus(2, 'in-progress', 'Initiating customer ccaas...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateActionStatus(2, 'completed', 'Customer ccaased successfully');
    setVerificationComplete(true);
    return Promise.resolve();
  };

  const handleTransactionReview = async () => {
    if (selectedTransactions.length === 0) {
      throw new Error('Please select transactions to review');
    }
    updateActionStatus(3, 'in-progress', 'Analyzing selected transactions...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateActionStatus(3, 'completed', `${selectedTransactions.length} transactions reviewed`);
    setRiskAssessment('confirmed');
    return Promise.resolve();
  };

  const toggleTransaction = (txnId) => {
    setSelectedTransactions(prev => 
      prev.includes(txnId) 
        ? prev.filter(id => id !== txnId)
        : [...prev, txnId]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Security Alert Management</h1>
              <p className="text-sm text-gray-500 mt-1">Fraud Detection System • Case Analysis</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                {fraudAlert.caseId}
              </span>
              <div className="text-xs text-gray-500 mt-2">
                Priority: <span className="font-medium text-gray-700">{fraudAlert.priority}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-6">

        {/* Customer Context */}
        <CustomerContext customer={customer} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Risk Assessment Dashboard */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  Risk Assessment
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  Score: {fraudAlert.riskScore}/10
                </span>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {riskMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{metric.label}</span>
                      <span className={`text-sm font-semibold ${
                        metric.status === 'critical' ? 'text-red-600' :
                        metric.status === 'high' ? 'text-orange-600' :
                        'text-yellow-600'
                      }`}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          metric.status === 'critical' ? 'bg-red-500' :
                          metric.status === 'high' ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-900">Anomaly Detected</p>
                    <p className="text-amber-700 mt-1">
                      {fraudAlert.anomalyType} - Transactions from {fraudAlert.location} are inconsistent with customer's typical behavior pattern.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Investigation */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                Transaction Investigation
              </h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-2 mb-4">
                {suspiciousTransactions.map(txn => (
                  <div 
                    key={txn.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedTransactions.includes(txn.id) 
                        ? 'bg-blue-50 border-blue-300' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleTransaction(txn.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedTransactions.includes(txn.id)}
                          onChange={() => {}}
                          className="mt-1 rounded border-gray-300"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{txn.merchant}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                txn.riskIndicator === 'HIGH' 
                                  ? 'bg-red-50 text-red-700 border-red-200' 
                                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }`}
                            >
                              {txn.riskIndicator}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>{txn.timestamp}</span>
                            <span>{txn.location}</span>
                            <span className="text-gray-600">{txn.anomaly}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">£{txn.amount.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{txn.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <ActionButton
                  label="Flag as Fraudulent"
                  onClick={handleTransactionReview}
                  variant="destructive"
                  icon={AlertCircle}
                  disabled={selectedTransactions.length === 0}
                  requiresConfirmation={true}
                  confirmationMessage="Flag selected transactions as fraudulent? This action will block the card and initiate a security review."
                  successMessage="Transactions flagged successfully"
                />
                <ActionButton
                  label="Mark as Legitimate"
                  onClick={() => Promise.resolve()}
                  variant="outline"
                  icon={CheckCircle}
                  disabled={selectedTransactions.length === 0}
                  successMessage="Transactions marked as legitimate"
                />
              </div>
            </div>
          </div>

          {/* Security Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-500" />
                Security Actions
              </h3>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <ActionButton
                  label="Block Card"
                  onClick={() => handleSecurityAction('Card Block')}
                  variant="destructive"
                  icon={Ban}
                  requiresConfirmation={true}
                  confirmationMessage="Block the card immediately? This will prevent all transactions."
                  successMessage="Card blocked successfully"
                />
                <ActionButton
                  label="Temporary Hold"
                  onClick={() => handleSecurityAction('Temporary Hold')}
                  variant="outline"
                  icon={Lock}
                  requiresConfirmation={true}
                  confirmationMessage="Place a temporary hold on the card?"
                  successMessage="Temporary hold applied"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <ActionButton
                  label="Call Customer"
                  onClick={handleCCAASCustomer}
                  variant="default"
                  icon={Phone}
                  successMessage="Customer call initiated"
                />
                <ActionButton
                  label="Secure Message"
                  onClick={() => onKMSOpen('SECURE_MESSAGE')}
                  variant="outline"
                  icon={Mail}
                  successMessage="Secure message opened"
                />
              </div>

              <ActionButton
                label="Generate Fraud Report"
                onClick={() => onKMSOpen('FRAUD_REPORT')}
                variant="outline"
                icon={FileText}
                successMessage="Fraud report generated"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Case Progress */}
          <ActionProgress actions={actions} />

          {/* Quick Info */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-semibold text-gray-900">Case Details</h3>
            </div>
            <div className="px-6 py-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total at Risk</span>
                <span className="font-semibold">£{fraudAlert.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Card</span>
                <span className="font-mono text-xs">{fraudAlert.cardNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Detection Time</span>
                <span>{new Date(fraudAlert.detectedAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span>{fraudAlert.location}</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            </div>
            <div className="px-6 py-4 space-y-2">
              <button 
 
                className="w-full justify-start"
                onClick={() => onKMSOpen('FRAUD_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Fraud Investigation Guide
              </button>
              <button 
 
                className="w-full justify-start"
                onClick={() => onKMSOpen('SECURITY_PROTOCOL')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Security Protocols
              </button>
              <button 
 
                className="w-full justify-start"
                onClick={() => onKMSOpen('COMPLIANCE')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Compliance Requirements
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FraudAlertView;
