import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import AppHeader from '../components/shared/AppHeader'
import { Users, Clock, TrendingUp, AlertTriangle, CheckCircle, Phone } from 'lucide-react'

const TeamOverviewView = ({ context, onKMSOpen }) => {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [timeframe, setTimeframe] = useState('today')

  // Determine if we have customer context for dual-mode behavior
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'

  useEffect(() => {
    console.log('[TeamOverviewView] Rendering with context:', context, 'mode:', mode)
  }, [context, mode])

  // Mock team data - in real app this would come from management API
  const teamData = {
    totalAgents: 12,
    onlineAgents: 9,
    busyAgents: 6,
    availableAgents: 3,
    avgCallTime: '8:45',
    callsHandled: 147,
    escalations: 3,
    satisfaction: 4.2
  }

  const agents = [
    {
      id: 'agent-001',
      name: 'Sarah Johnson',
      status: 'busy',
      currentCall: '15:23',
      callsToday: 12,
      avgCallTime: '9:15',
      satisfaction: 4.5,
      skills: ['Credit Cards', 'Mortgages']
    },
    {
      id: 'agent-002', 
      name: 'Michael Chen',
      status: 'available',
      currentCall: null,
      callsToday: 8,
      avgCallTime: '7:30',
      satisfaction: 4.8,
      skills: ['Fraud', 'International']
    },
    {
      id: 'agent-003',
      name: 'Emma Wilson',
      status: 'busy',
      currentCall: '5:12',
      callsToday: 15,
      avgCallTime: '8:45',
      satisfaction: 4.3,
      skills: ['Student Loans', 'Accounts']
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'busy': return 'bg-red-500'
      case 'break': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available'
      case 'busy': return 'On Call'
      case 'break': return 'Break'
      default: return 'Offline'
    }
  }

  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50">
        <AppHeader 
          title="Team Overview" 
          subtitle="Supervisor dashboard for team monitoring and management"
        />
        
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Supervisor Access Required</h3>
                <p className="text-sm text-blue-700">This dashboard provides real-time team monitoring and management capabilities for supervisory staff.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Team Monitoring</h4>
                    <p className="text-sm text-gray-500">Real-time agent status</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Performance Metrics</h4>
                    <p className="text-sm text-gray-500">Call volume and quality</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Escalation Management</h4>
                    <p className="text-sm text-gray-500">Handle complex cases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Context mode - supervisor dashboard
  return (
    <div className="h-full bg-gray-50">
      <AppHeader 
        title="Team Overview" 
        subtitle="Real-time team monitoring and performance dashboard"
        showCustomerInfo={false}
      />
      
      <div className="p-6 space-y-6">
        {/* Team Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Agents</p>
                  <p className="text-2xl font-bold">{teamData.totalAgents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-green-600">{teamData.availableAgents}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">On Calls</p>
                  <p className="text-2xl font-bold text-red-600">{teamData.busyAgents}</p>
                </div>
                <Phone className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Call Time</p>
                  <p className="text-2xl font-bold">{teamData.avgCallTime}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{teamData.callsHandled}</p>
                <p className="text-sm text-gray-600">Calls Handled</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{teamData.satisfaction}</p>
                <p className="text-sm text-gray-600">Satisfaction Score</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{teamData.escalations}</p>
                <p className="text-sm text-gray-600">Escalations</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{teamData.avgCallTime}</p>
                <p className="text-sm text-gray-600">Avg Call Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Team Members</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={timeframe === 'today' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeframe('today')}
                >
                  Today
                </Button>
                <Button
                  variant={timeframe === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeframe('week')}
                >
                  This Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                      <span className="font-medium">{agent.name}</span>
                    </div>
                    <Badge variant="outline">{getStatusText(agent.status)}</Badge>
                    {agent.currentCall && (
                      <span className="text-sm text-gray-500">Call: {agent.currentCall}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{agent.callsToday} calls</p>
                    <p className="text-xs text-gray-500">★ {agent.satisfaction}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => onKMSOpen?.('team-management')}
          >
            <Users className="h-5 w-5" />
            <span className="text-sm">Manage Team</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">View Reports</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">Escalations</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <Clock className="h-5 w-5" />
            <span className="text-sm">Schedules</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TeamOverviewView
