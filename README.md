# Litoral Poços - Website Moderno

Website profissional para serviços de perfuração de poços semi-artesianos no litoral paranaense.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Backend:** Express.js
- **UI Components:** Radix UI
- **Hospedagem:** Vercel

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

## 🔧 Instalação Local

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Visualizar build de produção
pnpm preview
```

O site estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
litoral-pocos-moderno/
├── client/
│   ├── src/
│   │   ├── components/     # Componentes React reutilizáveis
│   │   ├── pages/          # Páginas principais
│   │   ├── lib/            # Utilitários e funções
│   │   └── App.tsx         # Componente raiz
│   ├── public/
│   │   └── logos/          # Logos dos clientes
│   └── index.html          # HTML principal
├── server/
│   └── index.ts            # Servidor Express
├── package.json
├── vite.config.ts
└── vercel.json             # Configuração Vercel
```

## 🌐 Deploy na Vercel

### Opção 1: Via GitHub (Recomendado)

1. Faça push do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Selecione seu repositório GitHub
5. Clique em "Deploy"

### Opção 2: Via CLI

```bash
# Instalar CLI da Vercel
npm install -g vercel

# Fazer deploy
vercel
```

## 🌍 Configurar Domínio Personalizado

1. Registre seu domínio no [Registro.br](https://registro.br) (para `.com.br`)
2. Na dashboard da Vercel, vá para "Settings" → "Domains"
3. Adicione seu domínio
4. Siga as instruções para configurar os nameservers

## 📝 Seções do Site

- **Hero:** Apresentação principal com CTA
- **Serviços:** Grid com 6 serviços principais
- **Certificações:** Destaques e garantias
- **Calculadora:** Estimativa de preço de perfuração
- **Equipe:** Apresentação dos profissionais
- **Testemunhos:** Avaliações de clientes
- **Nossos Clientes:** Carrossel com logos de empresas parceiras
- **Contato:** Formulário de contato

## 🎨 Componentes Principais

- `Clients.tsx` - Carrossel animado de logos de clientes
- `CompleteOrderForm.tsx` - Formulário de orçamento
- `ContactForm.tsx` - Formulário de contato
- `Testimonials.tsx` - Seção de depoimentos

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (até 767px)

## 🔐 Segurança

- HTTPS automático via Vercel
- Proteção contra ataques comuns
- Validação de formulários no frontend e backend

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através do formulário no site.

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar conforme necessário.
