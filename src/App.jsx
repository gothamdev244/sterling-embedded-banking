import { useState, useEffect } from 'react'
import './App.css'

// Views for different intents
import CreditCardActionsView from './views/CreditCardActionsView'
import FraudAlertView from './views/FraudAlertView'
import MortgageApplicationView from './views/MortgageApplicationView'
import InternationalTransferView from './views/InternationalTransferView'
import AccountUpgradeView from './views/AccountUpgradeView'
import BusinessLoanView from './views/BusinessLoanView'
import TravelNotificationView from './views/TravelNotificationView'
import PortfolioReviewView from './views/PortfolioReviewView'
import StudentLoanView from './views/StudentLoanView'
import StandingOrderView from './views/StandingOrderView'
import OverdraftRequestView from './views/OverdraftRequestView'
import FirstCreditCardView from './views/FirstCreditCardView'
import AccountBalanceView from './views/AccountBalanceView'
import PersonalLoanView from './views/PersonalLoanView'
import ManualModeView from './views/ManualModeView'
// Role-exclusive views
import ExecutiveBankingDashboard from './views/ExecutiveBankingDashboard'
import BankingOperationsControl from './views/BankingOperationsControl'
import ProfessionalBankingToolkit from './views/ProfessionalBankingToolkit'
import PrivateWealthCenter from './views/PrivateWealthCenter'
import TeamOverviewView from './views/TeamOverviewView'
// New tool views
import QuickBalanceCheckView from './views/QuickBalanceCheckView'
import ChatTemplatesView from './views/ChatTemplatesView'
import FAQAssistantView from './views/FAQAssistantView'
// New missing views
import EligibilityCheckView from './views/EligibilityCheckView'
import WealthManagementView from './views/WealthManagementView'
import AccountManagementView from './views/AccountManagementView'
import CustomerHistoryView from './views/CustomerHistoryView'

