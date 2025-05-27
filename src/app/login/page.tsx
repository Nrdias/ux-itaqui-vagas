'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { UserService } from '@/lib/userService';

export default function LoginPage() {
  const router = useRouter();
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
          alert('Login realizado com sucesso!');
          router.push('/'); // Redirect to dashboard or home
        } else {
          setError(result.error || 'Erro ao fazer login');
        }
      } else {
        // For now, company login is not implemented
        setError('Login de empresa ainda não implementado');
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
            <div>
              <Input
                label="E-mail"
                type="email"
                placeholder={userType === 'candidate' ? "seu@email.com" : "empresa@dominio.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Input
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-secondary">
                  Lembrar-me
                </label>
              </div>
              
              <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            
            <Button fullWidth disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-secondary">
              {userType === 'candidate' 
                ? "Não tem uma conta?" 
                : "Não possui cadastro para sua empresa?"}
            </p>
            <Link 
              href={userType === 'candidate' ? "/cadastro-candidato" : "/cadastro-empresa"} 
              className="text-primary hover:underline font-medium"
            >
              {userType === 'candidate' 
                ? "Cadastre seu currículo" 
                : "Cadastre sua empresa"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 