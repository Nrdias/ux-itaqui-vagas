import { Company } from '@/types/company';

// Define the RegisteredCompany interface to match what's stored in localStorage
interface RegisteredCompany {
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
  responsibleName: string;
  responsiblePosition: string;
  responsibleEmail: string;
  responsiblePhone: string;
  password: string;
  createdAt: string;
  logoUrl?: string;
}

// Mocked empresa data with admin credentials
export const mockEmpresaData: Company = {
  id: 'mock-empresa-001',
  companyName: 'Empresa Exemplo Ltda',
  cnpj: '12.345.678/0001-90',
  phone: '(55) 3456-7890',
  email: 'admin@example.com',
  website: 'https://empresaexemplo.com.br',
  city: 'Itaqui',
  state: 'RS',
  address: 'Rua Principal, 123, Centro',
  sector: 'tecnologia',
  description: 'Empresa exemplo para demonstração do sistema de vagas de Itaqui. Especializada em soluções tecnológicas e inovação para o mercado local.',
  logoUrl: undefined,
  responsibleName: 'João Administrador',
  responsiblePosition: 'Diretor Geral',
  responsibleEmail: 'admin@example.com',
  responsiblePhone: '(55) 99999-0000',
  password: 'adminpass123',
  type: 'company',
  createdAt: new Date().toISOString()
};

// Function to initialize mock data in localStorage
export const initializeMockData = (): void => {
  try {
    if (typeof window === 'undefined') return;
    
    const STORAGE_KEY = 'registeredCompanies';
    const existingCompanies = localStorage.getItem(STORAGE_KEY);
    
    if (!existingCompanies) {
      // If no companies exist, create the mock empresa
      const mockCompanies = [{
        id: mockEmpresaData.id,
        companyName: mockEmpresaData.companyName,
        cnpj: mockEmpresaData.cnpj,
        phone: mockEmpresaData.phone,
        email: mockEmpresaData.email,
        website: mockEmpresaData.website,
        city: mockEmpresaData.city,
        state: mockEmpresaData.state,
        address: mockEmpresaData.address,
        sector: mockEmpresaData.sector,
        description: mockEmpresaData.description,
        responsibleName: mockEmpresaData.responsibleName,
        responsiblePosition: mockEmpresaData.responsiblePosition,
        responsibleEmail: mockEmpresaData.responsibleEmail,
        responsiblePhone: mockEmpresaData.responsiblePhone,
        password: mockEmpresaData.password,
        createdAt: mockEmpresaData.createdAt,
        logoUrl: mockEmpresaData.logoUrl
      }];
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCompanies));
      console.log('Mock empresa data initialized successfully');
    } else {
      // Check if mock empresa already exists
      const companies: RegisteredCompany[] = JSON.parse(existingCompanies);
      const mockExists = companies.some((company: RegisteredCompany) => company.id === mockEmpresaData.id);
      
      if (!mockExists) {
        // Add mock empresa to existing companies
        const mockCompany: RegisteredCompany = {
          id: mockEmpresaData.id,
          companyName: mockEmpresaData.companyName,
          cnpj: mockEmpresaData.cnpj,
          phone: mockEmpresaData.phone,
          email: mockEmpresaData.email,
          website: mockEmpresaData.website,
          city: mockEmpresaData.city,
          state: mockEmpresaData.state,
          address: mockEmpresaData.address,
          sector: mockEmpresaData.sector,
          description: mockEmpresaData.description,
          responsibleName: mockEmpresaData.responsibleName,
          responsiblePosition: mockEmpresaData.responsiblePosition,
          responsibleEmail: mockEmpresaData.responsibleEmail,
          responsiblePhone: mockEmpresaData.responsiblePhone,
          password: mockEmpresaData.password,
          createdAt: mockEmpresaData.createdAt,
          logoUrl: mockEmpresaData.logoUrl
        };
        
        companies.push(mockCompany);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
        console.log('Mock empresa data added to existing companies');
      }
    }
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
}; 