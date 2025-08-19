import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Textarea } from '../components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Clock, 
  MessageSquare, 
  Phone,
  Mail,
  Video,
  User,
  FileText,
  Calendar,
  Search,
  Plus,
  Filter,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Tag,
  Building,
  CreditCard,
  DollarSign
} from 'lucide-react'

export default function CustomerHistoryView({ context, onKMSOpen }) {
  const [activeTab, setActiveTab] = useState('timeline')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [newNote, setNewNote] = useState('')
  const [showAddNote, setShowAddNote] = useState(false)

  const hasCustomerContext = !!(context?.customerId && context?.customerId !== '')
  const customerName = context?.customerName || 'Customer'

  // Mock interaction history
  const interactions = [
    {
      id: 1,
      type: 'call',
      date: '2024-10-15 14:30',
      agent: 'Sarah Johnson',
      duration: '12 minutes',
      summary: 'Customer inquired about mortgage rates and requested information packet',
      outcome: 'Information provided, follow-up scheduled',
      priority: 'medium',
      status: 'completed',
      tags: ['mortgage', 'rates', 'information']
    },
    {
      id: 2,
      type: 'email',
      date: '2024-10-12 09:15',
      agent: 'System',
      duration: null,
      summary: 'Monthly statement sent via email',
      outcome: 'Statement delivered successfully',
      priority: 'low',
      status: 'completed',
      tags: ['statement', 'automated']
    },
    {
      id: 3,
      type: 'chat',
      date: '2024-10-10 16:45',
      agent: 'Mike Chen',
      duration: '8 minutes',
      summary: 'Helped customer set up online banking and reset password',
      outcome: 'Issue resolved, customer satisfied',
      priority: 'high',
      status: 'completed',
      tags: ['online-banking', 'password', 'technical-support']
    },
    {
      id: 4,
      type: 'call',
      date: '2024-10-08 11:20',
      agent: 'Emma Wilson',
      duration: '15 minutes',
      summary: 'Fraud alert discussion - suspicious transaction identified',
      outcome: 'Transaction verified as legitimate, card unblocked',
      priority: 'high',
      status: 'completed',
      tags: ['fraud', 'security', 'card-block']
    },
    {
      id: 5,
      type: 'visit',
      date: '2024-10-05 13:00',
      agent: 'James Brown',
      duration: '25 minutes',
      summary: 'Branch visit for account upgrade consultation',
      outcome: 'Upgrade application submitted, pending approval',
      priority: 'medium',
      status: 'pending',
      tags: ['account-upgrade', 'consultation', 'branch']
    }
  ]

  // Mock customer notes
  const customerNotes = [
    {
      id: 1,
      date: '2024-10-15',
      author: 'Sarah Johnson',
      note: 'Customer expressed interest in investment products. Recommended scheduling appointment with financial advisor.',
      category: 'opportunity',
      important: true
    },
    {
      id: 2,
      date: '2024-10-10',
      author: 'Mike Chen',
      note: 'Customer prefers email communication over phone calls. Updated preferences in system.',
      category: 'preference',
      important: false
    },
    {
      id: 3,
      date: '2024-10-08',
      author: 'Emma Wilson',
      note: 'Customer travels frequently for business. Set up travel notifications for card usage.',
      category: 'information',
      important: false
    },
    {
      id: 4,
      date: '2024-09-28',
      author: 'David Lee',
      note: 'Customer mentioned upcoming home purchase in 6 months. Potential mortgage opportunity.',
      category: 'opportunity',
      important: true
    }
  ]

  // Mock customer metrics
  const customerMetrics = {
    totalInteractions: 47,
    avgSatisfactionScore: 4.6,
    preferredChannel: 'Email',
    lastCCAAS: '2024-10-15',
    relationshipDuration: '6 years, 8 months',
    totalProducts: 3
  }

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4 text-blue-600" />
      case 'email':
        return <Mail className="h-4 w-4 text-green-600" />
      case 'chat':
        return <MessageSquare className="h-4 w-4 text-purple-600" />
      case 'video':
        return <Video className="h-4 w-4 text-orange-600" />
      case 'visit':
        return <Building className="h-4 w-4 text-gray-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'opportunity':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'preference':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'information':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'issue':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredInteractions = interactions.filter(interaction => {
    const matchesSearch = searchQuery === '' || 
      interaction.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interaction.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interaction.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filterType === 'all' || interaction.type === filterType
    
    return matchesSearch && matchesFilter
  })

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would make an API call
      console.log('Adding note:', newNote)
      setNewNote('')
      setShowAddNote(false)
    }
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer History</h1>
            <p className="text-sm text-gray-600">
              {hasCustomerContext ? `Complete interaction history for ${customerName}` : 'Customer interaction timeline and notes'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onKMSOpen?.('customer-history-guide')}>
              <FileText className="h-4 w-4 mr-2" />
              Help Guide
            </Button>
            <Button size="sm" onClick={() => setShowAddNote(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        {hasCustomerContext && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{customerMetrics.totalInteractions}</p>
                <p className="text-xs text-gray-600">Total Interactions</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <p className="text-2xl font-bold text-yellow-600">{customerMetrics.avgSatisfactionScore}</p>
                </div>
                <p className="text-xs text-gray-600">Avg Satisfaction</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{customerMetrics.preferredChannel}</p>
                <p className="text-xs text-gray-600">Preferred Channel</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{customerMetrics.lastCCAAS}</p>
                <p className="text-xs text-gray-600">Last CCAAS</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600">{customerMetrics.relationshipDuration}</p>
                <p className="text-xs text-gray-600">Relationship</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{customerMetrics.totalProducts}</p>
                <p className="text-xs text-gray-600">Products</p>
              </div>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Interaction Timeline</TabsTrigger>
            <TabsTrigger value="notes">Customer Notes</TabsTrigger>
            <TabsTrigger value="analysis">Behavior Analysis</TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search interactions, agents, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="call">Phone Calls</option>
                      <option value="email">Emails</option>
                      <option value="chat">Live Chat</option>
                      <option value="visit">Branch Visits</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interaction Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Interaction Timeline
                  </span>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort by Date
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInteractions.map((interaction) => (
                    <div key={interaction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getInteractionIcon(interaction.type)}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 capitalize">{interaction.type}</span>
                              <Badge className={getPriorityColor(interaction.priority)}>
                                {interaction.priority}
                              </Badge>
                              {getStatusIcon(interaction.status)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>{interaction.date}</span>
                              <span>Agent: {interaction.agent}</span>
                              {interaction.duration && <span>Duration: {interaction.duration}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-gray-900 mb-2">{interaction.summary}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Outcome:</strong> {interaction.outcome}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {interaction.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredInteractions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No interactions found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            {/* Add Note Modal/Form */}
            {showAddNote && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Customer Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="note-category">Category</Label>
                    <select
                      id="note-category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="information">Information</option>
                      <option value="opportunity">Opportunity</option>
                      <option value="preference">Preference</option>
                      <option value="issue">Issue</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="note-content">Note Content</Label>
                    <Textarea
                      id="note-content"
                      placeholder="Enter your note about the customer..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="important" />
                    <Label htmlFor="important" className="text-sm">Mark as important</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddNote(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddNote}>
                      Save Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Customer Notes List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Customer Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerNotes.map((note) => (
                    <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(note.category)}>
                            {note.category}
                          </Badge>
                          {note.important && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {note.date} by {note.author}
                        </div>
                      </div>
                      <p className="text-gray-900">{note.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Communication Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Phone Calls</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Email</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Live Chat</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Branch Visits</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    CCAAS Frequency
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Peak CCAAS Hours</h4>
                    <p className="text-sm text-blue-700">9:00 AM - 11:00 AM, 2:00 PM - 4:00 PM</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Preferred Days</h4>
                    <p className="text-sm text-green-700">Tuesday, Wednesday, Thursday</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Average Response Time</h4>
                    <p className="text-sm text-purple-700">24 hours for emails, immediate for calls</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Service Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Investment Products</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">High Interest</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mortgage Services</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">High Interest</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Insurance Products</span>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium Interest</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Credit Cards</span>
                      <Badge className="bg-red-100 text-red-800 border-red-200">Low Interest</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Satisfaction Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overall Satisfaction</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium">4.6/5</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• Consistently positive feedback</p>
                      <p>• Values quick response times</p>
                      <p>• Appreciates proactive communication</p>
                      <p>• Prefers detailed explanations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
