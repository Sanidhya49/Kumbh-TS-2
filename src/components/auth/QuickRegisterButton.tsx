
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const QuickRegisterButton = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleQuickRegister = async () => {
    const userData = {
      fullName: "Test User",
      email: "test.user@example.com",
      phone: "9999888877",
      aadhaarNumber: "123456789012",
      licenseNumber: "DL-1234567890",
      password: "password123"
    };

    const vehicleData = {
      vehicleType: "5-seater" as const,
      licensePlate: "DL-01-AB-1234"
    };

    const success = await register(userData, vehicleData);
    
    if (success) {
      navigate('/journey');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Registration</CardTitle>
        <CardDescription>For demonstration purposes only</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleQuickRegister}
          variant="outline" 
          className="bg-green-100 hover:bg-green-200 border-green-300 w-full"
        >
          Register with Sample Data
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          This button allows you to register with pre-filled sample data for testing purposes.
        </p>
      </CardContent>
    </Card>
  );
};
