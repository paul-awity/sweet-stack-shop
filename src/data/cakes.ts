
export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  ingredients?: string[];
  allergens?: string[];
}

export const cakes: Cake[] = [
  {
    id: "1",
    name: "Classic Chocolate Cake",
    description: "Rich and moist chocolate cake with silky chocolate frosting, perfect for any celebration.",
    price: 6500,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "chocolate",
    featured: true,
    ingredients: ["Cocoa powder", "Flour", "Sugar", "Butter", "Eggs", "Vanilla extract"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "2",
    name: "Vanilla Bean Cake",
    description: "Light and fluffy vanilla cake with vanilla bean frosting, elegant and delicious.",
    price: 6000,
    image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "vanilla",
    featured: true,
    ingredients: ["Vanilla beans", "Flour", "Sugar", "Butter", "Eggs", "Milk"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "3",
    name: "Red Velvet Cake",
    description: "Luxurious red velvet cake with cream cheese frosting, a southern classic that's always a hit.",
    price: 7000,
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=951&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "specialty",
    featured: true,
    ingredients: ["Cocoa powder", "Red food coloring", "Flour", "Sugar", "Butter", "Buttermilk", "Cream cheese"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "4",
    name: "Strawberry Shortcake",
    description: "Light sponge cake layered with fresh strawberries and whipped cream, a summer favorite.",
    price: 6500,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "fruit",
    featured: false,
    ingredients: ["Flour", "Sugar", "Strawberries", "Heavy cream", "Eggs", "Vanilla extract"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "5",
    name: "Carrot Cake",
    description: "Spiced carrot cake with cream cheese frosting and chopped walnuts, a cozy classic.",
    price: 6000,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=936&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "specialty",
    featured: false,
    ingredients: ["Carrots", "Walnuts", "Flour", "Sugar", "Eggs", "Cinnamon", "Cream cheese"],
    allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"]
  },
  {
    id: "6",
    name: "Lemon Drizzle Cake",
    description: "Tangy lemon cake with a sweet-tart lemon drizzle, bright and refreshing.",
    price: 5500,
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "fruit",
    featured: true,
    ingredients: ["Lemons", "Flour", "Sugar", "Butter", "Eggs", "Yogurt"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "7",
    name: "Black Forest Gateau",
    description: "Chocolate sponge cake with layers of cherries and whipped cream, a German classic.",
    price: 7500,
    image: "https://images.unsplash.com/photo-1611293388250-580b08c4a145?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "chocolate",
    featured: false,
    ingredients: ["Chocolate", "Cherries", "Heavy cream", "Flour", "Sugar", "Eggs", "Kirsch"],
    allergens: ["Gluten", "Dairy", "Eggs"]
  },
  {
    id: "8",
    name: "Coffee Walnut Cake",
    description: "Rich coffee-flavored cake with walnuts and coffee buttercream, a coffee lover's dream.",
    price: 6500,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "specialty",
    featured: false,
    ingredients: ["Coffee", "Walnuts", "Flour", "Sugar", "Butter", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"]
  }
];

export const getFearturedCakes = (): Cake[] => {
  return cakes.filter(cake => cake.featured);
};

export const getCakeById = (id: string): Cake | undefined => {
  return cakes.find(cake => cake.id === id);
};

export const getCakesByCategory = (category: string): Cake[] => {
  return cakes.filter(cake => cake.category === category);
};
