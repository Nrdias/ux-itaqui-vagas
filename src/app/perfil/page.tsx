'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useUserStore } from '@/stores/userStore';
import { useSessionStore } from '@/stores/sessionStore';
import { User, StoreExperience, StoreEducation } from '@/types/user';

export default function PerfilPage() {
  const { updateUser, user: currentUser, _hasHydrated: userHydrated } = useUserStore();
  const { isAuthenticated, _hasHydrated: sessionHydrated } = useSessionStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);

  // Check if both stores have hydrated and user is authenticated
  const isLoading = !userHydrated || !sessionHydrated;
  const isUserAuthenticated = isAuthenticated();

  useEffect(() => {
    if (isUserAuthenticated && currentUser) {
      setEditData({ ...currentUser });
    }
  }, [isUserAuthenticated, currentUser]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (currentUser) {
      setEditData({ ...currentUser });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!currentUser || !editData) return;

    setIsSaving(true);
    try {
      // Atualiza na store do Zustand
      updateUser(editData);
      
      // Também atualiza no localStorage através do UserService se necessário
      // (para manter compatibilidade com o sistema existente)
      
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erro ao atualizar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePersonalData = (field: string, value: string) => {
    if (!editData) return;
    
    if (field === 'fullName') {
      setEditData(prev => prev ? { ...prev, name: value } : null);
    } else if (field === 'email') {
      setEditData(prev => prev ? { ...prev, email: value } : null);
    } else if (field === 'phone') {
      setEditData(prev => prev ? { ...prev, phone: value } : null);
    } else if (field === 'city' && editData.address) {
      setEditData(prev => prev ? { 
        ...prev, 
        address: { ...prev.address!, city: value }
      } : null);
    } else if (field === 'address' && editData.address) {
      setEditData(prev => prev ? { 
        ...prev, 
        address: { ...prev.address!, street: value }
      } : null);
    }
  };

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    if (!editData?.experiences) return;
    
    setEditData(prev => {
      if (!prev?.experiences) return prev;
      
      const updatedExperiences = [...prev.experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [field]: value
      };
      
      return {
        ...prev,
        experiences: updatedExperiences
      };
    });
  };

  const updateEducation = (index: number, field: string, value: string | boolean) => {
    if (!editData?.education) return;
    
    setEditData(prev => {
      if (!prev?.education) return prev;
      
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value
      };
      
      return {
        ...prev,
        education: updatedEducation
      };
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!isUserAuthenticated || !currentUser) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p>Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    );
  }

  const displayData = isEditing ? editData : currentUser;

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-medium">
                {currentUser.name
                  .split(' ')
                  .map((name: string) => name.charAt(0))
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-medium text-gray-900">
                  {currentUser.name}
                </h1>
                <p className="text-gray-600">{currentUser.email}</p>
                <p className="text-sm text-gray-500">
                  Candidato
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit}>
                  Editar Perfil
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Dados Pessoais</h2>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome completo"
                  value={editData?.name || ''}
                  onChange={(e) => updatePersonalData('fullName', e.target.value)}
                />
                <Input
                  label="E-mail"
                  type="email"
                  value={editData?.email || ''}
                  onChange={(e) => updatePersonalData('email', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Telefone"
                  value={editData?.phone || ''}
                  onChange={(e) => updatePersonalData('phone', e.target.value)}
                />
                <Input
                  label="Cidade"
                  value={editData?.address?.city || ''}
                  onChange={(e) => updatePersonalData('city', e.target.value)}
                />
              </div>
              <Input
                label="Endereço"
                value={editData?.address?.street || ''}
                onChange={(e) => updatePersonalData('address', e.target.value)}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Telefone</p>
                <p className="text-gray-900">{displayData?.phone || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cidade</p>
                <p className="text-gray-900">{displayData?.address?.city || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">CPF</p>
                <p className="text-gray-900">{displayData?.cpf || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data de nascimento</p>
                <p className="text-gray-900">{displayData?.birthDate || 'Não informado'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Endereço</p>
                <p className="text-gray-900">{displayData?.address?.street || 'Não informado'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Experiência Profissional */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Experiência Profissional</h2>
          
          <div className="space-y-6">
            {displayData?.experiences?.map((experience: StoreExperience, index: number) => (
              <div key={experience.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Cargo"
                        value={experience.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      />
                      <Input
                        label="Empresa"
                        value={experience.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Data de início"
                        type="date"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                      />
                      <Input
                        label="Data de término"
                        type="date"
                        value={experience.endDate || ''}
                        disabled={experience.isCurrentWork}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`currentJob_${index}`}
                        checked={experience.isCurrentWork}
                        onChange={(e) => updateExperience(index, 'isCurrentWork', e.target.checked)}
                        className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`currentJob_${index}`} className="text-sm text-gray-600">
                        Este é meu emprego atual
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição das atividades
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={3}
                        value={experience.description || ''}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{experience.position}</h3>
                      <div className="text-sm text-gray-600">
                        {experience.startDate} - {experience.isCurrentWork ? 'Atual' : experience.endDate}
                      </div>
                    </div>
                    <div className="text-blue-600 font-medium mb-2">{experience.company}</div>
                    <p className="text-gray-700">{experience.description}</p>
                  </div>
                )}
              </div>
            )) || <p className="text-gray-500">Nenhuma experiência profissional adicionada.</p>}
          </div>
        </div>

        {/* Formação Acadêmica */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Formação Acadêmica</h2>
          
          <div className="space-y-6">
            {displayData?.education?.map((edu: StoreEducation, index: number) => (
              <div key={edu.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Curso"
                        value={edu.course}
                        onChange={(e) => updateEducation(index, 'course', e.target.value)}
                      />
                      <Input
                        label="Instituição"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nível</label>
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
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={edu.isCurrentStudy ? 'cursando' : 'concluido'}
                          onChange={(e) => updateEducation(index, 'isCurrentStudy', e.target.value === 'cursando')}
                        >
                          <option value="">Selecione o status</option>
                          <option value="cursando">Cursando</option>
                          <option value="concluido">Concluído</option>
                          <option value="trancado">Trancado</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{edu.course}</h3>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate || 'Em andamento'}
                      </div>
                    </div>
                    <div className="text-blue-600 font-medium mb-2">{edu.institution}</div>
                    <div className="text-gray-700">
                      {edu.level} - {edu.isCurrentStudy ? 'Cursando' : 'Concluído'}
                    </div>
                  </div>
                )}
              </div>
            )) || <p className="text-gray-500">Nenhuma formação acadêmica adicionada.</p>}
          </div>
        </div>

        {/* Resumo Profissional */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Resumo Profissional</h2>
          
          {isEditing ? (
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={4}
              value={editData?.professionalSummary || ''}
              onChange={(e) => setEditData(prev => prev ? { ...prev, professionalSummary: e.target.value } : null)}
              placeholder="Descreva seu resumo profissional..."
            />
          ) : (
            <p className="text-gray-700">
              {displayData?.professionalSummary || 'Nenhum resumo profissional adicionado.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 