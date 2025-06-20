import { useUserStore } from '@/stores/userStore';
import { 
  User, 
  UserData, 
  RegisteredUser 
} from '@/types/user';


// Função para converter RegisteredUser para User (formato da store)

function convertToStoreUser(registeredUser: RegisteredUser): User {
  return {
    id: registeredUser.id,
    email: registeredUser.personalData.email,
    password: registeredUser.personalData.password,
    type: 'candidate',
    name: registeredUser.personalData.fullName,
    phone: registeredUser.personalData.phone,
    cpf: registeredUser.personalData.cpf,
    birthDate: registeredUser.personalData.birthDate,
    address: {
      street: registeredUser.personalData.address,
      number: '',
      complement: '',
      neighborhood: '',
      city: registeredUser.personalData.city,
      state: '',
      zipCode: ''
    },
    experiences: registeredUser.experiences.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      isCurrentWork: exp.isCurrentJob,
      description: exp.description
    })),
    education: registeredUser.education.map(edu => ({
      id: edu.id,
      institution: edu.institution,
      course: edu.course,
      level: edu.level,
      startDate: edu.startDate,
      endDate: edu.endDate,
      isCurrentStudy: edu.status === 'current'
    })),
    professionalSummary: registeredUser.professionalSummary
  };
}

export class UserService {
  private static STORAGE_KEY = 'registeredUsers';

  static async registerUser(userData: UserData): Promise<{ success: boolean; error?: string; user?: RegisteredUser }> {
    try {
      // Generate a unique ID for the user
      const userId = Date.now().toString();
      
      // Get existing users from localStorage
      const existingUsers = this.getRegisteredUsers();
      
      // Check if email already exists
      const emailExists = existingUsers.some(user => user.personalData.email === userData.personalData.email);
      if (emailExists) {
        return { success: false, error: 'Este e-mail já está cadastrado' };
      }
      
      // Create user with ID and timestamp
      const newUser: RegisteredUser = {
        id: userId,
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingUsers));
      
      // Set user in Zustand store
      const storeUser = convertToStoreUser(newUser);
      useUserStore.getState().setUser(storeUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  static getRegisteredUsers(): RegisteredUser[] {
    try {
      const users = localStorage.getItem(this.STORAGE_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting registered users:', error);
      return [];
    }
  }

  static getCurrentUser(): User | null {
    // Agora obtemos o usuário da store do Zustand
    return useUserStore.getState().user;
  }

  static logout(): void {
    try {
      // Limpa o usuário da store do Zustand
      useUserStore.getState().clearUser();
      // Remove também do localStorage como backup
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  static async loginUser(email: string, password: string): Promise<{ success: boolean; error?: string; user?: RegisteredUser }> {
    try {
      const users = this.getRegisteredUsers();
      const user = users.find(u => u.personalData.email === email && u.personalData.password === password);
      
      if (!user) {
        return { success: false, error: 'E-mail ou senha incorretos' };
      }
      
      // Set user in Zustand store
      const storeUser = convertToStoreUser(user);
      useUserStore.getState().setUser(storeUser);
      
      return { success: true, user };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  static getUserById(id: string): RegisteredUser | null {
    try {
      const users = this.getRegisteredUsers();
      return users.find(user => user.id === id) || null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  static updateUser(id: string, updatedData: Partial<UserData>): { success: boolean; error?: string; user?: RegisteredUser } {
    try {
      const users = this.getRegisteredUsers();
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        return { success: false, error: 'Usuário não encontrado' };
      }
      
      // Update user data
      users[userIndex] = { ...users[userIndex], ...updatedData };
      
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
      
      // Update current user in store if it's the same user
      const currentUser = useUserStore.getState().user;
      if (currentUser && currentUser.id === id) {
        const updatedStoreUser = convertToStoreUser(users[userIndex]);
        useUserStore.getState().setUser(updatedStoreUser);
      }
      
      return { success: true, user: users[userIndex] };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  static searchCandidates(query: string): RegisteredUser[] {
    try {
      const users = this.getRegisteredUsers();
      const searchTerm = query.toLowerCase();
      
      return users.filter(user => {
        const fullName = user.personalData.fullName.toLowerCase();
        const city = user.personalData.city.toLowerCase();
        const experiences = user.experiences.some(exp => 
          exp.position.toLowerCase().includes(searchTerm) ||
          exp.company.toLowerCase().includes(searchTerm)
        );
        const education = user.education.some(edu => 
          edu.course.toLowerCase().includes(searchTerm) ||
          edu.institution.toLowerCase().includes(searchTerm)
        );
        
        return fullName.includes(searchTerm) || 
               city.includes(searchTerm) || 
               experiences || 
               education ||
               user.professionalSummary.toLowerCase().includes(searchTerm);
      });
    } catch (error) {
      console.error('Error searching candidates:', error);
      return [];
    }
  }
} 