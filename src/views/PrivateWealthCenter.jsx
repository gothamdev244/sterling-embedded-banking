import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import AppHeader from '../components/shared/AppHeader'
import { Diamond, TrendingUp, Shield, Building2, Users, Crown, Target, DollarSign, Calendar, CheckCircle, AlertTriangle, FileText, Award } from 'lucide-react'

const PrivateWealthCenter = ({ context, onKMSOpen }) => {
  const [selectedClient, setSelectedClient] = useState(null)
  const [actionStatus, setActionStatus] = useState(null)
  const [actionMessage, setActionMessage] = useState('')

  // Determine if we have customer context for dual-mode behavior
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'

  useEffect(() => {
    console.log('[PrivateWealthCenter] Rendering with context:', context, 'mode:', mode)
  }, [context, mode])

  // Handle wealth action
  const handleWealthAction = async (actionType) => {
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

  // Ultra-High-Net-Worth Clients
  const uhnwClients = [
    {
      id: 'uhnw-001',
      name: 'Lord Edward Pemberton',
      netWorth: '£127.5M',
      tier: 'Diamond Sovereign',
      portfolioGrowth: '+14.2%',
      lastReview: '2025-08-10',
      familyOffice: 'Pemberton Family Trust',
      relationshipManager: 'Victoria Sterling',
      riskProfile: 'Conservative Growth',
      nextMilestone: 'Estate restructuring'
    },
    {
      id: 'uhnw-002',
      name: 'Duchess Caroline Ashworth',
      netWorth: '£89.3M',
      tier: 'Platinum Sovereign',
      portfolioGrowth: '+11.8%',
      lastReview: '2025-08-12',
      familyOffice: 'Ashworth Legacy Fund',
      relationshipManager: 'James Wellington',
      riskProfile: 'Balanced Heritage',
      nextMilestone: 'Philanthropic foundation'
    },
    {
      id: 'uhnw-003',
      name: 'Sir Alexander Morrison',
      netWorth: '£156.8M',
      tier: 'Diamond Sovereign',
      portfolioGrowth: '+18.7%',
      lastReview: '2025-08-08',
      familyOffice: 'Morrison Capital Partners',
      relationshipManager: 'Charlotte Pemberton',
      riskProfile: 'Aggressive Growth',
      nextMilestone: 'International expansion'
    }
  ]

  // Investment Opportunities
  const exclusiveOpportunities = [
    {
      id: 'inv-001',
      name: 'London Prime Real Estate Fund',
      category: 'Real Estate',
      minimumInvestment: '£5M',
      expectedReturn: '12-15%',
      duration: '5-7 years',
      riskLevel: 'Medium',
      availability: 'Limited - 3 spots remaining'
    },
    {
      id: 'inv-002',
      name: 'Technology Unicorn Portfolio',
      category: 'Private Equity',
      minimumInvestment: '£10M',
      expectedReturn: '18-25%',
      duration: '3-5 years',
      riskLevel: 'High',
      availability: 'Exclusive - Invitation only'
    },
    {
      id: 'inv-003',
      name: 'Heritage Art Collection Fund',
      category: 'Alternative',
      minimumInvestment: '£2M',
      expectedReturn: '8-12%',
      duration: '7-10 years',
      riskLevel: 'Low-Medium',
      availability: 'Opening soon - Pre-registration'
    }
  ]

  // Trust & Estate Services
  const trustServices = [
    {
      service: 'Family Trust Establishment',
      description: 'Multi-generational wealth preservation',
      timeframe: '3-6 months',
      complexity: 'High'
    },
    {
      service: 'Tax Optimization Strategy',
      description: 'International tax efficiency planning',
      timeframe: '2-4 months',
      complexity: 'Very High'
    },
    {
      service: 'Succession Planning',
      description: 'Business and wealth transition',
      timeframe: '6-12 months',
      complexity: 'Very High'
    }
  ]

  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50">
        <AppHeader 
          title="Private Wealth Center" 
          subtitle="Ultra-high-net-worth client management and exclusive investment opportunities"
        />
        
        <div className="p-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Diamond className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-purple-900">Supervisor Access Required</h3>
                <p className="text-sm text-purple-700">Connect with ultra-high-net-worth clients to access private wealth management and family office services.</p>
              </div>
            </div>
          </div>

          {/* Private Wealth Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Diamond className="h-5 w-5" />
                Private Wealth Center Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700">Assets Under Management</p>
                      <p className="text-2xl font-bold text-purple-800">£2.1B</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700">UHNW Clients</p>
                      <p className="text-2xl font-bold text-blue-800">47</p>
                    </div>
                    <Crown className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Family Offices</p>
                      <p className="text-2xl font-bold text-green-800">23</p>
                    </div>
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-700">YTD Performance</p>
                      <p className="text-2xl font-bold text-orange-800">+16.3%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exclusive Services */}
          <Card>
            <CardHeader>
              <CardTitle>Exclusive Private Wealth Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Diamond className="h-6 w-6 text-purple-600" />
                    <h4 className="font-medium">Family Office Services</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Comprehensive wealth management for ultra-high-net-worth families with multi-generational planning.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Multi-generational wealth planning</p>
                    <p>• Family governance structures</p>
                    <p>• Philanthropic advisory services</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h4 className="font-medium">Trust & Estate Planning</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Sophisticated trust structures and estate planning for complex international wealth preservation.</p>
                  <div className="space-y-1 text-xs">
                    <p>• International trust structures</p>
                    <p>• Tax optimization strategies</p>
                    <p>• Estate succession planning</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Context mode - UHNW client connected
  return (
    <div className="h-full bg-gray-50">
      <AppHeader 
        title="Private Wealth Center" 
        subtitle={`Managing private wealth for ${context.customerName || 'UHNW Client'}`}
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

        {/* UHNW Client Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Diamond className="h-5 w-5 text-purple-600" />
              Ultra-High-Net-Worth Client Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uhnwClients.map((client) => (
                <div key={client.id} className="border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                        <Crown className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{client.name}</h4>
                        <p className="text-purple-600 font-medium">{client.tier}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{client.netWorth}</p>
                      <Badge className="bg-green-100 text-green-800">
                        {client.portfolioGrowth} YTD
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Family Office</p>
                      <p className="font-medium">{client.familyOffice}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Relationship Manager</p>
                      <p className="font-medium">{client.relationshipManager}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Risk Profile</p>
                      <p className="font-medium">{client.riskProfile}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Milestone</p>
                      <p className="font-medium">{client.nextMilestone}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => handleWealthAction(`Portfolio Review for ${client.name}`)}
                      disabled={actionStatus === 'processing'}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Portfolio Review
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWealthAction(`Schedule Meeting with ${client.name}`)}
                      disabled={actionStatus === 'processing'}
                    >
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exclusive Investment Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Exclusive Investment Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exclusiveOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{opportunity.name}</h4>
                      <p className="text-sm text-gray-600">{opportunity.category}</p>
                    </div>
                    <Badge className={
                      opportunity.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      opportunity.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {opportunity.riskLevel} Risk
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Minimum Investment</p>
                      <p className="font-medium">{opportunity.minimumInvestment}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expected Return</p>
                      <p className="font-medium text-green-600">{opportunity.expectedReturn}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium">{opportunity.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Availability</p>
                      <p className="font-medium text-orange-600">{opportunity.availability}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => handleWealthAction(`Investment Proposal for ${opportunity.name}`)}
                      disabled={actionStatus === 'processing'}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Generate Proposal
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWealthAction(`Due Diligence for ${opportunity.name}`)}
                      disabled={actionStatus === 'processing'}
                    >
                      Request Due Diligence
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trust & Estate Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Trust & Estate Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trustServices.map((service, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{service.service}</h4>
                    <Badge className={
                      service.complexity === 'High' ? 'bg-orange-100 text-orange-800' :
                      service.complexity === 'Very High' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {service.complexity} Complexity
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      <span className="text-gray-600">Timeframe: </span>
                      <span className="font-medium">{service.timeframe}</span>
                    </p>
                    <Button 
                      size="sm"
                      onClick={() => handleWealthAction(`${service.service} Consultation`)}
                      disabled={actionStatus === 'processing'}
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Private Wealth Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleWealthAction('Family Office Setup')}
            disabled={actionStatus === 'processing'}
          >
            <Building2 className="h-5 w-5" />
            <span className="text-sm">Family Office Setup</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleWealthAction('Tax Optimization Review')}
            disabled={actionStatus === 'processing'}
          >
            <Shield className="h-5 w-5" />
            <span className="text-sm">Tax Optimization</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('private-wealth-procedures')}
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm">Wealth Procedures</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleWealthAction('Philanthropic Strategy')}
            disabled={actionStatus === 'processing'}
          >
            <Award className="h-5 w-5" />
            <span className="text-sm">Philanthropic Strategy</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PrivateWealthCenter
