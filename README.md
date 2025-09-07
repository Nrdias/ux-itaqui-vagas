# Itaqui Jobs

A job portal inspired by [https://itaqui.vagasnacidade.com.br/](https://itaqui.vagasnacidade.com.br/), developed with React, TypeScript, and Next.js.

## 🌐 Demo

Access the running application: **[https://nrdias.github.io/ux-itaqui-vagas/](https://nrdias.github.io/ux-itaqui-vagas/)**

## 🚀 Features

  - **User registration**: Candidates and companies can create their accounts
  - **Job posting**: Companies can advertise opportunities for free
  - **Resume submission**: Candidates can fill in their professional details
  - **Job search**: Filters by contract type, salary range, and more
  - **Candidate search**: Companies can find professionals by position and experience
  - **Modern interface**: Minimalist design inspired by Apple's aesthetic
  - **External integration**: Contact and support links redirect to the Vagas na Cidade platform

## 💻 Technologies

  - [Next.js 15](https://nextjs.org/)
  - [React 18](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

## 🛠️ Installation and usage

### Prerequisites

  - Node.js (version 18 or higher)
  - npm or yarn

### Installation steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/ux-itaqui-vagas.git
    cd ux-itaqui-vagas
    ```

2.  Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Access http://localhost:3000 in your browser.

## 🏗️ Project structure

```
ux-itaqui-vagas/
├── src/
│    ├── app/                   # Application pages and routes
│    │   ├── vagas/             # Job listing and details
│    │   ├── cadastro/          # Candidate registration
│    │   ├── cadastro-empresa/  # Company registration
│    │   ├── login/             # User login
│    │   ├── publicar-vaga/     # Form to post jobs
│    │   ├── sobre/             # About the project page
│    │   ├── empresas/          # Information for companies
│    │   └── buscar-candidatos/ # Search for candidates by position
│    ├── components/            # Reusable components
│    │   ├── layout/            # Layout components (Header, Footer)
│    │   └── ui/                # UI components (Button, Input, JobCard)
├── public/                     # Static files
└── tailwind.config.ts          # Tailwind CSS configuration
```

## ✨ Implemented features

  - **Candidate search page**: Complete interface to search for candidates by position, with minimum character validation and handling for empty results
  - **About page**: Detailed information about the project, including Our Cause, Our Pillars, and Values
  - **Integration with Vagas na Cidade**: "Contact Us" and "Support" links redirect to the official vagasnacidade.com.br website
  - **Cross-browser compatibility**: Correction of hydration errors to ensure consistent rendering
  - **Responsive design**: Interface adaptable for desktop and mobile devices

## 📝 Notes

This project is for educational and demonstration purposes only. In a real application, it would be necessary to implement:

  - Authentication and security
  - Backend and database
  - Form validation
  - Automated tests
  - Responsiveness for all devices

## 📄 License

This project is under the MIT license. See the LICENSE file for more details.
