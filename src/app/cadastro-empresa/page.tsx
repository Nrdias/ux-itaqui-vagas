'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CompanyService } from '@/lib/companyService';
import { CompanyData } from '@/types/company';
import { useCompanyStore } from '@/stores/companyStore';

export default function CadastroEmpresaPage() {
  const router = useRouter();
  const { setCompany } = useCompanyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    cnpj: '',
    phone: '',
    email: '',
    website: '',
    city: '',
    state: '',
    address: '',
    sector: '',
    description: '',
    logo: undefined,
    responsibleName: '',
    responsiblePosition: '',
    responsibleEmail: '',
    responsiblePhone: '',
    password: '',
    confirmPassword: ''
  });

  const updateCompanyData = (field: keyof CompanyData, value: string | File | undefined) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!companyData.companyName.trim()) newErrors.companyName = 'Nome da empresa é obrigatório';
    if (!companyData.cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório';
    if (!companyData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    
    if (!companyData.email.trim()) {
      newErrors.email = 'E-mail corporativo é obrigatório';
    } else if (!companyData.email.includes('@') || !companyData.email.includes('.')) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!companyData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!companyData.state.trim()) newErrors.state = 'Estado é obrigatório';
    if (!companyData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!companyData.sector.trim()) newErrors.sector = 'Setor de atuação é obrigatório';
    if (!companyData.description.trim()) newErrors.description = 'Descrição da empresa é obrigatória';
    
    if (!companyData.responsibleName.trim()) newErrors.responsibleName = 'Nome do responsável é obrigatório';
    if (!companyData.responsiblePosition.trim()) newErrors.responsiblePosition = 'Cargo é obrigatório';
    
    if (!companyData.responsibleEmail.trim()) {
      newErrors.responsibleEmail = 'E-mail do responsável é obrigatório';
    } else if (!companyData.responsibleEmail.includes('@') || !companyData.responsibleEmail.includes('.')) {
      newErrors.responsibleEmail = 'E-mail inválido';
    }
    
    if (!companyData.responsiblePhone.trim()) newErrors.responsiblePhone = 'Telefone do responsável é obrigatório';
    
    if (!companyData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (companyData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (!companyData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (companyData.password !== companyData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    
    if (!acceptedTerms) {
      newErrors.terms = 'Você deve aceitar os termos de uso';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await CompanyService.registerCompany(companyData);
      
      if (result.success && result.company) {
        setCompany(result.company);
        alert('Cadastro realizado com sucesso!');
        router.push('/dashboard-empresa');
      } else {
        if (result.error === 'Este e-mail já está cadastrado') {
          setErrors({ email: result.error });
        } else if (result.error === 'Este CNPJ já está cadastrado') {
          setErrors({ cnpj: result.error });
        } else {
          alert(result.error || 'Erro ao realizar cadastro. Tente novamente.');
        }
      }
    } catch (error) {
      console.error('Error during company registration:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-4">Cadastro de Empresa</h1>
          <p className="text-gray-600">
            Crie uma conta para sua empresa e publique vagas gratuitamente.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="card">
          <h2 className="text-xl font-medium mb-6">Dados da empresa</h2>
          
          <div className="space-y-4">
            <div>
              <Input
                label="Nome da empresa"
                placeholder="Nome fantasia da empresa"
                value={companyData.companyName}
                onChange={(e) => updateCompanyData('companyName', e.target.value)}
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input 
                  label="CNPJ" 
                  placeholder="XX.XXX.XXX/XXXX-XX"
                  value={companyData.cnpj}
                  onChange={(e) => updateCompanyData('cnpj', e.target.value)}
                />
                {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
              </div>
              <div>
                <Input 
                  label="Telefone" 
                  placeholder="(XX) XXXXX-XXXX"
                  value={companyData.phone}
                  onChange={(e) => updateCompanyData('phone', e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div>
              <Input
                label="E-mail corporativo"
                type="email"
                placeholder="empresa@dominio.com"
                value={companyData.email}
                onChange={(e) => updateCompanyData('email', e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Input
                label="Site da empresa"
                type="url"
                placeholder="https://www.seusite.com"
                value={companyData.website}
                onChange={(e) => updateCompanyData('website', e.target.value)}
              />
              <p className="text-xs text-gray-600 mt-1">
                Opcional: adicione o site oficial da sua empresa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input 
                  label="Cidade" 
                  placeholder="Digite a cidade"
                  value={companyData.city}
                  onChange={(e) => updateCompanyData('city', e.target.value)}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <Input 
                  label="Estado" 
                  placeholder="Digite o estado"
                  value={companyData.state}
                  onChange={(e) => updateCompanyData('state', e.target.value)}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>
            
            <div>
              <Input
                label="Endereço completo"
                placeholder="Rua, número, bairro, complemento"
                value={companyData.address}
                onChange={(e) => updateCompanyData('address', e.target.value)}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Setor de atuação
              </label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={companyData.sector}
                onChange={(e) => updateCompanyData('sector', e.target.value)}
              >
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
              {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Descrição da empresa
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Descreva brevemente sua empresa, área de atuação e cultura organizacional"
                value={companyData.description}
                onChange={(e) => updateCompanyData('description', e.target.value)}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            <div>
              <Input
                label="Logo da empresa"
                type="file"
                accept="image/*"
                onChange={(e) => updateCompanyData('logo', e.target.files?.[0])}
              />
              <p className="text-xs text-gray-600 mt-1">
                Opcional: adicione a logo da sua empresa (formatos: JPG, PNG).
              </p>
            </div>
            
            <hr className="my-6" />
            
            <h3 className="text-lg font-medium mb-4">Dados do responsável</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input 
                  label="Nome completo" 
                  placeholder="Nome do responsável"
                  value={companyData.responsibleName}
                  onChange={(e) => updateCompanyData('responsibleName', e.target.value)}
                />
                {errors.responsibleName && <p className="text-red-500 text-sm mt-1">{errors.responsibleName}</p>}
              </div>
              <div>
                <Input 
                  label="Cargo" 
                  placeholder="Cargo na empresa"
                  value={companyData.responsiblePosition}
                  onChange={(e) => updateCompanyData('responsiblePosition', e.target.value)}
                />
                {errors.responsiblePosition && <p className="text-red-500 text-sm mt-1">{errors.responsiblePosition}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input 
                  label="E-mail" 
                  type="email" 
                  placeholder="seu@email.com"
                  value={companyData.responsibleEmail}
                  onChange={(e) => updateCompanyData('responsibleEmail', e.target.value)}
                />
                {errors.responsibleEmail && <p className="text-red-500 text-sm mt-1">{errors.responsibleEmail}</p>}
              </div>
              <div>
                <Input 
                  label="Telefone" 
                  placeholder="(XX) XXXXX-XXXX"
                  value={companyData.responsiblePhone}
                  onChange={(e) => updateCompanyData('responsiblePhone', e.target.value)}
                />
                {errors.responsiblePhone && <p className="text-red-500 text-sm mt-1">{errors.responsiblePhone}</p>}
              </div>
            </div>
            
            <div>
              <Input
                label="Senha"
                type="password"
                placeholder="Crie uma senha segura"
                value={companyData.password}
                onChange={(e) => updateCompanyData('password', e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <Input
                label="Confirmar senha"
                type="password"
                placeholder="Confirme sua senha"
                value={companyData.confirmPassword}
                onChange={(e) => updateCompanyData('confirmPassword', e.target.value)}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <div className="flex items-center mt-4">
              <input 
                type="checkbox" 
                id="termos" 
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="termos" className="ml-2 text-sm text-gray-600">
                Concordo com os <Link href={"/termos"} className="text-blue-600 hover:underline">termos de uso</Link> e <Link href={"/privacidade"} className="text-blue-600 hover:underline">política de privacidade</Link>.
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
          </div>
          
          <div className="mt-8">
            <Button 
              type="submit" 
              fullWidth 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando conta...' : 'Criar conta de empresa'}
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Já tem uma conta? <Link href={"/login"} className="text-blue-600 hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}