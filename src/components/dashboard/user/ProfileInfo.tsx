
import { useState } from 'react';
import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileInfoProps {
  user: User;
}

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send the updated profile data to the server
    console.log('Updated profile:', formData);
    
    setIsEditing(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Manage your personal information and documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              {isEditing ? (
                <Input 
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.fullName}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.email}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{formData.phone}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <div className="p-2 border rounded-md bg-gray-50">{user.aadhaarNumber}</div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <div className="p-2 border rounded-md bg-gray-50">{user.licenseNumber}</div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            {isEditing ? (
              <div className="space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button 
                type="button" 
                onClick={() => setIsEditing(true)}
                className="bg-gradient-primary"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
