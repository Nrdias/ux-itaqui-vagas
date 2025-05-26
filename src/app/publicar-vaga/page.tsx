'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function PublicarVagaPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-4">Publicar uma nova vaga</h1>
          <p className="text-secondary">
            Preencha os detalhes da vaga que você deseja publicar. 
            Quanto mais informações você fornecer, mais qualificados serão os candidatos.
          </p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-medium mb-6">Detalhes da vaga</h2>
          
          <div className="space-y-4">
            <div>
              <Input
                label="Título da vaga"
                placeholder="Ex: Desenvolvedor Web, Assistente Administrativo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Descrição da vaga
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={6}
                placeholder="Descreva detalhadamente as responsabilidades, requisitos e benefícios da vaga"
              ></textarea>
              <p className="text-xs text-secondary mt-1">
                Inclua informações sobre responsabilidades, requisitos, habilidades desejadas e benefícios oferecidos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Tipo de contrato
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Selecione o tipo</option>
                  <option value="integral">Integral (CLT)</option>
                  <option value="meio-periodo">Meio período</option>
                  <option value="temporario">Temporário</option>
                  <option value="estagio">Estágio</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="pj">PJ</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Modalidade
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Selecione a modalidade</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="remoto">Remoto</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Salário (opcional)" 
                placeholder="Ex: R$ 3.000 ou A combinar"
              />
              <Input 
                label="Local de trabalho" 
                placeholder="Ex: Itaqui, RS"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Requisitos mínimos
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                placeholder="Liste os requisitos mínimos para a vaga"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Benefícios
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                placeholder="Liste os benefícios oferecidos"
              ></textarea>
              <p className="text-xs text-secondary mt-1">
                Ex: Vale transporte, plano de saúde, vale alimentação, etc.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Área de atuação
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Selecione a área</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="comercial">Comercial/Vendas</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="rh">Recursos Humanos</option>
                  <option value="ti">Tecnologia</option>
                  <option value="operacional">Operacional</option>
                  <option value="saude">Saúde</option>
                  <option value="educacao">Educação</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Nível de experiência
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Selecione o nível</option>
                  <option value="estagiario">Estágio</option>
                  <option value="junior">Júnior</option>
                  <option value="pleno">Pleno</option>
                  <option value="senior">Sênior</option>
                  <option value="especialista">Especialista</option>
                  <option value="gerencia">Gerência</option>
                </select>
              </div>
            </div>
            
            <div>
              <Input 
                label="Data limite para candidaturas (opcional)" 
                type="date"
              />
              <p className="text-xs text-secondary mt-1">
                Se não informado, a vaga ficará disponível por 30 dias.
              </p>
            </div>
            
            <div className="flex items-center mt-4">
              <input 
                type="checkbox" 
                id="destaque" 
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="destaque" className="ml-2 text-sm text-secondary">
                Destacar esta vaga na página inicial (gratuito por tempo limitado)
              </label>
            </div>
          </div>
          
          <div className="mt-8">
            <Button fullWidth>
              Publicar vaga
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 