// Base interfaces for user registration and service layer
export interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
  city: string;
  address: string;
  password: string;
  confirmPassword: string;
}

// Service layer interfaces (used in forms and registration)
export interface ServiceExperience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface ServiceEducation {
  id: string;
  course: string;
  institution: string;
  level: string;
  status: string;
  startDate: string;
  endDate: string;
}

// Store layer interfaces (used in Zustand store)
export interface StoreExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentWork: boolean;
  description?: string;
}

export interface StoreEducation {
  id: string;
  institution: string;
  course: string;
  level: string;
  startDate: string;
  endDate?: string;
  isCurrentStudy: boolean;
}

// User data for registration
export interface UserData {
  personalData: PersonalData;
  experiences: ServiceExperience[];
  education: ServiceEducation[];
  professionalSummary: string;
  resumeFile?: File;
}

export interface RegisteredUser extends UserData {
  id: string;
  createdAt: string;
}

// Address interface
export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

// Main User interface for the store
export interface User {
  id: string;
  email: string;
  password: string;
  type: 'candidate' | 'company';
  name: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  address?: Address;
  experiences?: StoreExperience[];
  education?: StoreEducation[];
  professionalSummary?: string;
  // Company specific fields
  cnpj?: string;
  companyName?: string;
  companyDescription?: string;
  website?: string;
  sector?: string;
  size?: string;
} 