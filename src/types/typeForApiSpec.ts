export interface ApiSpec {
  id: string;
  title: string;
  method: string;
  endpoint: string;
  description?: string;
  parameters?: any;
  request_body_schema?: any;
  response_schema?: any;
  category1?: string;
  category2?: string;
  created_at?: string;
  updated_at?: string;
  auth_required?: boolean;
  request_type: string;
  response_type: string;
}