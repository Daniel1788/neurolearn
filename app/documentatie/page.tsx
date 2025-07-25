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
-- Utilizatori (extinde tabela auth.users din Supabase)
user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT,
  last_name TEXT,
  learning_style TEXT,
  xp INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

-- Lecții
lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  path TEXT UNIQUE NOT NULL,
  order_index INTEGER,
  category TEXT,
  tags TEXT[],
  xp_reward INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

-- Progres lecții
lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
)

-- Grupuri
groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  join_code TEXT UNIQUE,
  is_public BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

-- Membri grup
group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
)

-- Sarcini
tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  task_priority TEXT DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

-- Jurnal activitate
activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

-- Insigne utilizator
user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
)
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
