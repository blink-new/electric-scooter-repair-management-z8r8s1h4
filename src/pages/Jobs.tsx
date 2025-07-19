import React, { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import { Plus, Search, Filter, Clock, User, Wrench, DollarSign, AlertCircle, CheckCircle, Calendar, FileText } from 'lucide-react'

interface RepairJob {
  id: string
  customer_id: string
  customer_name: string
  scooter_model: string
  issue_description: string
  status: string
  priority: string
  technician: string
  received_date: string
  estimated_time_minutes: number
  actual_time_minutes: number
  labor_cost: number
  parts_cost: number
  total_cost: number
  location: string
  special_notes: string
}

const statusColors = {
  'received': 'bg-blue-100 text-blue-800',
  'diagnosed': 'bg-yellow-100 text-yellow-800',
  'in_progress': 'bg-orange-100 text-orange-800',
  'waiting_parts': 'bg-purple-100 text-purple-800',
  'completed': 'bg-green-100 text-green-800',
  'picked_up': 'bg-gray-100 text-gray-800',
  'on_hold': 'bg-red-100 text-red-800'
}

const priorityColors = {
  'low': 'bg-gray-100 text-gray-600',
  'normal': 'bg-blue-100 text-blue-600',
  'high': 'bg-orange-100 text-orange-600',
  'urgent': 'bg-red-100 text-red-600'
}

export default function Jobs() {
  const [jobs, setJobs] = useState<RepairJob[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showNewJobModal, setShowNewJobModal] = useState(false)

  // Sample data based on your CSV workflow
  const sampleJobs: RepairJob[] = [
    {
      id: 'job_001',
      customer_id: 'cust_001',
      customer_name: 'Michelle Blackcloud',
      scooter_model: 'Sondors Fold X',
      issue_description: "It's not catching a charge and I can't get the battery out cause there's a key and my cousin didn't have any keys with the bike",
      status: 'diagnosed',
      priority: 'normal',
      technician: 'Mak',
      received_date: '2024-08-23',
      estimated_time_minutes: 0,
      actual_time_minutes: 0,
      labor_cost: 0,
      parts_cost: 0,
      total_cost: 0,
      location: 'Warespace',
      special_notes: 'Battery initially measured ~2V, likely shorted. Need to dremel frame to remove battery.'
    },
    {
      id: 'job_002',
      customer_id: 'cust_002',
      customer_name: 'Michael Lokowich',
      scooter_model: 'Segway Ninebot MAX G30LP',
      issue_description: "Scooter charges and will turn on but for some reason will not move",
      status: 'diagnosed',
      priority: 'normal',
      technician: 'Mak',
      received_date: '2024-09-11',
      estimated_time_minutes: 60,
      actual_time_minutes: 0,
      labor_cost: 0,
      parts_cost: 0,
      total_cost: 0,
      location: 'Mak',
      special_notes: 'Green hall sensor issue in motor. Solution: replace motor.'
    },
    {
      id: 'job_003',
      customer_id: 'cust_003',
      customer_name: 'Tiffany Langeslay',
      scooter_model: 'Evercross',
      issue_description: "The power button on the right side broke off",
      status: 'completed',
      priority: 'normal',
      technician: 'Mak',
      received_date: '2024-10-10',
      estimated_time_minutes: 60,
      actual_time_minutes: 70,
      labor_cost: 85,
      parts_cost: 25,
      total_cost: 110,
      location: 'F15',
      special_notes: 'Throttle sourced and replaced. Spliced correct connector.'
    },
    {
      id: 'job_004',
      customer_id: 'cust_004',
      customer_name: 'Mason Welken',
      scooter_model: 'F Series 9 Bot',
      issue_description: "Error code 14",
      status: 'completed',
      priority: 'normal',
      technician: 'Bryce',
      received_date: '2024-11-09',
      estimated_time_minutes: 60,
      actual_time_minutes: 57,
      labor_cost: 95,
      parts_cost: 35,
      total_cost: 130,
      location: 'F15',
      special_notes: 'Replaced throttle. Adjusted rear brakes. Added missing headunit screws.'
    },
    {
      id: 'job_005',
      customer_id: 'cust_005',
      customer_name: 'Mike Fitzpatrick',
      scooter_model: 'HiBoy S2',
      issue_description: "The bolt in the back wheel keeps coming out/wheel is loose",
      status: 'picked_up',
      priority: 'normal',
      technician: 'Hans',
      received_date: '2024-11-23',
      estimated_time_minutes: 40,
      actual_time_minutes: 45,
      labor_cost: 120,
      parts_cost: 80,
      total_cost: 200,
      location: 'Warespace',
      special_notes: 'Replaced rear rim and tire (used). Replaced rear rotor. Adjusted disc brake.'
    },
    {
      id: 'job_006',
      customer_id: 'cust_006',
      customer_name: 'Thomas Williams',
      scooter_model: 'OKAI - NEON',
      issue_description: "Handle bars are loose, and it stopped charging",
      status: 'picked_up',
      priority: 'normal',
      technician: 'Mak',
      received_date: '2024-11-25',
      estimated_time_minutes: 60,
      actual_time_minutes: 120,
      labor_cost: 180,
      parts_cost: 45,
      total_cost: 225,
      location: 'Warespace',
      special_notes: 'Updated quote after original was accepted. Need to check OKAI order from last year.'
    }
  ]

  useEffect(() => {
    // Simulate loading jobs
    setTimeout(() => {
      setJobs(sampleJobs)
      setLoading(false)
    }, 1000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.scooter_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.issue_description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <Clock className="w-4 h-4" />
      case 'diagnosed': return <AlertCircle className="w-4 h-4" />
      case 'in_progress': return <Wrench className="w-4 h-4" />
      case 'waiting_parts': return <AlertCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'picked_up': return <CheckCircle className="w-4 h-4" />
      case 'on_hold': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatTime = (minutes: number) => {
    if (minutes === 0) return 'Not set'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Repair Jobs</h1>
          <p className="text-gray-600 mt-1">Manage all scooter repair jobs and track progress</p>
        </div>
        <button
          onClick={() => setShowNewJobModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobs, customers, or scooter models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="received">Received</option>
              <option value="diagnosed">Diagnosed</option>
              <option value="in_progress">In Progress</option>
              <option value="waiting_parts">Waiting Parts</option>
              <option value="completed">Completed</option>
              <option value="picked_up">Picked Up</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.customer_name}</h3>
                    <p className="text-sm text-gray-600">{job.scooter_model}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status as keyof typeof statusColors]}`}>
                      {getStatusIcon(job.status)}
                      {formatStatus(job.status)}
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${priorityColors[job.priority as keyof typeof priorityColors]}`}>
                      {job.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{job.issue_description}</p>
                
                {job.special_notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-amber-800">{job.special_notes}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Tech:</span>
                    <span className="font-medium">{job.technician}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Received:</span>
                    <span className="font-medium">{new Date(job.received_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">
                      {job.actual_time_minutes > 0 ? formatTime(job.actual_time_minutes) : formatTime(job.estimated_time_minutes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">
                      {job.total_cost > 0 ? `$${job.total_cost.toFixed(2)}` : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Status
                </button>
                <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* New Job Modal Placeholder */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Job</h2>
            <p className="text-gray-600 mb-4">Job creation form will be implemented next.</p>
            <button
              onClick={() => setShowNewJobModal(false)}
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