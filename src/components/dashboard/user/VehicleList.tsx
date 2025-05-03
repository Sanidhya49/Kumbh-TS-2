
import { useState } from 'react';
import { Vehicle, VehicleType } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface VehicleListProps {
  vehicles: Vehicle[];
}

const vehicleTypeOptions: { value: VehicleType; label: string }[] = [
  { value: 'two-wheeler', label: 'Two Wheeler' },
  { value: '5-seater', label: '5-Seater Car' },
  { value: '8-seater', label: '8-Seater Car' },
  { value: 'traveler', label: 'Traveler/Mini Bus' },
  { value: 'bus', label: 'Bus' },
];

export const VehicleList = ({ vehicles }: VehicleListProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    vehicleType: 'two-wheeler' as VehicleType,
    licensePlate: '',
  });
  
  const handleChange = (field: string, value: string) => {
    setNewVehicle(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this to the server
    console.log('New vehicle:', newVehicle);
    
    // Check if max vehicles reached (3)
    if (vehicles.length >= 3) {
      toast({
        title: "Maximum Vehicles Reached",
        description: "You can register a maximum of 3 vehicles.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Vehicle Added",
      description: "Your new vehicle has been registered successfully."
    });
    
    setIsDialogOpen(false);
    setNewVehicle({
      vehicleType: 'two-wheeler',
      licensePlate: '',
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Vehicles</CardTitle>
          <CardDescription>
            Manage your registered vehicles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {vehicles.length === 0 ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No vehicles registered</h3>
              <p className="mt-2 text-sm text-gray-500">
                Register a vehicle to book pilgrimages.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="bg-gray-50 border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-kumbh-blue">
                            {vehicleTypeOptions.find(v => v.value === vehicle.vehicleType)?.label || vehicle.vehicleType}
                          </Badge>
                          <span className="text-sm text-gray-500">Capacity: {vehicle.capacity}</span>
                        </div>
                        <h3 className="font-medium">{vehicle.licensePlate}</h3>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary" disabled={vehicles.length >= 3}>
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                  <DialogDescription>
                    Register a new vehicle to your account. You can register up to 3 vehicles.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select 
                      value={newVehicle.vehicleType}
                      onValueChange={(value) => handleChange('vehicleType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input 
                      id="licensePlate"
                      value={newVehicle.licensePlate}
                      onChange={(e) => handleChange('licensePlate', e.target.value)}
                      placeholder="Enter license plate number"
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-primary">
                      Add Vehicle
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {vehicles.length >= 3 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              You have reached the maximum limit of 3 vehicles.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
