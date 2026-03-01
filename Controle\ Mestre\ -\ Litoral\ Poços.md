# 📋 Controle Mestre - Litoral Poços

Este documento contém todas as informações cruciais para a gestão e manutenção do site **Litoral Poços**. **Mantenha este arquivo em local seguro.**

---

## 🚀 Status do Projeto
- **URL de Produção:** [https://litoral-pocos.vercel.app](https://litoral-pocos.vercel.app)
- **Domínio Personalizado:** `litoralpocos.app.br` (Aguardando apontamento DNS no Registro.br)
- **Plataforma de Hospedagem:** Vercel
- **Repositório de Código:** GitHub

---

## 🔐 Credenciais de Acesso
> **Aviso de Segurança:** Recomenda-se a alteração das senhas após a conclusão do projeto.

### 💻 GitHub
- **Login/Email:** `primiciasjunior01@gmail.com`
- **Senha:** `Taluiz1990_`
- **Repositório:** `eliezerjr1990/litoral-pocos`

### ⚡ Vercel
- **Login/Email:** `primiciasjunior01@gmail.com`
- **Método de Login:** Email (One-time password) ou via GitHub.

---

## 🛠️ Modificações Realizadas

### Versão 4 (Anterior)
1.  **Visual Hero:** Implementado carrossel de imagens aéreas horizontais em **4K/UHD** de Paranaguá, Pontal do Paraná, Matinhos e Guaratuba.
2.  **Calculadora de Orçamento:**
    - Limite máximo de profundidade ajustado para **18 metros**.
    - Rótulos do slider atualizados (6m, 12m, 18m).
    - Lógica de cálculo sincronizada com o novo limite.
    - **Nova funcionalidade:** Implementada lógica para calcular todas as variáveis possíveis de orçamento (serviço, cidade, profundidade, motor, adicionais).
    - **Integração de Pagamento:** Implementada a lógica de links de pagamento reais. O site agora mapeia o valor total do orçamento para um link do Mercado Pago configurado.
    - **Configuração de Links:** Criado o arquivo `client/src/config/paymentLinks.ts` para facilitar a gestão e atualização dos links de pagamento.
3.  **Contatos e Atendimento:**
    - Número Principal atualizado para: **(41) 98437-8485**.
    - Botão "Contato" no menu superior agora é um menu suspenso eficiente (Atendimento Principal e Agendamentos).
    - Número de Agendamentos (Anthonnelly) mantido conforme backup.
4.  **Conteúdo e FAQ:**
    - Removida a pergunta sobre licenças ambientais da seção FAQ.
    - Restaurada a seção de Equipe com fotos reais e dados do Claudio, Luiz Antonio e Anthonnelly.
    - Reintegrada a seção de Clientes com logos originais.
5.  **Infraestrutura:**
    - Deploy realizado com sucesso na Vercel.
    - Configuração de ambiente Vite/React otimizada para produção.

### Versão 5 (Anterior)
1. **Formas de Pagamento Integradas:**
   - Adicionado seletor de formas de pagamento no Resumo do Orçamento com 5 opções:
     - 💳 Cartão de Crédito
     - 🏦 Cartão de Débito
     - 💵 Dinheiro
     - 📱 Pix
     - 🔗 Link de Pagamento (Mercado Pago)
   
2. **QR Code Automático para Link de Pagamento:**
   - Quando o cliente seleciona "Link de Pagamento", um QR Code é gerado automaticamente
   - O QR Code contém o link de pagamento correspondente ao valor total do orçamento
   - QR Code é escaneável e redireciona para o Mercado Pago
   - Botão alternativo "Ou clique aqui para pagar" disponível
   
3. **Feedback Visual Melhorado:**
   - Cada método de pagamento selecionado exibe uma mensagem de confirmação
   - Link de Pagamento aparece em destaque verde quando disponível
   - Animações suaves ao selecionar diferentes métodos
   
4. **Dependências Adicionadas:**
   - Instalada biblioteca `qrcode` (v1.5.4) para geração de QR Codes

### Versão 7 (Atual - RODAPÉ COM CONTADOR DE VISITAS)

#### ✅ Alterações Realizadas

1. **Novo Componente Footer (`Footer.tsx`):**
   - Layout responsivo com 3 colunas: Sobre, Cidades Atendidas, Contatos
   - Integrado em todas as páginas via `App.tsx`
   - Contém informações da empresa, cidades atendidas, números de contato
   - Rodapé com fundo gradiente azul profissional
   - Animações suaves ao entrar na viewport

2. **Novo Componente VisitCounter (`VisitCounter.tsx`):**
   - Exibe contador de visitas pequeno e discreto
   - Integrado no Footer
   - Ícone de olho (👁️) + número de visitas
   - Texto pequeno em cinza (não chama atenção)

3. **Atualização do App.tsx:**
   - Importado novo componente `Footer`
   - Footer renderizado após o `Switch` de rotas
   - Aparece em todas as páginas (Home, FAQ, Vídeos, 404)

#### 📊 Resultado Final
- ✅ Contador de visitas agora aparece no **rodapé** (pequeno, no cantinho)
- ✅ **Não é mais flutuante** (removido do lado esquerdo)
- ✅ Rodapé profissional com informações da empresa
- ✅ Melhor organização visual do site
- ⏳ Aba de vídeos ainda requer investigação (possível problema de cache na Vercel)

---

## 📦 Estrutura do Backup
O arquivo de backup final contém a pasta completa do projeto pronta para ser editada ou redeployada.

- `/client`: Código fonte do front-end (React + Vite + Tailwind).
- `/server`: Lógica do servidor (se aplicável).
- `vercel.json`: Configurações de hospedagem.
- `Controle Mestre - Litoral Poços.md`: Este guia de referência.
- `pricing_combinations.md`: Tabela com todas as combinações de preços calculadas.

---

## 💳 Links de Pagamento Integrados

**Status:** ✅ Completo - 51 links de pagamento do Mercado Pago integrados

**Faixa de Valores Cobertos:**
- Mínimo: R$ 300,00
- Máximo: R$ 3.000,00

**Como Funciona:**
1. Cliente preenche o orçamento na calculadora.
2. Clica em "Enviar via WhatsApp".
3. O site detecta o valor total do orçamento.
4. Se houver um link de pagamento configurado para esse valor, exibe o botão "Clique aqui para pagar".
5. Cliente pode selecionar a forma de pagamento preferida.
6. Se selecionar "Link de Pagamento", um QR Code é gerado automaticamente.
7. Cliente escaneia o QR Code ou clica no link para acessar o Mercado Pago.

**Arquivo de Configuração:**
- `client/src/config/paymentLinks.ts` - Contém o mapeamento de todos os valores para seus respectivos links.

---

## 🔄 Fluxo de Pagamento Atualizado

```
Cliente preenche orçamento
        ↓
Clica "Enviar via WhatsApp"
        ↓
Abre conversa no WhatsApp com detalhes
        ↓
Seleciona forma de pagamento:
  ├─ Cartão de Crédito → Confirmação
  ├─ Cartão de Débito → Confirmação
  ├─ Dinheiro → Confirmação
  ├─ Pix → Confirmação
  └─ Link de Pagamento → QR Code gerado + Link direto
        ↓
Pagamento processado
```

---

**Data da última atualização:** 01 de Março de 2026.
**Desenvolvido por:** Manus AI Agent.
**Status do Projeto:** ✅ **RODAPÉ COM CONTADOR IMPLEMENTADO**
