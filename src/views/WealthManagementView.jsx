import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  BarChart3,
  Target,
  FileText,
  User,
  Calculator,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Shield,
  Banknote,
  Building
} from 'lucide-react'

export default function WealthManagementView({ context, onKMSOpen }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [riskTolerance, setRiskTolerance] = useState('moderate')
  const [timeHorizon, setTimeHorizon] = useState('5-10years')

  const hasCustomerContext = !!(context?.customerId && context?.customerId !== '')
  const customerName = context?.customerName || 'Customer'

  // Mock portfolio data
  const portfolioData = {
    totalValue: 485750,
    totalGain: 45750,
    gainPercentage: 10.4,
    performance: 'positive',
    lastUpdated: 'Oct 15, 2024'
  }

  const holdings = [
    { name: 'Equity Funds', value: 195000, percentage: 40.1, change: 8.5, color: 'bg-blue-500' },
    { name: 'Bond Funds', value: 146300, percentage: 30.1, change: 2.3, color: 'bg-green-500' },
    { name: 'International', value: 97150, percentage: 20.0, change: 12.1, color: 'bg-purple-500' },
    { name: 'Real Estate', value: 47300, percentage: 9.8, change: -1.2, color: 'bg-orange-500' }
  ]

  const recentTransactions = [
    { type: 'Buy', security: 'Global Equity Fund', amount: 5000, date: '2024-10-10', status: 'Completed' },
    { type: 'Dividend', security: 'Bond Index Fund', amount: 125, date: '2024-10-05', status: 'Received' },
    { type: 'Sell', security: 'Tech Growth Fund', amount: 2500, date: '2024-10-01', status: 'Completed' },
    { type: 'Buy', security: 'Emerging Markets', amount: 3000, date: '2024-09-28', status: 'Completed' }
  ]

  const investmentRecommendations = [
    {
      type: 'ESG Equity Fund',
      expectedReturn: '8-12%',
      riskLevel: 'Medium',
      minInvestment: 1000,
      description: 'Sustainable investment focusing on environmental and social governance'
    },
    {
      type: 'Government Bonds',
      expectedReturn: '3-5%',
      riskLevel: 'Low',
      minInvestment: 500,
      description: 'Stable income with capital preservation'
    },
    {
      type: 'International Diversified',
      expectedReturn: '10-15%',
      riskLevel: 'High',
      minInvestment: 2500,
      description: 'Global exposure with emerging market opportunities'
    }
  ]

  const planningGoals = [
    { name: 'Retirement Planning', target: 1000000, current: 485750, timeframe: '20 years', priority: 'High' },
    { name: 'Emergency Fund', target: 50000, current: 35000, timeframe: '2 years', priority: 'Medium' },
    { name: 'Education Fund', target: 150000, current: 45000, timeframe: '12 years', priority: 'High' },
    { name: 'Home Purchase', target: 80000, current: 25000, timeframe: '5 years', priority: 'Medium' }
  ]

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wealth Management</h1>
            <p className="text-sm text-gray-600">
              {hasCustomerContext ? `Portfolio overview for ${customerName}` : 'Comprehensive wealth management and investment planning'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onKMSOpen?.('investment-guide')}>
              <FileText className="h-4 w-4 mr-2" />
              Investment Guide
            </Button>
            {hasCustomerContext && (
              <Button size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="planning">Financial Planning</TabsTrigger>
            <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
          </TabsList>

          {/* Portfolio Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Portfolio Summary */}
              <div className="lg:col-span-2 space-y-6">
                {/* Portfolio Value Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Portfolio Performance
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Last updated: {portfolioData.lastUpdated}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Total Portfolio Value</p>
                        <p className="text-3xl font-bold text-gray-900">
                          £{portfolioData.totalValue.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Total Gain/Loss</p>
                        <div className="flex items-center justify-center gap-1">
                          {portfolioData.performance === 'positive' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-2xl font-bold ${
                            portfolioData.performance === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            £{Math.abs(portfolioData.totalGain).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Performance</p>
                        <div className="flex items-center justify-center gap-1">
                          {portfolioData.performance === 'positive' ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-2xl font-bold ${
                            portfolioData.performance === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {portfolioData.gainPercentage > 0 ? '+' : ''}{portfolioData.gainPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Asset Allocation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Asset Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {holdings.map((holding, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${holding.color}`} />
                              <span className="font-medium text-gray-900">{holding.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">
                                  £{holding.value.toLocaleString()}
                                </span>
                                <span className={`text-sm flex items-center gap-1 ${
                                  holding.change >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {holding.change >= 0 ? (
                                    <TrendingUp className="h-3 w-3" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3" />
                                  )}
                                  {Math.abs(holding.change)}%
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">{holding.percentage}%</span>
                            </div>
                          </div>
                          <Progress value={holding.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Recent Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentTransactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              transaction.type === 'Buy' ? 'bg-green-100 text-green-600' :
                              transaction.type === 'Sell' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {transaction.type === 'Buy' ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : transaction.type === 'Sell' ? (
                                <ArrowDownRight className="h-4 w-4" />
                              ) : (
                                <DollarSign className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.type} - {transaction.security}</p>
                              <p className="text-sm text-gray-600">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">£{transaction.amount.toLocaleString()}</p>
                            <Badge variant="outline" className="text-xs">
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Customer Info */}
                {hasCustomerContext && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investor Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-500">Customer</Label>
                        <p className="font-medium">{customerName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Risk Profile</Label>
                        <Badge className={getRiskColor('medium')}>Moderate Risk</Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Investment Tier</Label>
                        <Badge variant="outline">{context.customerTier || 'Premium'}</Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Portfolio Manager</Label>
                        <p className="text-sm">Sarah Johnson</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Make Investment
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Calculator className="h-4 w-4 mr-2" />
                      Portfolio Analyzer
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Set Financial Goals
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Reports
                    </Button>
                  </CardContent>
                </Card>

                {/* Market Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Market Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">FTSE 100</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-sm font-medium">+0.8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">S&P 500</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-sm font-medium">+1.2%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">GBP/USD</span>
                      <div className="flex items-center gap-1 text-red-600">
                        <TrendingDown className="h-3 w-3" />
                        <span className="text-sm font-medium">-0.3%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Gold</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-sm font-medium">+0.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Investment Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentRecommendations.map((investment, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{investment.type}</h4>
                            <p className="text-sm text-gray-600">{investment.description}</p>
                          </div>
                          <Badge className={getRiskColor(investment.riskLevel)}>
                            {investment.riskLevel} Risk
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">Expected Return</p>
                            <p className="font-medium text-green-600">{investment.expectedReturn}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Minimum</p>
                            <p className="font-medium">£{investment.minInvestment.toLocaleString()}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Learn More
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Investment Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="investment-amount">Investment Amount (£)</Label>
                    <Input
                      id="investment-amount"
                      type="number"
                      placeholder="10000"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                    <select
                      id="risk-tolerance"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={riskTolerance}
                      onChange={(e) => setRiskTolerance(e.target.value)}
                    >
                      <option value="conservative">Conservative</option>
                      <option value="moderate">Moderate</option>
                      <option value="aggressive">Aggressive</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="time-horizon">Time Horizon</Label>
                    <select
                      id="time-horizon"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(e.target.value)}
                    >
                      <option value="1-3years">1-3 years</option>
                      <option value="3-5years">3-5 years</option>
                      <option value="5-10years">5-10 years</option>
                      <option value="10+years">10+ years</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Projected Results</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Recommended Portfolio:</span>
                        <span className="font-medium text-blue-900">Balanced Growth</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Expected Annual Return:</span>
                        <span className="font-medium text-blue-900">7-9%</span>
                      </div>
                      {investmentAmount && (
                        <div className="flex justify-between">
                          <span className="text-blue-700">Projected Value (10 years):</span>
                          <span className="font-medium text-blue-900">
                            £{(parseFloat(investmentAmount) * 2).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button className="w-full">
                    Get Detailed Proposal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Planning Tab */}
          <TabsContent value="planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Financial Goals Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {planningGoals.map((goal, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{goal.name}</h4>
                          <p className="text-sm text-gray-600">Target: {goal.timeframe}</p>
                        </div>
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority} Priority
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            £{goal.current.toLocaleString()} / £{goal.target.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((goal.current / goal.target) * 100)}% complete
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                          Monthly target: £{Math.round((goal.target - goal.current) / (parseInt(goal.timeframe) * 12)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-amber-900 mb-2">Portfolio Risk Level: Moderate</h4>
                    <p className="text-sm text-amber-700">
                      Your current portfolio has a balanced risk profile suitable for medium-term growth with moderate volatility.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Volatility Score</span>
                      <Badge variant="outline">6.5/10</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Diversification Score</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">8.2/10</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sharpe Ratio</span>
                      <Badge variant="outline">1.4</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Beta (vs Market)</span>
                      <Badge variant="outline">0.85</Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Download Risk Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Asset Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">FSCS Protected</p>
                          <p className="text-sm text-green-700">Up to £85,000 per person</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Banknote className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Investment Insurance</p>
                          <p className="text-sm text-blue-700">Additional coverage available</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Protection Summary</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Regulatory protection via FCA</li>
                      <li>• Segregated client assets</li>
                      <li>• Professional indemnity insurance</li>
                      <li>• Regular third-party audits</li>
                    </ul>
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
