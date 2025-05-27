import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-medium mb-3 sm:mb-4 text-gray-800">Itaqui Vagas</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Conectando profissionais e empresas para criar novas oportunidades.
            </p>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-800">Candidatos</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/cadastro-candidato" className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1">
                  Cadastre seu currículo
                </Link>
              </li>
              <li>
                <Link href="/vagas" className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1">
                  Buscar vagas
                </Link>
              </li>
              <li>
                <Link href="/dicas" className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1">
                  Dicas de carreira
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-800">Empresas</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/cadastro-empresa" className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1">
                  Cadastro de empresa
                </Link>
              </li>
              <li>
                <Link href="/publicar-vaga" className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1">
                  Publicar vaga
                </Link>
              </li>
              <li>
                <Link href="/buscar-candidatos" className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1">
                  Buscar candidatos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-800">Contato</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="https://vagasnacidade.com.br/site/fale-conosco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1"
                >
                  Fale conosco
                </a>
              </li>
              <li>
                <a 
                  href="https://vagasnacidade.com.br/site/fale-conosco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1"
                >
                  Suporte
                </a>
              </li>
              <li>
                <Link href="/termos" className="text-gray-600 hover:text-blue-600 text-sm sm:text-base transition-colors block py-1">
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
            © {new Date().getFullYear()} Itaqui Vagas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 