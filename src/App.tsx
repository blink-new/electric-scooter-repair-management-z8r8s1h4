import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Dashboard } from '@/pages/Dashboard'
import { Diagnostics } from '@/pages/Diagnostics'
import Jobs from '@/pages/Jobs'
import Customers from '@/pages/Customers'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/diagnostics" element={<Diagnostics />} />
              <Route path="/guides" element={<div className="p-6"><h1 className="text-2xl font-bold">Repair Guides</h1><p className="text-gray-600">Coming soon...</p></div>} />
              <Route path="/parts" element={<div className="p-6"><h1 className="text-2xl font-bold">Parts Sourcing</h1><p className="text-gray-600">Coming soon...</p></div>} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/invoicing" element={<div className="p-6"><h1 className="text-2xl font-bold">Invoicing</h1><p className="text-gray-600">Coming soon...</p></div>} />
              <Route path="/scheduling" element={<div className="p-6"><h1 className="text-2xl font-bold">Scheduling</h1><p className="text-gray-600">Coming soon...</p></div>} />
              <Route path="/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-gray-600">Coming soon...</p></div>} />
              <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600">Coming soon...</p></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App