
// User Types
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  aadhaarNumber: string;
  licenseNumber: string;
  role: 'user' | 'admin';
  vehicles: Vehicle[];
}

export interface Vehicle {
  id: string;
  userId: string;
  vehicleType: VehicleType;
  licensePlate: string;
  capacity: number;
}

export type VehicleType = 
  | 'two-wheeler'
  | '5-seater'
  | '8-seater'
  | 'traveler'
  | 'bus';

// Journey Types
export interface Journey {
  id: string;
  userId: string;
  startLocation: string;
  endLocation: string;
  startDate: string;
  endDate: string;
  passengers: number;
  vehicleId: string;
  status: JourneyStatus;
  bookingDate: string;
}

export type JourneyStatus = 
  | 'upcoming'
  | 'ongoing'
  | 'completed'
  | 'cancelled';

// Route Types
export interface Route {
  id: string;
  startLocation: string;
  endLocation: string;
  totalCapacity: number;
  currentBookings: number;
  trafficStatus: TrafficStatus;
}

export type TrafficStatus = 
  | 'low'
  | 'moderate'
  | 'high';

// Video Analysis Types
export interface VideoAnalysis {
  id: string;
  routeId: string;
  uploadedBy: string;
  uploadDate: string;
  videoLength: number;
  vehicleCounts: VehicleCounts;
  totalCount: number;
}

export interface VehicleCounts {
  car: number;
  bus: number;
  truck: number;
  motorcycle: number;
  bicycle: number;
  auto: number;
  other: number;
}

// Location Types
export type PilgrimageLocation = 
  | 'Kumbh Mela'
  | 'Badrinath'
  | 'Jagannath Yatra'
  | 'Ujjain'
  | 'Kedarnath Mandir';
