export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  status: "REQUESTED" | "ACCEPTED" | "DECLINED" | "PAID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  scheduledAt: string;
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
  bookingsAsCustomer?: Booking[];
  reviews?: Review[];
}

export interface UserApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile;
}