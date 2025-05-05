
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { mockRoutes, mockVideoAnalyses } from '@/data/mockData';
import { TrafficStatus } from '@/types';
import { TrafficOverview } from './TrafficOverview';
import { RouteManagement } from './RouteManagement';
import { VideoAnalysis } from './VideoAnalysis';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!user || user.role !== 'admin') return null;
  
  const getLowTrafficRoutes = () => mockRoutes.filter(route => route.trafficStatus === 'low').length;
  const getModerateTrafficRoutes = () => mockRoutes.filter(route => route.trafficStatus === 'moderate').length;
  const getHighTrafficRoutes = () => mockRoutes.filter(route => route.trafficStatus === 'high').length;
  
  const getTotalVehiclesAnalyzed = () => 
    mockVideoAnalyses.reduce((total, analysis) => total + analysis.totalCount, 0);
  
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
          <TrafficOverview />
        </TabsContent>
        
        <TabsContent value="routes" className="space-y-6">
          <RouteManagement />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <VideoAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};
