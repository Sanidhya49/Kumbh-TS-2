
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { mockRoutes } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

export const RouteManagement = () => {
  const { toast } = useToast();
  const [routes, setRoutes] = useState(mockRoutes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({
    startLocation: '',
    endLocation: '',
    totalCapacity: 500,
  });
  
  const handleChange = (field: string, value: any) => {
    setNewRoute(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this to the server
    console.log('New route:', newRoute);
    
    toast({
      title: "Route Added",
      description: "New pilgrimage route has been added."
    });
    
    setIsDialogOpen(false);
    setNewRoute({
      startLocation: '',
      endLocation: '',
      totalCapacity: 500,
    });
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Pilgrimage Routes</CardTitle>
            <CardDescription>
              Manage and monitor all pilgrimage routes
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">Add Route</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Route</DialogTitle>
                <DialogDescription>
                  Create a new pilgrimage route with traffic management settings.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="startLocation">Starting Location</Label>
                  <Input 
                    id="startLocation"
                    value={newRoute.startLocation}
                    onChange={(e) => handleChange('startLocation', e.target.value)}
                    placeholder="Enter starting location"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endLocation">Destination</Label>
                  <Input 
                    id="endLocation"
                    value={newRoute.endLocation}
                    onChange={(e) => handleChange('endLocation', e.target.value)}
                    placeholder="Enter destination"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalCapacity">Total Capacity</Label>
                  <Input 
                    id="totalCapacity"
                    type="number"
                    value={newRoute.totalCapacity}
                    onChange={(e) => handleChange('totalCapacity', parseInt(e.target.value))}
                    placeholder="Enter total vehicle capacity"
                  />
                  <p className="text-xs text-gray-500">
                    Maximum number of vehicles allowed on this route.
                  </p>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-primary">
                    Add Route
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Starting Location</TableHead>
                  <TableHead className="w-[200px]">Destination</TableHead>
                  <TableHead className="text-right">Current Bookings</TableHead>
                  <TableHead className="text-right">Total Capacity</TableHead>
                  <TableHead className="text-right">Occupancy</TableHead>
                  <TableHead>Traffic Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.startLocation}</TableCell>
                    <TableCell>{route.endLocation}</TableCell>
                    <TableCell className="text-right">{route.currentBookings}</TableCell>
                    <TableCell className="text-right">{route.totalCapacity}</TableCell>
                    <TableCell className="text-right">
                      {Math.floor((route.currentBookings / route.totalCapacity) * 100)}%
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(route.trafficStatus)}`}>
                        {route.trafficStatus === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {route.trafficStatus.charAt(0).toUpperCase() + route.trafficStatus.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
