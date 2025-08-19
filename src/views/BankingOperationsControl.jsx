import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import AppHeader from '../components/shared/AppHeader'
import { Server, CreditCard, MapPin, Settings, AlertTriangle, CheckCircle, Shield, Database, Network, DollarSign, Users, FileText } from 'lucide-react'

const BankingOperationsControl = ({ context, onKMSOpen }) => {
  const [selectedSystem, setSelectedSystem] = useState(null)
  const [actionStatus, setActionStatus] = useState(null)
  const [actionMessage, setActionMessage] = useState('')

  // Determine if we have customer context for dual-mode behavior
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'

  useEffect(() => {
    console.log('[BankingOperationsControl] Rendering with context:', context, 'mode:', mode)
  }, [context, mode])

  // Handle operations action
  const handleOperationsAction = async (actionType) => {
    setActionStatus('processing')
    setActionMessage(`Processing ${actionType}...`)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500))
      setActionStatus('success')
      setActionMessage(`${actionType} completed successfully!`)
      
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    } catch (error) {
      setActionStatus('error')
      setActionMessage(`Failed to process ${actionType}. Please ccaas IT support.`)
      
      setTimeout(() => {
        setActionStatus(null)
        setActionMessage('')
      }, 3000)
    }
  }

  // Core Banking Systems Status
  const systemStatus = [
    {
      id: 'core-banking',
      name: 'Core Banking System',
      status: 'operational',
      uptime: '99.98%',
      lastUpdate: '2025-08-14 10:30',
      transactions: '1.2M today',
      load: 67
    },
    {
      id: 'atm-network',
      name: 'ATM Network',
      status: 'operational', 
      uptime: '99.95%',
      lastUpdate: '2025-08-14 10:25',
      transactions: '45K today',
      load: 43
    },
    {
      id: 'card-production',
      name: 'Card Production System',
      status: 'maintenance',
      uptime: '98.12%',
      lastUpdate: '2025-08-14 09:15',
      transactions: '2.3K today',
      load: 25
    },
    {
      id: 'payment-gateway',
      name: 'Payment Gateway',
      status: 'operational',
      uptime: '99.99%',
      lastUpdate: '2025-08-14 10:35',
      transactions: '892K today',
      load: 78
    }
  ]

  // ATM Network Status
  const atmRegions = [
    {
      region: 'London Central',
      totalATMs: 247,
      operational: 245,
      maintenance: 2,
      offline: 0,
      cashLevel: 87
    },
    {
      region: 'Manchester',
      totalATMs: 156,
      operational: 152,
      maintenance: 3,
      offline: 1,
      cashLevel: 72
    },
    {
      region: 'Birmingham',
      totalATMs: 134,
      operational: 131,
      maintenance: 2,
      offline: 1,
      cashLevel: 84
    }
  ]

  // Transaction Limits Configuration
  const transactionLimits = [
    {
      type: 'Daily ATM Withdrawal',
      standard: '£500',
      premium: '£1,000',
      private: '£2,500'
    },
    {
      type: 'Online Transfer',
      standard: '£10,000', 
      premium: '£25,000',
      private: '£100,000'
    },
    {
      type: 'International Wire',
      standard: '£5,000',
      premium: '£15,000',
      private: '£50,000'
    }
  ]

  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50">
        <AppHeader 
          title="Banking Operations Control" 
          subtitle="Core banking system configuration and infrastructure management"
        />
        
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-red-900">Administrator Access Required</h3>
                <p className="text-sm text-red-700">This system requires administrator privileges to access core banking infrastructure controls.</p>
              </div>
            </div>
          </div>

          {/* Operations Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Banking Operations Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">System Uptime</p>
                      <p className="text-2xl font-bold text-green-800">99.97%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700">Daily Transactions</p>
                      <p className="text-2xl font-bold text-blue-800">2.1M</p>
                    </div>
                    <Database className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700">ATM Network</p>
                      <p className="text-2xl font-bold text-purple-800">537</p>
                    </div>
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-700">Cards Produced</p>
                      <p className="text-2xl font-bold text-orange-800">2,341</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core Banking Services */}
          <Card>
            <CardHeader>
              <CardTitle>Core Banking Infrastructure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Server className="h-6 w-6 text-blue-600" />
                    <h4 className="font-medium">Core Banking System</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Real-time transaction processing, account management, and regulatory compliance systems.</p>
                  <div className="space-y-1 text-xs">
                    <p>• Real-time transaction processing</p>
                    <p>• Account lifecycle management</p>
                    <p>• Regulatory reporting automation</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Network className="h-6 w-6 text-green-600" />
                    <h4 className="font-medium">Infrastructure Management</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">ATM network oversight, card production controls, and payment gateway management.</p>
                  <div className="space-y-1 text-xs">
                    <p>• ATM network monitoring</p>
                    <p>• Card production workflows</p>
                    <p>• Payment gateway configuration</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Context mode - Admin access
  return (
    <div className="h-full bg-gray-50">
      <AppHeader 
        title="Banking Operations Control" 
        subtitle="Administrator control panel for core banking infrastructure"
        showCustomerInfo={false}
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

        {/* System Status Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              Core Banking Systems Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((system) => (
                <div key={system.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'operational' ? 'bg-green-500' : 
                        system.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <h4 className="font-semibold">{system.name}</h4>
                    </div>
                    <Badge className={
                      system.status === 'operational' ? 'bg-green-100 text-green-800' :
                      system.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }>
                      {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Uptime</p>
                      <p className="font-medium">{system.uptime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Update</p>
                      <p className="font-medium">{system.lastUpdate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Transactions</p>
                      <p className="font-medium">{system.transactions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">System Load</p>
                      <div className="flex items-center gap-2">
                        <Progress value={system.load} className="w-16 h-2" />
                        <span className="font-medium">{system.load}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ATM Network Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              ATM Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atmRegions.map((region) => (
                <div key={region.region} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{region.region}</h4>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Cash Level</p>
                      <div className="flex items-center gap-2">
                        <Progress value={region.cashLevel} className="w-20 h-2" />
                        <span className="font-medium">{region.cashLevel}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total ATMs</p>
                      <p className="font-medium">{region.totalATMs}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Operational</p>
                      <p className="font-medium text-green-600">{region.operational}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Maintenance</p>
                      <p className="font-medium text-yellow-600">{region.maintenance}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Offline</p>
                      <p className="font-medium text-red-600">{region.offline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Limits Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Transaction Limits Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Transaction Type</th>
                    <th className="text-left p-2">Standard</th>
                    <th className="text-left p-2">Premium</th>
                    <th className="text-left p-2">Private Banking</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionLimits.map((limit, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{limit.type}</td>
                      <td className="p-2">{limit.standard}</td>
                      <td className="p-2">{limit.premium}</td>
                      <td className="p-2">{limit.private}</td>
                      <td className="p-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleOperationsAction(`${limit.type} Limit Update`)}
                          disabled={actionStatus === 'processing'}
                        >
                          Configure
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Admin Control Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleOperationsAction('System Configuration Update')}
            disabled={actionStatus === 'processing'}
          >
            <Settings className="h-5 w-5" />
            <span className="text-sm">System Config</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleOperationsAction('Emergency Maintenance')}
            disabled={actionStatus === 'processing'}
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">Emergency Mode</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('banking-operations-manual')}
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm">Operations Manual</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => handleOperationsAction('Compliance Audit')}
            disabled={actionStatus === 'processing'}
          >
            <Shield className="h-5 w-5" />
            <span className="text-sm">Compliance Audit</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BankingOperationsControl
