import Link from 'next/link';
import Image from 'next/image';
import JobCard from '@/components/ui/JobCard';

// Mock data for featured jobs
const featuredJobs = [
  {
    id: '1',
    title: 'Desenvolvedor Front-end',
    company: 'Tech Solutions',
    location: 'Itaqui, RS',
    type: 'Integral',
    salary: 'R$ 5.000 - R$ 7.000',
    postedAt: '15/07/2023',
    description: 'Estamos buscando um desenvolvedor Front-end com experiência em React para desenvolver interfaces modernas e responsivas para nossos produtos.'
  },
  {
    id: '2',
    title: 'Assistente Administrativo',
    company: 'Comércio Local Ltda',
    location: 'Itaqui, RS',
    type: 'Meio período',
    salary: 'R$ 1.800',
    postedAt: '20/07/2023',
    description: 'Vaga para assistente administrativo para auxiliar nas rotinas do escritório, atendimento ao cliente e organização de documentos.'
  },
  {
    id: '3',
    title: 'Operador de Caixa',
    company: 'Supermercado Central',
    location: 'Itaqui, RS',
    type: 'Integral',
    salary: 'R$ 1.500',
    postedAt: '18/07/2023',
    description: 'Procuramos profissional para atuar como operador de caixa, com bom relacionamento interpessoal e experiência em atendimento ao cliente.'
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Encontre seu próximo emprego em <span className="text-blue-600">Itaqui</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Conectamos profissionais e empresas da região para criar novas oportunidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <Link href="/cadastro" className="btn btn-primary text-base sm:text-lg px-6 py-3 w-full sm:w-auto text-center">
                  Cadastre-se agora
                </Link>
                <Link href="/vagas" className="btn btn-secondary text-base sm:text-lg px-6 py-3 w-full sm:w-auto text-center">
                  Ver todas as vagas
                </Link>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/ux-itaqui-vagas/home_image.png"
                  alt="Profissionais em entrevista de emprego"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 text-center sm:text-left">Vagas em destaque</h2>
            <Link href="/vagas" className="text-blue-600 hover:underline text-center sm:text-left font-medium">
              Ver todas as vagas
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4 sm:mb-6">Para empresas</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Divulgue suas vagas gratuitamente e encontre os melhores talentos para sua empresa.
            </p>
            <Link href="/cadastro-empresa" className="btn btn-primary text-base sm:text-lg px-6 py-3 inline-block">
              Cadastre sua empresa
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-medium text-center text-gray-900 mb-8 sm:mb-12">Como funciona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">Cadastre-se</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Crie sua conta como candidato ou empresa em menos de 5 minutos.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">Divulgue ou encontre</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Empresas publicam vagas e candidatos encontram oportunidades.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">Conecte-se</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Entrevistas são agendadas e novas contratações acontecem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
