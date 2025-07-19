import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Stethoscope, 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  Zap,
  Battery,
  Gauge,
  Wrench,
  ArrowRight,
  Play,
  RotateCcw
} from 'lucide-react'

export function Diagnostics() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null)

  const diagnosticSteps = [
    'Select Scooter Model',
    'Describe Symptoms',
    'AI Analysis',
    'Diagnostic Results'
  ]

  const scooterModels = [
    { name: 'Xiaomi Mi Pro 2', brand: 'Xiaomi', popular: true },
    { name: 'Segway Ninebot ES4', brand: 'Segway', popular: true },
    { name: 'Razor E300', brand: 'Razor', popular: false },
    { name: 'Gotrax GXL V2', brand: 'Gotrax', popular: true },
    { name: 'Hiboy S2', brand: 'Hiboy', popular: false },
    { name: 'Swagtron Swagger 5', brand: 'Swagtron', popular: false },
  ]

  const commonSymptoms = [
    { id: 'no-power', label: 'No power/won\'t turn on', category: 'electrical' },
    { id: 'battery-drain', label: 'Battery drains quickly', category: 'battery' },
    { id: 'slow-charging', label: 'Slow or no charging', category: 'battery' },
    { id: 'reduced-speed', label: 'Reduced top speed', category: 'performance' },
    { id: 'brake-issues', label: 'Brake problems', category: 'mechanical' },
    { id: 'tire-wear', label: 'Tire wear/damage', category: 'mechanical' },
    { id: 'strange-noise', label: 'Strange noises', category: 'mechanical' },
    { id: 'display-error', label: 'Display errors', category: 'electrical' },
    { id: 'throttle-unresponsive', label: 'Throttle unresponsive', category: 'electrical' },
    { id: 'folding-mechanism', label: 'Folding mechanism stuck', category: 'mechanical' },
  ]

  const mockDiagnosticResult = {
    primaryIssue: 'Battery Management System Failure',
    confidence: 92,
    estimatedTime: '2-3 hours',
    estimatedCost: '$180-250',
    severity: 'medium',
    parts: [
      { name: 'BMS Board', cost: '$45', availability: 'in-stock' },
      { name: 'Battery Connector', cost: '$12', availability: 'in-stock' }
    ],
    steps: [
      'Disconnect battery and inspect BMS board',
      'Test voltage output from each cell',
      'Replace faulty BMS board',
      'Reconnect and test charging cycle',
      'Perform full system test'
    ]
  }

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const runDiagnostic = () => {
    setCurrentStep(2)
    // Simulate AI processing
    setTimeout(() => {
      setDiagnosticResults(mockDiagnosticResult)
      setCurrentStep(3)
    }, 3000)
  }

  const resetDiagnostic = () => {
    setCurrentStep(0)
    setSelectedSymptoms([])
    setDiagnosticResults(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span>AI Diagnostics</span>
          </h1>
          <p className="text-gray-600">Let AI help diagnose scooter issues quickly and accurately</p>
        </div>
        <Button variant="outline" onClick={resetDiagnostic}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New Diagnosis
        </Button>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {diagnosticSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < diagnosticSteps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Step {currentStep + 1}: {diagnosticSteps[currentStep]}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Scooter Model</CardTitle>
            <CardDescription>Choose the scooter model you're diagnosing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scooterModels.map((model, index) => (
                <div key={index} className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{model.name}</h3>
                    {model.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                  </div>
                  <p className="text-sm text-gray-500">{model.brand}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setCurrentStep(1)}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Describe Symptoms</CardTitle>
            <CardDescription>Select all symptoms that apply to this scooter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {['electrical', 'battery', 'performance', 'mechanical'].map(category => (
                <div key={category}>
                  <h3 className="font-medium text-gray-900 mb-3 capitalize flex items-center space-x-2">
                    {category === 'electrical' && <Zap className="w-4 h-4" />}
                    {category === 'battery' && <Battery className="w-4 h-4" />}
                    {category === 'performance' && <Gauge className="w-4 h-4" />}
                    {category === 'mechanical' && <Wrench className="w-4 h-4" />}
                    <span>{category} Issues</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {commonSymptoms
                      .filter(symptom => symptom.category === category)
                      .map(symptom => (
                        <div
                          key={symptom.id}
                          onClick={() => handleSymptomToggle(symptom.id)}
                          className={`
                            border rounded-lg p-3 cursor-pointer transition-colors
                            ${selectedSymptoms.includes(symptom.id) 
                              ? 'border-primary bg-primary/5' 
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`
                              w-4 h-4 rounded border-2 flex items-center justify-center
                              ${selectedSymptoms.includes(symptom.id) 
                                ? 'border-primary bg-primary' 
                                : 'border-gray-300'
                              }
                            `}>
                              {selectedSymptoms.includes(symptom.id) && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span className="text-sm">{symptom.label}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Back
              </Button>
              <Button 
                onClick={runDiagnostic}
                disabled={selectedSymptoms.length === 0}
              >
                <Brain className="w-4 h-4 mr-2" />
                Run AI Diagnosis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 animate-pulse text-primary" />
              <span>AI Analysis in Progress</span>
            </CardTitle>
            <CardDescription>Our AI is analyzing the symptoms and generating a diagnosis...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <p className="text-gray-600 mb-4">Analyzing {selectedSymptoms.length} symptoms...</p>
              <Progress value={66} className="w-full max-w-md mx-auto" />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✓ Processing symptom patterns</p>
              <p>✓ Consulting repair database</p>
              <p className="animate-pulse">⏳ Generating recommendations...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && diagnosticResults && (
        <div className="space-y-6">
          {/* Main Result */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Diagnosis Complete</span>
                </span>
                <Badge variant={diagnosticResults.severity === 'high' ? 'destructive' : 'default'}>
                  {diagnosticResults.confidence}% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {diagnosticResults.primaryIssue}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>⏱️ Est. Time: {diagnosticResults.estimatedTime}</span>
                    <span>💰 Est. Cost: {diagnosticResults.estimatedCost}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Parts */}
          <Card>
            <CardHeader>
              <CardTitle>Required Parts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {diagnosticResults.parts.map((part: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{part.name}</p>
                      <p className="text-sm text-gray-500">{part.cost}</p>
                    </div>
                    <Badge variant={part.availability === 'in-stock' ? 'default' : 'destructive'}>
                      {part.availability}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Repair Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Repair Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {diagnosticResults.steps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              Start Repair Job
            </Button>
            <Button variant="outline" className="flex-1">
              Save Diagnosis
            </Button>
            <Button variant="outline" onClick={resetDiagnostic}>
              New Diagnosis
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}