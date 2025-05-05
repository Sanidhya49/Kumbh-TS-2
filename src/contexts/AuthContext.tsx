import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Vehicle, VehicleType } from '@/types';
import { mockUsers, mockVehicles, mockLogin } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role' | 'vehicles'> & { password: string }, vehicle: Omit<Vehicle, 'id' | 'userId' | 'capacity'>) => Promise<boolean>;
  fetchUserVehicles: () => Promise<Vehicle[]>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Helper to get CSRF token from cookies
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

// Add this type above the AuthProvider

type VehicleBackend = {
  id: number | string;
  user: number | string;
  vehicle_type: string;
  plate_number: string;
  model_name: string;
  max_capacity: number;
};

type PaginatedVehicleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: VehicleBackend[];
};

type LoginResponse = {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    aadhaar_number: string;
    license_number: string;
    is_admin: boolean;
  };
  detail?: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Helper to fetch vehicles for the logged-in user
  const fetchUserVehicles = async () => {
    const res = await fetch('http://localhost:8000/api/vehicles/', {
      credentials: 'include',
    });
    if (res.ok) {
      const vehiclesRaw: unknown = await res.json();
      let vehiclesArray: VehicleBackend[] = [];
      if (Array.isArray(vehiclesRaw)) {
        vehiclesArray = vehiclesRaw as VehicleBackend[];
      } else if (
        vehiclesRaw &&
        typeof vehiclesRaw === 'object' &&
        'results' in vehiclesRaw &&
        Array.isArray((vehiclesRaw as PaginatedVehicleResponse).results)
      ) {
        vehiclesArray = (vehiclesRaw as PaginatedVehicleResponse).results;
      } else {
        console.error('Vehicle fetch did not return an array:', vehiclesRaw);
        return [];
      }
      const vehicles = vehiclesArray.map((vehicle) => ({
        id: String(vehicle.id),
        userId: String(vehicle.user),
        vehicleType: ({
          '2W': 'two-wheeler',
          '4W': '5-seater',
          '8W': '8-seater',
          'TR': 'traveler',
        }[vehicle.vehicle_type] || vehicle.vehicle_type) as VehicleType,
        licensePlate: vehicle.plate_number,
        capacity: vehicle.max_capacity,
      }));
      return vehicles;
    }
    return [];
  };

  useEffect(() => {
    // Check local storage for saved user
    const savedUser = localStorage.getItem('kumbhTsUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Fetch vehicles from backend
        fetchUserVehicles().then(vehicles => {
          setUser({ ...parsedUser, vehicles });
        });
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      // Defensive: check if response is JSON
      let responseData: unknown = {};
      try {
        responseData = await response.json();
      } catch (jsonErr) {
        console.error('Failed to parse login response as JSON:', jsonErr);
      }

      if (!response.ok) {
        const detail = typeof responseData === 'object' && responseData !== null && 'detail' in responseData ? (responseData as { detail: string }).detail : undefined;
        console.error('Login failed response:', response, responseData);
        toast({
          title: "Login Failed",
          description: detail || "Invalid email or password.",
          variant: "destructive"
        });
        return false;
      }

      // Fetch vehicles after login
      const vehicles = await fetchUserVehicles();

      // Type guard for LoginResponse
      function isLoginResponse(data: unknown): data is LoginResponse {
        return typeof data === 'object' && data !== null && 'user' in data;
      }

      if (!isLoginResponse(responseData)) {
        toast({
          title: "Login Failed",
          description: "Unexpected response from server.",
          variant: "destructive"
        });
        return false;
      }

      // Map backend fields to frontend User type
      const mappedUser = {
        id: responseData.user.id,
        fullName: `${responseData.user.first_name} ${responseData.user.last_name}`,
        email: responseData.user.email,
        phone: responseData.user.phone_number,
        aadhaarNumber: responseData.user.aadhaar_number,
        licenseNumber: responseData.user.license_number,
        role: responseData.user.is_admin ? 'admin' as const : 'user' as const,
        vehicles: vehicles,
      };
      setUser(mappedUser);
      localStorage.setItem('kumbhTsUser', JSON.stringify(mappedUser));
      toast({
        title: "Login Successful",
        description: `Welcome back!`
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred while logging in.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('kumbhTsUser');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  const register = async (
    userData: Omit<User, 'id' | 'role' | 'vehicles'> & { password: string },
    vehicle: Omit<Vehicle, 'id' | 'userId' | 'capacity'>
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 1. Register the user
      const payload = {
        username: userData.email,
        email: userData.email,
        password: userData.password,
        password2: userData.password,
        first_name: userData.fullName.split(' ')[0],
        last_name: userData.fullName.split(' ').slice(1).join(' '),
        aadhar_number: userData.aadhaarNumber,
        license_number: userData.licenseNumber,
        phone_number: userData.phone,
      };

      const response = await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Registration Failed",
          description: errorData.detail || JSON.stringify(errorData),
          variant: "destructive"
        });
        return false;
      }

      // 2. Log the user in to get session/cookies
      const loginSuccess = await login(userData.email, userData.password);
      if (!loginSuccess) return false;

      // Wait for session cookie to be set
      await new Promise(resolve => setTimeout(resolve, 300));

      // 3. Register the vehicle for the new user
      // Map vehicle type to backend code and max_capacity
      const vehicleTypeCodeMap: Record<string, string> = {
        'two-wheeler': '2W',
        '5-seater': '4W',
        '8-seater': '8W',
        'traveler': 'TR',
        'bus': 'TR', // If you want to treat bus as traveler
      };
      const vehicleTypeCapacityMap: Record<string, number> = {
        'two-wheeler': 2,
        '5-seater': 5,
        '8-seater': 8,
        'traveler': 12,
        'bus': 50,
      };
      const vehiclePayload = {
        vehicle_type: vehicleTypeCodeMap[vehicle.vehicleType] || '4W',
        plate_number: vehicle.licensePlate,
        model_name: "Default Model", // or get from form
        max_capacity: vehicleTypeCapacityMap[vehicle.vehicleType] || 4,
      };
      const csrftoken = getCookie('csrftoken');
      const vehicleRes = await fetch('http://localhost:8000/api/vehicles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken || '',
        },
        body: JSON.stringify(vehiclePayload),
        credentials: 'include',
      });

      if (!vehicleRes.ok) {
        let errorMsg = "User registered, but vehicle could not be added.";
        try {
          const errorData = await vehicleRes.json();
          errorMsg = errorData.detail || JSON.stringify(errorData);
        } catch (e) { /* ignore JSON parse error */ }
        toast({
          title: "Vehicle Registration Failed",
          description: errorMsg,
          variant: "destructive"
        });
        return false;
      }

      // Refetch vehicles and update user context
      const updatedVehicles = await fetchUserVehicles();
      setUser(prev => prev ? { ...prev, vehicles: updatedVehicles } : prev);
      localStorage.setItem('kumbhTsUser', JSON.stringify({ ...user, vehicles: updatedVehicles }));

      toast({
        title: "Registration Successful",
        description: "Welcome to KUMBH-TS! Your account and vehicle have been created."
      });
      return true;
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        fetchUserVehicles,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
