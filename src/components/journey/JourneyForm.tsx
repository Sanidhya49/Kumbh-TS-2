import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { indianCities, pilgrimageLocations, mockRoutes, getRouteAvailability } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const journeySchema = z.object({
  startLocation: z.string().min(1, { message: 'Please select a start location' }),
  endLocation: z.string().min(1, { message: 'Please select a destination' }),
  startDate: z.date({ required_error: 'Please select a start date' }),
  endDate: z.date({ required_error: 'Please select an end date' }),
  passengers: z.number().min(1).max(50),
  vehicleId: z.string().min(1, { message: 'Please select a vehicle' }),
});

type JourneyFormValues = z.infer<typeof journeySchema>;

// Add location code mapping for backend
const locationNameToCode: Record<string, string> = {
  'Kumbh Mela': 'KM',
  'Badrinath': 'BD',
  'Jagannath Yatra': 'JG',
  'Ujjain': 'UJ',
  'Kedarnath Mandir': 'KD',
};

export const JourneyForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [routeAvailability, setRouteAvailability] = useState<number | null>(null);
  const [showRouteAlert, setShowRouteAlert] = useState(false);
  
  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeySchema),
    defaultValues: {
      startLocation: '',
      endLocation: '',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      passengers: 1,
      vehicleId: user?.vehicles[0]?.id || '',
    },
  });
  
  const selectedVehicleId = form.watch('vehicleId');
  const selectedStartLocation = form.watch('startLocation');
  const selectedEndLocation = form.watch('endLocation');
  const selectedPassengers = form.watch('passengers');
  
  // Set max passengers based on selected vehicle
  const selectedVehicle = user?.vehicles.find(v => v.id === selectedVehicleId);
  const maxPassengers = selectedVehicle?.capacity || 1;
  
  useEffect(() => {
    // If passengers exceed max capacity, reset to max
    if (selectedPassengers > maxPassengers) {
      form.setValue('passengers', maxPassengers);
    }
  }, [selectedVehicleId, maxPassengers, form, selectedPassengers]);
  
  // Check route availability when locations change
  useEffect(() => {
    if (selectedStartLocation && selectedEndLocation) {
      // Find matching route
      const route = mockRoutes.find(r => 
        r.startLocation === selectedStartLocation && 
        r.endLocation === selectedEndLocation
      );
      
      if (route) {
        const available = route.totalCapacity - route.currentBookings;
        setRouteAvailability(available);
        setShowRouteAlert(true);
      } else {
        setRouteAvailability(null);
        setShowRouteAlert(false);
      }
    } else {
      setRouteAvailability(null);
      setShowRouteAlert(false);
    }
  }, [selectedStartLocation, selectedEndLocation]);
  
  const onSubmit = async (data: JourneyFormValues) => {
    setIsSubmitting(true);
    try {
      // Check if route is available
      if (routeAvailability !== null && routeAvailability <= 0) {
        toast({
          title: "Booking Failed",
          description: "This route is fully booked. Please select another route.",
          variant: "destructive"
        });
        return;
      }

      // Prepare payload for backend
      const payload = {
        vehicle: data.vehicleId,
        start_location: locationNameToCode[data.startLocation] || data.startLocation,
        end_location: locationNameToCode[data.endLocation] || data.endLocation,
        start_date: data.startDate.toISOString(),
        end_date: data.endDate.toISOString(),
        number_of_passengers: data.passengers,
      };

      // Get CSRF token helper (same as in AuthContext)
      function getCookie(name: string) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken');

      // POST to backend
      const response = await fetch('http://localhost:8000/api/journeys/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken || '',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMsg = 'Could not book journey.';
        try {
          const errorData = await response.json();
          errorMsg = errorData.detail || JSON.stringify(errorData);
        } catch (e) { /* ignore */ }
        toast({
          title: 'Journey Booking Failed',
          description: errorMsg,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Journey Booked Successfully',
        description: "Your pilgrimage journey has been booked. You'll receive a confirmation email shortly.",
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Plan Your Pilgrimage Journey</CardTitle>
        <CardDescription className="text-center">
          Select your starting point, destination, dates, and passenger details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select starting point" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Jabalpur">Jabalpur</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pilgrimageLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isSubmitting}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isSubmitting}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            date < new Date() || 
                            (form.getValues('startDate') && date < form.getValues('startDate'))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {user?.vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.vehicleType} ({vehicle.licensePlate})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passengers</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        max={maxPassengers}
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                    {selectedVehicle && (
                      <p className="text-xs text-gray-500">
                        Maximum capacity: {maxPassengers} passengers
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            
            {showRouteAlert && routeAvailability !== null && (
              <Alert className={cn(
                routeAvailability > 100 ? "bg-green-50 text-green-800 border-green-300" : 
                routeAvailability > 0 ? "bg-yellow-50 text-yellow-800 border-yellow-300" :
                "bg-red-50 text-red-800 border-red-300"
              )}>
                <AlertTitle>Route Availability</AlertTitle>
                <AlertDescription>
                  {routeAvailability > 100 
                    ? `Good availability: ${routeAvailability} spots remaining`
                    : routeAvailability > 0 
                    ? `Limited availability: Only ${routeAvailability} spots remaining`
                    : "This route is fully booked. Please select another route."}
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary"
              disabled={isSubmitting || (routeAvailability !== null && routeAvailability <= 0)}
            >
              {isSubmitting ? 'Booking Journey...' : 'Book Journey'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
