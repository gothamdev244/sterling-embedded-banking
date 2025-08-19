import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ActionButton from '../components/actions/ActionButton';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign,
  Lock,
  Shield,
  AlertCircle,
  Check,
  X,
  RefreshCw,
  Download,
  Settings,
  ChevronRight,
  Activity,
  ShoppingCart,
  Coffee,
  Plane,
  Fuel,
  Home,
  Smartphone
} from 'lucide-react';

const CreditCardView = ({ context, onKMSOpen }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [disputeProcessed, setDisputeProcessed] = useState(false);
  const [fraudProtectionActive, setFraudProtectionActive] = useState(false);

  const cardDetails = {
    number: '•••• •••• •••• 4521',
    holder: context.customerName || 'Jonathan Mitchell',
    type: 'HSBC Premier World Elite',
    expiryDate: '08/26',
    creditLimit: 15000,
    availableCredit: 12500,
    currentBalance: 2500,
    minimumPayment: 75.00,
    paymentDue: '2025-02-05',
    cashbackEarned: 142.75,
    rewardsPoints: 28450,
    cardStatus: 'TEMPORARILY BLOCKED',
    fraudAlert: true
  };

  const transactions = [
    { 
      id: 1, 
      date: '2025-01-12', 
      merchant: 'FRAUDULENT TRANSACTION', 
      category: 'DISPUTED',
      icon: AlertCircle,
      amount: -2500.00, 
      status: 'disputed',
      cashback: 0,
      fraudulent: true,
      location: 'Unknown Location'
    },
    { 
      id: 2, 
      date: '2025-01-11', 
      merchant: 'Tesco Express', 
      category: 'Groceries',
      icon: ShoppingCart,
      amount: -23.45, 
      status: 'completed',
      cashback: 0.47
    },
    { 
      id: 3, 
      date: '2025-01-10', 
      merchant: 'Shell Station London', 
      category: 'Fuel',
      icon: Fuel,
      amount: -65.00, 
      status: 'completed',
      cashback: 1.30
    },
    { 
      id: 4, 
      date: '2025-01-10', 
      merchant: 'Shell Station', 
      category: 'Fuel',
      icon: Fuel,
      amount: -75.00, 
      status: 'completed',
      cashback: 1.50
    },
    { 
      id: 5, 
      date: '2025-01-10', 
      merchant: 'Payment Received', 
      category: 'Payment',
      icon: Check,
      amount: 2000.00, 
      status: 'completed',
      cashback: 0
    },
    { 
      id: 6, 
      date: '2025-01-09', 
      merchant: 'Tesco', 
      category: 'Groceries',
      icon: ShoppingCart,
      amount: -145.23, 
      status: 'completed',
      cashback: 2.90
    },
    { 
      id: 7, 
      date: '2025-01-08', 
      merchant: 'Netflix', 
      category: 'Entertainment',
      icon: Smartphone,
      amount: -15.99, 
      status: 'completed',
      cashback: 0.32
    },
    { 
      id: 8, 
      date: '2025-01-08', 
      merchant: 'Council Tax', 
      category: 'Bills',
      icon: Home,
      amount: -250.00, 
      status: 'completed',
      cashback: 0
    }
  ];

  const monthlySpending = {
    total: 3428.71,
    previousMonth: 2945.23,
    change: 16.4,
    categories: [
      { name: 'Shopping', amount: 845.67, percentage: 25 },
      { name: 'Travel', amount: 1234.00, percentage: 36 },
      { name: 'Dining', amount: 423.50, percentage: 12 },
      { name: 'Bills', amount: 650.00, percentage: 19 },
      { name: 'Other', amount: 275.54, percentage: 8 }
    ]
  };

  const displayedTransactions = showAllTransactions ? transactions : transactions.slice(0, 4);

  const handleProcessDispute = () => {
    setDisputeProcessed(true);
    alert('Dispute processed successfully! £2,500 temporary credit applied. New card will arrive in 2 business days.');
  };

  const handleActivateFraudProtection = () => {
    setFraudProtectionActive(true);
    alert('Enhanced fraud protection activated! You will now receive real-time SMS and email alerts for all transactions over £500.');
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Credit Card Security Center</h1>
        <p className="text-gray-600 mt-1">Fraud Protection & Dispute Management</p>
        {cardDetails.fraudAlert && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Fraud Alert Active</p>
              <p className="text-sm text-red-700">£2,500 suspicious transaction blocked</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Visual */}
      <Card className="mb-6 bg-gradient-to-br from-red-600 to-red-700 text-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2">
              <CreditCard className="h-8 w-8" />
              <span className="text-lg font-semibold">HSBC</span>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              Premier World Elite
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-sm">Card Number</p>
              <p className="text-xl font-mono tracking-wider">{cardDetails.number}</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-white/80 text-sm">Card Holder</p>
                <p className="font-medium">{cardDetails.holder}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Expires</p>
                <p className="font-medium">{cardDetails.expiryDate}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-red-700 text-white border-red-500"
              disabled
            >
              <Lock className="h-4 w-4 mr-2" />
              Card Blocked
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 border-0"
            >
              <Shield className="h-4 w-4 mr-2" />
              Enhanced Fraud Protection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold">£{cardDetails.currentBalance.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Credit</p>
                <p className="text-2xl font-bold">£{cardDetails.availableCredit.toFixed(2)}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cashback Earned</p>
                <p className="text-2xl font-bold">£{cardDetails.cashbackEarned.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rewards Points</p>
                <p className="text-2xl font-bold">{cardDetails.rewardsPoints.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Due Alert */}
      <Card className="mb-6 border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium">Payment Due on {new Date(cardDetails.paymentDue).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-sm text-gray-600">Minimum payment: £{cardDetails.minimumPayment.toFixed(2)}</p>
              </div>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Make Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {displayedTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                      transaction.fraudulent ? 'border-2 border-red-300 bg-red-50' : ''
                    }`}
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.fraudulent ? 'bg-red-100' :
                        transaction.amount > 0 ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <transaction.icon className={`h-5 w-5 ${
                          transaction.fraudulent ? 'text-red-600' :
                          transaction.amount > 0 ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className={`font-medium ${transaction.fraudulent ? 'text-red-900' : ''}`}>
                          {transaction.merchant}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.date} • {transaction.category}
                          {transaction.location && ` • ${transaction.location}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.fraudulent ? 'text-red-900' :
                        transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      {transaction.cashback > 0 && (
                        <p className="text-xs text-green-600">+£{transaction.cashback.toFixed(2)} cashback</p>
                      )}
                      <Badge variant={
                        transaction.status === 'disputed' ? 'destructive' :
                        transaction.status === 'completed' ? 'default' : 'secondary'
                      } className="mt-1">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              {!showAllTransactions && transactions.length > 4 && (
                <Button 
                  variant="ghost" 
                  className="w-full mt-4"
                  onClick={() => setShowAllTransactions(true)}
                >
                  Show All Transactions
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Fraud Protection & Quick Actions */}
        <div className="space-y-6">
          {/* Fraud Protection Actions */}
          <Card className="border-red-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Fraud Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={handleProcessDispute}
                disabled={disputeProcessed}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                {disputeProcessed ? 'Dispute Processed ✓' : 'Process £2,500 Dispute'}
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-200 text-red-700 hover:bg-red-50"
                onClick={handleActivateFraudProtection}
                disabled={fraudProtectionActive}
              >
                <Shield className="h-4 w-4 mr-2" />
                {fraudProtectionActive ? 'Enhanced Protection Active ✓' : 'Activate Enhanced Protection'}
              </Button>
              <Button variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Request New Card
              </Button>
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm">
                  <p className="font-medium text-green-900">Premier Protection Benefits</p>
                  <p className="text-green-700 mt-1">• Zero liability for fraudulent transactions</p>
                  <p className="text-green-700">• Real-time transaction alerts</p>
                  <p className="text-green-700">• 24/7 fraud monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Monthly Spending */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Monthly Spending</CardTitle>
              <CardDescription>
                <span className={`flex items-center gap-1 ${monthlySpending.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {monthlySpending.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {Math.abs(monthlySpending.change)}% vs last month
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">£{monthlySpending.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Total this month</p>
                </div>
                
                <div className="space-y-2">
                  {monthlySpending.categories.map((category) => (
                    <div key={category.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{category.name}</span>
                        <span className="font-medium">£{category.amount.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onKMSOpen('CREDIT_LIMIT_INCREASE')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Request Credit Limit Increase
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onKMSOpen('DISPUTE_TRANSACTION')}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Dispute a Transaction
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onKMSOpen('TRAVEL_NOTIFICATION')}
                >
                  <Plane className="h-4 w-4 mr-2" />
                  Set Travel Notification
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onKMSOpen('REWARDS_REDEMPTION')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Redeem Rewards
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card Benefits */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Your Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">2% cashback on all purchases</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">No foreign transaction fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Travel insurance included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Purchase protection up to £10,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Airport lounge access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <ActionButton 
          primaryAction={{
            label: "Process Fraud Dispute",
            onClick: handleProcessDispute,
            icon: AlertCircle,
            disabled: disputeProcessed
          }}
          secondaryAction={{
            label: "Request New Card",
            onClick: () => console.log("Request new card")
          }}
        />
      </div>
    </div>
  );
};

export default CreditCardView;
