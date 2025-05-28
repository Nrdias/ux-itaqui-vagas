import React from 'react';
import Link from 'next/link';
import JobCard from '@/components/ui/JobCard';
import { notFound } from 'next/navigation';

const companies = [
  {
    id: '1',
    name: 'Tech Solutions',
    description: 'Empresa especializada em desenvolvimento de software e soluções tecnológicas para pequenas e médias empresas.',
    sector: 'Tecnologia',
    location: 'Itaqui, RS',
    size: '10-50 funcionários',
    website: 'https://techsolutions.exemplo.com',
  },
  {
    id: '2',
    name: 'Comércio Local Ltda',
    description: 'Rede de lojas de varejo com presença em toda a região, oferecendo produtos de qualidade a preços competitivos.',
    sector: 'Varejo',
    location: 'Itaqui, RS',
    size: '50-200 funcionários',
    website: 'https://comerciolocal.exemplo.com',
  },
  {
    id: '3',
    name: 'Supermercado Central',
    description: 'Supermercado com tradição na cidade, oferecendo ampla variedade de produtos alimentícios e de uso doméstico.',
    sector: 'Varejo Alimentício',
    location: 'Itaqui, RS',
    size: '20-100 funcionários',
    website: 'https://supermercadocentral.exemplo.com',
  },
  {
    id: '4',
    name: 'Agro Soluções',
    description: 'Empresa do setor agropecuário focada em soluções para produtores rurais da região, com produtos e serviços especializados.',
    sector: 'Agronegócio',
    location: 'Itaqui, RS',
    size: '10-50 funcionários',
    website: 'https://agrosolucoes.exemplo.com',
  },
  {
    id: '5',
    name: 'Itaqui Saúde',
    description: 'Clínica médica com diversas especialidades, oferecendo atendimento de qualidade para a população local.',
    sector: 'Saúde',
    location: 'Itaqui, RS',
    size: '20-100 funcionários',
    website: 'https://itaquisaude.exemplo.com',
  },
  {
    id: '6',
    name: 'Construtora Progresso',
    description: 'Empresa de construção civil com foco em obras residenciais e comerciais, atuando há mais de 15 anos no mercado local.',
    sector: 'Construção Civil',
    location: 'Itaqui, RS',
    size: '50-200 funcionários',
    website: 'https://construtoraprogresso.exemplo.com',
  }
];

