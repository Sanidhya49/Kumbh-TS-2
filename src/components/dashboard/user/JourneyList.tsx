
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Journey } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';

interface JourneyListProps {
  upcomingJourneys: Journey[];
  pastJourneys: Journey[];
}

export const JourneyList = ({ upcomingJourneys, pastJourneys }: JourneyListProps) => {
  const [activeView, setActiveView] = useState<'upcoming' | 'past'>('upcoming');
  
  const journeys = activeView === 'upcoming' ? upcomingJourneys : pastJourneys;
  
  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeView === 'upcoming' ? 'default' : 'outline'}
          onClick={() => setActiveView('upcoming')}
          className={activeView === 'upcoming' ? 'bg-gradient-primary' : ''}
        >
          Upcoming Journeys
        </Button>
        <Button
          variant={activeView === 'past' ? 'default' : 'outline'}
          onClick={() => setActiveView('past')}
          className={activeView === 'past' ? 'bg-gradient-primary' : ''}
        >
          Past Journeys
        </Button>
      </div>
      
      {journeys.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No {activeView} journeys found</h3>
              <p className="mt-2 text-sm text-gray-500">
                {activeView === 'upcoming' 
                  ? "You don't have any upcoming journeys scheduled."
                  : "You haven't completed any journeys yet."}
              </p>
              {activeView === 'upcoming' && (
                <Button className="mt-4 bg-gradient-primary">
                  Plan a Journey
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {journeys.map((journey) => (
            <Card key={journey.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gradient-to-r from-kumbh-blue to-kumbh-teal text-white p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {journey.endLocation}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>From {journey.startLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(journey.startDate).toLocaleDateString()} - {new Date(journey.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500 text-sm">{journey.passengers} Passengers</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Booked on {new Date(journey.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={
                      journey.status === 'upcoming' ? 'bg-blue-500' : 
                      journey.status === 'completed' ? 'bg-green-500' : 
                      journey.status === 'ongoing' ? 'bg-yellow-500' : 
                      'bg-gray-500'
                    }>
                      {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {activeView === 'upcoming' ? (
                      <>
                        <Button variant="outline" className="text-sm">View Details</Button>
                        <Button variant="outline" className="text-sm text-red-500 border-red-200 hover:bg-red-50">Cancel Journey</Button>
                      </>
                    ) : (
                      <Button variant="outline" className="text-sm">View Details</Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
