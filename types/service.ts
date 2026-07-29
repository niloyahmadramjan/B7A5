export interface ServiceItem {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  createdAt: string;
  updatedAt: string;
  categoryName?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ServicesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ServiceItem[];
    meta: MetaData;
  };
}