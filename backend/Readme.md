<h1> SUPABASE TABLES SETUP </h1>
<h2>SQL COMMANDS FOR TABLE CREATION IN SUPABASE</h2>

<pre>create table public.employees (
  id uuid not null default gen_random_uuid (),
  auth_user_id uuid null,
  full_name text not null,
  role text not null default 'employee'::text,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  email text null,
  employee_id text not null,
  constraint employees_pkey primary key (id),
  constraint employees_auth_user_id_key unique (auth_user_id),
  constraint employees_employee_id_key unique (employee_id),
  constraint employees_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;
create table public.clients (
  id uuid not null default gen_random_uuid (),
  name text not null,
  company text not null,
  email text null,
  phone text null,
  contract_value numeric(12, 2) null,
  account_manager uuid not null,
  contract_start timestamp with time zone not null default now(),
  status text not null default 'active'::text,
  notes text null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  contract_end timestamp with time zone null default (now() + '2 mons'::interval),
  revenue numeric null default '0'::numeric,
  industry text null default 'Services'::text,
  constraint clients_pkey primary key (id),
  constraint clients_account_manager_fkey foreign KEY (account_manager) references employees (id)
) TABLESPACE pg_default;
create table public.leads (
  id uuid not null default gen_random_uuid (),
  name text not null,
  company text null,
  email text null,
  phone text null,
  status text not null default 'new'::text,
  notes text null,
  source text not null default 'Website Form'::text,
  assigned_to uuid not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  industry text null default 'Services'::text,
  constraint leads_pkey primary key (id),
  constraint leads_assigned_to_fkey foreign KEY (assigned_to) references employees (id)
) TABLESPACE pg_default;
create table public.notification_reads (
  id uuid not null default gen_random_uuid (),
  notification_id uuid not null,
  user_id uuid not null,
  read_at timestamp with time zone null default now(),
  constraint notification_reads_pkey primary key (id),
  constraint notification_reads_notification_id_user_id_key unique (notification_id, user_id),
  constraint notification_reads_notification_id_fkey foreign KEY (notification_id) references notifications (id) on delete CASCADE,
  constraint notification_reads_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;
create table public.notifications (
  id uuid not null default gen_random_uuid (),
  title text not null,
  message text not null,
  type text not null,
  created_at timestamp with time zone null default now(),
  constraint notifications_pkey primary key (id)
) TABLESPACE pg_default;
create table public.projects (
  id uuid not null default gen_random_uuid (),
  client_id uuid not null,
  name text not null,
  description text null,
  status text not null default 'planning'::text,
  start_date date null,
  deadline date null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint projects_pkey primary key (id),
  constraint projects_client_id_fkey foreign KEY (client_id) references clients (id) on delete CASCADE
) TABLESPACE pg_default;
create table public.tasks (
  id uuid not null default gen_random_uuid (),
  project_id uuid not null,
  title text not null,
  description text null,
  status text not null default 'todo'::text,
  priority text null default 'medium'::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint tasks_pkey primary key (id),
  constraint tasks_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE
) TABLESPACE pg_default;</pre>

<h2>2. ENABLE CRON JOB IN SUPABASE FOR SQL COMMAND</h2>

<pre>
DELETE FROM notifications
WHERE created_at < NOW() - INTERVAL '3 days';
</pre>

<h2>3. ENABLE REALTIME FOR TABLE 'notifications'</h2>

<h2>4. ENABLE RESET PASSWORD WITH EMAIL FOR SUPABASE AUTH IN 'authentication'</h2>

<h2>5. add frontend url in supabase 'configure url' for redirects https://frontend.com/reset-password and https://frontend.com/login

<h2>6. setup smpt server for sending email from in supabase</h2>
