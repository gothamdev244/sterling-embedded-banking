import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import AppHeader from '../components/shared/AppHeader'
import { Crown, DollarSign, TrendingUp, Users, Calendar, CheckCircle, AlertTriangle, FileText, Award, Building, Globe, Phone } from 'lucide-react'

const ExecutiveBankingDashboard = ({ context, onKMSOpen }) => {
  const [selectedVIP, setSelectedVIP] = useState(null)
  const [actionStatus, setActionStatus] = useState(null)
  const [actionMessage, setActionMessage] = useState('')

  // Determine if we have customer context for dual-mode behavior
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'

  useEffect(() => {
    console.log('[ExecutiveBankingDashboard] Rendering with context:', context, 'mode:', mode)
  }, [context, mode])

  // Handle executive action
  const handleExecutiveAction = async (actionType) => {
    setActionStatus('processing')
    setActionMessage(`Processing ${actionType}...`)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setActionStatus('success')
      setActionMessage(`${actionType} completed successfully!`)
      
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    } catch (error) {
      setActionStatus('error')
      setActionMessage(`Failed to process ${actionType}. Please try again.`)
      
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    }
  }

  // VIP Client Data
  const vipClients = [
    {
      id: 'vip-001',
      name: 'Alexander Sterling',
      tier: 'Diamond Elite',
      totalAssets: '£12.5M',
      recentActivity: 'Private equity investment',
      relationshipManager: 'Victoria Chambers',
      riskLevel: 'Low',
      nextMeeting: '2025-08-15',
      status: 'active'
    },
    {
      id: 'vip-002', 
      name: 'Catherine Morrison',
      tier: 'Platinum Premier',
      totalAssets: '£8.3M',
      recentActivity: 'International transfer',
      relationshipManager: 'James Wellington',
      riskLevel: 'Medium',
      nextMeeting: '2025-08-16',
      status: 'review_required'
    },
    {
      id: 'vip-003',
      name: 'Richard Blackwood',
      tier: 'Diamond Elite', 
      totalAssets: '£22.1M',
      recentActivity: 'Estate planning review',
      relationshipManager: 'Charlotte Pemberton',
      riskLevel: 'Low',
      nextMeeting: '2025-08-18',
      status: 'active'
    }
  ]

  // High-Value Transaction Queue
  const pendingApprovals = [
    {
      id: 'txn-001',
      client: 'Alexander Sterling',
      amount: '£850,000',
      type: 'Private Equity Investment',
      urgency: 'High',
      submittedBy: 'Victoria Chambers',
      timeRemaining: '2h 45m'
    },
    {
      id: 'txn-002',
      client: 'Catherine Morrison', 
      amount: '£125,000',
      type: 'International Wire Transfer',
      urgency: 'Medium',
      submittedBy: 'James Wellington',
      timeRemaining: '4h 12m'
    }
  ]

  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50">
        <AppHeader 
          title="Executive Banking Dashboard" 
          subtitle="VIP customer relationship management and high-value transaction oversight"
        />
        
        <div className="p-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-amber-900">Manager Access Required</h3>
                <p className="text-sm text-amber-700">Connect with a VIP customer to access executive banking features and high-value transaction controls.</p>
              </div>
            </div>
          </div>

          {/* Executive Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Executive Banking Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700">Total VIP Assets</p>
                      <p className="text-2xl font-bold text-purple-800">£43.2M</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700">Active VIP Clients</p>
                      <p className="text-2xl font-bold text-blue-800">127</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Pending Approvals</p>
                      <p className="text-2xl font-bold text-green-800">8</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-700">This Month Growth</p>
                      <p className="text-2xl font-bold text-orange-800">+12.3%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Executive Services */}
          <Card>
            <CardHeader>
              <CardTitle>Executive Banking Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="h-6 w-6 text-purple-600" />
                    <h4 className="font-medium">VIP Relationship Management</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Comprehensive relationship oversight for ultra-high-net-worth clients with personalized service delivery.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Diamond Elite & Platinum Premier tiers</p>
                    <p>• Dedicated relationship managers</p>
                    <p>• Executive meeting coordination</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-6 w-6 text-blue-600" />
                    <h4 className="font-medium">Private Banking Solutions</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Exclusive banking products and services designed for sophisticated financial needs.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Private investment opportunities</p>
                    <p>• Estate planning services</p>
                    <p>• Family office coordination</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Context mode - VIP customer connected
  return (
    <div className="h-full bg-gray-50">
      <AppHeader 
        title="Executive Banking Dashboard" 
        subtitle={`Managing VIP relationship for ${context.customerName || 'VIP Customer'}`}
        showCustomerInfo={true}
        customerName={context.customerName}
        customerId={context.customerId}
      />
      
      <div className="p-6 space-y-6">
        {/* Action Status */}
        {actionStatus && (
          <div className={`p-4 rounded-lg border ${
            actionStatus === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            actionStatus === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              {actionStatus === 'success' && <CheckCircle className="h-5 w-5" />}
              {actionStatus === 'error' && <AlertTriangle className="h-5 w-5" />}
              {actionStatus === 'processing' && <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>}
              <span className="font-medium">{actionMessage}</span>
            </div>
          </div>
        )}

        {/* VIP Client Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-purple-600" />
              VIP Client Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vipClients.map((client) => (
                <div key={client.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Crown className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{client.name}</h4>
                        <p className="text-sm text-gray-600">{client.tier}</p>
                      </div>
                    </div>
                    <Badge className={client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                      {client.status === 'active' ? 'Active' : 'Review Required'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Assets</p>
                      <p className="font-medium">{client.totalAssets}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Relationship Manager</p>
                      <p className="font-medium">{client.relationshipManager}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Meeting</p>
                      <p className="font-medium">{client.nextMeeting}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Risk Level</p>
                      <p className="font-medium">{client.riskLevel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* High-Value Transaction Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              High-Value Transaction Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((txn) => (
                <div key={txn.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{txn.client}</h4>
                      <p className="text-sm text-gray-600">{txn.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">{txn.amount}</p>
                      <Badge className={txn.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                        {txn.urgency} Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Submitted By</p>
                      <p className="font-medium">{txn.submittedBy}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time Remaining</p>
                      <p className="font-medium text-orange-600">{txn.timeRemaining}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleExecutiveAction('Transaction Approval')}
                      disabled={actionStatus === 'processing'}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleExecutiveAction('Transaction Review')}
                      disabled={actionStatus === 'processing'}
                      variant="outline"
                    >
                      Request Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Executive Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleExecutiveAction('VIP Meeting Schedule')}
            disabled={actionStatus === 'processing'}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Schedule VIP Meeting</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleExecutiveAction('Compliance Review')}
            disabled={actionStatus === 'processing'}
          >
            <Award className="h-5 w-5" />
            <span className="text-sm">Compliance Review</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('executive-banking-procedures')}
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm">Executive Procedures</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleExecutiveAction('Portfolio Analysis')}
            disabled={actionStatus === 'processing'}
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">Portfolio Analysis</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveBankingDashboard
