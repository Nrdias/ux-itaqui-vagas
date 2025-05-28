import React from 'react';
import CompanyCard from '@/components/ui/CompanyCard';
import Link from 'next/link';

const companies = [
  {
    id: '1',
    name: 'Tech Solutions',
    description: 'Empresa especializada em desenvolvimento de software e soluções tecnológicas para pequenas e médias empresas.',
    sector: 'Tecnologia',
    location: 'Itaqui, RS',
    size: '10-50 funcionários',
    website: 'https://techsolutions.exemplo.com',
    jobCount: 3
  },
  {
    id: '2',
    name: 'Comércio Local Ltda',
    description: 'Rede de lojas de varejo com presença em toda a região, oferecendo produtos de qualidade a preços competitivos.',
    sector: 'Varejo',
    location: 'Itaqui, RS',
    size: '50-200 funcionários',
    website: 'https://comerciolocal.exemplo.com',
    jobCount: 5
  },
  {
    id: '3',
    name: 'Supermercado Central',
    description: 'Supermercado com tradição na cidade, oferecendo ampla variedade de produtos alimentícios e de uso doméstico.',
    sector: 'Varejo Alimentício',
    location: 'Itaqui, RS',
    size: '20-100 funcionários',
    website: 'https://supermercadocentral.exemplo.com',
    jobCount: 2
  },
  {
    id: '4',
    name: 'Agro Soluções',
    description: 'Empresa do setor agropecuário focada em soluções para produtores rurais da região, com produtos e serviços especializados.',
    sector: 'Agronegócio',
    location: 'Itaqui, RS',
    size: '10-50 funcionários',
    website: 'https://agrosolucoes.exemplo.com',
    jobCount: 4
  },
  {
    id: '5',
    name: 'Itaqui Saúde',
    description: 'Clínica médica com diversas especialidades, oferecendo atendimento de qualidade para a população local.',
    sector: 'Saúde',
    location: 'Itaqui, RS',
    size: '20-100 funcionários',
    website: 'https://itaquisaude.exemplo.com',
    jobCount: 3
  },
  {
    id: '6',
    name: 'Construtora Progresso',
    description: 'Empresa de construção civil com foco em obras residenciais e comerciais, atuando há mais de 15 anos no mercado local.',
    sector: 'Construção Civil',
    location: 'Itaqui, RS',
    size: '50-200 funcionários',
    website: 'https://construtoraprogresso.exemplo.com',
    jobCount: 6
  }
];

export default function EmpresasPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium text-gray-900 mb-2">Empresas</h1>
            <p className="text-gray-600 max-w-2xl">
              Conheça as empresas que estão contratando em Itaqui e região. Encontre oportunidades de carreira em diversos setores.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link href="/cadastro-empresa" className="btn btn-primary">
              Cadastrar empresa
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </div>
      </div>
    </div>
  );
}