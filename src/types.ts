export interface MenuItem {
  id: string;
  name: string;
  price: number | string;
  ingredients: string;
  category: string;
  subcategory?: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isBestSeller?: boolean;
  isGlutenFree?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface DayHours {
  day: string;
  hours: string;
  isOpen: boolean;
  openTime?: string; // e.g. "18:30"
  closeTime?: string; // e.g. "23:00" or "00:00"
}
