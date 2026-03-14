export interface HealthCheck {
  status: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Sesuai konteks tugas Perpustakaan kamu, tambahkan ini juga:
export interface User {
  id?: number;
  name: string | null;
  email: string;
}