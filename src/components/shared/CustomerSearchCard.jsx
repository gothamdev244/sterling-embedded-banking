import React, { useState } from 'react'
import { Search, User, CreditCard as CardIcon, Hash, ChevronRight } from 'lucide-react'

const CustomerSearchCard = ({ 
  searchFields = ['Customer ID', 'Account Number', 'Name'],
  onSearch,
  title = "Customer Identification",
  description = "Search and verify customer information to access account services"
}) => {
  const [searchType, setSearchType] = useState(searchFields[0])
  const [searchValue, setSearchValue] = useState('')
  const [recentSearches] = useState([
    { id: '1', type: 'Customer ID', value: 'HSBC-789456', name: 'Recent: John Smith' },
    { id: '2', type: 'Account', value: 'ACC-456789', name: 'Recent: Sarah Johnson' }
  ])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim() && onSearch) {
      onSearch({ type: searchType, value: searchValue })
    }
  }

  const getPlaceholder = () => {
    switch(searchType) {
      case 'Card Number':
        return 'Enter 16-digit card number'
      case 'Customer ID':
        return 'Enter customer ID (e.g., HSBC-123456)'
      case 'Account Number':
        return 'Enter account number'
      case 'Name':
        return 'Enter customer full name'
      default:
        return 'Enter search value'
    }
  }

  const getIcon = () => {
    switch(searchType) {
      case 'Card Number':
        return <CardIcon className="h-4 w-4" />
      case 'Customer ID':
        return <Hash className="h-4 w-4" />
      case 'Account Number':
        return <Hash className="h-4 w-4" />
      case 'Name':
        return <User className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-600" />
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Type Selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {searchFields.map((field) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => setSearchType(field)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    searchType === field
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  {getIcon()}
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>Security Notice:</strong> Customer verification is required for all account access. 
              Ensure proper authentication before proceeding with any transactions.
            </p>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h3>
              <div className="space-y-2">
                {recentSearches.map((search) => (
                  <button
                    key={search.id}
                    onClick={() => {
                      setSearchType(search.type)
                      setSearchValue(search.value)
                    }}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400">
                        {search.type === 'Customer ID' ? <Hash className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{search.value}</p>
                        <p className="text-xs text-gray-500">{search.name}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerSearchCard
