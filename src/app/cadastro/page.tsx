'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  
  const handleContinue = () => {
    if (userType === 'company') {
      router.push('/cadastro-empresa');
    } else if (userType === 'candidate') {
      router.push('/cadastro-candidato');
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-4">Cadastro</h1>
          <p className="text-secondary">
            Escolha o tipo de cadastro que deseja realizar.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className={`card cursor-pointer transition-all hover:shadow-lg ${userType === 'candidate' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setUserType('candidate')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Sou um candidato</h3>
              <p className="text-secondary">
                Cadastre seu currículo para encontrar oportunidades de emprego.
              </p>
            </div>
          </div>
          
          <div 
            className={`card cursor-pointer transition-all hover:shadow-lg ${userType === 'company' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setUserType('company')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Sou uma empresa</h3>
              <p className="text-secondary">
                Cadastre sua empresa para publicar vagas e encontrar profissionais.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleContinue} 
            disabled={!userType}
          >
            Continuar
          </Button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-secondary text-sm">
            Já tem uma conta? <Link href="/login" className="text-primary hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}