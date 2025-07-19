import React, { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import { Plus, Search, Filter, User, Phone, Mail, MapPin, Calendar, Wrench, DollarSign, Eye } from 'lucide-react'

interface Customer {
  id: string
  first_name: string
  last_name: string
  location: string
  phone?: string
  email?: string
  total_jobs: number
  total_spent: number
  last_visit: string
  scooters: Array<{
    model: string
    last_service: string
  }>
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false)

  // Sample data based on your CSV workflow
  const sampleCustomers: Customer[] = [
    {
      id: 'cust_001',
      first_name: 'Michelle',
      last_name: 'Blackcloud',
      location: 'Warespace',
      phone: '(555) 123-4567',
      email: 'michelle.blackcloud@email.com',
      total_jobs: 1,
      total_spent: 0,
      last_visit: '2024-08-23',
      scooters: [
        { model: 'Sondors Fold X', last_service: '2024-08-23' }
      ]
    },
    {
      id: 'cust_002',
      first_name: 'Michael',
      last_name: 'Lokowich',
      location: 'Mak',
      phone: '(555) 234-5678',
      email: 'michael.lokowich@email.com',
      total_jobs: 1,
      total_spent: 0,
      last_visit: '2024-09-11',
      scooters: [
        { model: 'Segway Ninebot MAX G30LP', last_service: '2024-09-11' }
      ]
    },
    {
      id: 'cust_003',
      first_name: 'Tiffany',
      last_name: 'Langeslay',
      location: 'F15',
      phone: '(555) 345-6789',
      email: 'tiffany.langeslay@email.com',
      total_jobs: 1,
      total_spent: 110,
      last_visit: '2024-10-10',
      scooters: [
        { model: 'Evercross', last_service: '2024-10-10' }
      ]
    },
    {
      id: 'cust_004',
      first_name: 'Mason',
      last_name: 'Welken',
      location: 'F15',
      phone: '(555) 456-7890',
      email: 'mason.welken@email.com',
      total_jobs: 1,
      total_spent: 130,
      last_visit: '2024-11-09',
      scooters: [
        { model: 'F Series 9 Bot', last_service: '2024-11-09' }
      ]
    },
    {
      id: 'cust_005',
      first_name: 'Mike',
      last_name: 'Fitzpatrick',
      location: 'Warespace',
      phone: '(555) 567-8901',
      email: 'mike.fitzpatrick@email.com',
      total_jobs: 1,
      total_spent: 200,
      last_visit: '2024-11-23',
      scooters: [
        { model: 'HiBoy S2', last_service: '2024-11-23' }
      ]
    },
    {
      id: 'cust_006',
      first_name: 'Thomas',
      last_name: 'Williams',
      location: 'Warespace',
      phone: '(555) 678-9012',
      email: 'thomas.williams@email.com',
      total_jobs: 1,
      total_spent: 225,
      last_visit: '2024-11-25',
      scooters: [
        { model: 'OKAI - NEON', last_service: '2024-11-25' }
      ]
    },
    {
      id: 'cust_007',
      first_name: 'Jeffrey',
      last_name: 'Paul',
      location: '801 Transfer Road, Saint Paul, MN',
      phone: '(555) 789-0123',
      email: 'jeffrey.paul@email.com',
      total_jobs: 1,
      total_spent: 220,
      last_visit: '2024-04-27',
      scooters: [
        { model: 'Kaabo Mantis GT', last_service: '2024-04-27' }
      ]
    },
    {
      id: 'cust_008',
      first_name: 'Erick',
      last_name: 'Watts',
      location: '801 Transfer Road, Saint Paul, MN',
      phone: '(555) 890-1234',
      email: 'erick.watts@email.com',
      total_jobs: 1,
      total_spent: 50,
      last_visit: '2024-04-27',
      scooters: [
        { model: 'Philco', last_service: '2024-04-27' }
      ]
    }
  ]

  useEffect(() => {
    // Simulate loading customers
    setTimeout(() => {
      setCustomers(sampleCustomers)
      setLoading(false)
    }, 1000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase()
    const searchLower = searchTerm.toLowerCase()
    return fullName.includes(searchLower) ||
           customer.location.toLowerCase().includes(searchLower) ||
           customer.scooters.some(scooter => scooter.model.toLowerCase().includes(searchLower))
  })

  const getCustomerValue = (customer: Customer) => {
    if (customer.total_spent === 0) return 'New Customer'
    if (customer.total_spent < 100) return 'Low Value'
    if (customer.total_spent < 200) return 'Medium Value'
    return 'High Value'
  }

  const getValueColor = (value: string) => {
    switch (value) {
      case 'New Customer': return 'bg-blue-100 text-blue-800'
      case 'Low Value': return 'bg-gray-100 text-gray-800'
      case 'Medium Value': return 'bg-yellow-100 text-yellow-800'
      case 'High Value': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage customer information and repair history</p>
        </div>
        <button
          onClick={() => setShowNewCustomerModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Customer
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers by name, location, or scooter model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
            <div className="text-sm text-gray-600">Total Customers</div>
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {customer.first_name} {customer.last_name}
                  </h3>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getValueColor(getCustomerValue(customer))}`}>
                    {getCustomerValue(customer)}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{customer.location}</span>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
              )}
              {customer.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Wrench className="w-3 h-3" />
                    <span>Jobs</span>
                  </div>
                  <div className="font-semibold">{customer.total_jobs}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <DollarSign className="w-3 h-3" />
                    <span>Spent</span>
                  </div>
                  <div className="font-semibold">${customer.total_spent.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center gap-1 text-gray-600 mb-1 text-sm">
                  <Calendar className="w-3 h-3" />
                  <span>Last Visit</span>
                </div>
                <div className="text-sm font-medium">{new Date(customer.last_visit).toLocaleDateString()}</div>
              </div>

              {customer.scooters.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">Scooters</div>
                  <div className="space-y-1">
                    {customer.scooters.map((scooter, index) => (
                      <div key={index} className="text-xs bg-gray-50 rounded px-2 py-1">
                        {scooter.model}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  View History
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  New Job
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      {/* New Customer Modal Placeholder */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
            <p className="text-gray-600 mb-4">Customer creation form will be implemented next.</p>
            <button
              onClick={() => setShowNewCustomerModal(false)}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}