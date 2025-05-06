import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const TrafficOverview = ({ routes }) => {
  if (!routes || routes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No route data available to display.</p>
      </div>
    );
  }

  // Data for traffic status distribution
  const trafficStatusData = [
    { name: 'Low', value: routes.filter(route => route.trafficStatus === 'low').length, color: '#10B981' },
    { name: 'Moderate', value: routes.filter(route => route.trafficStatus === 'moderate').length, color: '#F59E0B' },
    { name: 'High', value: routes.filter(route => route.trafficStatus === 'high').length, color: '#EF4444' },
  ];
  
  // Data for route occupancy
  const routeOccupancy = routes.map(route => ({
    name: `${route.startLocation} - ${route.endLocation}`,
    occupancy: Math.floor((route.currentBookings / route.totalCapacity) * 100),
    available: 100 - Math.floor((route.currentBookings / route.totalCapacity) * 100),
  }));
  
  // Capitalize first letter of string
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
            <CardTitle>Route Occupancy</CardTitle>
            <CardDescription>
              Current occupancy percentage for each pilgrimage route
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
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
    </div>
  );
};
