import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CustomerContext from '../components/actions/CustomerContext';
import ActionProgress from '../components/actions/ActionProgress';
import { 
  TrendingUp,
  TrendingDown,
  PieChart,
  AttachMoney as DollarSign,
  BarChart as BarChart3,
  CalendarToday as Calendar,
  CheckCircle,
  Error as AlertCircle,
  MyLocation as Target,
  Description as FileText,
  Calculate as Calculator,
  Business as Building,
  Public as Globe,
  Percent,
  NorthEast as ArrowUpRight,
  SouthEast as ArrowDownRight,
  Info,
  Phone,
  Group as Users
} from '@mui/icons-material';

const PortfolioReviewView = ({ context, onKMSOpen }) => {
  // Determine which customer story we're showing
  const isSarah = context.customerName?.includes('Sarah') || context.customerName?.includes('Chen');
  const isJames = context.customerName?.includes('James') || context.customerName?.includes('Wilson');
  const isAlexander = context.customerName?.includes('Alexander') || context.customerName?.includes('Sterling');
  
  // Default to Alexander if not specifically Sarah or James
  const customerType = isSarah ? 'sarah' : isJames ? 'james' : 'alexander';
  
  const [actions, setActions] = useState([
    { id: 1, label: 'Portfolio Analysis', status: 'completed', description: 'Current holdings reviewed' },
    { id: 2, label: 'Risk Assessment', status: 'completed', description: 'Balanced risk profile confirmed' },
    { id: 3, label: 'Rebalancing Strategy', status: 'completed', description: 'Rebalancing proposal ready' },
    { id: 4, label: 'Implementation', status: 'pending', description: 'Execute recommended changes' }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

  // Dynamic customer data based on who's calling
  const getCustomerData = () => {
    switch (customerType) {
      case 'sarah':
        return {
          name: context.customerName || 'Sarah Chen Wei',
          accountNumber: 'JAD-789234',
          phoneNumber: '+852 2234 5678',
          email: 'sarah.chenwei@email.com',
          address: 'Hong Kong',
          accountType: 'Jade Banking',
          riskLevel: 'balanced',
          verificationStatus: 'verified'
        };
      case 'james':
        return {
          name: context.customerName || 'James Wilson',
          accountNumber: 'ADV-567890',
          phoneNumber: '+1-312-555-0345',
          email: 'j.wilson@email.com',
          address: 'Chicago, IL',
          accountType: 'HSBC Advance',
          riskLevel: 'balanced',
          verificationStatus: 'verified'
        };
      default: // alexander
        return {
          name: context.customerName || 'Alexander Sterling',
          accountNumber: 'PRM-123456',
          phoneNumber: '+44 20 7123 4567',
          email: 'alexander.sterling@email.com',
          address: 'Edinburgh, UK',
          accountType: 'Premier Banking',
          riskLevel: 'balanced',
          verificationStatus: 'verified'
        };
    }
  };
  
  const customer = getCustomerData();

  // Dynamic portfolio summary based on customer
  const getPortfolioSummary = () => {
    switch (customerType) {
      case 'sarah':
        return {
          totalValue: 2000000,  // HK$2M portfolio
          ytdReturn: 8.5,
          monthlyChange: 2.1,
          riskScore: 6.0,
          lastReview: '2025-01-08',
          benchmarkComparison: 'Outperforming Hang Seng by 2.3%',
          currency: 'HKD'
        };
      case 'james':
        return {
          totalValue: 325000,  // $325K portfolio 
          ytdReturn: 6.8,
          monthlyChange: 1.5,
          riskScore: 5.2,
          lastReview: '2025-01-12',
          benchmarkComparison: 'Tracking S&P 500 closely',
          currency: 'USD'
        };
      default: // alexander
        return {
          totalValue: 850000,
          ytdReturn: 7.2,
          monthlyChange: 1.8,
          riskScore: 5.5,
          lastReview: '2025-01-10',
          benchmarkComparison: 'Outperforming FTSE by 1.8%',
          currency: 'GBP'
        };
    }
  };
  
  const portfolioSummary = getPortfolioSummary();

  // Dynamic asset allocation based on customer
  const getAssetAllocation = () => {
    switch (customerType) {
      case 'sarah':
        return [
          { category: 'HK/China Equities', allocation: 35, target: 30, value: 700000, change: 12.3, color: 'bg-red-600' },
          { category: 'Singapore REITs', allocation: 25, target: 25, value: 500000, change: 9.8, color: 'bg-blue-400' },
          { category: 'US Tech Equities', allocation: 20, target: 20, value: 400000, change: 15.2, color: 'bg-blue-600' },
          { category: 'Asian Bonds', allocation: 10, target: 15, value: 200000, change: 3.2, color: 'bg-green-500' },
          { category: 'Alternative Investments', allocation: 7, target: 7, value: 140000, change: 8.5, color: 'bg-purple-500' },
          { category: 'Cash', allocation: 3, target: 3, value: 60000, change: 1.0, color: 'bg-gray-500' }
        ];
      case 'james':
        return [
          { category: 'US Large Cap', allocation: 40, target: 35, value: 130000, change: 7.8, color: 'bg-blue-600' },
          { category: 'US Small/Mid Cap', allocation: 25, target: 25, value: 81250, change: 5.9, color: 'bg-blue-400' },
          { category: 'International Developed', allocation: 15, target: 20, value: 48750, change: 6.2, color: 'bg-green-600' },
          { category: 'US Bonds', allocation: 12, target: 12, value: 39000, change: 2.1, color: 'bg-green-500' },
          { category: 'Real Estate (REITs)', allocation: 5, target: 5, value: 16250, change: 8.7, color: 'bg-purple-500' },
          { category: 'Cash', allocation: 3, target: 3, value: 9750, change: 0.8, color: 'bg-gray-500' }
        ];
      default: // alexander
        return [
          { category: 'UK Equities', allocation: 45, target: 40, value: 382500, change: 8.9, color: 'bg-blue-600' },
          { category: 'International Equities', allocation: 25, target: 30, value: 212500, change: 6.1, color: 'bg-blue-400' },
          { category: 'UK Bonds', allocation: 20, target: 20, value: 170000, change: 2.8, color: 'bg-green-500' },
          { category: 'Alternative Investments', allocation: 7, target: 7, value: 59500, change: 11.2, color: 'bg-purple-500' },
          { category: 'Cash', allocation: 3, target: 3, value: 25500, change: 1.2, color: 'bg-gray-500' }
        ];
    }
  };
  
  const assetAllocation = getAssetAllocation();

  // Dynamic top holdings based on customer
  const getTopHoldings = () => {
    switch (customerType) {
      case 'sarah':
        return [
          { name: 'Hang Seng Tech ETF', value: 400000, allocation: 20.0, change: 15.2, risk: 'High' },
          { name: 'Singapore REIT Fund', value: 300000, allocation: 15.0, change: 9.8, risk: 'Medium' },
          { name: 'HSBC China Opportunities', value: 250000, allocation: 12.5, change: 11.5, risk: 'Medium-High' },
          { name: 'US Tech Leaders Fund', value: 200000, allocation: 10.0, change: 18.7, risk: 'High' },
          { name: 'Asian Investment Grade Bonds', value: 150000, allocation: 7.5, change: 3.2, risk: 'Low' }
        ];
      case 'james':
        return [
          { name: 'S&P 500 Index Fund', value: 65000, allocation: 20.0, change: 7.8, risk: 'Medium' },
          { name: 'Total Stock Market ETF', value: 48750, allocation: 15.0, change: 5.9, risk: 'Medium' },
          { name: 'International Developed Fund', value: 39000, allocation: 12.0, change: 6.2, risk: 'Medium' },
          { name: 'US Aggregate Bond Fund', value: 32500, allocation: 10.0, change: 2.1, risk: 'Low' },
          { name: 'Real Estate Investment Trust', value: 16250, allocation: 5.0, change: 8.7, risk: 'Medium-High' }
        ];
      default: // alexander
        return [
          { name: 'FTSE 100 Index Fund', value: 170000, allocation: 20.0, change: 8.9, risk: 'Medium' },
          { name: 'UK Corporate Bond Fund', value: 127500, allocation: 15.0, change: 2.8, risk: 'Low' },
          { name: 'HSBC Global Equity Fund', value: 106250, allocation: 12.5, change: 6.1, risk: 'Medium' },
          { name: 'UK Mid-Cap Growth Fund', value: 85000, allocation: 10.0, change: 12.4, risk: 'Medium-High' },
          { name: 'European Equity Fund', value: 68000, allocation: 8.0, change: 4.7, risk: 'Medium' }
        ];
    }
  };
  
  const topHoldings = getTopHoldings();

  // Dynamic recommendations based on customer
  const getRecommendations = () => {
    switch (customerType) {
      case 'sarah':
        return [
          {
            type: 'Singapore REIT Opportunity',
            priority: 'High',
            description: 'Increase Singapore REIT allocation for stable income',
            action: 'Allocate additional HK$200,000 to Singapore REITs',
            impact: '+8% dividend yield with currency diversification'
          },
          {
            type: 'Bond Rebalancing',
            priority: 'Medium',
            description: 'Increase Asian bond allocation to meet target',
            action: 'Move HK$100,000 from equities to Asian bonds',
            impact: 'Reduced portfolio volatility while maintaining returns'
          },
          {
            type: 'Tech Sector Review',
            priority: 'Medium',
            description: 'Review US tech exposure given recent performance',
            action: 'Consider profit-taking on 20% of tech holdings',
            impact: 'Lock in gains and reduce concentration risk'
          }
        ];
      case 'james':
        return [
          {
            type: 'Home Equity Line Expansion',
            priority: 'High',
            description: 'Leverage additional equity for portfolio growth',
            action: 'Increase HELOC from $50,000 to $75,000 for investments',
            impact: 'Additional $25K available for diversified equity allocation'
          },
          {
            type: 'International Diversification',
            priority: 'Medium',
            description: 'Increase international developed market exposure',
            action: 'Reallocate $16,250 from US Large Cap to International',
            impact: 'Better geographic diversification and currency exposure'
          },
          {
            type: '401k Contribution Review',
            priority: 'Medium',
            description: 'Maximize employer matching and tax benefits',
            action: 'Increase 401k contribution to capture full employer match',
            impact: 'Tax-deferred growth with guaranteed employer matching'
          }
        ];
      default: // alexander
        return [
          {
            type: 'International Diversification',
            priority: 'High',
            description: 'Increase international equity allocation to reduce UK concentration risk',
            action: 'Reallocate £42,500 from UK to international equities',
            impact: '+0.4% expected annual return with lower volatility'
          },
          {
            type: 'UK Market Opportunity',
            priority: 'Medium',
            description: 'Current UK market conditions offer value opportunities',
            action: 'Consider selective UK value positions within 40% target',
            impact: 'Enhanced UK market exposure with value tilt'
          },
          {
            type: 'ESG Integration',
            priority: 'Medium',
            description: 'Align investments with sustainability goals',
            action: 'Allocate 15% to ESG-focused UK equity funds',
            impact: 'Sustainable investing without sacrificing returns'
          }
        ];
    }
  };
  
  const recommendations = getRecommendations();

  const performanceMetrics = {
    sharpeRatio: 1.34,
    volatility: 12.8,
    maxDrawdown: -8.4,
    beta: 0.92
  };

  const updateActionStatus = (actionId, newStatus, description) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, description, timestamp: new Date().toISOString() } 
        : action
    ));
  };

  const handleImplementRecommendations = () => {
    // Set final action to in_progress first  
    updateActionStatus(4, 'in_progress', 'Scheduling relationship manager meeting...');
    
    // Complete final action after short delay
    setTimeout(() => {
      switch (customerType) {
        case 'sarah':
          updateActionStatus(4, 'completed', 'Jade specialist meeting scheduled');
          break;
        case 'james':
          updateActionStatus(4, 'completed', 'Advance manager meeting scheduled');
          break;
        default: // alexander
          updateActionStatus(4, 'completed', 'Premier manager meeting scheduled');
      }
    }, 2000);
  };

  const handleSchedulePremierMeeting = () => {
    switch (customerType) {
      case 'sarah':
        alert('Jade Banking investment specialist consultation scheduled. You will receive a Singapore REIT allocation proposal within 24 hours with exclusive Jade Banking opportunities.');
        break;
      case 'james':
        alert('HSBC Advance relationship manager meeting scheduled for this week. You will receive a home equity line expansion proposal within 24 hours with personalized investment opportunities.');
        break;
      default: // alexander
        alert('Premier relationship manager meeting scheduled for this week. You will receive a detailed rebalancing proposal within 24 hours focusing on international diversification opportunities.');
    }
  };

  const formatCurrency = (amount) => {
    switch (customerType) {
      case 'sarah':
        return new Intl.NumberFormat('zh-HK', {
          style: 'currency',
          currency: 'HKD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(amount);
      case 'james':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(amount);
      default: // alexander
        return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(amount);
    }
  };

  return (
    <div className="bg-white p-4">
      {/* Professional Header */}
      <div className="mb-4 border-l-4 border-gray-800 pl-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {customerType === 'sarah' 
                ? 'Jade Banking Portfolio Analysis' 
                : customerType === 'james' 
                ? 'HSBC Advance Portfolio Analysis'
                : 'Premier Portfolio Analysis'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {customerType === 'sarah'
                ? `HK$2M Investment Portfolio • Singapore REIT Focus • ${portfolioSummary.ytdReturn}% YTD Performance`
                : customerType === 'james'
                ? `$325K Chicago Portfolio • US Equity Focus • ${portfolioSummary.ytdReturn}% YTD Performance`
                : `£850K Edinburgh Portfolio • UK Equity Focus • ${portfolioSummary.ytdReturn}% YTD Performance`}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            REV-2025-7834
          </Badge>
        </div>
      </div>

      {/* Customer Context */}
      <CustomerContext customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Portfolio Overview */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Portfolio Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold text-blue-900">{formatCurrency(portfolioSummary.totalValue)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">YTD Return</p>
                  <p className="text-lg font-semibold text-green-900">+{portfolioSummary.ytdReturn}%</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">
                    {customerType === 'sarah' 
                      ? 'vs Hang Seng' 
                      : customerType === 'james'
                      ? 'vs S&P 500'
                      : 'vs FTSE 100'}
                  </p>
                  <p className="text-lg font-semibold text-purple-900">
                    {customerType === 'sarah' 
                      ? '+2.3%' 
                      : customerType === 'james'
                      ? '+0.8%'
                      : '+1.8%'}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <Target className="h-6 w-6 text-amber-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Risk Score</p>
                  <p className="text-lg font-semibold text-amber-900">{portfolioSummary.riskScore}/10</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Last Review: {portfolioSummary.lastReview}</p>
                <p className="text-xs text-gray-500 mt-1">Next scheduled review: December 2025</p>
              </div>
            </CardContent>
          </Card>

          {/* Asset Allocation */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Asset Allocation vs Target
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {assetAllocation.map((asset, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                        <span className="font-medium">{asset.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(asset.value)}</p>
                        <p className="text-xs text-green-600">+{asset.change}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current: {asset.allocation}%</span>
                        <span className="text-gray-600">Target: {asset.target}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${asset.color}`} 
                          style={{ width: `${asset.allocation}%` }}
                        ></div>
                        <div 
                          className="w-0.5 h-2 bg-gray-800 relative -top-2" 
                          style={{ marginLeft: `${asset.target}%` }}
                        ></div>
                      </div>
                      {asset.allocation !== asset.target && (
                        <p className="text-xs text-amber-600">
                          {asset.allocation > asset.target ? 'Overweight' : 'Underweight'} by {Math.abs(asset.allocation - asset.target)}%
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Holdings */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="h-4 w-4" />
                Top Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {topHoldings.map((holding, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{holding.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-600">{holding.allocation}% of portfolio</span>
                        <Badge 
                          variant="outline"
                          className={
                            holding.risk === 'Low' ? 'bg-green-50 text-green-700 border-green-200' :
                            holding.risk === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }
                        >
                          {holding.risk} Risk
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(holding.value)}</p>
                      <div className="flex items-center gap-1">
                        {holding.change > 0 ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-600" />
                        )}
                        <span className={`text-sm ${holding.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.change > 0 ? '+' : ''}{holding.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4" />
                Investment Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{rec.type}</h4>
                          <Badge 
                            variant="outline"
                            className={rec.priority === 'High' 
                              ? 'bg-red-50 text-red-700 border-red-200' 
                              : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }
                          >
                            {rec.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="text-sm font-medium text-blue-900">Recommended Action:</p>
                        <p className="text-sm text-blue-700">{rec.action}</p>
                      </div>
                      <div className="p-2 bg-green-50 rounded">
                        <p className="text-sm font-medium text-green-900">Expected Impact:</p>
                        <p className="text-sm text-green-700">{rec.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-gray-600">Sharpe Ratio</p>
                  <p className="text-lg font-semibold">{performanceMetrics.sharpeRatio}</p>
                  <p className="text-xs text-green-600">Above benchmark</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-gray-600">Volatility</p>
                  <p className="text-lg font-semibold">{performanceMetrics.volatility}%</p>
                  <p className="text-xs text-gray-600">12-month average</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-gray-600">Max Drawdown</p>
                  <p className="text-lg font-semibold">{performanceMetrics.maxDrawdown}%</p>
                  <p className="text-xs text-yellow-600">Within tolerance</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-gray-600">Beta</p>
                  <p className="text-lg font-semibold">{performanceMetrics.beta}</p>
                  <p className="text-xs text-gray-600">
                    {customerType === 'sarah' 
                      ? 'vs Hang Seng' 
                      : customerType === 'james'
                      ? 'vs S&P 500'
                      : 'vs FTSE 100'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <ActionProgress actions={actions} />

          {/* Review Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Review Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-700"
                onClick={handleImplementRecommendations}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Implement Recommendations
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Risk Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Risk Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Tolerance</span>
                <span className="font-medium">Balanced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Risk</span>
                <Badge className="bg-blue-100 text-blue-800">Balanced</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Horizon</span>
                <span className="font-medium">10+ years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Focus</span>
                <span className="font-medium">
                  {customerType === 'sarah' 
                    ? 'Singapore REITs & Asian Growth' 
                    : customerType === 'james'
                    ? 'US Equity & Home Equity Growth'
                    : 'UK Equity & Diversification'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3 bg-gray-50">
              <CardTitle className="text-base">Resources</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('INVESTMENT_GUIDE')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Investment Guide
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => onKMSOpen('RISK_CALCULATOR')}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Risk Calculator
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={handleSchedulePremierMeeting}
              >
                <Phone className="h-4 w-4 mr-2" />
                {customerType === 'sarah' 
                  ? 'Schedule Jade Specialist Meeting' 
                  : customerType === 'james'
                  ? 'Schedule Advance Manager Meeting'
                  : 'Schedule Premier Manager Meeting'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortfolioReviewView;
