import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import { 
  Repeat as RepeatIcon,
  CalendarToday as Calendar,
  AttachMoney as DollarSign,
  ArrowForward as ArrowRight,
  CheckCircle,
  Error as AlertCircle,
  AccessTime as Clock,
  Business as Building,
  CreditCard,
  Edit,
  Delete as Trash2,
  Add as Plus,
  Pause,
  PlayArrow as Play,
  Description as FileText,
  Calculate as Calculator,
  Phone,
  Group as Users,
  Info
} from '@mui/icons-material';

const StandingOrderView = ({ context, onKMSOpen }) => {
  const [actions, setActions] = useState([
    { id: 1, label: 'Account Verification', status: 'completed', description: 'Source account confirmed' },
    { id: 2, label: 'Beneficiary Setup', status: 'in_progress', description: 'Validating recipient details' },
    { id: 3, label: 'Standing Order Creation', status: 'pending', description: 'Ready to establish' },
    { id: 4, label: 'Confirmation', status: 'pending', description: 'First payment scheduled' }
  ]);

  const [newOrder, setNewOrder] = useState({
    recipient: '',
    amount: 500,
    frequency: 'monthly',
    startDate: '2025-02-01',
    endDate: '',
    reference: 'Monthly Transfer'
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

  const existingOrders = [
    {
      id: 1,
      recipient: 'Landlord Property Management',
      accountNumber: '12-34-56 78901234',
      amount: 1200,
      frequency: 'monthly',
      nextPayment: '2025-01-01',
      status: 'active',
      reference: 'Rent Payment',
      totalPaid: 14400,
      startDate: '2024-01-01'
    },
    {
      id: 2,
      recipient: 'Thames Water',
      accountNumber: '20-45-67 89012345',
      amount: 85,
      frequency: 'monthly',
      nextPayment: '2025-01-15',
      status: 'active',
      reference: 'Water Bill',
      totalPaid: 1020,
      startDate: '2024-01-15'
    },
    {
      id: 3,
      recipient: 'Gym Membership Direct',
      accountNumber: '30-67-89 90123456',
      amount: 45,
      frequency: 'monthly',
      nextPayment: '2025-01-10',
      status: 'paused',
      reference: 'Gym Membership',
      totalPaid: 405,
      startDate: '2024-02-10'
    },
    {
      id: 4,
      recipient: 'Sarah Green',
      accountNumber: '40-78-90 01234567',
      amount: 300,
      frequency: 'monthly',
      nextPayment: '2025-01-05',
      status: 'active',
      reference: 'Family Support',
      totalPaid: 3600,
      startDate: '2024-01-05'
    }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly', description: 'Every 7 days' },
    { value: 'monthly', label: 'Monthly', description: 'Same date each month' },
    { value: 'quarterly', label: 'Quarterly', description: 'Every 3 months' },
    { value: 'annually', label: 'Annually', description: 'Once per year' }
  ];

  const recentBeneficiaries = [
    { name: 'Mobile Phone Company', account: '50-89-01 12345678' },
    { name: 'Energy Supplier', account: '60-90-12 23456789' },
    { name: 'Insurance Company', account: '70-01-23 34567890' },
    { name: 'John Smith', account: '80-12-34 45678901' }
  ];

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleCreateStandingOrder = () => {
    updateActionStatus(2, 'completed', 'Beneficiary details verified');
    updateActionStatus(3, 'in_progress', 'Creating standing order...');
    
    setTimeout(() => {
      updateActionStatus(3, 'completed', 'Standing order established');
      updateActionStatus(4, 'completed', 'First payment scheduled successfully');
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateAnnualTotal = () => {
    return existingOrders
      .filter(order => order.status === 'active')
      .reduce((total, order) => {
        const multiplier = order.frequency === 'monthly' ? 12 : 
                          order.frequency === 'weekly' ? 52 : 
                          order.frequency === 'quarterly' ? 4 : 1;
        return total + (order.amount * multiplier);
      }, 0);
  };

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Standing Order Management</h1>
            <p className="text-sm text-gray-600 mt-1">Automated Payments • Recurring Transfers</p>
          </div>
          <Badge variant="outline" className="text-xs">
            STO-2025-6182
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Existing Standing Orders */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <RepeatIcon className="h-4 w-4" />
                  Active Standing Orders
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  New Order
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {existingOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{order.recipient}</h4>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Account: {order.accountNumber}</p>
                        <p className="text-sm text-gray-600">Reference: {order.reference}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">£{order.amount}</p>
                        <p className="text-sm text-gray-600 capitalize">{order.frequency}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Next Payment</p>
                        <p className="font-medium">{order.nextPayment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Paid</p>
                        <p className="font-medium text-green-600">£{order.totalPaid.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'active' ? (
                        <Button size="sm" variant="outline">
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-900 font-medium">Annual Standing Order Total</p>
                    <p className="text-xs text-blue-700">Based on active orders</p>
                  </div>
                  <p className="text-lg font-semibold text-blue-900">
                    £{calculateAnnualTotal().toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create New Standing Order */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Standing Order
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Recipient Name</label>
                    <input 
                      type="text"
                      value={newOrder.recipient}
                      onChange={(e) => setNewOrder({...newOrder, recipient: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border rounded-lg"
                      placeholder="Enter recipient name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Amount</label>
                    <div className="mt-1 flex items-center">
                      <span className="px-3 py-2 bg-gray-50 border border-r-0 rounded-l-lg">£</span>
                      <input 
                        type="number"
                        value={newOrder.amount}
                        onChange={(e) => setNewOrder({...newOrder, amount: e.target.value})}
                        className="w-full px-3 py-2 border rounded-r-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Frequency</label>
                    <select 
                      value={newOrder.frequency}
                      onChange={(e) => setNewOrder({...newOrder, frequency: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border rounded-lg"
                    >
                      {frequencyOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label} - {option.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Start Date</label>
                    <input 
                      type="date"
                      value={newOrder.startDate}
                      onChange={(e) => setNewOrder({...newOrder, startDate: e.target.value})}
                      className="mt-1 w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Payment Reference</label>
                  <input 
                    type="text"
                    value={newOrder.reference}
                    onChange={(e) => setNewOrder({...newOrder, reference: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border rounded-lg"
                    placeholder="Payment reference (optional)"
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Recent Beneficiaries</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {recentBeneficiaries.map((beneficiary, idx) => (
                      <button
                        key={idx}
                        className="p-2 text-left border rounded hover:bg-white transition-colors"
                        onClick={() => setNewOrder({...newOrder, recipient: beneficiary.name})}
                      >
                        <p className="text-sm font-medium">{beneficiary.name}</p>
                        <p className="text-xs text-gray-600">{beneficiary.account}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Preview */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Payment Schedule Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{newOrder.recipient || 'New Recipient'}</p>
                      <p className="text-sm text-gray-600">£{newOrder.amount} - {newOrder.frequency}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-blue-50 rounded text-center">
                    <p className="text-xs text-gray-600">First Payment</p>
                    <p className="font-medium text-blue-900">{newOrder.startDate}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded text-center">
                    <p className="text-xs text-gray-600">Monthly Amount</p>
                    <p className="font-medium text-green-900">£{newOrder.amount}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded text-center">
                    <p className="text-xs text-gray-600">Annual Total</p>
                    <p className="font-medium text-purple-900">
                      £{(newOrder.amount * (newOrder.frequency === 'monthly' ? 12 : 1)).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-900">Standing Order Information</p>
                      <p className="text-amber-700 mt-1">
                        Payments will be automatically debited from your account on the scheduled dates. 
                        You can modify or cancel at any time through online banking.
                      </p>
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

          {/* Setup Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Setup Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleCreateStandingOrder}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Standing Order
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

          {/* Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Orders</span>
                <span className="font-medium">{existingOrders.filter(o => o.status === 'active').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Outgoing</span>
                <span className="font-medium">£{existingOrders.filter(o => o.status === 'active' && o.frequency === 'monthly').reduce((sum, o) => sum + o.amount, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Balance</span>
                <span className="font-medium text-green-600">£8,420</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Funds</span>
                <span className="font-medium">£7,785</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Dates */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              {existingOrders
                .filter(order => order.status === 'active')
                .sort((a, b) => new Date(a.nextPayment) - new Date(b.nextPayment))
                .slice(0, 4)
                .map((order, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">{order.recipient}</p>
                      <p className="text-xs text-gray-600">{order.nextPayment}</p>
                    </div>
                    <p className="font-medium">£{order.amount}</p>
                  </div>
                ))}
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
                onClick={() => onKMSOpen('STANDING_ORDER_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Standing Order Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('PAYMENT_LIMITS')}
              >
                <RepeatIcon className="h-4 w-4 mr-2" />
                Payment Limits
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('SUPPORT_CONTACT')}
              >
                <Phone className="h-4 w-4 mr-2" />
                CCAAS Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StandingOrderView;
