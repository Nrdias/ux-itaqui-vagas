import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Mock job data - in a real application, this would come from an API
const jobDetails = {
  id: '1',
  title: 'Desenvolvedor Front-end',
  company: 'Tech Solutions',
  location: 'Itaqui, RS',
  type: 'Integral',
  salary: 'R$ 5.000 - R$ 7.000',
  postedAt: '15/07/2023',
  description: 'Estamos buscando um desenvolvedor Front-end com experiência em React para desenvolver interfaces modernas e responsivas para nossos produtos.',
  responsibilities: [
    'Desenvolver interfaces de usuário responsivas e modernas',
    'Colaborar com designers e desenvolvedores back-end',
    'Implementar novos recursos e manter o código existente',
    'Participar de code reviews e melhorias contínuas',
    'Otimizar aplicações para máxima velocidade e escalabilidade'
  ],
  requirements: [
    'Experiência com JavaScript, HTML5 e CSS3',
    'Conhecimento em React.js e frameworks modernos',
    'Familiaridade com ferramentas de versionamento como Git',
    'Conhecimento de princípios de design responsivo',
    'Inglês técnico para leitura de documentação'
  ],
  benefits: [
    'Plano de saúde',
    'Vale refeição',
    'Vale transporte',
    'Horário flexível',
    'Home office 2x por semana'
  ],
  companyDescription: 'A Tech Solutions é uma empresa de tecnologia focada em desenvolver soluções inovadoras para o mercado. Estamos há 5 anos no mercado e temos uma equipe de profissionais altamente qualificados.'
};

export async function generateStaticParams() {
  // Return the list of job IDs that should be pre-generated
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // In a real application, you would fetch the job details based on the ID
  // For this example, we'll just use the mock data
  console.log('Job ID:', id);
  
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-medium text-text">{jobDetails.title}</h1>
                <div className="flex items-center mt-1 text-secondary">
                  <span>{jobDetails.company}</span>
                  <span className="mx-2">•</span>
                  <span>{jobDetails.location}</span>
                </div>
              </div>
              
              <div>
                <span className="inline-block px-3 py-1 bg-primary-light text-primary text-sm rounded-full">
                  {jobDetails.type}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6 text-secondary">
              <div>
                <p><strong>Salário:</strong> {jobDetails.salary}</p>
              </div>
              <div>
                <p>Publicada em {jobDetails.postedAt}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Descrição da vaga</h2>
                <p className="text-secondary">{jobDetails.description}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-2">Responsabilidades</h2>
                <ul className="list-disc pl-5 text-secondary">
                  {jobDetails.responsibilities.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-2">Requisitos</h2>
                <ul className="list-disc pl-5 text-secondary">
                  {jobDetails.requirements.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-2">Benefícios</h2>
                <ul className="list-disc pl-5 text-secondary">
                  {jobDetails.benefits.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Sobre a empresa</h2>
            <p className="text-secondary mb-4">{jobDetails.companyDescription}</p>
            <Link href={`/empresas/tech-solutions`} className="text-primary hover:underline">
              Ver perfil da empresa
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-lg font-medium mb-4">Candidate-se a esta vaga</h2>
            <p className="text-secondary mb-6">
              Envie seu currículo e mostre por que você é a pessoa ideal para esta oportunidade.
            </p>
            
            <Button fullWidth>
              Candidatar-se agora
            </Button>
            
            <hr className="my-6" />
            
            <div className="flex flex-col space-y-4">
              <button className="flex items-center text-secondary hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Salvar vaga
              </button>
              
              <button className="flex items-center text-secondary hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartilhar
              </button>
              
              <button className="flex items-center text-secondary hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Denunciar vaga
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/vagas" className="text-primary hover:underline flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para a lista de vagas
        </Link>
      </div>
    </div>
  );
} 