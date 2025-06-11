# 📒 ContAI Ledger

Sistema de controle de transações financeiras desenvolvido com Next.js, TailwindCSS e Firebase. A aplicação permite o registro e a visualização de transações, com foco em simplicidade, organização e persistência de dados na nuvem.

---

## 🚀 Tecnologias utilizadas

* **Next.js (App Router)** – Framework React com suporte a Server Components.
* **TypeScript** – Tipagem estática para maior segurança no desenvolvimento.
* **TailwindCSS** – Framework de utilitários CSS para estilização rápida e responsiva.
* **Firebase** – Backend como serviço, usado para persistência e hospedagem.
* **Vercel / Firebase Hosting** – Possível deploy da aplicação.
* **IA / Firebase Studio** – Base do projeto criada com auxílio de ferramentas do Firebase Studio com suporte a integração de IA.

---

## 🧹 Estrutura de pastas

```bash
src/
├── app/                 # Páginas e rotas (Next.js App Router)
├── components/          # Componentes reutilizáveis de UI
├── hooks/               # React Hooks personalizados
├── lib/                 # Funções auxiliares e integração com backend
├── ai/                  # (Opcional) Lógica baseada em inteligência artificial
├── types/               # Tipos TypeScript globais
```

Outros arquivos importantes:

* `tailwind.config.ts` – Configuração de estilo
* `tsconfig.json` – Configuração do compilador TypeScript
* `apphosting.yaml` – Configuração de deploy (Firebase Hosting)

---

## ✨ Funcionalidades

* ✅ Cadastro de transações com data, descrição e valor
* ✅ Histórico de transações com visualização em tempo real
* ✅ Layout moderno e responsivo
* ✅ Código modular, tipado e reutilizável
* ✅ Pronto para deploy com Firebase Hosting

---

## 📂 Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/Vinicios00/contai-ledger.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse em `http://localhost:3000`

---

## 📌 Caminho principal

O arquivo principal da aplicação está em:

```
src/app/page.tsx
```

É nele que a estrutura da interface inicial (formulário + histórico) é renderizada.

---

## 📬 Contato

Caso queira saber mais ou contribuir, entre em contato com \[Seu Nome] – Desenvolvedor do projeto.

---
