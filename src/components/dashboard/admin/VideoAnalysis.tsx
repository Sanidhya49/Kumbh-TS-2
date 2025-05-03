
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockVideoAnalyses, mockRoutes } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Camera } from 'lucide-react';

export const VideoAnalysis = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [videoAnalyses, setVideoAnalyses] = useState(mockVideoAnalyses);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  
  const processVideo = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a dashcam video to process.",
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
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate ML processing
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    // Simulate process completion
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate random counts for demo
      const randomCounts = {
        car: Math.floor(Math.random() * 400) + 100,
        bus: Math.floor(Math.random() * 50) + 10,
        truck: Math.floor(Math.random() * 80) + 20,
        motorcycle: Math.floor(Math.random() * 200) + 50,
        bicycle: Math.floor(Math.random() * 30) + 5,
        auto: Math.floor(Math.random() * 70) + 20,
        other: Math.floor(Math.random() * 30) + 5,
      };
      
      const totalCount = Object.values(randomCounts).reduce((sum, count) => sum + count, 0);
      
      // Add new analysis
      const newAnalysis = {
        id: `analysis${Date.now()}`,
        routeId: selectedRoute,
        uploadedBy: 'admin1',
        uploadDate: new Date().toISOString().split('T')[0],
        videoLength: Math.floor(Math.random() * 180) + 60,
        vehicleCounts: randomCounts,
        totalCount,
      };
      
      setVideoAnalyses(prev => [newAnalysis, ...prev]);
      
      // Reset form
      setSelectedFile(null);
      setSelectedRoute('');
      
      toast({
        title: "Video Analysis Complete",
        description: `Detected ${totalCount} vehicles in the dashcam footage.`,
      });
    }, 6000);
  };
  
  const getRouteById = (routeId: string) => {
    const route = mockRoutes.find(r => r.id === routeId);
    return route ? `${route.startLocation} to ${route.endLocation}` : 'Unknown Route';
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Dashcam Video Analysis</span>
          </CardTitle>
          <CardDescription>
            Upload and process dashcam videos to analyze traffic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="route">Select Route</Label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute} disabled={isProcessing}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route in the video" />
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
                <Label htmlFor="video">Upload Dashcam Video</Label>
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
                      disabled={isProcessing}
                    />
                  </label>
                </div>
              </div>
              
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing video...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                  <p className="text-xs text-gray-500">
                    Detecting and counting vehicles using ML model...
                  </p>
                </div>
              )}
              
              <Button 
                onClick={processVideo}
                className="w-full bg-gradient-primary"
                disabled={isProcessing || !selectedFile || !selectedRoute}
              >
                {isProcessing ? 'Processing...' : 'Process Video'}
              </Button>
              
              <div className="text-xs text-gray-500">
                <p>
                  The video will be processed using our ML model to detect and count vehicles.
                  This data will help determine traffic congestion levels for the selected route.
                </p>
              </div>
            </div>
            
            <div>
              <Card className="border-dashed">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">
                    Using Roboflow ML Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <img 
                    src="/lovable-uploads/0ad9f6e7-44bb-48db-8c7c-e90f8439b315.png"
                    alt="Vehicle Detection Model"
                    className="w-full h-auto object-contain rounded border"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Our system uses a custom YOLO v8 model trained to detect and count various vehicles on Indian roads.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recent Analysis Results</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Video Length</TableHead>
                    <TableHead className="text-right">Total Vehicles</TableHead>
                    <TableHead className="text-right">Traffic Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videoAnalyses.slice(0, 5).map((analysis) => (
                    <TableRow key={analysis.id}>
                      <TableCell className="font-medium">
                        {getRouteById(analysis.routeId)}
                      </TableCell>
                      <TableCell>{analysis.uploadDate}</TableCell>
                      <TableCell>{analysis.videoLength}s</TableCell>
                      <TableCell className="text-right">{analysis.totalCount}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${analysis.totalCount > 1000 
                            ? 'bg-red-100 text-red-800 border-red-300' 
                            : analysis.totalCount > 500 
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            : 'bg-green-100 text-green-800 border-green-300'
                          }`}
                        >
                          {analysis.totalCount > 1000 
                            ? 'High' 
                            : analysis.totalCount > 500 
                            ? 'Moderate'
                            : 'Low'
                          }
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
