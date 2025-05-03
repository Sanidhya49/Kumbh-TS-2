
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About KUMBH-TS</h1>
          <p className="text-gray-600 text-lg">
            Pilgrimage Traffic Management System for Indian Roadways
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              KUMBH-TS (Kumbh Traffic System) is dedicated to improving the pilgrimage experience by efficiently managing vehicle traffic during major religious festivals and gatherings across India. Our mission is to reduce congestion, improve safety, and make spiritual journeys smoother for all devotees.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Our comprehensive traffic management approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-kumbh-blue pl-4">
                <h3 className="font-bold mb-1">Vehicle Registration</h3>
                <p className="text-gray-600">
                  We require all drivers to register their vehicles with essential details and identification proof. This helps us maintain an accurate count of vehicles traveling on each route.
                </p>
              </div>
              
              <div className="border-l-4 border-kumbh-blue pl-4">
                <h3 className="font-bold mb-1">Route Allocation</h3>
                <p className="text-gray-600">
                  We limit the number of vehicles per route to prevent overcrowding. Only 500 vehicles are allowed per major route, and specific sections may have even lower limits.
                </p>
              </div>
              
              <div className="border-l-4 border-kumbh-blue pl-4">
                <h3 className="font-bold mb-1">Real-time Monitoring</h3>
                <p className="text-gray-600">
                  Using dashcam footage from drivers and officials, we analyze traffic patterns in real-time. Our ML-powered system counts vehicles and categorizes congestion levels.
                </p>
              </div>
              
              <div className="border-l-4 border-kumbh-blue pl-4">
                <h3 className="font-bold mb-1">Data-Driven Decisions</h3>
                <p className="text-gray-600">
                  Traffic data helps authorities make informed decisions about route closures, diversions, and capacity adjustments during peak pilgrimage seasons.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pilgrimage Locations</CardTitle>
            <CardDescription>
              Major pilgrimage sites covered by our system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Kumbh Mela</h3>
                <p className="text-sm text-gray-600">
                  The largest religious gathering in the world, held at four river bank locations across India on a rotating schedule.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Badrinath</h3>
                <p className="text-sm text-gray-600">
                  A Hindu temple dedicated to Lord Vishnu, located in Uttarakhand state in the Himalayan mountains.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Jagannath Yatra</h3>
                <p className="text-sm text-gray-600">
                  The annual chariot festival at Puri's Jagannath Temple in Odisha, attracting millions of devotees.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Ujjain</h3>
                <p className="text-sm text-gray-600">
                  Home to the Mahakaleshwar Jyotirlinga, one of the twelve Jyotirlinga shrines of Lord Shiva.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg col-span-1 md:col-span-2">
                <h3 className="font-bold mb-2">Kedarnath Mandir</h3>
                <p className="text-sm text-gray-600">
                  A Hindu temple dedicated to Lord Shiva, located in the Himalayan range in Uttarakhand state.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Technology</CardTitle>
            <CardDescription>
              How we leverage technology to manage pilgrimage traffic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              KUMBH-TS uses cutting-edge technology to monitor and manage traffic flow during pilgrimage seasons:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-kumbh-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-kumbh-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">ML-Powered Vehicle Detection</h3>
                  <p className="text-gray-600">
                    Using YOLO v8 machine learning models to detect and count vehicles from dashcam footage, allowing for accurate traffic analysis.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-kumbh-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-kumbh-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Congestion Algorithm</h3>
                  <p className="text-gray-600">
                    Proprietary algorithms analyze vehicle density to categorize traffic as low, moderate, or high, triggering appropriate management responses.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-kumbh-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-kumbh-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Automated Communication</h3>
                  <p className="text-gray-600">
                    Email notifications keep travelers informed about their journey status, route changes, or congestion alerts.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-kumbh-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-kumbh-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Admin Dashboard</h3>
                  <p className="text-gray-600">
                    Comprehensive dashboard for authorities to monitor all routes, adjust capacity limits, and view real-time traffic data.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
