'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCompanyStore } from '@/stores/companyStore';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardEmpresaPage() {
  const router = useRouter();
  const { company, isLoggedIn, clearCompany, initializeFromStorage, _hasHydrated } = useCompanyStore();

  useEffect(() => {
    if (!_hasHydrated) return;
    
    if (!isLoggedIn || !company) {
      initializeFromStorage();
      
      setTimeout(() => {
        if (!useCompanyStore.getState().isLoggedIn) {
          router.push('/login');
        }
      }, 100);
    }
  }, [isLoggedIn, company, router, initializeFromStorage, _hasHydrated]);

  const handleLogout = () => {
    clearCompany();
    router.push('/');
  };

  if (!_hasHydrated) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !company) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <p>Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium text-gray-900 mb-2">
              Dashboard - {company.companyName}
            </h1>
            <p className="text-gray-600">
              Bem-vindo ao painel de controle da sua empresa
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-xl font-medium mb-4">Informações da Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nome da Empresa</p>
              <p className="font-medium">{company.companyName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">CNPJ</p>
              <p className="font-medium">{company.cnpj}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">E-mail</p>
              <p className="font-medium">{company.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="font-medium">{company.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Setor</p>
              <p className="font-medium">{company.sector}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Localização</p>
              <p className="font-medium">{company.city}, {company.state}</p>
            </div>
          </div>
          
          {company.website && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Website</p>
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.website}
              </a>
            </div>
          )}
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">Descrição</p>
            <p className="text-gray-800">{company.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Publicar Vaga</h3>
            <p className="text-gray-600 mb-4">Crie uma nova vaga para atrair candidatos</p>
            <Link href="/publicar-vaga" className="btn btn-primary">
              Publicar
            </Link>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Minhas Vagas</h3>
            <p className="text-gray-600 mb-4">Gerencie suas vagas publicadas</p>
            <Link href="/minhas-vagas" className="btn btn-secondary">
              Ver Vagas
            </Link>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Candidatos</h3>
            <p className="text-gray-600 mb-4">Busque e analise candidatos</p>
            <Link href="/buscar-candidatos" className="btn btn-secondary">
              Buscar
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-medium mb-4">Responsável pela Conta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nome</p>
              <p className="font-medium">{company.responsibleName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cargo</p>
              <p className="font-medium">{company.responsiblePosition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">E-mail</p>
              <p className="font-medium">{company.responsibleEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="font-medium">{company.responsiblePhone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}