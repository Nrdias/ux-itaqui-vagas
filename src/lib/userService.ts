interface PersonalData {
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

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

interface Education {
  id: string;
  course: string;
  institution: string;
  level: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface UserData {
  personalData: PersonalData;
  experiences: Experience[];
  education: Education[];
  professionalSummary: string;
  resumeFile?: File;
}

export interface RegisteredUser extends UserData {
  id: string;
  createdAt: string;
}

export class UserService {
  private static STORAGE_KEY = 'registeredUsers';
  private static CURRENT_USER_KEY = 'currentUser';

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
      
      // Set as current user
      this.setCurrentUser(newUser);
      
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

  static getCurrentUser(): RegisteredUser | null {
    try {
      const user = localStorage.getItem(this.CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static setCurrentUser(user: RegisteredUser): void {
    try {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }

  static logout(): void {
    try {
      localStorage.removeItem(this.CURRENT_USER_KEY);
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
      
      this.setCurrentUser(user);
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
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === id) {
        this.setCurrentUser(users[userIndex]);
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