import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { TrafficOverview } from './TrafficOverview';
import { RouteManagement } from './RouteManagement';
import { VideoAnalysis } from './VideoAnalysis';
import { mockVideoAnalyses } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [journeys, setJourneys] = useState([]);
  const [routeStats, setRouteStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user || user.role !== 'admin') {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/journeys/', { 
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let journeysArray = Array.isArray(data) ? data : (data.results || []);
        setJourneys(journeysArray);

        // Aggregate route stats
        const routeMap = new Map();
        journeysArray.forEach(j => {
          const key = `${j.start_location}__${j.end_location}`;
          if (!routeMap.has(key)) {
            routeMap.set(key, {
              id: key,
              startLocation: j.start_location,
              endLocation: j.end_location,
              totalCapacity: 500,
              currentBookings: 0,
              trafficStatus: 'low',
            });
          }
          routeMap.get(key).currentBookings++;
        });

        // Calculate traffic status
        for (const route of routeMap.values()) {
          const occupancy = route.currentBookings / route.totalCapacity;
          if (occupancy > 0.9) route.trafficStatus = 'high';
          else if (occupancy > 0.6) route.trafficStatus = 'moderate';
          else route.trafficStatus = 'low';
        }

        setRouteStats(Array.from(routeMap.values()));
        setError(null);
      } catch (err) {
        console.error('Error fetching journeys:', err);
        setError('Failed to load dashboard data. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);
  
  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
          <p className="text-gray-600 mt-2">Please wait while we load your data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }
  
  const getLowTrafficRoutes = () => routeStats.filter(route => route.trafficStatus === 'low').length;
  const getModerateTrafficRoutes = () => routeStats.filter(route => route.trafficStatus === 'moderate').length;
  const getHighTrafficRoutes = () => routeStats.filter(route => route.trafficStatus === 'high').length;
  const getTotalVehiclesAnalyzed = () => 0; // Keep as 0 for now
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Monitor and manage pilgrimage traffic, routes, and video analyses.
        </p>
      </div>
      
      {/* Traffic Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700 text-lg">Low Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{getLowTrafficRoutes()}</div>
            <p className="text-green-600 text-sm mt-1">Routes with low congestion</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-700 text-lg">Moderate Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-700">{getModerateTrafficRoutes()}</div>
            <p className="text-yellow-600 text-sm mt-1">Routes with moderate congestion</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-700 text-lg">High Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{getHighTrafficRoutes()}</div>
            <p className="text-red-600 text-sm mt-1">Routes with high congestion</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 text-lg">Vehicles Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{getTotalVehiclesAnalyzed()}</div>
            <p className="text-blue-600 text-sm mt-1">Total vehicles from dashcam footage</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="analysis">Video Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <TrafficOverview routes={routeStats} />
        </TabsContent>
        
        <TabsContent value="routes" className="space-y-6">
          <RouteManagement routes={routeStats} />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <VideoAnalysis analyses={mockVideoAnalyses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
