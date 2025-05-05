import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Vehicle } from '@/types';
import { mockUsers, mockVehicles, mockLogin } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role' | 'vehicles'> & { password: string }, vehicle: Omit<Vehicle, 'id' | 'userId' | 'capacity'>) => Promise<boolean>;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check local storage for saved user
    const savedUser = localStorage.getItem('kumbhTsUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Get user vehicles
        const userVehicles = mockVehicles.filter(v => v.userId === parsedUser.id);
        setUser({...parsedUser, vehicles: userVehicles});
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast({
          title: "Login Failed",
          description: responseData.detail || "Invalid email or password.",
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
        aadhaarNumber: responseData.user.aadhar_number,
        licenseNumber: responseData.user.license_number,
        role: responseData.user.is_admin ? 'admin' as const : 'user' as const,
        vehicles: [], // You can fetch vehicles separately if needed
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
        description: "An error occurred while logging in.",
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
      // Prepare payload for backend
      const payload = {
        username: userData.email, // or userData.username if you have it
        email: userData.email,
        password: userData.password,
        password2: userData.password, // if your backend expects password2
        first_name: userData.fullName.split(' ')[0],
        last_name: userData.fullName.split(' ').slice(1).join(' '),
        aadhar_number: userData.aadhaarNumber,
        license_number: userData.licenseNumber,
        phone_number: userData.phone,
      };

      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Optionally, you can also register the vehicle here with another API call
        toast({
          title: "Registration Successful",
          description: "Welcome to KUMBH-TS! Your account has been created."
        });
        return true;
      } else {
        const errorData = await response.json();
        toast({
          title: "Registration Failed",
          description: errorData.detail || JSON.stringify(errorData),
          variant: "destructive"
        });
        return false;
      }
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
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
