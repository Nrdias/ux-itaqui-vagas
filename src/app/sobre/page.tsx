import React from 'react';

export default function SobrePage() {
  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-medium text-gray-900 mb-6">Sobre o Itaqui Vagas</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              O Itaqui Vagas é uma plataforma dedicada a conectar profissionais e empresas na cidade de Itaqui e região, facilitando o processo de busca por emprego e recrutamento. Inspirado no projeto Vagas na Cidade, nosso objetivo é criar oportunidades e fortalecer a economia local.
            </p>
            
            <div className="bg-blue-50 p-8 rounded-xl my-8">
              <h2 className="text-2xl font-medium text-blue-700 mb-4">Nossa Causa</h2>
              <p className="text-gray-700">
                Acreditamos que o desenvolvimento econômico e social de Itaqui passa pela geração de empregos e oportunidades. Trabalhamos para facilitar o encontro entre o talento local e as empresas que precisam desses profissionais.
              </p>
            </div>
            
            <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Nossos Pilares</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-blue-700 mb-3">Empregabilidade</h3>
                <p className="text-gray-600">
                  Facilitamos o acesso ao mercado de trabalho local, conectando candidatos qualificados com oportunidades relevantes.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-blue-700 mb-3">Desenvolvimento</h3>
                <p className="text-gray-600">
                  Contribuímos para o crescimento econômico da região, fortalecendo empresas locais com os melhores talentos.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-blue-700 mb-3">Comunidade</h3>
                <p className="text-gray-600">
                  Criamos um ecossistema que beneficia candidatos, empresas e a cidade como um todo.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Como Funciona</h2>
            <p className="text-gray-600 mb-4">
              Nossa plataforma oferece ferramentas simples e eficientes para que:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Candidatos possam cadastrar seus currículos e se candidatar a vagas disponíveis</li>
              <li>Empresas possam publicar suas vagas e encontrar os melhores talentos</li>
              <li>O processo de recrutamento e seleção seja mais ágil e transparente</li>
            </ul>
            
            <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-700 mb-2">Comunidade</h3>
                <p className="text-gray-600">
                  Trabalhamos para fortalecer a comunidade local, promovendo o desenvolvimento econômico da região.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-700 mb-2">Transparência</h3>
                <p className="text-gray-600">
                  Acreditamos em processos claros e transparentes que beneficiem tanto candidatos quanto empresas.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-700 mb-2">Inclusão</h3>
                <p className="text-gray-600">
                  Promovemos a diversidade e a inclusão no mercado de trabalho, abrindo oportunidades para todos.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-700 mb-2">Inovação</h3>
                <p className="text-gray-600">
                  Buscamos constantemente melhorar nossa plataforma para oferecer a melhor experiência possível.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mt-10">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Entre em Contato</h2>
              <p className="text-gray-600 mb-6">
                Tem sugestões, dúvidas ou precisa de ajuda? Entre em contato conosco através do nosso parceiro Vagas na Cidade.
              </p>
              <a 
                href="https://vagasnacidade.com.br/site/fale-conosco/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Acessar página de contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}