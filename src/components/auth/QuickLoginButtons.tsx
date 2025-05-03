
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const QuickLoginButtons = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async (email: string) => {
    const success = await login(email, 'anypassword'); // The mock login only checks email
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Login Options</CardTitle>
        <CardDescription>For demonstration purposes only</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Button 
          onClick={() => handleQuickLogin('admin@kumbh-ts.com')}
          variant="outline" 
          className="bg-amber-100 hover:bg-amber-200 border-amber-300"
        >
          Login as Admin
        </Button>
        <Button 
          onClick={() => handleQuickLogin('rahul.sharma@example.com')}
          variant="outline"
          className="bg-blue-100 hover:bg-blue-200 border-blue-300"
        >
          Login as Regular User
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          These buttons allow you to login without entering credentials for testing purposes.
        </p>
      </CardContent>
    </Card>
  );
};
