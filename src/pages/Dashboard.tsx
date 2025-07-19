import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Wrench, 
  DollarSign, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Package
} from 'lucide-react'

export function Dashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$1,130',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      description: 'This month'
    },
    {
      title: 'Active Jobs',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Wrench,
      description: 'In progress'
    },
    {
      title: 'Customers',
      value: '12',
      change: '+4',
      trend: 'up',
      icon: Users,
      description: 'Total registered'
    },
    {
      title: 'Avg Repair Time',
      value: '1.2 hrs',
      change: '-20min',
      trend: 'down',
      icon: Clock,
      description: 'Per job'
    }
  ]

  const recentJobs = [
    {
      id: 'JOB-001',
      customer: 'Michelle Blackcloud',
      scooter: 'Sondors Fold X',
      issue: "Battery not charging, can't remove battery without key",
      status: 'in-progress',
      priority: 'high',
      estimatedTime: 'TBD',
      progress: 45
    },
    {
      id: 'JOB-002',
      customer: 'Michael Lokowich',
      scooter: 'Segway Ninebot MAX G30LP',
      issue: 'Scooter charges and turns on but will not move',
      status: 'pending',
      priority: 'medium',
      estimatedTime: '1 hour',
      progress: 25
    },
    {
      id: 'JOB-003',
      customer: 'Mason Welken',
      scooter: 'F Series 9 Bot',
      issue: 'Error code 14',
      status: 'completed',
      priority: 'normal',
      estimatedTime: '57 minutes',
      progress: 100
    }
  ]

  const lowStockParts = [
    { name: 'Throttle (Universal)', stock: 2, minStock: 5 },
    { name: 'Brake Pads (Disc)', stock: 3, minStock: 8 },
    { name: 'Tire 8.5" Pneumatic', stock: 1, minStock: 4 },
    { name: 'Hall Sensors', stock: 0, minStock: 3 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your repair shop.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-500" />
                )}
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5" />
              <span>Recent Jobs</span>
            </CardTitle>
            <CardDescription>
              Track the progress of ongoing repair jobs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {job.id}
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900">{job.customer}</p>
                      <p className="text-sm text-gray-500">{job.scooter}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={job.priority === 'high' ? 'destructive' : job.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {job.priority}
                    </Badge>
                    {job.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : job.status === 'in-progress' ? (
                      <Clock className="h-4 w-4 text-blue-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{job.issue}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{job.progress}% • Est. {job.estimatedTime}</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Low Stock Alert</span>
            </CardTitle>
            <CardDescription>
              Parts that need restocking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockParts.map((part, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{part.name}</p>
                  <p className="text-xs text-gray-500">
                    {part.stock} left (min: {part.minStock})
                  </p>
                </div>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              Order Parts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Wrench className="h-6 w-6" />
              <span className="text-sm">New Repair</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Add Customer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span className="text-sm">Check Inventory</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">View Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}