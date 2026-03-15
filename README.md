# 🚀 Muito Mais que Dados - Gestão Operacional de Alta Performance

Este projeto foi desenvolvido como um **Case de Estudo e Portfólio Técnico**, focado em resolver problemas reais de gestão de equipes, visibilidade estratégica e rastreabilidade de dados. A plataforma simula um ambiente corporativo robusto para times de TI, Dados e DevOps.

---

## 🎯 O Desafio
Gestores muitas vezes enfrentam a falta de visibilidade em projetos de longo prazo e a dificuldade de auditar mudanças rápidas em ambientes ágeis. O "Muito Mais que Dados" resolve isso através de uma interface reativa, uma Timeline dinâmica e uma "Cadeia de Custódia" (Auditoria) completa.

---

## 🛠️ Stack Tecnológica & Decisões de Arquitetura

- **React + Next.js (App Router)**: Escolhido pela performance, roteamento otimizado e facilidade de escalabilidade.
- **Tailwind CSS**: Utilizado para criar uma UI "Clean & Premium", com foco em *User Experience* (UX) e micro-interações.
- **Lucide React**: Biblioteca de ícones escolhida pela consistência visual.
- **Arquitetura "File-First" (CSV Engine)**: 
  - **Desafio**: Criar um sistema funcional sem a necessidade de um backend complexo/caro para o portfólio.
  - **Solução**: Implementei uma engine usando `PapaParse` que consome arquivos CSV como base de dados inicial e sincroniza o estado via `LocalStorage`. Isso demonstra habilidade em manipulação de fluxos de dados, parsing e persistência cliente-lado.

---

## 💎 Funcionalidades de Destaque (Showcase)

### 🗓️ Timeline Engine Customizada
Um dos maiores desafios técnicos foi construir um componente de Timeline/Gantt do zero, capaz de:
- Calcular posições e larguras dinâmicas baseadas em calendários reais.
- Navegação entre meses mantendo o contexto de tarefas multi-mês.
- **Destaque**: Tarefas "Em Andamento" (Ongoing) possuem uma lógica onde a data final é o tempo atual (`today`), fazendo a barra "crescer" visualmente a cada dia até a conclusão.

### 🛡️ Auditoria Master & Governança
Desenvolvi um sistema de **Cadeia de Custódia** que registra cada movimentação no sistema.
- Modal de auditoria com busca em tempo real.
- Filtros por ID, Proprietário e Contexto.
- **Impacto**: Demonstra preocupação com conformidade e segurança de dados (Compliance).

### 🔐 Segurança Baseada em Funções (Role-Based Access)
- **Modo Colaborador**: Privacidade por padrão. O usuário vê apenas o seu "próprio quadrante".
- **Modo Gestor Admin**: Visão holística de todos os projetos e controle de exclusão (CRUD completo).
- **Interface de Login**: Credenciais pré-validadas para facilitar o teste por recrutadores.

### 🔔 Notificações Dinâmicas
- Sistema de *Activity Stream* que transforma eventos de banco de dados em alertas visuais categorizados (Sucesso, Incidente, Update).

---

## 📈 Lições Aprendidas
Durante o desenvolvimento, aprofundei conhecimentos em:
1. **Lógica de Calendário**: Manipulação complexa de objetos `Date` e visualização de dados temporal.
2. **UX de Dados**: Como apresentar grandes volumes de informações (Tabela vs Kanban vs Timeline) de forma organizada.
3. **Escalabilidade**: Criar componentes reutilizáveis e estados globais performáticos.

---

## 🚀 Como Testar (Demo)

1. **Clone & Install**:
   ```bash
   git clone https://github.com/savioLustosa/Portfolio-Gestao-de-equipe.git
   cd Portfolio-Gestao-de-equipe
   npm install
   npm run dev
   ```

2. **Acesso Admin (Para Recrutadores)**:
   - **User**: `gestor@gestaequipe.com.br` 
   - **Pass**: `1020304050`

---
*Este projeto demonstra não apenas habilidade de codificação, mas visão de produto e foco na resolução de problemas operacionais.*
