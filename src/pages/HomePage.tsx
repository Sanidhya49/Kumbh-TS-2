
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, MapPin, Car, Calendar, Check } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-kumbh-blue to-kumbh-teal text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Pilgrimage Traffic
                <br />
                <span className="text-accent">Management System</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg">
                Efficiently manage vehicle traffic and reduce congestion during pilgrimage seasons across India.
              </p>
              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-white"
                    onClick={() => navigate('/journey')}
                  >
                    Plan Your Journey
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-white"
                      onClick={() => navigate('/register')}
                    >
                      Register Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white/10"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-6 md:ml-6">
                  <div className="absolute -top-3 -left-3 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Kumbh Mela 2025</h3>
                  <p className="mb-4">
                    Registration for Kumbh Mela 2025 is now open. Plan your journey with our traffic management system.
                  </p>
                  <div className="flex items-center space-x-1 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>January 15 - February 25, 2025</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Prayagraj (Allahabad), Uttar Pradesh</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0" />
                    <p className="text-sm">
                      Limited vehicle registrations available for popular routes. Register early to secure your spot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-background">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How KUMBH-TS Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our traffic management system helps pilgrims and authorities manage vehicle flow efficiently during peak pilgrimage seasons.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-kumbh-blue/10 rounded-full flex items-center justify-center mb-4">
              <Car className="w-6 h-6 text-kumbh-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Register Your Vehicle</h3>
            <p className="text-gray-600">
              Register your vehicle details along with your identity proof to get started.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-kumbh-blue/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-kumbh-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Select Your Journey</h3>
            <p className="text-gray-600">
              Choose your starting point, destination, dates, and number of passengers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-kumbh-blue/10 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-kumbh-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Confirmation</h3>
            <p className="text-gray-600">
              Receive booking confirmation with route details and traffic updates via email.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-kumbh-blue/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-kumbh-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Traffic Updates</h3>
            <p className="text-gray-600">
              Get real-time traffic updates and congestion alerts for your selected route.
            </p>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making Pilgrimages Easier</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our traffic management system has already helped thousands of pilgrims have a smoother journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-kumbh-blue mb-2">5+</div>
              <p className="text-gray-600">Pilgrimage Locations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-kumbh-blue mb-2">500</div>
              <p className="text-gray-600">Vehicles Per Route</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-kumbh-blue mb-2">24/7</div>
              <p className="text-gray-600">Traffic Monitoring</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-kumbh-blue mb-2">60%</div>
              <p className="text-gray-600">Congestion Reduction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="bg-gradient-to-r from-kumbh-blue to-kumbh-teal text-white rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Pilgrimage?</h2>
            <p className="text-xl mb-8">
              Register your vehicle today and secure your spot for the upcoming pilgrimage season.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={() => navigate(isAuthenticated ? '/journey' : '/register')}
            >
              {isAuthenticated ? 'Plan Your Journey' : 'Register Now'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
