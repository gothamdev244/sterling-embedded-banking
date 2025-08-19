import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import { 
  Home,
  Send,
  Euro,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calculator,
  ArrowRight,
  Building,
  CreditCard,
  Info,
  RefreshCw,
  MapPin,
  Scale
} from 'lucide-react';

const PropertyTransferView = ({ context, onKMSOpen }) => {
  const [actions, setActions] = useState([
    { id: 1, label: 'Property Due Diligence', status: 'completed', description: 'Legal documentation verified' },
    { id: 2, label: 'Exchange Rate Lock', status: 'completed', description: 'Premier rate secured' },
    { id: 3, label: 'Transfer Processing', status: 'pending', description: 'Ready to initiate' },
    { id: 4, label: 'Legal Coordination', status: 'pending', description: 'Solicitor notification' }
  ]);

  const [transferData, setTransferData] = useState({
    amount: 350000,
    currency: 'EUR',
    targetCurrency: 'EUR',
    recipient: '',
    purpose: 'property_purchase',
    urgency: 'same_day'
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

  const exchangeRates = {
    current: 1.18,
    bankRate: 1.15,
    premierRate: 1.18,
    savings: 10500  // Significant savings on €350K transfer
  };

  const propertyDetails = {
    address: 'Mitte District, Berlin, Germany',
    type: 'Residential Apartment',
    value: '€350,000',
    solicitor: 'Weber & Associates Legal, Berlin',
    completionDate: '2025-02-15',
    reference: 'PROP-BER-2025-891'
  };

  const recipientDetails = {
    name: 'Weber & Associates Client Account',
    bank: 'Deutsche Bank AG',
    accountNumber: 'DE89 3704 0044 0532 0130 00',
    swiftCode: 'DEUTDEFF',
    country: 'Germany',
    purpose: 'Berlin Property Purchase - Completion Payment'
  };

  const complianceChecks = [
    { check: 'Anti-Money Laundering', status: 'passed', icon: CheckCircle },
    { check: 'Source of Funds Verified', status: 'passed', icon: CheckCircle },
    { check: 'Property Due Diligence', status: 'verified', icon: CheckCircle },
    { check: 'Legal Documentation', status: 'verified', icon: CheckCircle }
  ];

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const calculateTransferAmount = () => {
    return (transferData.amount * exchangeRates.premierRate).toFixed(0);
  };

  const handleInitiateTransfer = () => {
    updateActionStatus(2, 'completed', 'Premier rate locked at 1.18');
    updateActionStatus(3, 'in_progress', 'Processing €350K property transfer...');
    
    setTimeout(() => {
      updateActionStatus(3, 'completed', 'Transfer sent to Berlin solicitor');
      updateActionStatus(4, 'completed', 'Property completion coordinated');
    }, 3500);
  };

  const handleScheduleLegalCoordination = () => {
    alert('Legal coordination activated. Weber & Associates will be notified immediately upon transfer completion. Property completion scheduled for February 15th, 2025.');
  };

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Premier Property Transfer</h1>
            <p className="text-sm text-gray-600 mt-1">Berlin Property Purchase • €350,000 Completion Payment</p>
          </div>
          <Badge variant="outline" className="text-xs">
            REF: PROP-2025-3472
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Property Details */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Home className="h-4 w-4" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Property Location</label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg font-medium w-full">
                        {propertyDetails.address}
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">
                        <MapPin className="h-3 w-3 mr-1" />
                        Berlin
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Purchase Price</label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg font-semibold text-lg w-full">
                        {propertyDetails.value}
                      </div>
                      <Badge className="bg-green-100 text-green-800">EUR</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-amber-900 font-medium">Premier Banking Rate</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-amber-900">1 GBP = {exchangeRates.premierRate} EUR</p>
                      <p className="text-xs text-amber-700">Save £{(exchangeRates.savings).toLocaleString()} vs standard rate</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Property Type</label>
                    <select className="mt-1 w-full px-3 py-2 border rounded-lg" value="residential">
                      <option value="residential">Residential Apartment</option>
                      <option>Investment Property</option>
                      <option>Commercial Property</option>
                      <option>Land Purchase</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Completion Date</label>
                    <div className="mt-1 px-3 py-2 border rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">{propertyDetails.completionDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Coordination */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Legal Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">German Solicitor</p>
                  <p className="font-medium">{propertyDetails.solicitor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Property Reference</p>
                  <p className="font-mono text-sm">{propertyDetails.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recipient Account</p>
                  <p className="font-mono text-sm">{recipientDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bank</p>
                  <p className="font-medium">{recipientDetails.bank}</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900">Premier Property Service</p>
                    <p className="text-blue-700 mt-1">
                      Direct coordination with German solicitor for seamless property completion
                    </p>
                  </div>
                </div>
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

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-900">Premier Property Protection</p>
                    <p className="text-green-700 mt-1">
                      Full legal and financial protection for international property purchases
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Property Transfer Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleInitiateTransfer}
              >
                <Send className="h-4 w-4 mr-2" />
                Process €350K Property Transfer
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleScheduleLegalCoordination}>
                  <Scale className="h-4 w-4 mr-2" />
                  Coordinate with Solicitor
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Schedule Follow-up
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
                <span className="font-medium">{exchangeRates.premierRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer Fee</span>
                <span className="font-medium text-green-600">FREE (Premier)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Arrival</span>
                <span className="font-medium">Same Day</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Property Payment</span>
                  <span className="font-semibold text-lg">€{transferData.amount.toLocaleString()}</span>
                </div>
                <div className="mt-2 p-2 bg-amber-50 rounded text-xs text-amber-900">
                  💰 Premier Banking saves you £{exchangeRates.savings.toLocaleString()} vs standard rates
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Timeline */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Completion Timeline</CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="text-sm">
                    <p className="font-medium">Today</p>
                    <p className="text-gray-600">Transfer funds to solicitor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-medium">February 15, 2025</p>
                    <p className="text-gray-600">Property completion date</p>
                  </div>
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
                onClick={() => onKMSOpen('PROPERTY_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                International Property Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('LEGAL_SUPPORT')}
              >
                <Scale className="h-4 w-4 mr-2" />
                Legal Support Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyTransferView;
