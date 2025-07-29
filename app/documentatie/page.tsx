import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code } from "lucide-react"

export default function DocumentationPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
        <div className="flex items-center gap-2 mb-2">
          <Code className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold">Documentație Tehnică</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Documentație tehnică pentru dezvoltatori și administratori ai platformei NeuroLearn
        </p>

        <Tabs defaultValue="architecture" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="architecture">Arhitectură</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="database">Bază de date</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture">
            <Card>
              <CardHeader>
                <CardTitle>Arhitectura aplicației</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Prezentare generală</h3>
                  <p>
                    NeuroLearn este construit folosind Next.js 14 cu App Router, oferind o aplicație full-stack modernă
                    cu rendering hibrid (SSR, SSG și CSR). Aplicația folosește Supabase pentru autentificare, bază de
                    date și storage.
                  </p>

                  <h3>Structura proiectului</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    {`
/app                  # Directorul principal pentru App Router
  /api                # API Routes pentru funcționalități server-side
  /dashboard          # Pagina principală a utilizatorului autentificat
  /lectii             # Pagini pentru lecții și conținut educațional
  /progres            # Pagini pentru vizualizarea progresului
  /unelte             # Instrumente de învățare (Pomodoro, etc.)
  /setari             # Setări utilizator
  /grupuri            # Funcționalități pentru grupuri de studiu
  /todo               # Sistem de management al sarcinilor
  /layout.tsx         # Layout principal al aplicației
  /page.tsx           # Pagina de start

/components           # Componente React reutilizabile
  /ui                 # Componente UI de bază (shadcn/ui)
  /dashboard          # Componente specifice dashboard-ului
  /lessons            # Componente pentru afișarea lecțiilor
  /tools              # Componente pentru unelte de învățare
  /progress           # Componente pentru vizualizarea progresului

/lib                  # Utilități și funcții helper
  /supabase           # Configurare și utilități Supabase
  /utils              # Funcții utilitare generale


/public               # Fișiere statice (imagini, fonturi, etc.)
                    `}
                  </pre>

                  <h3>Tehnologii principale</h3>
                  <ul>
                    <li>
                      <strong>Frontend:</strong> React, Next.js, TailwindCSS, shadcn/ui, Framer Motion
                    </li>
                    <li>
                      <strong>Backend:</strong> Next.js API Routes, Supabase Functions
                    </li>
                    <li>
                      <strong>Bază de date:</strong> PostgreSQL (via Supabase)
                    </li>
                    <li>
                      <strong>Autentificare:</strong> Supabase Auth
                    </li>
                    <li>
                      <strong>Deployment:</strong> Vercel
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>Documentație API</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Endpoints API</h3>

                  <p>Aplicația NeuroLearn oferă următoarele endpoint-uri API pentru interacțiunea cu datele:</p>

                  <h4>Lecții</h4>
                  <ul>
                    <li>
                      <code>GET /api/lessons</code> - Obține lista de lecții disponibile
                    </li>
                    <li>
                      <code>GET /api/lessons/[path]</code> - Obține detalii despre o lecție specifică
                    </li>
                    <li>
                      <code>GET /api/lessons/content</code> - Obține conținutul lecțiilor
                    </li>
                    <li>
                      <code>POST /api/admin/lessons</code> - Adaugă o lecție nouă (doar admin)
                    </li>
                    <li>
                      <code>PUT /api/admin/lessons/[id]</code> - Actualizează o lecție (doar admin)
                    </li>
                    <li>
                      <code>DELETE /api/admin/lessons/[id]</code> - Șterge o lecție (doar admin)
                    </li>
                  </ul>

                  <h4>Grupuri</h4>
                  <ul>
                    <li>
                      <code>GET /api/groups</code> - Obține grupurile utilizatorului
                    </li>
                    <li>
                      <code>POST /api/groups</code> - Creează un grup nou
                    </li>
                    <li>
                      <code>GET /api/groups/[id]</code> - Obține detalii despre un grup specific
                    </li>
                    <li>
                      <code>PUT /api/groups/[id]</code> - Actualizează un grup
                    </li>
                    <li>
                      <code>DELETE /api/groups/[id]</code> - Șterge un grup
                    </li>
                    <li>
                      <code>POST /api/groups/join</code> - Alătură-te unui grup folosind codul de invitație
                    </li>
                    <li>
                      <code>GET /api/groups/members</code> - Obține membrii unui grup
                    </li>
                  </ul>

                  <h4>Sunete</h4>
                  <ul>
                    <li>
                      <code>GET /api/sounds/[type]</code> - Obține sunetele pentru un anumit tip
                    </li>
                  </ul>

                  <h3>Autentificare API</h3>
                  <p>
                    Toate endpoint-urile API sunt protejate prin middleware-ul de autentificare. Cererile trebuie să
                    includă un token valid de sesiune Supabase, care este gestionat automat de clientul Supabase.
                  </p>

                  <h3>Gestionarea erorilor</h3>
                  <p>API-urile returnează coduri de stare HTTP standard:</p>
                  <ul>
                    <li>
                      <code>200 OK</code> - Cererea a fost procesată cu succes
                    </li>
                    <li>
                      <code>201 Created</code> - Resursa a fost creată cu succes
                    </li>
                    <li>
                      <code>400 Bad Request</code> - Cerere invalidă
                    </li>
                    <li>
                      <code>401 Unauthorized</code> - Autentificare necesară
                    </li>
                    <li>
                      <code>403 Forbidden</code> - Acces interzis
                    </li>
                    <li>
                      <code>404 Not Found</code> - Resursa nu a fost găsită
                    </li>
                    <li>
                      <code>500 Internal Server Error</code> - Eroare de server
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Structura bazei de date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Schema bazei de date</h3>
                  <p>
                    NeuroLearn utilizează PostgreSQL prin Supabase. Mai jos este prezentată schema principalelor tabele:
                  </p>

                  <h4>Tabele principale</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    {`
--profiles--
create table public.profiles (
  id uuid not null,
  first_name text null,
  last_name text null,
  full_name text null,
  learning_style text null,
  bio text null,
  role text null default 'student'::text,
  xp integer null default 0,
  streak integer null default 0,
  last_activity_date date null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists profiles_role_idx on public.profiles using btree (role) TABLESPACE pg_default;

create index IF not exists profiles_learning_style_idx on public.profiles using btree (learning_style) TABLESPACE pg_default;

create index IF not exists profiles_xp_idx on public.profiles using btree (xp desc) TABLESPACE pg_default;

create index IF not exists profiles_streak_idx on public.profiles using btree (streak desc) TABLESPACE pg_default;


--lessons--
create table public.lessons (
  id uuid not null default extensions.uuid_generate_v4 (),
  title text not null,
  description text null,
  content text null,
  content_path text null,
  difficulty text null default 'beginner'::text,
  xp_reward integer null default 10,
  estimated_duration integer null default 15,
  category text null,
  tags text[] null,
  is_published boolean null default false,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  created_by uuid null,
  constraint lessons_pkey primary key (id),
  constraint lessons_created_by_fkey foreign KEY (created_by) references auth.users (id) on delete set null
) TABLESPACE pg_default;

create index IF not exists lessons_is_published_idx on public.lessons using btree (is_published) TABLESPACE pg_default;

create index IF not exists lessons_difficulty_idx on public.lessons using btree (difficulty) TABLESPACE pg_default;

create index IF not exists lessons_category_idx on public.lessons using btree (category) TABLESPACE pg_default;

create index IF not exists lessons_created_by_idx on public.lessons using btree (created_by) TABLESPACE pg_default;


--tasks--
create table public.tasks (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid not null,
  title text not null,
  description text null,
  status text not null default 'todo'::text,
  task_priority text not null default 'medium'::text,
  due_date timestamp with time zone null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint tasks_pkey primary key (id),
  constraint tasks_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint tasks_priority_check check (
    (
      task_priority = any (array['low'::text, 'medium'::text, 'high'::text])
    )
  ),
  constraint tasks_status_check check (
    (
      status = any (
        array['todo'::text, 'in-progress'::text, 'done'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists tasks_user_id_idx on public.tasks using btree (user_id) TABLESPACE pg_default;

create index IF not exists tasks_status_idx on public.tasks using btree (status) TABLESPACE pg_default;

create index IF not exists tasks_priority_idx on public.tasks using btree (task_priority) TABLESPACE pg_default;

create index IF not exists tasks_due_date_idx on public.tasks using btree (due_date) TABLESPACE pg_default;


--lessons progress--
create table public.lesson_progress (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  lesson_id uuid null,
  completed boolean null default false,
  progress_percentage integer null default 0,
  time_spent integer null default 0,
  completed_at timestamp with time zone null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint lesson_progress_pkey primary key (id),
  constraint lesson_progress_user_id_lesson_id_key unique (user_id, lesson_id),
  constraint lesson_progress_lesson_id_fkey foreign KEY (lesson_id) references lessons (id) on delete CASCADE,
  constraint lesson_progress_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists lesson_progress_user_id_idx on public.lesson_progress using btree (user_id) TABLESPACE pg_default;

create index IF not exists lesson_progress_lesson_id_idx on public.lesson_progress using btree (lesson_id) TABLESPACE pg_default;

create index IF not exists lesson_progress_completed_idx on public.lesson_progress using btree (completed) TABLESPACE pg_default;

create index IF not exists lesson_progress_user_completed_idx on public.lesson_progress using btree (user_id, completed) TABLESPACE pg_default;


--jurnal--
create table public.journal_entries (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid not null,
  title text not null,
  content text not null,
  mood integer null default 3,
  study_method text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint journal_entries_pkey primary key (id),
  constraint journal_entries_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists journal_entries_user_id_idx on public.journal_entries using btree (user_id) TABLESPACE pg_default;

create index IF not exists journal_entries_created_at_idx on public.journal_entries using btree (created_at desc) TABLESPACE pg_default;


--groups--
create table public.groups (
  id uuid not null default extensions.uuid_generate_v4 (),
  name text not null,
  description text null,
  is_private boolean null default false,
  invite_code text not null,
  created_at timestamp with time zone null default now(),
  created_by uuid null,
  constraint groups_pkey primary key (id),
  constraint groups_invite_code_key unique (invite_code),
  constraint groups_created_by_fkey foreign KEY (created_by) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists groups_is_private_idx on public.groups using btree (is_private) TABLESPACE pg_default;

create index IF not exists groups_invite_code_idx on public.groups using btree (invite_code) TABLESPACE pg_default;

create index IF not exists groups_created_by_idx on public.groups using btree (created_by) TABLESPACE pg_default;


--group posts--
create table public.group_posts (
  id uuid not null default extensions.uuid_generate_v4 (),
  group_id uuid not null,
  user_id uuid not null,
  content text not null,
  created_at timestamp with time zone null default now(),
  likes integer null default 0,
  comments integer null default 0,
  constraint group_posts_pkey primary key (id),
  constraint group_posts_group_id_fkey foreign KEY (group_id) references groups (id) on delete CASCADE,
  constraint group_posts_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists group_posts_group_id_idx on public.group_posts using btree (group_id) TABLESPACE pg_default;

create index IF not exists group_posts_user_id_idx on public.group_posts using btree (user_id) TABLESPACE pg_default;

create index IF not exists group_posts_created_at_idx on public.group_posts using btree (created_at desc) TABLESPACE pg_default;


--group members--
create table public.group_members (
  id uuid not null default extensions.uuid_generate_v4 (),
  group_id uuid null,
  user_id uuid null,
  role text not null default 'member'::text,
  joined_at timestamp with time zone null default now(),
  constraint group_members_pkey primary key (id),
  constraint group_members_group_id_user_id_key unique (group_id, user_id),
  constraint group_members_group_id_fkey foreign KEY (group_id) references groups (id) on delete CASCADE,
  constraint group_members_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists group_members_group_id_idx on public.group_members using btree (group_id) TABLESPACE pg_default;

create index IF not exists group_members_user_id_idx on public.group_members using btree (user_id) TABLESPACE pg_default;

create index IF not exists group_members_role_idx on public.group_members using btree (role) TABLESPACE pg_default;


--goals--
create table public.goals (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid not null,
  title text not null,
  description text null,
  deadline timestamp with time zone null,
  completed boolean null default false,
  xp_reward integer null default 50,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint goals_pkey primary key (id),
  constraint goals_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists goals_user_id_idx on public.goals using btree (user_id) TABLESPACE pg_default;

create index IF not exists goals_completed_idx on public.goals using btree (completed) TABLESPACE pg_default;

create index IF not exists goals_deadline_idx on public.goals using btree (deadline) TABLESPACE pg_default;


--user settings - pomodoro timer--
create table public.user_settings (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid not null,
  focus_duration integer null default 25,
  short_break_duration integer null default 5,
  long_break_duration integer null default 15,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint user_settings_pkey primary key (id),
  constraint user_settings_user_id_key unique (user_id),
  constraint user_settings_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists user_settings_user_id_idx on public.user_settings using btree (user_id) TABLESPACE pg_default;



                    `}
                  </pre>

                  <h3>Row Level Security (RLS)</h3>
                  <p>
                    Toate tabelele sunt protejate prin politici RLS pentru a asigura că utilizatorii pot accesa doar
                    datele proprii sau datele partajate cu ei.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment">
            <Card>
              <CardHeader>
                <CardTitle>Deployment și configurare</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Cerințe de sistem</h3>
                  <ul>
                    <li>Node.js 18.x sau mai recent</li>
                    <li>Cont Vercel pentru deployment</li>
                    <li>Cont Supabase pentru baza de date și autentificare</li>
                  </ul>

                  <h3>Variabile de mediu</h3>
                  <p>Următoarele variabile de mediu sunt necesare pentru funcționarea aplicației:</p>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    {`
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

# Database (furnizate de Supabase)
POSTGRES_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
POSTGRES_PRISMA_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
POSTGRES_USER=postgres
POSTGRES_HOST=db.your-project.supabase.co
POSTGRES_PASSWORD=your-db-password
POSTGRES_DATABASE=postgres

# Aplicație
SITE_URL=https://your-app-url.com
                    `}
                  </pre>

                  <h3>Deployment pe Vercel</h3>
                  <ol>
                    <li>Creează un cont Vercel și conectează-l la repository-ul GitHub</li>
                    <li>Importă proiectul în Vercel</li>
                    <li>Configurează variabilele de mediu în setările proiectului</li>
                    <li>Deployează aplicația</li>
                  </ol>

                  <h3>Configurare Supabase</h3>
                  <ol>
                    <li>Creează un proiect Supabase</li>
                    <li>
                      Execută scripturile SQL din directorul <code>/db</code> pentru a configura schema bazei de date
                    </li>
                    <li>Configurează autentificarea în Supabase Dashboard</li>
                    <li>Setează politicile RLS pentru securitatea datelor</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
