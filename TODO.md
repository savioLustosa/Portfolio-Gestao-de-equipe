# TODO: Sistema Gestão de Projetos e Equipe (SaaS)

## Passos do Plano Aprovado

### 1. Inicialização do Repositório ✅
- [x] `git init`
- [x] Criar .gitignore
- [x] Criar CHANGELOG.md inicial (v0.1.0)
- [x] Primeiro commit

### 2. Estrutura Monorepo Root ✅
- [x] package.json root (turbo, workspaces)
- [x] turbo.json
- [x] .env.example (Supabase vars)

### 3. Pacotes Compartilhados ✅ (db full)
- [x] packages/db/ (Drizzle schema.ts, config)
- [ ] packages/ui/ (shadcn init)

### 4. App Web (Next.js)
- [x] apps/web/package.json
- [ ] apps/web setup (Next.js, Tailwind, shadcn, TRPC, Drizzle)
- [ ] lib/supabase.ts
- [ ] src/app layout, auth page

### 5. Schema Supabase
- [ ] Definir tables (users, teams, projects, boards, tasks)
- [ ] Drizzle migrations

### 6. Features Básicas
- [ ] Dashboard
- [ ] CRUD Projects/Teams
- [ ] Kanban Boards (drag-drop)

### 7. Realtime e Polish
- [ ] Supabase realtime subs
- [ ] UI components Monday-like
- [ ] Deploy Vercel ready

### 8. Final
- [ ] Testes
- [ ] GitHub push
- [ ] README atualizado

Progresso será atualizado a cada passo concluído.
