
import { User, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DeliveryPerson {
  name: string;
  image: string;
  phone: string;
  rating: number;
}

interface DeliveryPersonInfoProps {
  person: DeliveryPerson;
  phoneNumber: string;
}

const DeliveryPersonInfo = ({ person, phoneNumber }: DeliveryPersonInfoProps) => {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="font-serif text-xl font-semibold mb-4">Delivery Person</h2>
        <div className="flex items-center gap-4 mb-4">
          {person.image ? (
            <img 
              src={person.image} 
              alt={person.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-500" />
            </div>
          )}
          <div>
            <h3 className="font-medium">{person.name}</h3>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < person.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-600">{person.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <Button onClick={handleCall} className="w-full gap-2" variant="outline">
          <Phone className="h-4 w-4" />
          Call Delivery Person
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeliveryPersonInfo;
