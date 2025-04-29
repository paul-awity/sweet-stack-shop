
import { CheckCircle, CircleDot } from 'lucide-react';

interface DeliveryEvent {
  time: string;
  status: string;
  description: string;
}

interface DeliveryStatusProps {
  status: string;
  events: DeliveryEvent[];
}

const DeliveryStatus = ({ status, events }: DeliveryStatusProps) => {
  // Sort events in reverse chronological order
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.time).getTime() - new Date(a.time).getTime()
  );
  
  const isComplete = status === 'completed';

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {sortedEvents.map((event, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex flex-col items-center">
              {index === 0 ? (
                <CircleDot className="h-6 w-6 text-cake-500" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-500" />
              )}
              {index !== sortedEvents.length - 1 && (
                <div className="w-0.5 bg-gray-200 h-full my-1"></div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {new Date(event.time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="font-medium">{event.status}</p>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {!isComplete && (
        <div className="pt-4 border-t">
          <button className="text-cake-500 text-sm font-medium">
            Send message to delivery person
          </button>
        </div>
      )}
      
      {isComplete && (
        <div className="bg-green-50 border border-green-100 rounded-md p-3 text-center">
          <p className="text-green-800 font-medium">Delivery completed</p>
          <p className="text-sm text-green-600">Thank you for your order!</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryStatus;
