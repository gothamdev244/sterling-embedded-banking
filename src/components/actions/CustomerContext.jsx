import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, Phone, Mail, MapPin, CreditCard, Building, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

const CustomerContext = ({ customer }) => {
  const {
    name = 'Customer',
    accountNumber = 'N/A',
    phoneNumber = 'N/A',
    email = 'N/A',
    address = 'N/A',
    accountType = 'Standard',
    riskLevel = 'low',
    verificationStatus = 'unverified'
  } = customer || {};

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'high': 
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': 
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'elevated':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default: 
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getVerificationBadgeClass = (status) => {
    return status === 'verified' 
      ? 'bg-green-50 text-green-700 border-green-200' 
      : 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500 font-mono">{accountNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getRiskBadgeClass(riskLevel)}`}>
              {riskLevel === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
              {riskLevel === 'elevated' && <Shield className="h-3 w-3 mr-1" />}
              {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getVerificationBadgeClass(verificationStatus)}`}>
              {verificationStatus === 'verified' && <CheckCircle className="h-3 w-3 mr-1" />}
              {verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{accountType}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerContext;
