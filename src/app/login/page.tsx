'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { UserService } from '@/lib/userService';
import { CompanyService } from '@/lib/companyService';
import { useCompanyStore } from '@/stores/companyStore';

export default function LoginPage() {
  const router = useRouter();
  const { setCompany } = useCompanyStore();
  const [userType, setUserType] = useState<'candidate' | 'company'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (userType === 'candidate') {
        const result = await UserService.loginUser(email, password);
        
        if (result.success) {
          router.push('/perfil');
        } else {
          setError(result.error || 'Erro ao fazer login');
        }
      } else {
        const result = await CompanyService.loginCompany(email, password);
        
        if (result.success && result.company) {
          setCompany(result.company);
          router.push('/dashboard-empresa');
        } else {
          setError(result.error || 'Erro ao fazer login');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Erro interno. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-4">Acesse sua conta</h1>
          <p className="text-secondary">
            Entre para acessar vagas ou gerenciar seus anúncios.
          </p>
        </div>
        
        <div className="card">
          <div className="flex mb-6 border rounded-lg overflow-hidden">
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                userType === 'candidate' 
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200'
              }`}
              onClick={() => setUserType('candidate')}
            >
              Candidato
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                userType === 'company' 
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200'
              }`}
              onClick={() => setUserType('company')}
            >
              Empresa
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Input
              label="Senha"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-secondary">
                  Lembrar de mim
                </label>
              </div>
              
              <Link href="/esqueci-senha" className="text-sm text-primary hover:underline">
                Esqueci minha senha
              </Link>
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-secondary text-sm">
            Não tem uma conta? {' '}
            {userType === 'candidate' ? (
              <Link href="/cadastro-candidato" className="text-primary hover:underline">
                Cadastre-se como candidato
              </Link>
            ) : (
              <Link href="/cadastro-empresa" className="text-primary hover:underline">
                Cadastre sua empresa
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}