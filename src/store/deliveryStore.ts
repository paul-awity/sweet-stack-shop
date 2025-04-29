
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './cartStore';

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  image?: string;
  rating: number;
}

export interface DeliveryEvent {
  time: string;
  status: string;
  description: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Delivery {
  id: string;
  orderId: string;
  orderDate: string;
  status: 'pending' | 'preparing' | 'pickup' | 'in_transit' | 'completed' | 'cancelled';
  estimatedArrival: string;
  items: CartItem[];
  currentLocation: Location;
  destination: Location;
  deliveryPerson: DeliveryPerson;
  events: DeliveryEvent[];
}

interface DeliveryStore {
  deliveries: Delivery[];
  getDelivery: (id: string) => Delivery | undefined;
  addDelivery: (delivery: Delivery) => void;
  updateDeliveryStatus: (id: string, status: Delivery['status'], event: DeliveryEvent) => void;
  updateDeliveryLocation: (id: string, location: Location) => void;
}

// Sample data for demonstration
const sampleDeliveryPerson: DeliveryPerson = {
  id: 'dp1',
  name: 'John Doe',
  phone: '+2341234567890',
  image: 'https://i.pravatar.cc/150?img=32',
  rating: 4.8,
};

export const useDeliveryStore = create<DeliveryStore>()(
  persist(
    (set, get) => ({
      deliveries: [
        {
          id: 'del1',
          orderId: 'order123',
          orderDate: new Date().toISOString(),
          status: 'in_transit',
          estimatedArrival: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          items: [
            {
              id: 'cake1',
              cake: {
                id: 'cake1',
                name: 'Chocolate Cake',
                price: 5500,
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D',
                category: 'Chocolate',
                description: 'Rich chocolate cake with chocolate ganache.',
                featured: true,
                rating: 4.8,
                flavors: ['Chocolate'],
                sizes: ['Small', 'Medium', 'Large'],
                ingredients: ['Cocoa', 'Flour', 'Sugar', 'Eggs'],
                allergies: ['Eggs', 'Dairy'],
              },
              quantity: 1,
            }
          ],
          currentLocation: {
            lat: 6.5244,
            lng: 3.3792,
            address: '123 Allen Avenue, Ikeja, Lagos'
          },
          destination: {
            lat: 6.4698,
            lng: 3.5852,
            address: '10 Victoria Island, Lagos'
          },
          deliveryPerson: sampleDeliveryPerson,
          events: [
            {
              time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
              status: 'Order Confirmed',
              description: 'Your order has been confirmed and is being prepared.',
            },
            {
              time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
              status: 'Order Ready',
              description: 'Your cake is ready and waiting for pickup.',
            },
            {
              time: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
              status: 'On The Way',
              description: 'Your cake is on the way to your location.',
            }
          ],
        }
      ],
      getDelivery: (id) => {
        return get().deliveries.find(delivery => delivery.id === id);
      },
      addDelivery: (delivery) => {
        set(state => ({
          deliveries: [...state.deliveries, delivery],
        }));
      },
      updateDeliveryStatus: (id, status, event) => {
        set(state => ({
          deliveries: state.deliveries.map(delivery => {
            if (delivery.id === id) {
              return {
                ...delivery,
                status,
                events: [event, ...delivery.events],
              };
            }
            return delivery;
          }),
        }));
      },
      updateDeliveryLocation: (id, location) => {
        set(state => ({
          deliveries: state.deliveries.map(delivery => {
            if (delivery.id === id) {
              return {
                ...delivery,
                currentLocation: location,
              };
            }
            return delivery;
          }),
        }));
      },
    }),
    {
      name: 'sweet-stack-delivery',
    }
  )
);
