// Company data interfaces
export interface CompanyData {
  companyName: string;
  cnpj: string;
  phone: string;
  email: string;
  website?: string;
  city: string;
  state: string;
  address: string;
  sector: string;
  description: string;
  logo?: File;
  // Responsible person data
  responsibleName: string;
  responsiblePosition: string;
  responsibleEmail: string;
  responsiblePhone: string;
  password: string;
  confirmPassword: string;
}

export interface RegisteredCompany extends Omit<CompanyData, 'confirmPassword' | 'logo'> {
  id: string;
  createdAt: string;
  logoUrl?: string;
}

// Company interface for the store
export interface Company {
  id: string;
  companyName: string;
  cnpj: string;
  phone: string;
  email: string;
  website?: string;
  city: string;
  state: string;
  address: string;
  sector: string;
  description: string;
  logoUrl?: string;
  responsibleName: string;
  responsiblePosition: string;
  responsibleEmail: string;
  responsiblePhone: string;
  password: string;
  type: 'company';
  createdAt: string;
} 