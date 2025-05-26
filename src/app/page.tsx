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
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                Encontre seu próximo emprego em <span className="text-blue-600">Itaqui</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Conectamos profissionais e empresas da região para criar novas oportunidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cadastro" className="btn btn-primary">
                  Cadastre-se agora
                </Link>
                <Link href="/vagas" className="btn btn-secondary">
                  Ver todas as vagas
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-video rounded-xl overflow-hidden">
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
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-medium text-gray-900">Vagas em destaque</h2>
            <Link href="/vagas" className="text-blue-600 hover:underline">
              Ver todas as vagas
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium text-gray-900 mb-6">Para empresas</h2>
            <p className="text-xl text-gray-600 mb-8">
              Divulgue suas vagas gratuitamente e encontre os melhores talentos para sua empresa.
            </p>
            <Link href="/cadastro" className="btn btn-primary">
              Cadastre sua empresa
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-medium text-center text-gray-900 mb-12">Como funciona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-medium mb-2">Cadastre-se</h3>
              <p className="text-gray-600">
                Crie sua conta como candidato ou empresa em menos de 5 minutos.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-medium mb-2">Divulgue ou encontre</h3>
              <p className="text-gray-600">
                Empresas publicam vagas e candidatos encontram oportunidades.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-medium mb-2">Conecte-se</h3>
              <p className="text-gray-600">
                Entrevistas são agendadas e novas contratações acontecem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
