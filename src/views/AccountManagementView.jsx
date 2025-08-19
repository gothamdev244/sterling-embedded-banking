import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  User, 
  Shield, 
  Bell,
  CreditCard,
  Settings,
  FileText,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Globe,
  Download,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Building
} from 'lucide-react'

export default function AccountManagementView({ context, onKMSOpen }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    marketing: false,
    security: true
  })
  const [twoFactor, setTwoFactor] = useState(true)
  const [profileData, setProfileData] = useState({
    firstName: context?.customerName?.split(' ')[0] || 'John',
    lastName: context?.customerName?.split(' ')[1] || 'Smith',
    email: context?.email || 'john.smith@email.com',
    phone: context?.phone || '+44 7700 900123',
    address: '123 Banking Street',
    city: context?.location?.split(',')[0]?.trim() || 'London',
    postcode: 'SW1A 1AA',
    dateOfBirth: '1985-06-15'
  })

  const hasCustomerContext = !!(context?.customerId && context?.customerId !== '')
  const customerName = context?.customerName || 'Customer'

  // Mock account data
  const accountInfo = {
    accountNumber: context?.accountNumber || '12345678',
    sortCode: '12-34-56',
    accountType: context?.accountType || 'Current Account',
    openDate: '2018-03-15',
    branch: 'London Central Branch',
    relationshipManager: 'Sarah Johnson'
  }

  const securityEvents = [
    { type: 'Login', location: 'London, UK', date: '2024-10-15 14:30', status: 'Success' },
    { type: 'Password Change', location: 'London, UK', date: '2024-10-10 09:15', status: 'Success' },
    { type: 'Failed Login', location: 'Manchester, UK', date: '2024-10-08 18:45', status: 'Blocked' },
    { type: 'Mobile Login', location: 'London, UK', date: '2024-10-05 12:20', status: 'Success' }
  ]

  const documents = [
    { name: 'Monthly Statement - October 2024', type: 'Statement', date: '2024-10-01', size: '245 KB' },
    { name: 'Annual Summary 2024', type: 'Summary', date: '2024-09-30', size: '1.2 MB' },
    { name: 'Account Terms & Conditions', type: 'Terms', date: '2024-09-15', size: '890 KB' },
    { name: 'Transaction History - Q3 2024', type: 'History', date: '2024-09-30', size: '567 KB' }
  ]

  const accountSettings = [
    { 
      name: 'Overdraft Protection', 
      description: 'Automatic overdraft coverage',
      enabled: true,
      type: 'financial'
    },
    { 
      name: 'International Transactions', 
      description: 'Allow payments and withdrawals abroad',
      enabled: true,
      type: 'security'
    },
    { 
      name: 'CCAASless Payments', 
      description: 'Enable ccaasless card payments',
      enabled: true,
      type: 'convenience'
    },
    { 
      name: 'Online Banking', 
      description: 'Access to digital banking services',
      enabled: true,
      type: 'digital'
    },
    { 
      name: 'Mobile Banking App', 
      description: 'Access via mobile application',
      enabled: true,
      type: 'digital'
    },
    { 
      name: 'Paper Statements', 
      description: 'Receive monthly statements by post',
      enabled: false,
      type: 'communication'
    }
  ]

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (type, enabled) => {
    setNotifications(prev => ({ ...prev, [type]: enabled }))
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Blocked</Badge>
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDocumentIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'statement':
        return <FileText className="h-4 w-4 text-blue-600" />
      case 'summary':
        return <Calendar className="h-4 w-4 text-green-600" />
      case 'terms':
        return <Shield className="h-4 w-4 text-purple-600" />
      case 'history':
        return <Building className="h-4 w-4 text-orange-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
            <p className="text-sm text-gray-600">
              {hasCustomerContext ? `Account settings for ${customerName}` : 'Manage your account preferences and security settings'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onKMSOpen?.('account-help')}>
              <FileText className="h-4 w-4 mr-2" />
              Help Guide
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Address Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => handleProfileUpdate('address', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => handleProfileUpdate('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          value={profileData.postcode}
                          onChange={(e) => handleProfileUpdate('postcode', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        Update Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Account Summary Sidebar */}
              <div className="space-y-6">
                {hasCustomerContext && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-500">Account Number</Label>
                        <p className="font-medium">{accountInfo.accountNumber}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Sort Code</Label>
                        <p className="font-medium">{accountInfo.sortCode}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Account Type</Label>
                        <Badge variant="outline">{accountInfo.accountType}</Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Account Opened</Label>
                        <p className="text-sm">{accountInfo.openDate}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Branch</Label>
                        <p className="text-sm">{accountInfo.branch}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Relationship Manager</Label>
                        <p className="text-sm">{accountInfo.relationshipManager}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Order New Card
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Request Statement
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Update CCAAS Info
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Lock className="h-4 w-4 mr-2" />
                      Change PIN
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <Button className="w-full">
                      Update Password
                    </Button>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Switch
                        checked={twoFactor}
                        onCheckedChange={setTwoFactor}
                      />
                    </div>
                    
                    {twoFactor && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-900">2FA Enabled</span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          Using authenticator app on mobile device
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Recent Security Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {securityEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{event.type}</p>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Security Log
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Account alerts and statements</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Transaction alerts and security updates</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Mobile app notifications</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                        <p className="text-sm text-gray-600">Product offers and updates</p>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Security Alerts</h4>
                        <p className="text-sm text-gray-600">Login attempts and suspicious activity</p>
                      </div>
                      <Switch
                        checked={notifications.security}
                        onCheckedChange={(checked) => handleNotificationChange('security', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Communication Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="language">Preferred Language</Label>
                    <select
                      id="language"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Time Zone</Label>
                    <select
                      id="timezone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="GMT">GMT (London)</option>
                      <option value="CET">CET (Central Europe)</option>
                      <option value="EST">EST (Eastern Time)</option>
                      <option value="PST">PST (Pacific Time)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="currency">Display Currency</Label>
                    <select
                      id="currency"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="ccaas-preference">Preferred CCAAS Method</Label>
                    <select
                      id="ccaas-preference"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="sms">SMS</option>
                      <option value="post">Post</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Account Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        {getDocumentIcon(doc.type)}
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">{doc.date} • {doc.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Document Delivery Options</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Choose how you'd like to receive your account documents.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Set up Email Delivery
                    </Button>
                    <Button variant="outline" size="sm">
                      Request Paper Copies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountSettings.map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{setting.name}</h4>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {setting.type}
                        </Badge>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={(checked) => {
                          // Handle setting toggle
                          console.log(`Toggle ${setting.name}: ${checked}`)
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Account Closure</h4>
                  <p className="text-sm text-red-700 mb-3">
                    Permanently close your account. This action cannot be undone.
                  </p>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Close Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
