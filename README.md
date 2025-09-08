# Insany Store

A Insany Store é uma loja online fictícia desenvolvida com Next.js, TypeScript e Tailwind CSS.  
O projeto visa demonstrar boas práticas de desenvolvimento front-end, incluindo testes automatizados com Jest e integração com a Vercel para deploy contínuo.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** – Framework React para aplicações web escaláveis
- **TypeScript** – Superset do JavaScript com tipagem estática
- **Tailwind CSS** – Framework utilitário para design responsivo
- **Jest** – Framework de testes para JavaScript
- **Vercel** – Plataforma de deploy contínuo

---

## 📦 Como Rodar Localmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/dadacm/insany-store.git
cd insany-store
```

### 2. Instalar Dependências

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

### 3. Crie um arquivo .env a raiz do projeto e defina as seguintes variáveis:

NEXT_PUBLIC_API_URL=https://api.insany.co/api

NODE_ENV=development

### 4. Rode no terminal o seguinte comando para rodar o projeto localmente

```bash
yarn dev
```

ou com npm:

```bash
npm run dev
```

O projeto está configurado para deploy contínuo na Vercel.
A cada push para a branch main, a aplicação será automaticamente atualizada.

URL de produção: https://insany-store.vercel.app
