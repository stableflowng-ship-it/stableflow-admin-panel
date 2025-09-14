// Define a type for your Business object
export interface Business {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  is_verified: boolean;
  owner_id: number;
  onboarding_step: string;
  created_on : string;
  category_name: string;
  is_active: boolean
  // Add any other fields from your response
}

// ApiResponse is generic, so data can be any type (like an array of Business)
export interface ApiResponse<T = unknown> {
  data: T;
  status: boolean;
  message: string;
  code: number;
}