function App() {
  const [currentIntent, setCurrentIntent] = useState(null)
  const [context, setContext] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const [directAccess, setDirectAccess] = useState(false)
  const [mode, setMode] = useState('manual') // 'manual' or 'context'

  // Iframe communication handler
  useEffect(() => {
    const handleMessage = (event) => {
      console.log('🔍 [EMBEDDED APP] Received message:', event.data)
      
      // Handle messages from parent iframe
      if (event.data?.type === 'host.ping') {
        console.log('🔍 [EMBEDDED APP] Responding to ping with ready message')
        
        // Respond to ping with pong to complete handshake
        const response = {
          type: 'app.ready',
          tabId: event.data.tabId,
          ready: true,
          timestamp: Date.now()
        }
        
        console.log('🔍 [EMBEDDED APP] Sending response:', response)
        event.source.postMessage(response, event.origin)
      }
    }

    console.log('🔍 [EMBEDDED APP] Message listener attached')
    window.addEventListener('message', handleMessage)
    return () => {
      console.log('🔍 [EMBEDDED APP] Message listener removed')
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  // Force Segoe UI continuously and aggressively
  useEffect(() => {
    const enforceFont = () => {
      // Add extremely aggressive CSS font enforcement
      const style = document.createElement('style');
      style.id = 'force-segoe-ui';
      style.innerHTML = `
        * {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        *::before, *::after {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        html, body, #root {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        div, span, p, h1, h2, h3, h4, h5, h6, strong, em, b, i, u {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        button, input, select, textarea, label, a, li, ul, ol, table, td, th {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        .text-2xl, .text-xl, .text-lg, .text-base, .text-sm, .text-xs {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        .font-bold, .font-semibold, .font-medium, .font-normal, .font-light {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
      `;
      
      // Remove existing style if present
      const existing = document.getElementById('force-segoe-ui');
      if (existing) existing.remove();
      
      document.head.appendChild(style);
      
      // Also set styles directly on multiple elements
      document.body.style.setProperty('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 'important');
      document.documentElement.style.setProperty('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 'important');
      
      // Force on all existing elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.setProperty('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 'important');
        }
      });
    };
    
    enforceFont();
    
    // Re-enforce every 500ms to override any dynamic styles
    const interval = setInterval(enforceFont, 500);
    
    // Also enforce on any DOM mutations
    const observer = new MutationObserver(enforceFont);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Handle messages from parent
    const handleMessage = (event) => {
      console.log('[EmbeddedApp] Message received:', {
        origin: event.origin,
        type: event.data?.type,
        data: event.data
      })
      
      // MAGICAL CORS: Auto-detect allowed origins for universal deployment
      const getMagicalOrigins = () => {
        const origins = []
        
        // Production origins from environment
        const prodOrigins = window.location.hostname !== 'localhost' ? 
          [window.location.origin] : []
        origins.push(...prodOrigins)
        
        // Development magic: All localhost ports (when running locally)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          for (let port = 3000; port <= 9999; port++) {
            origins.push(`http://localhost:${port}`)
            origins.push(`http://127.0.0.1:${port}`)
          }
          // Base localhost (for nginx proxy)
          origins.push('http://localhost', 'http://127.0.0.1')
        }
        
        return origins
      }
      
      const allowedOrigins = getMagicalOrigins()
      
      if (!allowedOrigins.includes(event.origin)) {
        console.warn('[EmbeddedApp] Rejected message from:', event.origin, 'Allowed:', allowedOrigins)
        return
      }

      console.log('[EmbeddedApp] Processing message type:', event.data.type)

      switch (event.data.type) {
        case 'host.ping':
          console.log('[EmbeddedApp] Received ping, sending ready response')
          // Respond to ping with ready signal
          const readyMessage = { 
            type: 'embed.ready',
            tabId: event.data.tabId // Include tab ID if provided
          }
          console.log('[EmbeddedApp] Sending ready message:', readyMessage)
          console.log('[EmbeddedApp] 🔍 DEBUG - Ping response context:', {
            currentOrigin: window.location.origin,
            receivedFrom: event.origin,
            isInIframe: window !== window.top
          })
          window.parent.postMessage(readyMessage, '*')
          break
          
        case 'health.ping':
          // Respond to health check
          window.parent.postMessage({ type: 'health.pong' }, '*')
          break
          
        case 'host.state':
          // Initial state from host
          console.log('[EmbeddedApp] Received host.state:', {
            context: event.data.context,
            customerId: event.data.context?.customerId,
            customerName: event.data.context?.customerName,
            intent: event.data.context?.intent,
            mode: event.data.context?.mode
          })
          setContext(event.data.context)
          // Only update intent if we don't already have one from URL or if the host sends a real intent
          if (event.data.context.intent && 
              event.data.context.intent !== 'manual_launch' && 
              event.data.context.intent !== currentIntent) {
            console.log('[EmbeddedApp] Updating intent from host.state:', event.data.context.intent)
            setCurrentIntent(event.data.context.intent)
          }
          // Set mode based on customer context availability
          const hasContext = !!(event.data.context.customerId && event.data.context.customerId !== '')
          console.log('📱 [TRACE] EmbeddedApp received host.state message:', {
            hasContext,
            customerId: event.data.context?.customerId,
            customerName: event.data.context?.customerName,
            mode: hasContext ? 'context' : 'manual',
            fullContext: event.data.context,
            timestamp: new Date().toISOString()
          })
          setMode(hasContext ? 'context' : 'manual')
          setIsConnected(true)
          break
          
        case 'intent.changed':
          // Intent changed in Space Copilot
          setCurrentIntent(event.data.intent)
          setContext(prev => ({ ...prev, ...event.data.context }))
          break
          
        case 'context.updated':
          // Context update
          setContext(prev => ({ ...prev, ...event.data.context }))
          break
          
        default:
          console.log('Unknown message type:', event.data.type)
      }
    }

    window.addEventListener('message', handleMessage)

    // Check if we're in iframe or direct access
    // Enhanced detection for proxy scenarios where origin is same
    const hasAppKey = window.location.search.includes('appKey=')
    const isProxyAccess = window.location.pathname === '/' && hasAppKey
    const isInIframe = !isProxyAccess && (window.self !== window.top || 
                      window.location.href.includes('/embedded-apps/') ||
                      (window.parent && window.parent !== window.self))
    console.log('[EmbeddedApp] Initial load - isInIframe:', isInIframe, 'URL:', window.location.href)
    console.log('[EmbeddedApp] Iframe detection details:', {
      'window.self !== window.top': window.self !== window.top,
      'URL contains /embedded-apps/': window.location.href.includes('/embedded-apps/'),
      'parent check': window.parent !== window.self,
      'pathname': window.location.pathname,
      'search': window.location.search,
      'isProxyAccess': isProxyAccess,
      'final isInIframe': isInIframe
    })
    
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const intentFromUrl = urlParams.get('intent')
    const tabIdFromUrl = urlParams.get('tabId')
    const modeFromUrl = urlParams.get('mode')
    const appKeyFromUrl = urlParams.get('appKey')
    const customerNameFromUrl = urlParams.get('customerName')
    const emailFromUrl = urlParams.get('email')
    const phoneFromUrl = urlParams.get('phone')
    const locationFromUrl = urlParams.get('location')
    const accountNumberFromUrl = urlParams.get('accountNumber')
    const accountTypeFromUrl = urlParams.get('accountType')
    const cinFromUrl = urlParams.get('cin')
    const customerIdFromUrl = urlParams.get('customerId')
    const customerTierFromUrl = urlParams.get('customerTier')
    
    console.log('[EmbeddedApp] URL params:', { 
      intent: intentFromUrl, 
      tabId: tabIdFromUrl,
      mode: modeFromUrl,
      appKey: appKeyFromUrl,
      customerName: customerNameFromUrl,
      email: emailFromUrl,
      phone: phoneFromUrl,
      location: locationFromUrl,
      customerId: customerIdFromUrl
    })
    
    if (modeFromUrl) {
      setMode(modeFromUrl)
    }
    
    // Set initial context from URL parameters
    if (customerIdFromUrl || customerNameFromUrl || emailFromUrl || phoneFromUrl) {
      const initialContext = {
        customerId: customerIdFromUrl || '',
        customerName: customerNameFromUrl || '',
        email: emailFromUrl || '',
        phone: phoneFromUrl || '',
        location: locationFromUrl || '',
        accountNumber: accountNumberFromUrl || '',
        accountType: accountTypeFromUrl || '',
        customerTier: customerTierFromUrl || '',
        cin: cinFromUrl || '',
        intent: intentFromUrl || ''
      }
      console.log('[EmbeddedApp] Setting initial context from URL:', initialContext)
      setContext(initialContext)
    }
    
    if (intentFromUrl && intentFromUrl !== 'manual_launch') {
      setCurrentIntent(intentFromUrl)
    } else if (appKeyFromUrl) {
      // Map app key to intent - handle both underscored and regular formats
      console.log('[EmbeddedApp] Setting intent from appKey:', appKeyFromUrl)
      // Map app keys to their corresponding view intents
      const appKeyMapping = {
        // Core banking services
        'credit_card_management': 'credit_card_transactions',
        'fraud_alert': 'fraud_alert',
        'business_loan': 'business_loan',
        'mortgage_application': 'mortgage_application',
        'account_upgrade': 'account_upgrade',
        'international_transfer': 'international_transfer',
        'account_balance': 'account_balance',
        'portfolio_review': 'portfolio_review',
        'portfolio_analysis_request': 'portfolio_review',
        'student_loan': 'student_loan',
        'standing_order': 'standing_order',
        'overdraft_request': 'overdraft_request',
        'first_credit_card': 'first_credit_card',
        'travel_notification': 'travel_notification',
        'personal_loan': 'loan_application',
        
        // Role-exclusive apps
        'executive_banking_dashboard': 'executive_banking_dashboard',
        'banking_operations_control': 'banking_operations_control',
        'professional_banking_toolkit': 'professional_banking_toolkit',
        'private_wealth_center': 'private_wealth_center',
        
        // Team/management apps
        'team_performance': 'team_performance',
        'team_performance_analytics': 'team_performance_analytics',
        'team_overview': 'team_performance',
        
        // Management/Escalation apps - will show generic page
        'escalation_hub': 'escalation_hub',
        'escalation_management_hub': 'escalation_hub',
        'supervisor_dashboard': 'supervisor_dashboard',
        'manager_analytics': 'manager_analytics',
        
        // Communication/Support apps
        'chat_templates': 'chat_templates',
        'chat_response_templates': 'chat_templates',
        'response_templates': 'chat_templates',
        'knowledge_base': 'knowledge_base',
        'customer_insights': 'customer_insights',
        
        // Tool apps
        'quick_balance_check': 'quick_balance_check',
        'quick_balance': 'quick_balance_check',
        'balance_check': 'quick_balance_check',
        'faq_assistant': 'faq_assistant',
        'faq': 'faq_assistant',
        'frequently_asked_questions': 'faq_assistant',
        
        // New missing views
        'eligibility_check': 'eligibility_check',
        'eligibility_assessment': 'eligibility_check',
        'wealth_management': 'wealth_management',
        'investment_planning': 'wealth_management',
        'portfolio_management': 'wealth_management',
        'account_management': 'account_management',
        'account_settings': 'account_management',
        'profile_management': 'account_management',
        'customer_history': 'customer_history',
        'interaction_history': 'customer_history',
        'customer_timeline': 'customer_history',
        
        // Any other app will fall through to default case
      }
      
      const mappedIntent = appKeyMapping[appKeyFromUrl] || appKeyFromUrl
      console.log('[EmbeddedApp] 🎯 MAPPED INTENT:', mappedIntent, 'from appKey:', appKeyFromUrl)
      setCurrentIntent(mappedIntent)
    } else if (modeFromUrl === 'manual' && !intentFromUrl && !appKeyFromUrl) {
      // Default to credit card management for manual mode with no specific app
      console.log('[EmbeddedApp] Manual mode with no app specified, defaulting to credit_card_transactions')
      setCurrentIntent('credit_card_transactions')
    }
    
    if (hasAppKey) {
      // Has appKey - render immediately (whether iframe or direct)
      console.log('[EmbeddedApp] AppKey detected, rendering immediately:', appKeyFromUrl)
      setIsConnected(true)
      
      // Always send ready message when we have appKey (for iframe integration)
      // This handles both real iframes and proxy scenarios
      const sendReadyMessage = () => {
        const initialReady = { 
          type: 'embed.ready',
          tabId: tabIdFromUrl // Include tab ID from URL if available
        }
        console.log('[EmbeddedApp] 🚀 Sending ready message:', initialReady, 'to parent')
        console.log('[EmbeddedApp] 🔍 DEBUG - Current context:', {
          currentOrigin: window.location.origin,
          parentOrigin: window.parent !== window ? 'exists' : 'no parent',
          isInIframe: window !== window.top,
          tabId: tabIdFromUrl,
          messageTarget: '*'
        })
        window.parent.postMessage(initialReady, '*')
      }
      
      // Send immediately and with retries - works for both iframe and proxy cases
      sendReadyMessage()
      setTimeout(sendReadyMessage, 50)
      setTimeout(sendReadyMessage, 200)
      setTimeout(sendReadyMessage, 500)
      setTimeout(sendReadyMessage, 1000)
    } else if (!isInIframe) {
      // Direct access without appKey - show default view after 2 seconds
      console.log('[EmbeddedApp] Direct access mode detected')
      setTimeout(() => {
        setDirectAccess(true)
        setIsConnected(true)
        setContext({
          customerName: 'Demo Customer',
          customerId: 'demo-123',
          agentId: 'agent-demo'
        })
      }, 2000)
    } else {
      // In iframe without appKey - notify parent we're ready
      console.log('[EmbeddedApp] Iframe mode detected, sending initial ready message')
      
      const sendReadyMessage = () => {
        const initialReady = { 
          type: 'embed.ready',
          tabId: tabIdFromUrl // Include tab ID from URL if available
        }
        console.log('[EmbeddedApp] 🚀 Sending iframe ready message:', initialReady)
        window.parent.postMessage(initialReady, '*')
      }
      
      // Send immediately and with retries
      sendReadyMessage()
      setTimeout(sendReadyMessage, 50)
      setTimeout(sendReadyMessage, 200)
      setTimeout(sendReadyMessage, 500)
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Send height updates to parent when content changes
  useEffect(() => {
    const sendHeightUpdate = () => {
      const height = document.documentElement.scrollHeight
      window.parent.postMessage({ type: 'resize', height }, '*')
    }

    // Send initial height
    sendHeightUpdate()

    // Create resize observer to watch for content changes
    const resizeObserver = new ResizeObserver(() => {
      sendHeightUpdate()
    })

    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  }, [currentIntent, isConnected])

  // Helper to send messages to parent
  const sendToParent = (message) => {
    window.parent.postMessage(message, '*')
  }

  // Open KMS article
  const openKMSArticle = (articleId) => {
    sendToParent({
      type: 'kms.open',
      articleId
    })
  }

  // Handle intent selection in manual mode
  const handleSelectIntent = (intent) => {
    setCurrentIntent(intent)
    // Notify parent about intent selection if in iframe
    if (window.self !== window.top) {
      sendToParent({
        type: 'intent.selected',
        intent: intent
      })
    }
  }
  
  // Render view based on current intent and mode
  const renderView = () => {
    console.log('[EmbeddedApp] renderView called:', {
      mode,
      currentIntent,
      hasCustomerId: !!context.customerId,
      customerId: context.customerId,
      customerName: context.customerName,
      contextKeys: Object.keys(context),
      fullContext: context,
      urlParams: window.location.search
    })
    
    // Only show manual mode view when there's truly no intent or it's explicitly manual_launch
    // But NEVER for apps that came with an appKey
    if ((!currentIntent || currentIntent === 'manual_launch') && !window.location.search.includes('appKey=')) {
      console.log('[EmbeddedApp] 🚫 Showing ManualModeView because no intent or manual_launch. currentIntent:', currentIntent)
      return <ManualModeView onSelectIntent={handleSelectIntent} />
    }
    
    console.log('[EmbeddedApp] ✅ Rendering view for intent:', currentIntent, 'with context:', context)
    console.log('[EmbeddedApp] 🔍 Switch statement checking intent:', currentIntent)
    
    // Otherwise render the appropriate view
    switch (currentIntent) {
      case 'credit_card_transactions':
      case 'credit_card_management':
        console.log('[EmbeddedApp] Rendering CreditCardActionsView')
        return <CreditCardActionsView 
          context={context} 
          onKMSOpen={openKMSArticle}
        />
      
      case 'fraud_alert':
        return <FraudAlertView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'mortgage_application':
        return <MortgageApplicationView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'international_transfer':
        return <InternationalTransferView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'account_upgrade':
        return <AccountUpgradeView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'account_balance':
      case 'balance_inquiry':
      case 'account_balance_inquiry':
      case 'balance_check':
        // Account Balance View with dual-mode support
        return <AccountBalanceView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'business_loan':
        return <BusinessLoanView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'travel_notification':
        return <TravelNotificationView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'portfolio_review':
      case 'portfolio_analysis_request':
      case 'investment_advice':
        return <PortfolioReviewView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'student_loan':
        return <StudentLoanView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'standing_order':
        return <StandingOrderView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'overdraft_request':
      case 'student_overdraft':
        return <OverdraftRequestView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'first_credit_card':
        return <FirstCreditCardView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'credit_increase':
        return <CreditCardActionsView 
          context={context} 
          onKMSOpen={openKMSArticle}
        />
      
      case 'loan_application':
      case 'personal_loan':
      case 'loan_inquiry':
        return <PersonalLoanView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      // Role-exclusive banking apps
      case 'executive_banking_dashboard':
        console.log('[EmbeddedApp] 🏆 MATCHED: executive_banking_dashboard - Rendering ExecutiveBankingDashboard')
        return <ExecutiveBankingDashboard
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'banking_operations_control':
        console.log('[EmbeddedApp] 🔧 MATCHED: banking_operations_control - Rendering BankingOperationsControl')
        return <BankingOperationsControl
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'professional_banking_toolkit':
        console.log('[EmbeddedApp] 💼 MATCHED: professional_banking_toolkit - Rendering ProfessionalBankingToolkit')
        return <ProfessionalBankingToolkit
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'private_wealth_center':
        console.log('[EmbeddedApp] 💎 MATCHED: private_wealth_center - Rendering PrivateWealthCenter')
        return <PrivateWealthCenter
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'team_performance':
      case 'team_performance_analytics':
        console.log('[EmbeddedApp] 📊 MATCHED: team_performance - Rendering TeamOverviewView')
        return <TeamOverviewView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'quick_balance_check':
      case 'quick_balance':
        console.log('[EmbeddedApp] 💰 MATCHED: quick_balance_check - Rendering QuickBalanceCheckView')
        return <QuickBalanceCheckView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'chat_templates':
      case 'chat_response_templates':
      case 'response_templates':
        console.log('[EmbeddedApp] 💬 MATCHED: chat_templates - Rendering ChatTemplatesView')
        return <ChatTemplatesView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'faq_assistant':
      case 'faq':
      case 'frequently_asked_questions':
        console.log('[EmbeddedApp] ❓ MATCHED: faq_assistant - Rendering FAQAssistantView')
        return <FAQAssistantView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'eligibility_check':
      case 'eligibility_assessment':
        console.log('[EmbeddedApp] ✅ MATCHED: eligibility_check - Rendering EligibilityCheckView')
        return <EligibilityCheckView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'wealth_management':
      case 'investment_planning':
      case 'portfolio_management':
        console.log('[EmbeddedApp] 💰 MATCHED: wealth_management - Rendering WealthManagementView')
        return <WealthManagementView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'account_management':
      case 'account_settings':
      case 'profile_management':
        console.log('[EmbeddedApp] ⚙️ MATCHED: account_management - Rendering AccountManagementView')
        return <AccountManagementView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      case 'customer_history':
      case 'interaction_history':
      case 'customer_timeline':
        console.log('[EmbeddedApp] 📝 MATCHED: customer_history - Rendering CustomerHistoryView')
        return <CustomerHistoryView
          context={context}
          onKMSOpen={openKMSArticle}
        />
      
      default:
        console.log('[EmbeddedApp] ❌ DEFAULT CASE HIT! Intent not matched:', currentIntent)
        console.log('[EmbeddedApp] 🔍 Mode:', mode, 'Context customerId:', context.customerId)
        
        // For ANY app in manual mode (no customer context), show a generic service page
        // The frontend already filtered what apps you can see based on your role
        if (mode === 'manual' || !context.customerId) {
          return (
            <div className="h-full bg-gray-50 p-6" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    {currentIntent?.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </h1>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                      This service requires customer context. Connect a customer to access full functionality.
                    </p>
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    <p>Service ID: {currentIntent}</p>
                    <p>Mode: Manual (No customer connected)</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
        // For context mode with unknown intent
        return (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Service: {currentIntent}</h2>
              <p className="text-gray-600">Customer: {context.customerName || 'Unknown'}</p>
              <p className="text-sm text-gray-500 mt-2">This service view is not yet implemented.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="bg-white">
      {!isConnected ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Connecting to parent application...</p>
          </div>
        </div>
      ) : directAccess ? (
        <div className="bg-white">
          {/* Intent selector for direct access */}
          <div className="border-b bg-gray-50 p-4">
            <h2 className="text-lg font-semibold mb-3">HSBC Banking Scenarios - Font Test</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'fraud_alert', name: 'Fraud Alert' },
                { id: 'mortgage_application', name: 'Mortgage Application' },
                { id: 'international_transfer', name: 'International Transfer' },
                { id: 'account_upgrade', name: 'Account Upgrade' },
                { id: 'business_loan', name: 'Business Loan' },
                { id: 'travel_notification', name: 'Travel Notification' },
                { id: 'portfolio_review', name: 'Portfolio Review' },
                { id: 'student_loan', name: 'Student Loan' },
                { id: 'standing_order', name: 'Standing Order' },
                { id: 'overdraft_request', name: 'Overdraft Request' },
                { id: 'first_credit_card', name: 'First Credit Card' },
                { id: 'credit_card_transactions', name: 'Credit Card' },
                { id: 'eligibility_check', name: 'Eligibility Check' },
                { id: 'wealth_management', name: 'Wealth Management' },
                { id: 'account_management', name: 'Account Management' },
                { id: 'customer_history', name: 'Customer History' }
              ].map(intent => (
                <button
                  key={intent.id}
                  onClick={() => setCurrentIntent(intent.id)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentIntent === intent.id 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {intent.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Current Intent: <strong>{currentIntent}</strong> | Font: Segoe UI
            </p>
          </div>
          {renderView()}
        </div>
      ) : (
        renderView()
      )}
    </div>
  )
}

export default App
 
