'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // Start with step 0 (selection)
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  
  const goToNextStep = () => {
    if (step === 0 && userType === 'company') {
      // Redirect to company registration
      router.push('/cadastro-empresa');
      return;
    }
    setStep(step + 1);
  };
  
  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  // Type selection step
  if (step === 0) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium mb-4">Cadastro</h1>
            <p className="text-secondary">
              Escolha o tipo de cadastro que deseja realizar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className={`card cursor-pointer transition-all hover:shadow-lg ${userType === 'candidate' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setUserType('candidate')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Sou um candidato</h3>
                <p className="text-secondary">
                  Cadastre seu currículo para encontrar oportunidades de emprego.
                </p>
              </div>
            </div>
            
            <div 
              className={`card cursor-pointer transition-all hover:shadow-lg ${userType === 'company' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setUserType('company')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Sou uma empresa</h3>
                <p className="text-secondary">
                  Cadastre sua empresa para publicar vagas e encontrar profissionais.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={goToNextStep} 
              disabled={!userType}
            >
              Continuar
            </Button>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-secondary text-sm">
              Já tem uma conta? <Link href="/login" className="text-primary hover:underline">Faça login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Candidate registration steps
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-4">Cadastre seu currículo</h1>
          <p className="text-secondary">
            Crie seu perfil e tenha acesso a vagas de emprego em Itaqui e região.
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-full">
            <div className="relative">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center rounded-full z-10
                      ${step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 bg-gray-200 w-full -z-10"></div>
              <div 
                className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 bg-primary transition-all -z-10"
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-secondary">Dados pessoais</span>
              <span className="text-sm font-medium text-secondary">Experiência</span>
              <span className="text-sm font-medium text-secondary">Formação</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Dados pessoais</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Nome completo" placeholder="Digite seu nome completo" />
                  <Input label="E-mail" type="email" placeholder="seu@email.com" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Telefone" placeholder="(XX) XXXXX-XXXX" />
                  <Input label="Data de nascimento" type="date" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="CPF" placeholder="XXX.XXX.XXX-XX" />
                  <Input label="Cidade" placeholder="Digite sua cidade" />
                </div>
                
                <div>
                  <Input
                    label="Endereço"
                    placeholder="Digite seu endereço completo"
                  />
                </div>
                
                <div>
                  <Input
                    label="Senha"
                    type="password"
                    placeholder="Crie uma senha segura"
                  />
                </div>
                
                <div>
                  <Input
                    label="Confirmar senha"
                    type="password"
                    placeholder="Confirme sua senha"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  Voltar
                </Button>
                <Button onClick={goToNextStep}>
                  Próximo
                </Button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Experiência profissional</h2>
              
              <div className="space-y-4">
                <div>
                  <Input
                    label="Cargo"
                    placeholder="Ex: Desenvolvedor Web"
                  />
                </div>
                
                <div>
                  <Input
                    label="Empresa"
                    placeholder="Nome da empresa"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Data de início" type="date" />
                  <Input label="Data de término" type="date" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Descrição das atividades
                  </label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                    placeholder="Descreva suas principais atividades e responsabilidades"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <button className="text-primary hover:underline flex items-center">
                    <span className="mr-1">+</span> Adicionar outra experiência
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  Voltar
                </Button>
                <Button onClick={goToNextStep}>
                  Próximo
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Formação acadêmica</h2>
              
              <div className="space-y-4">
                <div>
                  <Input
                    label="Curso"
                    placeholder="Ex: Administração, Engenharia, etc."
                  />
                </div>
                
                <div>
                  <Input
                    label="Instituição"
                    placeholder="Nome da instituição de ensino"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Nível
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Selecione o nível</option>
                      <option value="medio">Ensino Médio</option>
                      <option value="tecnico">Técnico</option>
                      <option value="superior">Ensino Superior</option>
                      <option value="pos">Pós-graduação</option>
                      <option value="mestrado">Mestrado</option>
                      <option value="doutorado">Doutorado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Status
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Selecione o status</option>
                      <option value="cursando">Cursando</option>
                      <option value="concluido">Concluído</option>
                      <option value="trancado">Trancado</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Data de início" type="date" />
                  <Input label="Data de conclusão" type="date" />
                </div>
                
                <div className="flex items-center">
                  <button className="text-primary hover:underline flex items-center">
                    <span className="mr-1">+</span> Adicionar outra formação
                  </button>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-text mb-1">
                    Resumo profissional
                  </label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                    placeholder="Faça um breve resumo sobre você, suas competências e objetivos profissionais"
                  ></textarea>
                </div>
                
                <div>
                  <Input
                    label="Currículo (PDF)"
                    type="file"
                    accept=".pdf"
                  />
                  <p className="text-xs text-secondary mt-1">
                    Opcional: você pode anexar seu currículo em formato PDF.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  Voltar
                </Button>
                <Button>
                  Concluir cadastro
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-secondary text-sm">
            Já tem uma conta? <Link href="/login" className="text-primary hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 