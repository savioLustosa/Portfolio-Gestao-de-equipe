# Muito Mais que Dados - Gestão Operacional & TI 🚀💎

Uma plataforma de alta performance desenvolvida para gestão de equipes, tickets e cronogramas estratégicos. Focada em transparência, auditoria e facilidade de uso para gestores e desenvolvedores.

![Logo do Projeto](public/assets/logo.png)

## 🌟 Funcionalidades Principais

### 🗓️ Timeline Dinâmica & Gantt
- Navegação inteligente entre meses.
- Suporte a projetos multi-mês com cálculo de largura e posição em tempo real.
- Visualização clara de prazos e dependências.

### 🛡️ Auditoria & Governança (Cadeia de Custódia)
- Painel Master de auditoria completa com rastreabilidade total.
- Log de operações sincronizado com base de dados CSV.
- Filtro avançado por ID de ticket, responsável ou contexto.

### ⚡ Gestão de Performance
- **Tarefas em Andamento (Ongoing)**: Lógica de data dinâmica que atualiza o prazo final automaticamente até a conclusão.
- **Iniciativas Próprias**: Identificação visual com ícone de foguete 🚀 para projetos pessoais e melhorias autônomas.
- **Kanban Box**: Movimentação rápida de tickets entre colunas de status.

### 🔐 Segurança & Privacidade
- **Visão Individual**: Colaboradores visualizam apenas suas próprias demandas.
- **Acesso Master**: Gestores possuem visão 360º de toda a operação e controle de exclusão.
- **Autenticação Segura**: Fluxo de login validado com diferenciação de níveis de acesso.

### 🔔 Comunicação em Tempo Real
- Centro de notificações dinâmico integrado ao Topbar.
- Alertas visuais para Incidentes 🔴, Conclusões 🟢 e Atualizações 🔵.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js com Next.js (App Router).
- **Styling**: Tailwind CSS para uma interface moderna e responsiva.
- **Icons**: Lucide React.
- **Data Engine**: PapaParse para manipulação dinâmica de CSV como banco de dados.
- **State Management**: React Hooks (useState, useMemo, useEffect).

## 📊 Estrutura de Dados

O sistema utiliza uma arquitetura baseada em arquivos para máxima portabilidade:
- `public/data/tasks.csv`: Banco de dados de tarefas e projetos.
- `public/data/team.csv`: Registro de membros da equipe e níveis.
- `public/data/workspaces.csv`: Definição de áreas de negócio/workspaces.

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/Portfolio-Gestao-de-equipe.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse o sistema em `http://localhost:3000`.

### 🔑 Acesso de Demonstração (Portfólio)
- **Email**: `gestor@gestaequipe.com.br`
- **Senha**: `1020304050`

---
*Desenvolvido com foco em UX/UI e escalabilidade operacional.*
