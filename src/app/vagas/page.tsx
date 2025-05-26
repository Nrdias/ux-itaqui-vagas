'use client';

import React, { useState } from 'react';
import JobCard from '@/components/ui/JobCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// Mock data for jobs
const jobListings = [
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
  },
  {
    id: '4',
    title: 'Vendedor',
    company: 'Loja de Roupas Elegance',
    location: 'Itaqui, RS',
    type: 'Integral',
    salary: 'R$ 1.600 + comissão',
    postedAt: '10/07/2023',
    description: 'Buscamos vendedor com experiência no varejo de moda para atendimento ao cliente, organização de loja e fechamento de vendas.'
  },
  {
    id: '5',
    title: 'Técnico em Enfermagem',
    company: 'Hospital Regional',
    location: 'Itaqui, RS',
    type: 'Escala 12x36',
    salary: 'R$ 2.200',
    postedAt: '22/07/2023',
    description: 'Vaga para técnico em enfermagem para trabalhar em escala 12x36 no hospital regional, realizando cuidados aos pacientes e auxiliando a equipe médica.'
  },
  {
    id: '6',
    title: 'Motorista Entregador',
    company: 'Distribuidora de Bebidas',
    location: 'Itaqui, RS',
    type: 'Integral',
    salary: 'R$ 1.800',
    postedAt: '19/07/2023',
    description: 'Motorista para realizar entregas na cidade e região. Necessário CNH categoria B e experiência com entregas.'
  }
];

export default function VagasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    salary: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger an API call
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filters.type === '' || job.type === filters.type;
    
    let matchesSalary = true;
    if (filters.salary !== '') {
      // Extract numeric values from salary string
      const salaryText = job.salary;
      
      // Handle salary ranges (e.g., "R$ 5.000 - R$ 7.000")
      let minSalary = 0;
      let maxSalary = Infinity;
      
      if (salaryText.includes('-')) {
        const parts = salaryText.split('-');
        // Extract the numeric value from the first part (min salary)
        minSalary = parseInt(parts[0].replace(/[^\d]/g, ''), 10);
        // Extract the numeric value from the second part (max salary)
        maxSalary = parseInt(parts[1].replace(/[^\d]/g, ''), 10);
      } else {
        // For single values (e.g., "R$ 1.800")
        minSalary = maxSalary = parseInt(salaryText.replace(/[^\d]/g, ''), 10);
      }
      
      switch (filters.salary) {
        case '1': // Até R$ 1.500
          matchesSalary = minSalary <= 1500;
          break;
        case '2': // R$ 1.500 - R$ 3.000
          matchesSalary = (minSalary >= 1500 && minSalary <= 3000) || 
                          (maxSalary >= 1500 && maxSalary <= 3000) ||
                          (minSalary < 1500 && maxSalary > 3000);
          break;
        case '3': // R$ 3.000 - R$ 5.000
          matchesSalary = (minSalary >= 3000 && minSalary <= 5000) || 
                          (maxSalary >= 3000 && maxSalary <= 5000) ||
                          (minSalary < 3000 && maxSalary > 5000);
          break;
        case '4': // R$ 5.000 - R$ 7.000
          matchesSalary = (minSalary >= 5000 && minSalary <= 7000) || 
                          (maxSalary >= 5000 && maxSalary <= 7000) ||
                          (minSalary < 5000 && maxSalary > 7000);
          break;
        case '5': // Acima de R$ 7.000
          matchesSalary = maxSalary > 7000;
          break;
        default:
          matchesSalary = true;
      }
    }
    
    return matchesSearch && matchesType && matchesSalary;
  });

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-medium mb-4">Vagas de emprego em Itaqui</h1>
        <p className="text-secondary max-w-2xl mx-auto">
          Encontre as melhores oportunidades de trabalho na região. 
          Filtre por área de atuação, tipo de contrato e mais.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-medium mb-4">Filtros</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Tipo de contrato
                </label>
                <select 
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Todos os tipos</option>
                  <option value="Integral">Integral</option>
                  <option value="Meio período">Meio período</option>
                  <option value="Temporário">Temporário</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Escala 12x36">Escala 12x36</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Faixa salarial
                </label>
                <select 
                  name="salary"
                  value={filters.salary}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Qualquer salário</option>
                  <option value="1">Até R$ 1.500</option>
                  <option value="2">R$ 1.500 - R$ 3.000</option>
                  <option value="3">R$ 3.000 - R$ 5.000</option>
                  <option value="4">R$ 5.000 - R$ 7.000</option>
                  <option value="5">Acima de R$ 7.000</option>
                </select>
              </div>
              
              <div>
                <Button variant="outline" fullWidth onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', salary: '' });
                }}>
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-grow">
                <Input 
                  placeholder="Buscar vagas por cargo, empresa ou palavra-chave" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit">
                Buscar
              </Button>
            </form>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div>
              <p className="text-secondary mb-4">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
              </p>
              
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Nenhuma vaga encontrada</h3>
              <p className="text-secondary">
                Tente alterar seus filtros ou busque por termos diferentes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 