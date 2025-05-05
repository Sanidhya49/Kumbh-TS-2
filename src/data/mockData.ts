
import { 
  User, 
  Vehicle, 
  Journey, 
  Route, 
  VideoAnalysis, 
  TrafficStatus, 
  PilgrimageLocation 
} from '@/types';

// Mock locations
export const pilgrimageLocations: PilgrimageLocation[] = [
  'Kumbh Mela',
  'Badrinath',
  'Jagannath Yatra',
  'Ujjain',
  'Kedarnath Mandir'
];

// Mock cities to combine with pilgrimage locations
export const indianCities = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Bhopal',
  'Visakhapatnam'
];

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user1',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    aadhaarNumber: '1234 5678 9012',
    licenseNumber: 'DL-0123456789',
    role: 'user',
    vehicles: []
  },
  {
    id: 'user2',
    fullName: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '8765432109',
    aadhaarNumber: '2345 6789 0123',
    licenseNumber: 'MH-1234567890',
    role: 'user',
    vehicles: []
  },
  {
    id: 'admin1',
    fullName: 'Admin User',
    email: 'admin@kumbh-ts.com',
    phone: '9999999999',
    aadhaarNumber: '9999 9999 9999',
    licenseNumber: 'ADMIN-1234',
    role: 'admin',
    vehicles: []
  }
];

// Mock vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: 'vehicle1',
    userId: 'user1',
    vehicleType: '5-seater',
    licensePlate: 'DL 01 AB 1234',
    capacity: 5
  },
  {
    id: 'vehicle2',
    userId: 'user1',
    vehicleType: 'two-wheeler',
    licensePlate: 'DL 01 CD 5678',
    capacity: 2
  },
  {
    id: 'vehicle3',
    userId: 'user2',
    vehicleType: '8-seater',
    licensePlate: 'MH 02 XY 7890',
    capacity: 8
  }
];

// Mock journeys
export const mockJourneys: Journey[] = [
  {
    id: 'journey1',
    userId: 'user1',
    startLocation: 'Delhi',
    endLocation: 'Kumbh Mela',
    startDate: '2025-01-15',
    endDate: '2025-01-20',
    passengers: 4,
    vehicleId: 'vehicle1',
    status: 'upcoming',
    bookingDate: '2024-12-01'
  },
  {
    id: 'journey2',
    userId: 'user1',
    startLocation: 'Delhi',
    endLocation: 'Badrinath',
    startDate: '2024-09-10',
    endDate: '2024-09-15',
    passengers: 2,
    vehicleId: 'vehicle2',
    status: 'completed',
    bookingDate: '2024-08-15'
  },
  {
    id: 'journey3',
    userId: 'user2',
    startLocation: 'Mumbai',
    endLocation: 'Ujjain',
    startDate: '2025-02-05',
    endDate: '2025-02-10',
    passengers: 6,
    vehicleId: 'vehicle3',
    status: 'upcoming',
    bookingDate: '2024-12-20'
  }
];

// Mock routes
export const mockRoutes: Route[] = [
  {
    id: 'route1',
    startLocation: 'Delhi',
    endLocation: 'Kumbh Mela',
    totalCapacity: 500,
    currentBookings: 320,
    trafficStatus: 'moderate'
  },
  {
    id: 'route2',
    startLocation: 'Mumbai',
    endLocation: 'Kumbh Mela',
    totalCapacity: 500,
    currentBookings: 485,
    trafficStatus: 'high'
  },
  {
    id: 'route3',
    startLocation: 'Bangalore',
    endLocation: 'Badrinath',
    totalCapacity: 500,
    currentBookings: 150,
    trafficStatus: 'low'
  },
  {
    id: 'route4',
    startLocation: 'Chennai',
    endLocation: 'Jagannath Yatra',
    totalCapacity: 500,
    currentBookings: 410,
    trafficStatus: 'high'
  },
  {
    id: 'route5',
    startLocation: 'Kolkata',
    endLocation: 'Kedarnath Mandir',
    totalCapacity: 500,
    currentBookings: 280,
    trafficStatus: 'moderate'
  }
];

// Mock video analysis
export const mockVideoAnalyses: VideoAnalysis[] = [
  {
    id: 'analysis1',
    routeId: 'route1',
    uploadedBy: 'admin1',
    uploadDate: '2024-12-10',
    videoLength: 120, // in seconds
    vehicleCounts: {
      car: 320,
      bus: 45,
      truck: 78,
      motorcycle: 210,
      bicycle: 30,
      auto: 65,
      other: 12
    },
    totalCount: 760
  },
  {
    id: 'analysis2',
    routeId: 'route2',
    uploadedBy: 'admin1',
    uploadDate: '2024-12-11',
    videoLength: 180, // in seconds
    vehicleCounts: {
      car: 450,
      bus: 80,
      truck: 95,
      motorcycle: 320,
      bicycle: 15,
      auto: 110,
      other: 25
    },
    totalCount: 1095
  },
  {
    id: 'analysis3',
    routeId: 'route3',
    uploadedBy: 'admin1',
    uploadDate: '2024-12-12',
    videoLength: 150, // in seconds
    vehicleCounts: {
      car: 120,
      bus: 25,
      truck: 30,
      motorcycle: 85,
      bicycle: 10,
      auto: 35,
      other: 5
    },
    totalCount: 310
  }
];

// Helper function to get traffic status based on vehicle count
export const getTrafficStatus = (count: number): TrafficStatus => {
  if (count < 500) return 'low';
  if (count < 1000) return 'moderate';
  return 'high';
};

// Helper function to calculate route availability
export const getRouteAvailability = (routeId: string): number => {
  const route = mockRoutes.find(r => r.id === routeId);
  if (!route) return 0;
  return route.totalCapacity - route.currentBookings;
};

// Mock authentication functions
export const mockLogin = (email: string, password: string): User | null => {
  // In a real app, we would validate credentials
  // For mock data, we'll just return user if email matches
  return mockUsers.find(user => user.email === email) || null;
};
