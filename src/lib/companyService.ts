import { CompanyData, RegisteredCompany, Company } from '@/types/company';

interface ServiceResult {
  success: boolean;
  error?: string;
  company?: Company;
}

export class CompanyService {
  private static readonly STORAGE_KEY = 'registeredCompanies';
  private static readonly CURRENT_COMPANY_KEY = 'currentCompany';

  // Get all registered companies from localStorage
  static getRegisteredCompanies(): RegisteredCompany[] {
    try {
      if (typeof window === 'undefined') return [];
      
      const companies = localStorage.getItem(this.STORAGE_KEY);
      return companies ? JSON.parse(companies) : [];
    } catch (error) {
      console.error('Error loading companies from localStorage:', error);
      return [];
    }
  }

  // Save companies to localStorage
  private static saveCompanies(companies: RegisteredCompany[]): void {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(companies));
    } catch (error) {
      console.error('Error saving companies to localStorage:', error);
    }
  }

  // Register a new company
  static async registerCompany(companyData: CompanyData): Promise<ServiceResult> {
    try {
      // Validate required fields
      if (!companyData.companyName.trim()) {
        return { success: false, error: 'Nome da empresa é obrigatório' };
      }
      
      if (!companyData.email.trim()) {
        return { success: false, error: 'E-mail é obrigatório' };
      }
      
      if (!companyData.email.includes('@') || !companyData.email.includes('.')) {
        return { success: false, error: 'E-mail inválido' };
      }
      
      if (!companyData.cnpj.trim()) {
        return { success: false, error: 'CNPJ é obrigatório' };
      }
      
      if (!companyData.responsibleName.trim()) {
        return { success: false, error: 'Nome do responsável é obrigatório' };
      }
      
      if (!companyData.responsibleEmail.trim()) {
        return { success: false, error: 'E-mail do responsável é obrigatório' };
      }
      
      if (!companyData.password.trim()) {
        return { success: false, error: 'Senha é obrigatória' };
      }
      
      if (companyData.password.length < 6) {
        return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' };
      }
      
      if (companyData.password !== companyData.confirmPassword) {
        return { success: false, error: 'Senhas não coincidem' };
      }

      // Check if email already exists
      const existingCompanies = this.getRegisteredCompanies();
      const emailExists = existingCompanies.some(company => 
        company.email.toLowerCase() === companyData.email.toLowerCase() ||
        company.responsibleEmail.toLowerCase() === companyData.responsibleEmail.toLowerCase()
      );
      
      if (emailExists) {
        return { success: false, error: 'Este e-mail já está cadastrado' };
      }

      // Check if CNPJ already exists
      const cnpjExists = existingCompanies.some(company => 
        company.cnpj === companyData.cnpj
      );
      
      if (cnpjExists) {
        return { success: false, error: 'Este CNPJ já está cadastrado' };
      }

      // Create new company
      const newCompany: RegisteredCompany = {
        id: Date.now().toString(),
        companyName: companyData.companyName,
        cnpj: companyData.cnpj,
        phone: companyData.phone,
        email: companyData.email,
        website: companyData.website,
        city: companyData.city,
        state: companyData.state,
        address: companyData.address,
        sector: companyData.sector,
        description: companyData.description,
        responsibleName: companyData.responsibleName,
        responsiblePosition: companyData.responsiblePosition,
        responsibleEmail: companyData.responsibleEmail,
        responsiblePhone: companyData.responsiblePhone,
        createdAt: new Date().toISOString(),
        logoUrl: undefined // TODO: Handle file upload
      };

      // Save to localStorage
      const updatedCompanies = [...existingCompanies, newCompany];
      this.saveCompanies(updatedCompanies);

      // Create company object for store
      const company: Company = {
        ...newCompany,
        password: companyData.password,
        type: 'company'
      };

      // Save current company
      this.saveCurrentCompany(company);

      return { success: true, company };
    } catch (error) {
      console.error('Error registering company:', error);
      return { success: false, error: 'Erro interno. Tente novamente.' };
    }
  }

  // Login company
  static async loginCompany(email: string, password: string): Promise<ServiceResult> {
    try {
      const companies = this.getRegisteredCompanies();
      
      // Find company by email (can be company email or responsible email)
      const registeredCompany = companies.find(company => 
        company.email.toLowerCase() === email.toLowerCase() ||
        company.responsibleEmail.toLowerCase() === email.toLowerCase()
      );
      
      if (!registeredCompany) {
        return { success: false, error: 'E-mail não encontrado' };
      }

      // For now, we'll use a simple password check
      // In a real app, you'd compare with a hashed password
      const company: Company = {
        ...registeredCompany,
        password: password, // In real app, this would be retrieved securely
        type: 'company'
      };

      this.saveCurrentCompany(company);
      
      return { success: true, company };
    } catch (error) {
      console.error('Error during company login:', error);
      return { success: false, error: 'Erro interno. Tente novamente.' };
    }
  }

  // Save current company to localStorage
  private static saveCurrentCompany(company: Company): void {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.setItem(this.CURRENT_COMPANY_KEY, JSON.stringify(company));
    } catch (error) {
      console.error('Error saving current company:', error);
    }
  }

  // Get current company from localStorage
  static getCurrentCompany(): Company | null {
    try {
      if (typeof window === 'undefined') return null;
      
      const company = localStorage.getItem(this.CURRENT_COMPANY_KEY);
      return company ? JSON.parse(company) : null;
    } catch (error) {
      console.error('Error loading current company:', error);
      return null;
    }
  }

  // Clear current company
  static clearCurrentCompany(): void {
    try {
      if (typeof window === 'undefined') return;
      
      localStorage.removeItem(this.CURRENT_COMPANY_KEY);
    } catch (error) {
      console.error('Error clearing current company:', error);
    }
  }

  // Update company data
  static async updateCompany(companyId: string, updates: Partial<CompanyData>): Promise<ServiceResult> {
    try {
      const companies = this.getRegisteredCompanies();
      const companyIndex = companies.findIndex(company => company.id === companyId);
      
      if (companyIndex === -1) {
        return { success: false, error: 'Empresa não encontrada' };
      }

      // Update the company
      const updatedCompany = { ...companies[companyIndex], ...updates };
      companies[companyIndex] = updatedCompany;
      
      this.saveCompanies(companies);

      // Update current company if it's the same
      const currentCompany = this.getCurrentCompany();
      if (currentCompany && currentCompany.id === companyId) {
        const updatedCurrentCompany: Company = {
          ...currentCompany,
          ...updates,
          type: 'company'
        };
        this.saveCurrentCompany(updatedCurrentCompany);
        
        return { success: true, company: updatedCurrentCompany };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating company:', error);
      return { success: false, error: 'Erro interno. Tente novamente.' };
    }
  }
} 