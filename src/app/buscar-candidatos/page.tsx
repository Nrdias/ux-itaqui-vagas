'use client';

import React, { useState } from 'react';
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
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Ana Silva',
    position: 'Desenvolvedor Front-end',
    experience: '3 anos',
    location: 'Itaqui, RS',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    education: 'Bacharel em Ciência da Computação',
    lastUpdated: '10/08/2023'
  },
  {
    id: '2',
    name: 'João Oliveira',
    position: 'Desenvolvedor Back-end',
    experience: '5 anos',
    location: 'Itaqui, RS',
    skills: ['Node.js', 'Python', 'MongoDB', 'SQL'],
    education: 'Mestrado em Engenharia de Software',
    lastUpdated: '15/07/2023'
  },
  {
    id: '3',
    name: 'Maria Santos',
    position: 'Designer UX/UI',
    experience: '4 anos',
    location: 'Itaqui, RS',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    education: 'Bacharel em Design',
    lastUpdated: '22/07/2023'
  },
  {
    id: '4',
    name: 'Pedro Costa',
    position: 'Assistente Administrativo',
    experience: '2 anos',
    location: 'Itaqui, RS',
    skills: ['Excel', 'Word', 'Atendimento ao Cliente', 'Organização'],
    education: 'Técnico em Administração',
    lastUpdated: '05/08/2023'
  },
  {
    id: '5',
    name: 'Carolina Mendes',
    position: 'Assistente Administrativo',
    experience: '3 anos',
    location: 'Itaqui, RS',
    skills: ['Excel', 'SAP', 'Gestão de Documentos', 'Contabilidade Básica'],
    education: 'Graduação em Administração',
    lastUpdated: '01/08/2023'
  }
];

export default function BuscarCandidatosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  
  const MIN_SEARCH_LENGTH = 3;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.length < MIN_SEARCH_LENGTH) {
      setSearchError(`A pesquisa deve conter pelo menos ${MIN_SEARCH_LENGTH} caracteres`);
      return;
    }
    
    setSearchError('');
    setIsSearching(true);
    setHasSearched(true);
    
    setTimeout(() => {
      const results = mockCandidates.filter(candidate => 
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCandidates(results);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-medium text-gray-900 mb-6">Buscar Candidatos</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Encontre os melhores talentos para sua empresa</h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo ou posição
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="searchTerm"
                    placeholder="Ex: Desenvolvedor, Assistente Administrativo, Designer..."
                    className="input flex-grow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary ml-2"
                    disabled={isSearching}
                  >
                    {isSearching ? 'Pesquisando...' : 'Pesquisar'}
                  </button>
                </div>
                {searchError && (
                  <p className="mt-1 text-sm text-red-600">{searchError}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Digite pelo menos {MIN_SEARCH_LENGTH} caracteres para pesquisar
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Experiência
                  </label>
                  <select 
                    id="experience" 
                    className="input py-2"
                  >
                    <option value="">Qualquer experiência</option>
                    <option value="1">Mais de 1 ano</option>
                    <option value="3">Mais de 3 anos</option>
                    <option value="5">Mais de 5 anos</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="updatedWithin" className="block text-sm font-medium text-gray-700 mb-1">
                    Atualizado nos últimos
                  </label>
                  <select 
                    id="updatedWithin" 
                    className="input py-2"
                  >
                    <option value="30">30 dias</option>
                    <option value="60">60 dias</option>
                    <option value="90">90 dias</option>
                    <option value="180">6 meses</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          
          {hasSearched && (
            <div>
              {isSearching ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Buscando candidatos...</p>
                </div>
              ) : filteredCandidates.length > 0 ? (
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">
                    {filteredCandidates.length} candidato(s) encontrado(s) para &ldquo;{searchTerm}&rdquo;
                  </h2>
                  
                  <div className="space-y-4">
                    {filteredCandidates.map((candidate) => (
                      <div key={candidate.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-gray-900">{candidate.name}</h3>
                            <div className="text-blue-600 font-medium">{candidate.position}</div>
                            <div className="text-gray-600 mt-1">{candidate.location} • {candidate.experience} de experiência</div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <Link href={`/candidatos/${candidate.id}`} className="btn btn-primary">
                              Ver perfil
                            </Link>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-1">Habilidades:</div>
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
                        
                        <div className="flex justify-between text-sm text-gray-600">
                          <div>{candidate.education}</div>
                          <div>Atualizado em {candidate.lastUpdated}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum candidato encontrado</h3>
                  <p className="text-gray-600 mb-6">
                    Não encontramos candidatos para &ldquo;{searchTerm}&rdquo;. Tente outra palavra-chave ou cargo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setHasSearched(false);
                      }}
                      className="btn btn-secondary"
                    >
                      Limpar pesquisa
                    </button>
                    <Link href="/publicar-vaga" className="btn btn-primary">
                      Publicar uma vaga
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 