'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { useSessionStore } from '@/stores/sessionStore';
import { UserService } from '@/lib/userService';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Usando as stores do Zustand
  const { user: currentUser } = useUserStore();
  const { isAuthenticated } = useSessionStore();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    UserService.logout();
    router.push('/');
    closeMobileMenu();
  };

  const getUserInitials = (fullName: string) => {
    if (!fullName) return 'U';
    
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>

            {/* Site Title - Center */}
            <Link href={'/'} className="text-xl sm:text-2xl font-medium text-blue-600 absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
              Itaqui Vagas
            </Link>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link 
                href={'/'} 
                className={`transition-colors text-sm xl:text-base ${isActive('/') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'}`}
              >
                Home
              </Link>
              <Link 
                href={'/vagas'} 
                className={`transition-colors text-sm xl:text-base ${isActive('/vagas') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'}`}
              >
                Vagas
              </Link>
              <Link 
                href={'/empresas'} 
                className={`transition-colors text-sm xl:text-base ${isActive('/empresas') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'}`}
              >
                Empresas
              </Link>
              <Link 
                href={'/buscar-candidatos'} 
                className={`transition-colors text-sm xl:text-base ${isActive('/buscar-candidatos') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'}`}
              >
                Buscar Candidatos
              </Link>
              <Link 
                href={'/sobre'} 
                className={`transition-colors text-sm xl:text-base ${isActive('/sobre') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'}`}
              >
                Sobre
              </Link>
            </div>
            
            {/* Auth Section - Right */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {isAuthenticated() ? (
                // Logged in state
                <div className="flex items-center space-x-2 lg:space-x-3">
                  {/* Profile Link */}
                  <Link 
                    href={'/perfil'} 
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title={`Perfil de ${currentUser?.name || 'Usuário'}`}
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {getUserInitials(currentUser?.name || '')}
                    </div>
                    <span className="hidden sm:block text-sm text-gray-700">
                      {(currentUser?.name || 'Usuário').split(' ')[0]}
                    </span>
                  </Link>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-red-600"
                    title="Sair"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                // Not logged in state (guest)
                <>
                  <Link href={'/login'} className="btn btn-secondary text-sm lg:text-base px-3 lg:px-4 py-2">
                    Entrar
                  </Link>
                  <Link href={'/cadastro'} className="btn btn-primary text-sm lg:text-base px-3 lg:px-4 py-2 hidden sm:flex items-center justify-center">
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-blue-600">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Fechar menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info (if logged in) */}
          {isAuthenticated() && currentUser && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {getUserInitials(currentUser.name || '')}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{currentUser.name || 'Usuário'}</p>
                  <p className="text-sm text-gray-600">{currentUser.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-4">
            <Link 
              href={"/"} 
              onClick={closeMobileMenu}
              className={`block py-3 px-4 rounded-lg transition-colors text-lg ${isActive('/') 
                ? 'text-blue-600 font-medium bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
            >
              Home
            </Link>
            <Link 
              href={"/vagas"} 
              onClick={closeMobileMenu}
              className={`block py-3 px-4 rounded-lg transition-colors text-lg ${isActive('/vagas') 
                ? 'text-blue-600 font-medium bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
            >
              Vagas
            </Link>
            <Link 
              href={"/empresas"} 
              onClick={closeMobileMenu}
              className={`block py-3 px-4 rounded-lg transition-colors text-lg ${isActive('/empresas') 
                ? 'text-blue-600 font-medium bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
            >
              Empresas
            </Link>
            <Link 
              href={"/buscar-candidatos"} 
              onClick={closeMobileMenu}
              className={`block py-3 px-4 rounded-lg transition-colors text-lg ${isActive('/buscar-candidatos') 
                ? 'text-blue-600 font-medium bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
            >
              Buscar Candidatos
            </Link>
            <Link 
              href={"/sobre"} 
              onClick={closeMobileMenu}
              className={`block py-3 px-4 rounded-lg transition-colors text-lg ${isActive('/sobre') 
                ? 'text-blue-600 font-medium bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
            >
              Sobre
            </Link>
            
            {/* Profile link for mobile (if logged in) */}
            {isAuthenticated() && (
              <Link 
                href={"/perfil"} 
                onClick={closeMobileMenu}
                className={`block py-3 px-4 rounded-lg transition-colors text-lg ${isActive('/perfil') 
                  ? 'text-blue-600 font-medium bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
              >
                Meu Perfil
              </Link>
            )}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            {isAuthenticated() ? (
              <button 
                onClick={handleLogout}
                className="btn btn-secondary w-full text-center text-lg py-3 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sair</span>
              </button>
            ) : (
              <>
                <Link 
                  href={"/login"} 
                  onClick={closeMobileMenu}
                  className="btn btn-secondary w-full text-center text-lg py-3"
                >
                  Entrar
                </Link>
                <Link 
                  href={"/cadastro"} 
                  onClick={closeMobileMenu}
                  className="btn btn-primary w-full text-center text-lg py-3"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 