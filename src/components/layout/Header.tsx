'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-medium text-blue-600">
            Itaqui Vagas
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${isActive('/') 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link 
              href="/vagas" 
              className={`transition-colors ${isActive('/vagas') 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600 hover:text-blue-600'}`}
            >
              Vagas
            </Link>
            <Link 
              href="/empresas" 
              className={`transition-colors ${isActive('/empresas') 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600 hover:text-blue-600'}`}
            >
              Empresas
            </Link>
            <Link 
              href="/buscar-candidatos" 
              className={`transition-colors ${isActive('/buscar-candidatos') 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600 hover:text-blue-600'}`}
            >
              Buscar Candidatos
            </Link>
            <Link 
              href="/sobre" 
              className={`transition-colors ${isActive('/sobre') 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600 hover:text-blue-600'}`}
            >
              Sobre
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn btn-secondary">
              Entrar
            </Link>
            <Link href="/cadastro" className="btn btn-primary">
              Cadastrar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 