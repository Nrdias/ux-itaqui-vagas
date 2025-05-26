import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Candidate {
  id: string;
  name: string;
  position: string;
  experience: string;
  location: string;
  skills: string[];
  education: string;
  lastUpdated: string;
  email: string;
  phone: string;
  about: string;
  workHistory: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    description: string;
  }[];
  educationHistory: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | null;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

// Mock data for a single candidate with extended details
const mockCandidate: Record<string, Candidate> = {
  '1': {
    id: '1',
    name: 'Ana Silva',
    position: 'Desenvolvedor Front-end',
    experience: '3 anos',
    location: 'Itaqui, RS',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript', 'Tailwind CSS', 'Next.js'],
    education: 'Bacharel em Ciência da Computação',
    lastUpdated: '10/08/2023',
    email: 'ana.silva@email.com',
    phone: '(55) 99999-8888',
    about: 'Desenvolvedora Front-end com 3 anos de experiência trabalhando com React e TypeScript. Especializada em criar interfaces responsivas e intuitivas com foco na experiência do usuário. Conhecimento avançado em HTML, CSS, JavaScript e frameworks modernos.',
    workHistory: [
      {
        id: '1',
        company: 'Tech Solutions',
        position: 'Desenvolvedor Front-end Pleno',
        startDate: 'Jan 2022',
        endDate: null,
        description: 'Desenvolvimento de aplicações web utilizando React, TypeScript e Next.js. Implementação de interfaces responsivas seguindo design system da empresa. Trabalho em equipe utilizando metodologias ágeis.'
      },
      {
        id: '2',
        company: 'Web Developers Inc',
        position: 'Desenvolvedor Front-end Júnior',
        startDate: 'Mar 2020',
        endDate: 'Dez 2021',
        description: 'Desenvolvimento de componentes React, estilização com CSS e Styled Components. Participação em code reviews e implementação de testes unitários.'
      }
    ],
    educationHistory: [
      {
        id: '1',
        institution: 'Universidade Federal de X',
        degree: 'Bacharelado',
        field: 'Ciência da Computação',
        startDate: '2016',
        endDate: '2020'
      }
    ],
    languages: [
      {
        language: 'Português',
        proficiency: 'Nativo'
      },
      {
        language: 'Inglês',
        proficiency: 'Avançado'
      },
      {
        language: 'Espanhol',
        proficiency: 'Intermediário'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'João Oliveira',
    position: 'Desenvolvedor Back-end',
    experience: '5 anos',
    location: 'Itaqui, RS',
    skills: ['Node.js', 'Python', 'MongoDB', 'SQL', 'Express', 'FastAPI', 'Docker'],
    education: 'Mestrado em Engenharia de Software',
    lastUpdated: '15/07/2023',
    email: 'joao.oliveira@email.com',
    phone: '(55) 99999-7777',
    about: 'Desenvolvedor Back-end experiente com forte conhecimento em Node.js, Python e bancos de dados. Apaixonado por arquitetura de software e soluções escaláveis. Experiência com microsserviços e sistemas distribuídos.',
    workHistory: [
      {
        id: '1',
        company: 'Sistema Tech',
        position: 'Desenvolvedor Back-end Sênior',
        startDate: 'Jun 2021',
        endDate: null,
        description: 'Desenvolvimento de APIs RESTful utilizando Node.js e Express. Implementação de microsserviços e integração com bancos de dados MongoDB e PostgreSQL. Participação ativa em decisões de arquitetura.'
      },
      {
        id: '2',
        company: 'Data Solutions',
        position: 'Desenvolvedor Back-end Pleno',
        startDate: 'Mai 2019',
        endDate: 'Mai 2021',
        description: 'Desenvolvimento de serviços em Python com FastAPI. Implementação de pipelines de ETL e integração com sistemas de terceiros.'
      },
      {
        id: '3',
        company: 'Web Solutions',
        position: 'Desenvolvedor Back-end Júnior',
        startDate: 'Fev 2018',
        endDate: 'Abr 2019',
        description: 'Manutenção e desenvolvimento de APIs RESTful. Implementação de funcionalidades em sistemas existentes.'
      }
    ],
    educationHistory: [
      {
        id: '1',
        institution: 'Universidade Estadual de Y',
        degree: 'Mestrado',
        field: 'Engenharia de Software',
        startDate: '2020',
        endDate: '2022'
      },
      {
        id: '2',
        institution: 'Universidade Estadual de Y',
        degree: 'Bacharelado',
        field: 'Ciência da Computação',
        startDate: '2015',
        endDate: '2019'
      }
    ],
    languages: [
      {
        language: 'Português',
        proficiency: 'Nativo'
      },
      {
        language: 'Inglês',
        proficiency: 'Fluente'
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Maria Santos',
    position: 'Designer UX/UI',
    experience: '4 anos',
    location: 'Itaqui, RS',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'UI Design', 'User Research', 'Wireframing'],
    education: 'Bacharel em Design',
    lastUpdated: '22/07/2023',
    email: 'maria.santos@email.com',
    phone: '(55) 99999-6666',
    about: 'Designer UX/UI com 4 anos de experiência trabalhando em produtos digitais. Foco em criar experiências centradas no usuário através de pesquisa e prototipagem. Habilidades em wireframing, design visual e teste de usabilidade.',
    workHistory: [
      {
        id: '1',
        company: 'Design Studio',
        position: 'Designer UX/UI Pleno',
        startDate: 'Abr 2021',
        endDate: null,
        description: 'Criação de interfaces para aplicativos mobile e web. Condução de pesquisas com usuários e desenvolvimento de protótipos interativos. Colaboração com equipes de produto e desenvolvimento.'
      },
      {
        id: '2',
        company: 'Creative Agency',
        position: 'Designer UX/UI Júnior',
        startDate: 'Jul 2019',
        endDate: 'Mar 2021',
        description: 'Desenvolvimento de wireframes e mockups para websites e aplicativos. Participação em workshops de design thinking e colaboração com designers sênior.'
      }
    ],
    educationHistory: [
      {
        id: '1',
        institution: 'Universidade de Design',
        degree: 'Bacharelado',
        field: 'Design Digital',
        startDate: '2015',
        endDate: '2019'
      }
    ],
    languages: [
      {
        language: 'Português',
        proficiency: 'Nativo'
      },
      {
        language: 'Inglês',
        proficiency: 'Avançado'
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Pedro Costa',
    position: 'Assistente Administrativo',
    experience: '2 anos',
    location: 'Itaqui, RS',
    skills: ['Excel', 'Word', 'Atendimento ao Cliente', 'Organização', 'Controle de Estoque', 'Arquivamento'],
    education: 'Técnico em Administração',
    lastUpdated: '05/08/2023',
    email: 'pedro.costa@email.com',
    phone: '(55) 99999-5555',
    about: 'Assistente Administrativo com 2 anos de experiência no setor de comércio. Habilidades em organização de documentos, atendimento ao cliente e controle de estoque. Comprometido com eficiência e precisão nas tarefas administrativas.',
    workHistory: [
      {
        id: '1',
        company: 'Comércio Local Ltda',
        position: 'Assistente Administrativo',
        startDate: 'Set 2021',
        endDate: null,
        description: 'Responsável pelo controle de documentos, atendimento ao cliente, agendamento de reuniões e suporte administrativo geral. Implementação de sistema de organização de arquivos que melhorou a eficiência em 30%.'
      },
      {
        id: '2',
        company: 'Mercado Central',
        position: 'Auxiliar Administrativo',
        startDate: 'Jun 2020',
        endDate: 'Ago 2021',
        description: 'Auxílio em tarefas administrativas, controle de estoque e atendimento ao cliente. Participação em inventários mensais e registro de produtos.'
      }
    ],
    educationHistory: [
      {
        id: '1',
        institution: 'Escola Técnica Estadual',
        degree: 'Técnico',
        field: 'Administração',
        startDate: '2018',
        endDate: '2020'
      }
    ],
    languages: [
      {
        language: 'Português',
        proficiency: 'Nativo'
      },
      {
        language: 'Espanhol',
        proficiency: 'Básico'
      }
    ]
  },
  '5': {
    id: '5',
    name: 'Carolina Mendes',
    position: 'Assistente Administrativo',
    experience: '3 anos',
    location: 'Itaqui, RS',
    skills: ['Excel', 'SAP', 'Gestão de Documentos', 'Contabilidade Básica', 'Atendimento ao Cliente', 'Controle Financeiro'],
    education: 'Graduação em Administração',
    lastUpdated: '01/08/2023',
    email: 'carolina.mendes@email.com',
    phone: '(55) 99999-4444',
    about: 'Profissional de administração com 3 anos de experiência em ambientes corporativos. Especializada em gestão documental e processos administrativos. Conhecimento em SAP e sistemas de gestão empresarial.',
    workHistory: [
      {
        id: '1',
        company: 'Empresa Corporativa S.A.',
        position: 'Assistente Administrativo Sênior',
        startDate: 'Jan 2022',
        endDate: null,
        description: 'Coordenação de processos administrativos, gestão de documentos e suporte à equipe financeira. Implementação de melhorias nos processos que resultaram em economia de tempo e recursos.'
      },
      {
        id: '2',
        company: 'Escritório Contábil',
        position: 'Assistente Administrativo',
        startDate: 'Fev 2020',
        endDate: 'Dez 2021',
        description: 'Suporte em processos contábeis e administrativos. Organização de documentos fiscais e auxílio no fechamento mensal. Atendimento a clientes internos e externos.'
      }
    ],
    educationHistory: [
      {
        id: '1',
        institution: 'Universidade Federal',
        degree: 'Bacharelado',
        field: 'Administração',
        startDate: '2016',
        endDate: '2020'
      }
    ],
    languages: [
      {
        language: 'Português',
        proficiency: 'Nativo'
      },
      {
        language: 'Inglês',
        proficiency: 'Intermediário'
      }
    ]
  }
};

export async function generateStaticParams() {
  // Return the list of candidate IDs that should be pre-generated
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

export default async function CandidateProfilePage({ params }: PageProps) {
  const { id } = await params;
  
  const candidate = mockCandidate[id];

  if (!candidate) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/buscar-candidatos" className="text-blue-600 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para resultados
          </Link>
          <div className="text-sm text-gray-500">
            Perfil atualizado em {candidate.lastUpdated}
          </div>
        </div>

        {/* Cabeçalho do currículo */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{candidate.name}</h1>
            <h2 className="text-xl text-blue-100">{candidate.position}</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-6">
              <div className="text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {candidate.location}
              </div>
              <div className="text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {candidate.experience} de experiência
              </div>
              <div className="text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {candidate.email}
              </div>
              <div className="text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {candidate.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Sobre o candidato */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Sobre</h3>
          <p className="text-gray-700">{candidate.about}</p>
        </div>
        
        {/* Experiência profissional */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Experiência profissional</h3>
          
          <div className="space-y-6">
            {candidate.workHistory.map((job) => (
              <div key={job.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{job.position}</h4>
                  <div className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate || 'Atual'}
                  </div>
                </div>
                <div className="text-blue-600 font-medium mb-2">{job.company}</div>
                <p className="text-gray-700">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Formação acadêmica */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Formação acadêmica</h3>
          
          <div className="space-y-6">
            {candidate.educationHistory.map((edu) => (
              <div key={edu.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{edu.field}</h4>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || 'Em andamento'}
                  </div>
                </div>
                <div className="text-blue-600 font-medium mb-2">{edu.institution}</div>
                <div className="text-gray-700">{edu.degree}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Habilidades */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Habilidades</h3>
          
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <span 
                key={index} 
                className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Idiomas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Idiomas</h3>
          
          <div className="space-y-3">
            {candidate.languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <div className="text-gray-900">{lang.language}</div>
                <div className="text-blue-600">{lang.proficiency}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 