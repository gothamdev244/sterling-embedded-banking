import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import { 
  Flight as Plane,
  LocationOn as MapPin,
  CalendarToday as Calendar,
  Security as Shield,
  CreditCard,
  Public as Globe,
  CheckCircle,
  Error as AlertCircle,
  AccessTime as Clock,
  Add as Plus,
  Delete as Trash2,
  Phone,
  Description as FileText,
  Business as Building,
  Info,
  Navigation
} from '@mui/icons-material';

const TravelNotificationView = ({ context, onKMSOpen }) => {
  const [actions, setActions] = useState([
    { id: 1, label: 'Destination Verification', status: 'completed', description: 'Travel destinations confirmed' },
    { id: 2, label: 'Card Services Setup', status: 'in_progress', description: 'Configuring international access' },
    { id: 3, label: 'Travel Alerts', status: 'pending', description: 'Setting up monitoring' },
    { id: 4, label: 'Confirmation', status: 'pending', description: 'Ready to activate' }
  ]);

  const [travelPlans, setTravelPlans] = useState([
    {
      id: 1,
      country: 'Japan',
      cities: ['Tokyo', 'Osaka'],
      startDate: '2025-01-20',
      endDate: '2025-02-05',
      purpose: 'Business',
      status: 'active'
    },
    {
      id: 2,
      country: 'Singapore',
      cities: ['Singapore'],
      startDate: '2025-02-15',
      endDate: '2025-02-22',
      purpose: 'Leisure',
      status: 'pending'
    }
  ]);

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

  const activeCards = [
    {
      type: 'HSBC Premier World Elite Mastercard',
      lastFour: '4521',
      status: 'Active',
      travelBenefits: ['No foreign transaction fees', 'Airport lounge access', 'Travel insurance'],
      dailyLimit: 1000,
      monthlyLimit: 30000
    },
    {
      type: 'HSBC Premier Debit Card',
      lastFour: '7834',
      status: 'Active',
      travelBenefits: ['ATM fee rebates worldwide', 'Emergency cash advance'],
      dailyLimit: 500,
      monthlyLimit: 15000
    }
  ];

  const countryInfo = {
    'Japan': {
      riskLevel: 'Low',
      currency: 'JPY',
      timeZone: 'JST (GMT+9)',
      hsbc: 'HSBC branches available',
      tips: 'Cash is commonly used. ATMs widely available.',
      emergencyNumber: '+81-3-5411-4111'
    },
    'Singapore': {
      riskLevel: 'Very Low',
      currency: 'SGD',
      timeZone: 'SGT (GMT+8)',
      hsbc: 'HSBC Singapore offices available',
      tips: 'Cards widely accepted. CCAASless payments common.',
      emergencyNumber: '+65-6227-5233'
    }
  };

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleActivateTravelNotification = () => {
    updateActionStatus(2, 'completed', 'International card access enabled');
    updateActionStatus(3, 'in_progress', 'Setting up destination alerts');
    
    setTimeout(() => {
      updateActionStatus(3, 'completed', 'Travel monitoring active');
      updateActionStatus(4, 'completed', 'All services activated');
    }, 2000);
  };

  const addTravelDestination = () => {
    const newDestination = {
      id: Date.now(),
      country: '',
      cities: [],
      startDate: '',
      endDate: '',
      purpose: 'Leisure',
      status: 'pending'
    };
    setTravelPlans(prev => [...prev, newDestination]);
  };

  const removeTravelDestination = (id) => {
    setTravelPlans(prev => prev.filter(plan => plan.id !== id));
  };

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Travel Notification Service</h1>
            <p className="text-sm text-gray-600 mt-1">International Card Services • Security Alerts</p>
          </div>
          <Badge variant="outline" className="text-xs">
            TRV-2025-5291
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Travel Plans */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Travel Itinerary
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={addTravelDestination}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Destination
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {travelPlans.map((plan, idx) => (
                  <div key={plan.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{plan.country || 'New Destination'}</h4>
                          <p className="text-sm text-gray-600">
                            {plan.cities.length > 0 ? plan.cities.join(', ') : 'Cities not specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline"
                          className={plan.status === 'active' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }
                        >
                          {plan.status === 'active' ? 'Active' : 'Pending'}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => removeTravelDestination(plan.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Travel Dates</p>
                        <p className="font-medium">
                          {plan.startDate && plan.endDate 
                            ? `${plan.startDate} to ${plan.endDate}`
                            : 'Dates not set'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Purpose</p>
                        <p className="font-medium">{plan.purpose}</p>
                      </div>
                    </div>

                    {plan.country && countryInfo[plan.country] && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-blue-900 font-medium">Risk Level: {countryInfo[plan.country].riskLevel}</p>
                            <p className="text-blue-700">Currency: {countryInfo[plan.country].currency}</p>
                          </div>
                          <div>
                            <p className="text-blue-900 font-medium">{countryInfo[plan.country].hsbc}</p>
                            <p className="text-blue-700">Emergency: {countryInfo[plan.country].emergencyNumber}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card Services */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Travel Card Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {activeCards.map((card, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{card.type}</h4>
                        <p className="text-sm text-gray-600">**** **** **** {card.lastFour}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {card.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Daily Limit</p>
                        <p className="font-medium">£{card.dailyLimit.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Limit</p>
                        <p className="font-medium">£{card.monthlyLimit.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 font-medium">Travel Benefits:</p>
                      {card.travelBenefits.map((benefit, benefitIdx) => (
                        <div key={benefitIdx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-600" />
                  <p className="text-sm text-gray-900 font-medium">Enhanced Security Active</p>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Real-time transaction monitoring for international purchases
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Travel Alerts & Monitoring */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Travel Alerts & Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-green-900">Fraud Protection</p>
                    <p className="text-xs text-green-700">24/7 monitoring active</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-blue-900">Emergency Support</p>
                    <p className="text-xs text-blue-700">Global assistance hotline</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Notification Preferences</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">SMS alerts for international transactions</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Email notifications for large purchases</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Mobile app push notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Information */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency CCAASs & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">UK Emergency Line</h4>
                  <p className="font-mono text-lg">+44 1442 422 929</p>
                  <p className="text-xs text-gray-600">24/7 card support and emergency cash</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">International Collect</h4>
                  <p className="font-mono text-lg">+44 1442 422 929</p>
                  <p className="text-xs text-gray-600">Call collect from abroad</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-900">Travel Safety Reminder</p>
                    <p className="text-amber-700 mt-1">
                      Keep emergency ccaas numbers saved separately from your devices. 
                      Inform family/colleagues of your travel plans.
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

          {/* Quick Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Travel Services</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleActivateTravelNotification}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Activate Travel Notification
              </Button>
              <Button variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Increase Limits
              </Button>
              <Button variant="outline" className="w-full">
                <Globe className="h-4 w-4 mr-2" />
                Currency Exchange
              </Button>
            </CardContent>
          </Card>

          {/* Travel Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Travel Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Destinations</span>
                <span className="font-medium">{travelPlans.filter(p => p.status === 'active').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cards Enabled</span>
                <span className="font-medium">{activeCards.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fraud Protection</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Emergency Support</span>
                <Badge className="bg-blue-100 text-blue-800">24/7</Badge>
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
                onClick={() => onKMSOpen('TRAVEL_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Travel Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('COUNTRY_INFO')}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Country Information
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('EMERGENCY_SUPPORT')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelNotificationView;
