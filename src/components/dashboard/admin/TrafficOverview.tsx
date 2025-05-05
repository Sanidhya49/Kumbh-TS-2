
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRoutes, mockVideoAnalyses } from '@/data/mockData';

export const TrafficOverview = () => {
  // Data for traffic status distribution
  const trafficStatusData = [
    { name: 'Low', value: mockRoutes.filter(route => route.trafficStatus === 'low').length, color: '#10B981' },
    { name: 'Moderate', value: mockRoutes.filter(route => route.trafficStatus === 'moderate').length, color: '#F59E0B' },
    { name: 'High', value: mockRoutes.filter(route => route.trafficStatus === 'high').length, color: '#EF4444' },
  ];
  
  // Data for vehicle distribution
  const vehicleDistribution = mockVideoAnalyses.reduce((acc, analysis) => {
    Object.entries(analysis.vehicleCounts).forEach(([type, count]) => {
      if (!acc.find(item => item.name === type)) {
        acc.push({ name: type, value: 0 });
      }
      
      const index = acc.findIndex(item => item.name === type);
      acc[index].value += count;
    });
    
    return acc;
  }, [] as { name: string, value: number }[]);
  
  // Sort vehicle distribution by count
  vehicleDistribution.sort((a, b) => b.value - a.value);
  
  // Data for route occupancy
  const routeOccupancy = mockRoutes.map(route => ({
    name: `${route.startLocation} - ${route.endLocation}`,
    occupancy: Math.floor((route.currentBookings / route.totalCapacity) * 100),
    available: 100 - Math.floor((route.currentBookings / route.totalCapacity) * 100),
  }));
  
  // Captialize first letter of string
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Status Distribution</CardTitle>
            <CardDescription>
              Distribution of routes by traffic congestion level
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {trafficStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Distribution</CardTitle>
            <CardDescription>
              Types of vehicles detected in traffic analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={vehicleDistribution}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickFormatter={capitalize} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} vehicles`, capitalize(String(name))]} />
                <Bar dataKey="value" fill="#1A5F7A" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Route Occupancy</CardTitle>
          <CardDescription>
            Current occupancy percentage for each pilgrimage route
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={routeOccupancy}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip formatter={(value) => [`${value}%`]} />
              <Legend />
              <Bar dataKey="occupancy" stackId="a" fill="#FE6847" name="Occupied" />
              <Bar dataKey="available" stackId="a" fill="#57C5B6" name="Available" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
