
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { mockRoutes } from '@/data/mockData';
import { Upload, Camera } from 'lucide-react';

export const DashcamUpload = () => {
  const { toast } = useToast();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a dashcam video to upload.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedRoute) {
      toast({
        title: "No Route Selected",
        description: "Please select a route for this video.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate file upload
    setIsUploading(true);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 500);
    
    // Simulate upload completion
    setTimeout(() => {
      setIsUploading(false);
      setProgress(0);
      setSelectedFile(null);
      setSelectedRoute('');
      
      toast({
        title: "Upload Successful",
        description: "Your dashcam video has been uploaded and will be processed by our administrators.",
      });
    }, 5000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Dashcam Video Upload</span>
        </CardTitle>
        <CardDescription>
          Upload dashcam videos to help improve traffic management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="route">Select Route</Label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute} disabled={isUploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select route covered in the video" />
                </SelectTrigger>
                <SelectContent>
                  {mockRoutes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      {route.startLocation} to {route.endLocation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="video">Upload Video</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="video" className="w-full flex flex-col items-center justify-center px-4 py-6 bg-gray-50 text-blue rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm font-semibold">{selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}</p>
                    <p className="text-xs text-gray-500">MP4, MOV, or AVI (MAX. 200MB)</p>
                  </div>
                  <Input 
                    id="video" 
                    type="file" 
                    accept="video/mp4,video/quicktime,video/avi"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary"
                disabled={isUploading || !selectedFile || !selectedRoute}
              >
                {isUploading ? 'Uploading...' : 'Upload Dashcam Video'}
              </Button>
            </div>
            
            <div className="text-sm text-gray-500">
              <h4 className="font-medium mb-1">Why upload dashcam videos?</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Help improve traffic management for pilgrimages</li>
                <li>Contribute to real-time congestion monitoring</li>
                <li>Support other pilgrims in planning better journeys</li>
              </ul>
              <p className="mt-2 text-xs">
                Your videos will be analyzed by our traffic detection algorithms to count vehicles and assess congestion levels.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
