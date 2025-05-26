import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-800">Itaqui Vagas</h3>
            <p className="text-gray-600">
              Conectando profissionais e empresas para criar novas oportunidades.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-gray-800">Candidatos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cadastro" className="text-gray-600 hover:text-blue-600">
                  Cadastre seu currículo
                </Link>
              </li>
              <li>
                <Link href="/vagas" className="text-gray-600 hover:text-blue-600">
                  Buscar vagas
                </Link>
              </li>
              <li>
                <Link href="/dicas" className="text-gray-600 hover:text-blue-600">
                  Dicas de carreira
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-gray-800">Empresas</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cadastro" className="text-gray-600 hover:text-blue-600">
                  Cadastro de empresa
                </Link>
              </li>
              <li>
                <Link href="/publicar-vaga" className="text-gray-600 hover:text-blue-600">
                  Publicar vaga
                </Link>
              </li>
              <li>
                <Link href="/buscar-candidatos" className="text-gray-600 hover:text-blue-600">
                  Buscar candidatos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-gray-800">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://vagasnacidade.com.br/site/fale-conosco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Fale conosco
                </a>
              </li>
              <li>
                <a 
                  href="https://vagasnacidade.com.br/site/fale-conosco/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Suporte
                </a>
              </li>
              <li>
                <Link href="/termos" className="text-gray-600 hover:text-blue-600">
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Itaqui Vagas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 