export type BookingStatus = "REQUESTED" | "ACCEPTED" | "DECLINED" | "PAID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Technician {
  id: string;
  userId: string;
  bio: string;
  experience: number;
  location: string;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledAt: string;
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  technician: Technician;
  service: Service;
  payment: any | null;
  customer?: User;
  review?: Review | null;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}