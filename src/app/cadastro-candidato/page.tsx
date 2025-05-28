
'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserService } from '@/lib/userService';
import { UserData } from '@/types/user';

interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
  city: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

interface Education {
  id: string;
  course: string;
  institution: string;
  level: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function CadastroCanditatoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    cpf: '',
    city: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([{
    id: '1',
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    description: ''
  }]);
  
  const [education, setEducation] = useState<Education[]>([{
    id: '1',
    course: '',
    institution: '',
    level: '',
    status: '',
    startDate: '',
    endDate: ''
  }]);
  
  const [professionalSummary, setProfessionalSummary] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!personalData.fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório';
    
    if (!personalData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!personalData.email.includes('@') || !personalData.email.includes('.')) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!personalData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!personalData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória';
    if (!personalData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    if (!personalData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!personalData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    
    if (!personalData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (personalData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (!personalData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (personalData.password !== personalData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    experiences.forEach((exp, index) => {
      if (!exp.position.trim()) newErrors[`position_${index}`] = 'Cargo é obrigatório';
      if (!exp.company.trim()) newErrors[`company_${index}`] = 'Empresa é obrigatória';
      if (!exp.startDate) newErrors[`startDate_${index}`] = 'Data de início é obrigatória';
      if (!exp.isCurrentJob && !exp.endDate) newErrors[`endDate_${index}`] = 'Data de término é obrigatória';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    education.forEach((edu, index) => {
      if (!edu.course.trim()) newErrors[`course_${index}`] = 'Curso é obrigatório';
      if (!edu.institution.trim()) newErrors[`institution_${index}`] = 'Instituição é obrigatória';
      if (!edu.level) newErrors[`level_${index}`] = 'Nível é obrigatório';
      if (!edu.status) newErrors[`status_${index}`] = 'Status é obrigatório';
      if (!edu.startDate) newErrors[`startDate_${index}`] = 'Data de início é obrigatória';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };
  
  const goToPreviousStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    };
    setExperiences([...experiences, newExperience]);
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      course: '',
      institution: '',
      level: '',
      status: '',
      startDate: '',
      endDate: ''
    };
    setEducation([...education, newEducation]);
  };

  const updatePersonalData = (field: keyof PersonalData, value: string) => {
    setPersonalData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    
    if (field === 'isCurrentJob' && value === true) {
      updatedExperiences[index].endDate = '';
    }
    
    setExperiences(updatedExperiences);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setEducation(updatedEducation);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    
    setIsSubmitting(true);
    
    try {
      const userData: UserData = {
        personalData,
        experiences: experiences.filter(exp => exp.position.trim() !== ''),
        education: education.filter(edu => edu.course.trim() !== ''),
        professionalSummary,
        resumeFile: resumeFile || undefined
      };

      const result = await UserService.registerUser(userData);
      
      if (result.success) {
        alert('Cadastro realizado com sucesso!');
        router.push('/perfil');
      } else {
        if (result.error === 'Este e-mail já está cadastrado') {
          setErrors({ email: result.error });
          setStep(1);
        } else {
          alert(result.error || 'Erro ao realizar cadastro. Tente novamente.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-4">Cadastre seu currículo</h1>
          <p className="text-secondary">
            Crie seu perfil e tenha acesso a vagas de emprego em Itaqui e região.
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="w-full">
            <div className="relative">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 flex items-center justify-center rounded-full z-10
                        ${step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}
                    >
                      {i}
                    </div>
                    <span className="text-sm font-medium text-secondary mt-2 text-center">
                      {i === 1 && 'Dados pessoais'}
                      {i === 2 && 'Experiência'}
                      {i === 3 && 'Formação'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200 -z-10"></div>
              <div 
                className="absolute top-5 left-5 h-1 bg-primary transition-all -z-10"
                style={{ width: `calc(${(step - 1) * 50}% - ${(step - 1) * 20}px)` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="card">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Dados pessoais</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      label="Nome completo" 
                      placeholder="Digite seu nome completo"
                      value={personalData.fullName}
                      onChange={(e) => updatePersonalData('fullName', e.target.value)}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Input 
                      label="E-mail" 
                      type="email" 
                      placeholder="seu@email.com"
                      value={personalData.email}
                      onChange={(e) => updatePersonalData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      label="Telefone" 
                      placeholder="(XX) XXXXX-XXXX"
                      value={personalData.phone}
                      onChange={(e) => updatePersonalData('phone', e.target.value)}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Input 
                      label="Data de nascimento" 
                      type="date"
                      value={personalData.birthDate}
                      onChange={(e) => updatePersonalData('birthDate', e.target.value)}
                    />
                    {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      label="CPF" 
                      placeholder="XXX.XXX.XXX-XX"
                      value={personalData.cpf}
                      onChange={(e) => updatePersonalData('cpf', e.target.value)}
                    />
                    {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                  </div>
                  <div>
                    <Input 
                      label="Cidade" 
                      placeholder="Digite sua cidade"
                      value={personalData.city}
                      onChange={(e) => updatePersonalData('city', e.target.value)}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                </div>
                
                <div>
                  <Input
                    label="Endereço"
                    placeholder="Digite seu endereço completo"
                    value={personalData.address}
                    onChange={(e) => updatePersonalData('address', e.target.value)}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div>
                  <Input
                    label="Senha"
                    type="password"
                    placeholder="Crie uma senha segura"
                    value={personalData.password}
                    onChange={(e) => updatePersonalData('password', e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <Input
                    label="Confirmar senha"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={personalData.confirmPassword}
                    onChange={(e) => updatePersonalData('confirmPassword', e.target.value)}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button onClick={goToNextStep}>
                  Próximo
                </Button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h2 className="text-xl font-medium mb-6">Experiência profissional</h2>
              
              {experiences.map((experience, index) => (
                <div key={experience.id} className="space-y-4 mb-6 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <Input
                      label="Cargo"
                      placeholder="Ex: Desenvolvedor Web"
                      value={experience.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    />
                    {errors[`position_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`position_${index}`]}</p>}
                  </div>
                  
                  <div>
                    <Input
                      label="Empresa"
                      placeholder="Nome da empresa"
                      value={experience.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    />
                    {errors[`company_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`company_${index}`]}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input 
                        label="Data de início" 
                        type="date"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                      />
                      {errors[`startDate_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`startDate_${index}`]}</p>}
                    </div>
                    <div>
                      <Input 
                        label="Data de término" 
                        type="date" 
                        disabled={experience.isCurrentJob}
                        placeholder={experience.isCurrentJob ? "Atual" : ""}
                        value={experience.endDate}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      />
                      {errors[`endDate_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`endDate_${index}`]}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`currentJob_${index}`}
                      checked={experience.isCurrentJob}
                      onChange={(e) => updateExperience(index, 'isCurrentJob', e.target.checked)}
                      className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`currentJob_${index}`} className="text-sm text-secondary">
                      Este é meu emprego atual
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Descrição das atividades
                    </label>
                    <textarea 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={4}
                      placeholder="Descreva suas principais atividades e responsabilidades"
                      value={experience.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center mb-6">
                <button 
                  type="button"
                  onClick={addExperience}
                  className="text-primary hover:underline flex items-center"
                >
                  <span className="mr-1">+</span> Adicionar outra experiência
                </button>
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
              
              {education.map((edu, index) => (
                <div key={edu.id} className="space-y-4 mb-6 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <Input
                      label="Curso"
                      placeholder="Ex: Administração, Engenharia, etc."
                      value={edu.course}
                      onChange={(e) => updateEducation(index, 'course', e.target.value)}
                    />
                    {errors[`course_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`course_${index}`]}</p>}
                  </div>
                  
                  <div>
                    <Input
                      label="Instituição"
                      placeholder="Nome da instituição de ensino"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    />
                    {errors[`institution_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`institution_${index}`]}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1">
                        Nível
                      </label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={edu.level}
                        onChange={(e) => updateEducation(index, 'level', e.target.value)}
                      >
                        <option value="">Selecione o nível</option>
                        <option value="medio">Ensino Médio</option>
                        <option value="tecnico">Técnico</option>
                        <option value="superior">Ensino Superior</option>
                        <option value="pos">Pós-graduação</option>
                        <option value="mestrado">Mestrado</option>
                        <option value="doutorado">Doutorado</option>
                      </select>
                      {errors[`level_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`level_${index}`]}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Status
                      </label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={edu.status}
                        onChange={(e) => updateEducation(index, 'status', e.target.value)}
                      >
                        <option value="">Selecione o status</option>
                        <option value="cursando">Cursando</option>
                        <option value="concluido">Concluído</option>
                        <option value="trancado">Trancado</option>
                      </select>
                      {errors[`status_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`status_${index}`]}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input 
                        label="Data de início" 
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      />
                      {errors[`startDate_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`startDate_${index}`]}</p>}
                    </div>
                    <div>
                      <Input 
                        label="Data de conclusão" 
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center mb-6">
                <button 
                  type="button"
                  onClick={addEducation}
                  className="text-primary hover:underline flex items-center"
                >
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
                  value={professionalSummary}
                  onChange={(e) => setProfessionalSummary(e.target.value)}
                ></textarea>
              </div>
              
              <div>
                <Input
                  label="Currículo (PDF)"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-secondary mt-1">
                  Opcional: você pode anexar seu currículo em formato PDF.
                </p>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  Voltar
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Cadastrando...' : 'Concluir cadastro'}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-secondary text-sm">
            Já tem uma conta? <Link href={"/login"} className="text-primary hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 