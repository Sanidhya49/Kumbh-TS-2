import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockJourneys } from '@/data/mockData';
import { Journey } from '@/types';
import { JourneyList } from './JourneyList';
import { ProfileInfo } from './ProfileInfo';
import { VehicleList } from './VehicleList';
import { DashcamUpload } from './DashcamUpload';

export const UserDashboard = () => {
  const { user, fetchUserVehicles, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    if (activeTab === 'vehicles' && user) {
      fetchUserVehicles().then(vehicles => {
        console.log('Fetched vehicles:', vehicles); // Debug: see what is returned
        // Only update if vehicles actually changed
        if (JSON.stringify(user.vehicles) !== JSON.stringify(vehicles)) {
          setUser({ ...user, vehicles });
          localStorage.setItem('kumbhTsUser', JSON.stringify({ ...user, vehicles }));
        }
      });
    }
    // Remove 'user' from dependencies to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, fetchUserVehicles, setUser]);
  
  if (!user) return null;
  
  // Filter journeys for this user
  const userJourneys = mockJourneys.filter(journey => journey.userId === user.id);
  
  const upcomingJourneys = userJourneys.filter(journey => journey.status === 'upcoming');
  const pastJourneys = userJourneys.filter(journey => journey.status === 'completed');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.fullName}</h1>
        <p className="text-gray-600">
          Manage your pilgrimage journeys, vehicles, and personal information.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="journeys">Journeys</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="dashcam">Dashcam</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <ProfileInfo user={user} />
            </TabsContent>
            
            <TabsContent value="journeys" className="space-y-6">
              <JourneyList 
                upcomingJourneys={upcomingJourneys} 
                pastJourneys={pastJourneys} 
              />
            </TabsContent>
            
            <TabsContent value="vehicles" className="space-y-6">
              <VehicleList vehicles={user.vehicles} />
            </TabsContent>
            
            <TabsContent value="dashcam" className="space-y-6">
              <DashcamUpload />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Journey Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-kumbh-blue">{upcomingJourneys.length}</div>
                  <div className="text-sm text-gray-600">Upcoming Journeys</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{pastJourneys.length}</div>
                  <div className="text-sm text-gray-600">Completed Journeys</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">{user.vehicles.length}</div>
                  <div className="text-sm text-gray-600">Registered Vehicles</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {upcomingJourneys.reduce((total, journey) => total + journey.passengers, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Passengers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Next journey card */}
          {upcomingJourneys.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Next Journey</CardTitle>
                <CardDescription>Your upcoming pilgrimage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-kumbh-blue to-kumbh-teal text-white p-4 rounded-lg">
                  <div className="mb-2 text-sm font-medium opacity-80">
                    {new Date(upcomingJourneys[0].startDate).toLocaleDateString()} - {new Date(upcomingJourneys[0].endDate).toLocaleDateString()}
                  </div>
                  <div className="text-xl font-bold mb-1">
                    {upcomingJourneys[0].startLocation} to {upcomingJourneys[0].endLocation}
                  </div>
                  <div className="text-sm opacity-90">
                    {upcomingJourneys[0].passengers} passengers
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between items-center">
                      <div className="text-sm opacity-80">Booking date:</div>
                      <div className="text-sm font-medium">
                        {new Date(upcomingJourneys[0].bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Help card */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our support team is available 24/7 to assist you with any questions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-kumbh-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@kumbh-ts.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-kumbh-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 123 456 7890</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
