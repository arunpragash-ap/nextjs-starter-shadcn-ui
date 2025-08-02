// ===== Types based on API docs =====
export interface Option {
  id: number;
  type: string;
  name: string;
  remarks?: string;
  status?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MinimalOption {
  id: number;
  type: string;
  name: string;
}

export interface CreateOrUpdateOptionRequest {
  id?: number | 0; // optional for create
  type: string;
  name?: string;
  remarks?: string;
  status?: boolean;
}