const companyJobs = {
  '1': [
    {
      id: '101',
      title: 'Desenvolvedor Front-end',
      company: 'Tech Solutions',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 5.000 - R$ 7.000',
      postedAt: '15/07/2023',
      description: 'Estamos buscando um desenvolvedor Front-end com experiência em React para desenvolver interfaces modernas e responsivas para nossos produtos.'
    },
    {
      id: '102',
      title: 'Desenvolvedor Back-end',
      company: 'Tech Solutions',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 5.500 - R$ 7.500',
      postedAt: '16/07/2023',
      description: 'Vaga para desenvolvedor Back-end com conhecimentos em Node.js, Express e bancos de dados SQL/NoSQL.'
    },
    {
      id: '103',
      title: 'UX/UI Designer',
      company: 'Tech Solutions',
      location: 'Itaqui, RS (Remoto)',
      type: 'Integral',
      salary: 'R$ 4.500 - R$ 6.500',
      postedAt: '18/07/2023',
      description: 'Buscamos profissional de UX/UI para criar interfaces intuitivas e agradáveis para nossos produtos digitais.'
    }
  ],
  '2': [
    {
      id: '201',
      title: 'Gerente de Loja',
      company: 'Comércio Local Ltda',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 3.500 - R$ 4.500',
      postedAt: '14/07/2023',
      description: 'Vaga para gerente de loja com experiência em gestão de equipe, controle de estoque e atendimento ao cliente.'
    },
    {
      id: '202',
      title: 'Vendedor',
      company: 'Comércio Local Ltda',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.800 + comissão',
      postedAt: '15/07/2023',
      description: 'Buscamos vendedor com experiência em atendimento ao cliente e vendas. Oferecemos salário fixo + comissão.'
    },
    {
      id: '203',
      title: 'Operador de Caixa',
      company: 'Comércio Local Ltda',
      location: 'Itaqui, RS',
      type: 'Meio período',
      salary: 'R$ 1.300',
      postedAt: '16/07/2023',
      description: 'Vaga para operador de caixa para trabalhar meio período, com possibilidade de efetivação.'
    },
    {
      id: '204',
      title: 'Estoquista',
      company: 'Comércio Local Ltda',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.600',
      postedAt: '17/07/2023',
      description: 'Buscamos profissional para organização e controle de estoque, recebimento e conferência de mercadorias.'
    },
    {
      id: '205',
      title: 'Auxiliar Administrativo',
      company: 'Comércio Local Ltda',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.800',
      postedAt: '18/07/2023',
      description: 'Vaga para auxiliar nas rotinas administrativas, controle de documentos e atendimento telefônico.'
    }
  ],
  '3': [
    {
      id: '301',
      title: 'Operador de Caixa',
      company: 'Supermercado Central',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.500',
      postedAt: '18/07/2023',
      description: 'Procuramos profissional para atuar como operador de caixa, com bom relacionamento interpessoal e experiência em atendimento ao cliente.'
    },
    {
      id: '302',
      title: 'Repositor',
      company: 'Supermercado Central',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.450',
      postedAt: '19/07/2023',
      description: 'Vaga para repositor de mercadorias, organização de gôndolas e controle de validade de produtos.'
    }
  ],
  '4': [
    {
      id: '401',
      title: 'Técnico Agrícola',
      company: 'Agro Soluções',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 2.800',
      postedAt: '12/07/2023',
      description: 'Buscamos técnico agrícola para orientação técnica a produtores rurais e acompanhamento de plantações.'
    },
    {
      id: '402',
      title: 'Vendedor Técnico',
      company: 'Agro Soluções',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 2.500 + comissão',
      postedAt: '13/07/2023',
      description: 'Vaga para vendedor técnico com conhecimentos em produtos agrícolas e pecuários para atendimento a produtores rurais.'
    },
    {
      id: '403',
      title: 'Auxiliar Administrativo',
      company: 'Agro Soluções',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.800',
      postedAt: '14/07/2023',
      description: 'Procuramos auxiliar administrativo para controle de documentos, atendimento telefônico e suporte às vendas.'
    },
    {
      id: '404',
      title: 'Motorista Entregador',
      company: 'Agro Soluções',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 2.000',
      postedAt: '15/07/2023',
      description: 'Vaga para motorista entregador com CNH categoria B para entrega de produtos em propriedades rurais da região.'
    }
  ],
  '5': [
    {
      id: '501',
      title: 'Recepcionista',
      company: 'Itaqui Saúde',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.600',
      postedAt: '10/07/2023',
      description: 'Buscamos recepcionista para atendimento ao público, agendamento de consultas e organização de documentos.'
    },
    {
      id: '502',
      title: 'Técnico de Enfermagem',
      company: 'Itaqui Saúde',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 2.200',
      postedAt: '11/07/2023',
      description: 'Vaga para técnico de enfermagem com registro no COREN para atuação em clínica médica.'
    },
    {
      id: '503',
      title: 'Auxiliar de Limpeza',
      company: 'Itaqui Saúde',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.400',
      postedAt: '12/07/2023',
      description: 'Procuramos auxiliar de limpeza para manutenção da higiene e organização do ambiente da clínica.'
    }
  ],
  '6': [
    {
      id: '601',
      title: 'Pedreiro',
      company: 'Construtora Progresso',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 2.500',
      postedAt: '05/07/2023',
      description: 'Vaga para pedreiro com experiência em construção civil para atuação em obras residenciais e comerciais.'
    },
    {
      id: '602',
      title: 'Servente de Obras',
      company: 'Construtora Progresso',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.600',
      postedAt: '06/07/2023',
      description: 'Buscamos servente de obras para auxiliar pedreiros e demais profissionais em canteiros de obras.'
    },
    {
      id: '603',
      title: 'Mestre de Obras',
      company: 'Construtora Progresso',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 3.800',
      postedAt: '07/07/2023',
      description: 'Vaga para mestre de obras com experiência em supervisão de equipes e acompanhamento de cronogramas de obras.'
    },
    {
      id: '604',
      title: 'Engenheiro Civil',
      company: 'Construtora Progresso',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 6.000 - R$ 8.000',
      postedAt: '08/07/2023',
      description: 'Procuramos engenheiro civil com registro no CREA para acompanhamento e fiscalização de obras.'
    },
    {
      id: '605',
      title: 'Arquiteto',
      company: 'Construtora Progresso',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 5.500 - R$ 7.500',
      postedAt: '09/07/2023',
      description: 'Vaga para arquiteto com registro no CAU para elaboração de projetos arquitetônicos residenciais e comerciais.'
    },
    {
      id: '606',
      title: 'Auxiliar Administrativo',
      company: 'Construtora Progresso',
      location: 'Itaqui, RS',
      type: 'Integral',
      salary: 'R$ 1.800',
      postedAt: '10/07/2023',
      description: 'Buscamos auxiliar administrativo para controle de documentos, atendimento telefônico e suporte às atividades da empresa.'
    }
  ]
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompanyJobsPage({ params }: PageProps) {
  const { id } = await params;
  
  const company = companies.find(c => c.id === id);
  
  if (!company) {
    notFound();
  }
  
  const jobs = companyJobs[id as keyof typeof companyJobs] || [];
  
  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="mb-2">
              <Link href="/empresas" className="text-blue-600 hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar para empresas
              </Link>
            </div>
            <h1 className="text-3xl font-medium text-gray-900 mb-2">Vagas na {company.name}</h1>
            <p className="text-gray-600 max-w-2xl">
              {company.description}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-gray-600 mb-2">
              <span className="font-medium">{jobs.length}</span> vagas disponíveis
            </div>
            {company.website && (
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                Visitar site da empresa
              </a>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
              {company.sector}
            </span>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              {company.location}
            </span>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              {company.size}
            </span>
          </div>
        </div>
        
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma vaga disponível no momento</h3>
            <p className="text-gray-600">
              Esta empresa não possui vagas abertas atualmente. Volte em breve para verificar novas oportunidades.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 