
import { useEffect, useState } from 'react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface DeliveryMapProps {
  deliveryPersonLocation: Location;
  destination: Location;
  estimatedArrival: string;
}

const DeliveryMap = ({ deliveryPersonLocation, destination }: DeliveryMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // In a real app, this would initialize a map API like Google Maps
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-gray-100">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cake-500"></div>
        </div>
      ) : (
        <>
          {/* This is a placeholder for an actual map */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-6">
              <p className="text-gray-600 mb-2">Interactive Map</p>
              <p className="text-sm text-gray-500">In a real application, this would show a live map with the delivery person's location.</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-full bg-cake-500"></span>
                  <span className="text-sm">Delivery Person</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-full bg-blue-600"></span>
                  <span className="text-sm">Your Location</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Current Location</p>
                <p className="text-sm text-gray-600">{deliveryPersonLocation.address}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Destination</p>
                <p className="text-sm text-gray-600">{destination.address}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryMap;
