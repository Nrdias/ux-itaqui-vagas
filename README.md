# Itaqui Vagas

Um portal de vagas de emprego inspirado em https://itaqui.vagasnacidade.com.br/, desenvolvido com React, TypeScript e Next.js.

## 🚀 Funcionalidades

- **Cadastro de usuários**: Candidatos e empresas podem criar suas contas
- **Publicação de vagas**: Empresas podem divulgar oportunidades gratuitamente
- **Cadastro de currículos**: Candidatos podem preencher seus dados profissionais
- **Busca de vagas**: Filtros por tipo de contrato, faixa salarial e mais
- **Busca de candidatos**: Empresas podem encontrar profissionais por cargo e experiência
- **Interface moderna**: Design minimalista inspirado na estética da Apple
- **Integração externa**: Links de contato e suporte redirecionam para a plataforma Vagas na Cidade

## 💻 Tecnologias

- [Next.js 15](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🛠️ Instalação e uso

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ux-itaqui-vagas.git
cd ux-itaqui-vagas
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Rode o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse http://localhost:3000 no seu navegador.

## 🏗️ Estrutura do projeto

```
ux-itaqui-vagas/
├── src/
│   ├── app/                  # Páginas e rotas da aplicação
│   │   ├── vagas/            # Listagem e detalhes de vagas
│   │   ├── cadastro/         # Cadastro de candidatos
│   │   ├── cadastro-empresa/ # Cadastro de empresas
│   │   ├── login/            # Login de usuários
│   │   ├── publicar-vaga/    # Formulário para publicar vagas
│   │   ├── sobre/            # Página sobre o projeto
│   │   ├── empresas/         # Informações para empresas
│   │   └── buscar-candidatos/ # Busca de candidatos por cargo
│   ├── components/           # Componentes reutilizáveis
│   │   ├── layout/           # Componentes de layout (Header, Footer)
│   │   └── ui/               # Componentes de UI (Button, Input, JobCard)
├── public/                   # Arquivos estáticos
└── tailwind.config.ts       # Configuração do Tailwind CSS
```

## ✨ Recursos implementados

- **Página de busca de candidatos**: Interface completa para pesquisar candidatos por cargo, com validação de mínimo de caracteres e tratamento para resultados vazios
- **Página Sobre**: Informações detalhadas sobre o projeto, incluindo Nossa Causa, Nossos Pilares e Valores
- **Integração com Vagas na Cidade**: Links de "Fale Conosco" e "Suporte" redirecionam para o site oficial vagasnacidade.com.br
- **Compatibilidade com diferentes navegadores**: Correção de erros de hidratação para garantir renderização consistente
- **Design responsivo**: Interface adaptável para desktop e dispositivos móveis

## 📝 Notas

Este projeto é apenas para fins educacionais e de demonstração. Em uma aplicação real, seria necessário implementar:

- Autenticação e segurança
- Backend e banco de dados
- Validação de formulários
- Testes automatizados
- Responsividade para todos os dispositivos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
