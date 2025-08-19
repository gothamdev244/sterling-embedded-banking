import { useState } from 'react'
import { MessageSquare, Copy, Search, Plus, Edit2, Trash2, Star, Clock } from 'lucide-react'

function ChatTemplatesView({ context, onKMSOpen }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedId, setCopiedId] = useState(null)
  
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'
  
  const categories = [
    { id: 'all', name: 'All Templates', count: 24 },
    { id: 'greeting', name: 'Greetings', count: 5 },
    { id: 'account', name: 'Account Services', count: 8 },
    { id: 'technical', name: 'Technical Support', count: 6 },
    { id: 'closing', name: 'Closings', count: 5 }
  ]
  
  const templates = [
    {
      id: 1,
      category: 'greeting',
      title: 'Welcome - New Customer',
      content: `Hello {customerName}, welcome to HSBC! I'm {agentName} and I'll be assisting you today. How may I help you with your banking needs?`,
      tags: ['welcome', 'new', 'intro'],
      favorite: true,
      usageCount: 1523
    },
    {
      id: 2,
      category: 'greeting',
      title: 'Welcome - Returning Customer',
      content: `Good {timeOfDay} {customerName}, welcome back to HSBC. I'm {agentName}. How can I assist you today?`,
      tags: ['welcome', 'returning'],
      favorite: true,
      usageCount: 2341
    },
    {
      id: 3,
      category: 'account',
      title: 'Account Balance Confirmation',
      content: `I can confirm that your {accountType} account ending in {lastFourDigits} has a current balance of {balance}. The available balance is {availableBalance}. Is there anything else you'd like to know about this account?`,
      tags: ['balance', 'inquiry'],
      favorite: false,
      usageCount: 892
    },
    {
      id: 4,
      category: 'account',
      title: 'Card Block Confirmation',
      content: `I've successfully blocked your {cardType} ending in {lastFourDigits}. The block is effective immediately. Would you like me to order a replacement card for you? It typically arrives within 5-7 business days.`,
      tags: ['card', 'block', 'security'],
      favorite: true,
      usageCount: 567
    },
    {
      id: 5,
      category: 'technical',
      title: 'Online Banking Reset',
      content: `I've sent a password reset link to your registered email address {email}. Please check your inbox (and spam folder) within the next 10 minutes. The link will expire in 24 hours for security purposes.`,
      tags: ['password', 'reset', 'online'],
      favorite: false,
      usageCount: 1234
    },
    {
      id: 6,
      category: 'closing',
      title: 'Standard Closing',
      content: `Is there anything else I can help you with today, {customerName}? Thank you for choosing HSBC. Have a wonderful {timeOfDay}!`,
      tags: ['closing', 'standard'],
      favorite: true,
      usageCount: 3456
    },
    {
      id: 7,
      category: 'account',
      title: 'Transaction Dispute Process',
      content: `I understand you'd like to dispute the transaction of {amount} from {merchant} on {date}. I'll initiate the dispute process for you right away. You should receive a provisional credit within 2 business days while we investigate.`,
      tags: ['dispute', 'transaction', 'fraud'],
      favorite: false,
      usageCount: 445
    },
    {
      id: 8,
      category: 'technical',
      title: 'Mobile App Troubleshooting',
      content: `I apologize for the inconvenience with our mobile app. Please try: 1) Force closing and reopening the app, 2) Checking for app updates, 3) Clearing the app cache. If the issue persists, I can help you with alternative banking options.`,
      tags: ['mobile', 'app', 'troubleshoot'],
      favorite: false,
      usageCount: 678
    }
  ]
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const handleCopy = (template) => {
    // Replace placeholders with actual context if available
    let content = template.content
    if (hasContext) {
      content = content.replace('{customerName}', context.customerName || 'Customer')
      content = content.replace('{agentName}', context.agentName || 'Agent')
      content = content.replace('{timeOfDay}', new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening')
    }
    
    navigator.clipboard.writeText(content)
    setCopiedId(template.id)
    setTimeout(() => setCopiedId(null), 2000)
  }
  
  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50 p-6" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Chat Response Templates
              </h1>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Connect a customer to personalize templates with their information automatically.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Available Features
              </h2>
              <ul className="space-y-2 text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Quick access to pre-written response templates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Auto-personalization with customer context</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Category-based organization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>One-click copy to clipboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Usage tracking and favorites</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                <strong>Tip:</strong> Templates will automatically populate with customer details when connected to an active call.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-full bg-gray-50 flex" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-6">
          <MessageSquare className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            Templates
          </h2>
        </div>
        
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <div className="flex justify-between items-center">
                <span>{cat.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <Plus className="h-4 w-4" />
            New Template
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Response Templates
              </h1>
              <p className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Customer: {context.customerName || 'Unknown'}
              </p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            />
          </div>
        </div>
        
        {/* Templates Grid */}
        <div className="grid gap-4">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  {template.favorite && <Star className="h-4 w-4 text-yellow-500 mt-1" />}
                  <div>
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                      {template.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                        <Clock className="inline h-3 w-3 mr-1" />
                        Used {template.usageCount} times
                      </span>
                      <div className="flex gap-1">
                        {template.tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCopy(template)}
                    className={`p-2 rounded-md transition-colors ${
                      copiedId === template.id 
                        ? 'bg-green-100 text-green-700' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-md text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-md text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                {template.content}
              </div>
              
              {copiedId === template.id && (
                <div className="mt-2 text-xs text-green-600 font-medium" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                  ✓ Copied to clipboard
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Quick Links */}
        <div className="mt-6 flex gap-2">
          <button 
            onClick={() => onKMSOpen('chat-templates-guide')}
            className="text-sm text-blue-600 hover:underline"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Templates Guide
          </button>
          <span className="text-gray-400">•</span>
          <button 
            onClick={() => onKMSOpen('communication-best-practices')}
            className="text-sm text-blue-600 hover:underline"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Communication Best Practices
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatTemplatesView
