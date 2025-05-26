'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function CadastroEmpresaPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-4">Cadastro de Empresa</h1>
          <p className="text-gray-600">
            Crie uma conta para sua empresa e publique vagas gratuitamente.
          </p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-medium mb-6">Dados da empresa</h2>
          
          <div className="space-y-4">
            <div>
              <Input
                label="Nome da empresa"
                placeholder="Nome fantasia da empresa"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="CNPJ" placeholder="XX.XXX.XXX/XXXX-XX" />
              <Input label="Telefone" placeholder="(XX) XXXXX-XXXX" />
            </div>
            
            <div>
              <Input
                label="E-mail corporativo"
                type="email"
                placeholder="empresa@dominio.com"
              />
            </div>
            
            <div>
              <Input
                label="Site da empresa"
                type="url"
                placeholder="https://www.seusite.com"
              />
              <p className="text-xs text-gray-600 mt-1">
                Opcional: adicione o site oficial da sua empresa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Cidade" placeholder="Digite a cidade" />
              <Input label="Estado" placeholder="Digite o estado" />
            </div>
            
            <div>
              <Input
                label="Endereço completo"
                placeholder="Rua, número, bairro, complemento"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Setor de atuação
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Selecione o setor</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
                <option value="varejo">Varejo</option>
                <option value="industria">Indústria</option>
                <option value="agronegocio">Agronegócio</option>
                <option value="servicos">Serviços</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Descrição da empresa
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Descreva brevemente sua empresa, área de atuação e cultura organizacional"
              ></textarea>
            </div>
            
            <div>
              <Input
                label="Logo da empresa"
                type="file"
                accept="image/*"
              />
              <p className="text-xs text-gray-600 mt-1">
                Opcional: adicione a logo da sua empresa (formatos: JPG, PNG).
              </p>
            </div>
            
            <hr className="my-6" />
            
            <h3 className="text-lg font-medium mb-4">Dados do responsável</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome completo" placeholder="Nome do responsável" />
              <Input label="Cargo" placeholder="Cargo na empresa" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="E-mail" type="email" placeholder="seu@email.com" />
              <Input label="Telefone" placeholder="(XX) XXXXX-XXXX" />
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
            
            <div className="flex items-center mt-4">
              <input 
                type="checkbox" 
                id="termos" 
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="termos" className="ml-2 text-sm text-gray-600">
                Concordo com os <Link href="/termos" className="text-blue-600 hover:underline">termos de uso</Link> e <Link href="/privacidade" className="text-blue-600 hover:underline">política de privacidade</Link>.
              </label>
            </div>
          </div>
          
          <div className="mt-8">
            <Button fullWidth>
              Criar conta de empresa
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Já tem uma conta? <Link href="/login" className="text-blue-600 hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 