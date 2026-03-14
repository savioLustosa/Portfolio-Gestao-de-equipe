import {
  pgTable,
  uuid,
  serial,
  text,
  timestamp,
  boolean,
  pgEnum,
  integer,
  jsonb,
  foreignKey,
  index,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'review', 'done']);
export const projectStatusEnum = pgEnum('project_status', ['planning', 'active', 'paused', 'completed']);

// Tables
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: text('role').default('member'), // admin, manager, member
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  ownerIdx: uniqueIndex('teams_owner_id_idx').on(table.ownerId),
}));

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').default('member'),
}, (table) => ({
  uniqueTeamUser: uniqueIndex('team_members_team_user_unique').on(table.teamId, table.userId),
}));

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: projectStatusEnum('status').default('planning'),
  teamId: integer('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const boards = pgTable('boards', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  columns: jsonb('columns').default([]), // [{name: 'To Do', color: '#red'}]
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').default('todo'),
  assigneeId: uuid('assignee_id').references(() => users.id),
  boardId: integer('board_id').notNull().references(() => boards.id, { onDelete: 'cascade' }),
  dueDate: timestamp('due_date'),
  priority: text('priority').default('medium'), // low, medium, high
  orderIndex: integer('order_index').default(0),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  assigneeIdx: index('tasks_assignee_idx').on(table.assigneeId),
}));

export const taskComments = pgTable('task_comments', {
  id: serial('id').primaryKey(),
  taskId: integer('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations (export for queries)
export const usersRelations = relations(users, ({ many }) => ({
  ownedTeams: many(teams),
  teamMemberships: many(teamMembers),
  assignedTasks: many(tasks),
  comments: many(taskComments),
}));

// Add other relations similarly...
// teamsRelations, etc.

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
// ... other types
