import { useState } from 'react'
import { HelpCircle, Search, ChevronDown, ChevronRight, BookOpen, Clock, TrendingUp, ExternalLink } from 'lucide-react'

function FAQAssistantView({ context, onKMSOpen }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState([])
  
  const hasContext = !!(context?.customerId || context?.customerName)
  const mode = hasContext ? 'context' : 'manual'
  
  const categories = [
    { id: 'all', name: 'All Questions', icon: BookOpen, count: 32 },
    { id: 'account', name: 'Account Management', icon: BookOpen, count: 10 },
    { id: 'cards', name: 'Cards & Payments', icon: BookOpen, count: 8 },
    { id: 'online', name: 'Online Banking', icon: BookOpen, count: 7 },
    { id: 'fees', name: 'Fees & Charges', icon: BookOpen, count: 4 },
    { id: 'security', name: 'Security', icon: BookOpen, count: 3 }
  ]
  
  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I open a new HSBC account?',
      answer: `To open a new HSBC account:
1. Visit hsbc.com or any HSBC branch
2. Choose the account type that suits your needs
3. Complete the online application (takes about 15 minutes)
4. Provide required documents: ID, proof of address, and income verification
5. Make your initial deposit
6. Receive your debit card within 5-7 business days

For Premier accounts, minimum balance requirements apply.`,
      relatedArticles: ['account-types', 'premier-benefits', 'documentation-requirements'],
      views: 2834,
      helpful: 92
    },
    {
      id: 2,
      category: 'cards',
      question: 'How do I report a lost or stolen card?',
      answer: `To report a lost or stolen card immediately:
1. Call our 24/7 hotline: 1-800-HSBC-NOW
2. Log into online banking and select "Card Management" > "Report Lost/Stolen"
3. Visit any HSBC branch

Once reported:
• Your card will be blocked immediately
• Any pending transactions will be reviewed
• A replacement card will be sent within 5-7 business days
• You can request emergency cash or temporary card if needed`,
      relatedArticles: ['card-security', 'fraud-protection', 'emergency-services'],
      views: 4521,
      helpful: 95
    },
    {
      id: 3,
      category: 'online',
      question: 'How do I reset my online banking password?',
      answer: `To reset your online banking password:
1. Go to the HSBC login page
2. Click "Forgot Password?"
3. Enter your username or customer ID
4. Verify your identity via SMS or email code
5. Create a new password (must be 8-20 characters with mix of letters, numbers, symbols)
6. Log in with your new password

For security, passwords expire every 90 days. Cannot reuse last 6 passwords.`,
      relatedArticles: ['online-security', 'password-tips', 'two-factor-auth'],
      views: 5892,
      helpful: 88
    },
    {
      id: 4,
      category: 'fees',
      question: 'What are the fees for international wire transfers?',
      answer: `International wire transfer fees:

Outgoing transfers:
• Online: $35 per transfer
• Branch: $45 per transfer
• Premier customers: $30 online / $35 branch
• Jade customers: First 2 free monthly, then standard rates

Incoming transfers:
• $15 per transfer (waived for Premier and Jade)

Additional fees may apply:
• Intermediary bank fees
• Currency conversion fees (if applicable)
• Recipient bank charges`,
      relatedArticles: ['wire-transfer-guide', 'fx-rates', 'global-transfers'],
      views: 3267,
      helpful: 85
    },
    {
      id: 5,
      category: 'account',
      question: 'What is the minimum balance requirement?',
      answer: `Minimum balance requirements by account type:

Basic Checking: $1,500 (or $25 monthly fee)
Advance Checking: $5,000 (or $35 monthly fee)
Premier Checking: $75,000 combined relationship balance
Jade: $1,000,000 combined relationship balance

Ways to avoid fees:
• Maintain minimum balance
• Set up qualifying direct deposit ($500+ monthly)
• Link to HSBC mortgage
• Student/senior citizen waivers available`,
      relatedArticles: ['account-comparison', 'fee-schedule', 'relationship-benefits'],
      views: 6234,
      helpful: 79
    },
    {
      id: 6,
      category: 'cards',
      question: 'How do I dispute a transaction?',
      answer: `To dispute a transaction:

1. CCAAS us within 60 days of the statement date
2. Provide transaction details: date, amount, merchant
3. Explain the reason for dispute:
   • Unauthorized transaction
   • Duplicate charge
   • Service not received
   • Incorrect amount

We will:
• Issue provisional credit within 2 business days
• Investigate within 10 business days
• Provide final resolution within 45-90 days
• Send you written confirmation`,
      relatedArticles: ['dispute-process', 'fraud-claims', 'chargeback-rights'],
      views: 4123,
      helpful: 91
    },
    {
      id: 7,
      category: 'security',
      question: 'How does HSBC protect my account from fraud?',
      answer: `HSBC's multi-layer security includes:

• 24/7 fraud monitoring with AI detection
• Two-factor authentication for online banking
• Secure chip technology on all cards
• Real-time transaction alerts
• Biometric login options (fingerprint/face ID)
• Encryption of all sensitive data
• Zero liability for unauthorized transactions*

You can enhance security by:
• Setting up transaction alerts
• Reviewing statements regularly
• Never sharing login credentials
• Using secure networks for banking`,
      relatedArticles: ['security-center', 'fraud-prevention', 'safe-banking-tips'],
      views: 3456,
      helpful: 94
    },
    {
      id: 8,
      category: 'online',
      question: 'How do I set up bill pay?',
      answer: `To set up online bill pay:

1. Log into online banking
2. Navigate to "Payments & Transfers" > "Bill Pay"
3. Click "Add Payee"
4. Search for your biller or add manually
5. Enter account details
6. Set up one-time or recurring payment
7. Review and confirm

Features available:
• Schedule payments up to 12 months ahead
• Set up automatic recurring payments
• Receive eBills directly
• Payment reminders
• Payment history tracking`,
      relatedArticles: ['bill-pay-guide', 'payment-scheduling', 'ebills'],
      views: 2987,
      helpful: 90
    }
  ]
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const toggleExpand = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }
  
  if (mode === 'manual') {
    return (
      <div className="h-full bg-gray-50 p-6" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                FAQ Assistant
              </h1>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Quick access to frequently asked questions and instant answers for customer inquiries.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Available Features
              </h2>
              <ul className="space-y-2 text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Comprehensive FAQ database with instant search</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Category-based organization for quick navigation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Detailed answers with step-by-step instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Related articles and knowledge base links</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Usage statistics and helpfulness ratings</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                <strong>Connect a customer</strong> to provide personalized answers based on their account type and history.
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
          <HelpCircle className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            FAQ Categories
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
          <div className="space-y-2 text-sm">
            <button 
              onClick={() => onKMSOpen('faq-guide')}
              className="text-blue-600 hover:underline block"
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              FAQ Guidelines
            </button>
            <button 
              onClick={() => onKMSOpen('customer-service-tips')}
              className="text-blue-600 hover:underline block"
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Service Tips
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Frequently Asked Questions
              </h1>
              <p className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Customer: {context.customerName || 'Unknown'} • Account Type: {context.customerTier || 'Standard'}
              </p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            />
          </div>
        </div>
        
        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {expandedItems.includes(faq.id) ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                          <Clock className="inline h-3 w-3 mr-1" />
                          {faq.views} views
                        </span>
                        <span className="text-xs text-gray-500" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                          <TrendingUp className="inline h-3 w-3 mr-1" />
                          {faq.helpful}% helpful
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              
              {expandedItems.includes(faq.id) && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4">
                    <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-700 whitespace-pre-line" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                      {faq.answer}
                    </div>
                    
                    {faq.relatedArticles.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                          Related Articles:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {faq.relatedArticles.map(article => (
                            <button
                              key={article}
                              onClick={() => onKMSOpen(article)}
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
                            >
                              {article.replace(/-/g, ' ')}
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                        Was this helpful?
                      </span>
                      <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                        Yes
                      </button>
                      <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredFAQs.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
              No questions found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQAssistantView
