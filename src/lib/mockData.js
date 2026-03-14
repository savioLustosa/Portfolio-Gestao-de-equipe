export const mockTasks = [
  {
    id: 1,
    name: "Migração Pipeline CI/CD",
    group: "DevOps & Infra",
    status: "Em Produção",
    priority: "Crítica",
    owner: "Savio",
    startDate: "2024-03-01",
    date: "2024-03-15",
    env: "Prod",
    description: "Migração total dos pipelines de Jenkins para GitHub Actions.",
    gitPr: "https://github.com/syncsaas/infra/pull/123",
    gitStatus: "Merged"
  },
  {
    id: 2,
    name: "Setup Data Lakehouse",
    group: "Data & Analytics",
    status: "Em Desenvolvimento",
    priority: "Alta",
    owner: "Ana",
    startDate: "2024-03-05",
    date: "2024-03-25",
    env: "Dev",
    description: "Configuração do Delta Lake no S3 com Glue Catalog.",
    gitPr: "https://github.com/syncsaas/data/pull/45",
    gitStatus: "Open"
  },
  {
    id: 3,
    name: "Refatoração de API Auth",
    group: "Data & Analytics",
    status: "Homologação",
    priority: "Média",
    owner: "Carlos",
    startDate: "2024-03-10",
    date: "2024-03-20",
    env: "Hml",
    description: "Atualização do JWT para suporte a refresh tokens.",
    gitPr: "https://github.com/syncsaas/api/pull/89",
    gitStatus: "Review"
  },
  {
    id: 4,
    name: "Bug: Erro no Dashboard",
    group: "DevOps & Infra",
    status: "Incidente",
    priority: "Crítica",
    owner: "Savio",
    startDate: "2024-03-14",
    date: "2024-03-14",
    env: "Prod",
    description: "Dashboard não carrega métricas de latência em tempo real.",
    gitPr: "",
    gitStatus: "Fixing"
  }
];

export const statusColors = {
  'Em Produção': 'bg-green-100 text-green-700 border-green-200',
  'Homologação': 'bg-orange-100 text-orange-700 border-orange-200',
  'Em Desenvolvimento': 'bg-blue-100 text-blue-700 border-blue-200',
  'Análise': 'bg-purple-100 text-purple-700 border-purple-200',
  'Incidente': 'bg-red-100 text-red-700 border-red-200',
};

export const priorityColors = {
  'Crítica': 'text-red-600',
  'Alta': 'text-orange-600',
  'Média': 'text-blue-600',
  'Baixa': 'text-slate-500',
};
