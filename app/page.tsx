import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  BookOpen,
  Brain,
  LineChart,
  CheckCircle,
  Target,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Settings,
  Play,
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <Layout isHomePage={true}>
      <div className="container px-4 py-12 md:py-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
              <Brain className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Neuro<span className="text-accent">Learn</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 ">
            Platformă educațională care te ajută să descoperi și să valorifici stilul tău de învățare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Înregistrează-te gratuit
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Conectare
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Ce îți oferim</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-2 dark:border-primary/20">
              <div className="h-2 bg-primary" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lecții interactive</h3>
                <p className="text-muted-foreground mb-4">
                  Învață prin activități și materiale adaptate stilului tău de învățare - vizual, auditiv și kinestezic.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 dark:border-primary/20">
              <div className="h-2 bg-accent" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Teste pentru aflarea stilului de învățare</h3>
                <p className="text-muted-foreground mb-4">
                  Evaluează-ți stilul de învățare pentru a-ți personaliza experiența.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 dark:border-primary/20">
              <div className="h-2 bg-primary" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analiză progres</h3>
                <p className="text-muted-foreground mb-4">
                  Vizualizează evoluția ta și identifică ariile care necesită îmbunătățire.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cui se adresează? Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Cui se adresează NeuroLearn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-2 dark:border-primary/20">
              <div className="h-2 bg-accent" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Elevilor și Studenților</h3>
                <p className="text-muted-foreground mb-4">
                  Descoperă metode de studiu care se potrivesc cel mai bine stilului tău de învățare pentru a obține
                  rezultate academice superioare.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 dark:border-primary/20">
              <div className="h-2 bg-primary" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Profesioniștilor</h3>
                <p className="text-muted-foreground mb-4">
                  Îmbunătățește-ți abilitățile și asimilează rapid informații noi, esențiale pentru dezvoltarea ta
                  profesională continuă.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 dark:border-primary/20">
              <div className="h-2 bg-accent" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Oricui dorește să învețe eficient</h3>
                <p className="text-muted-foreground mb-4">
                  Indiferent de vârstă sau domeniu, NeuroLearn te ajută să transformi învățarea într-o experiență
                  plăcută și productivă.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cum funcționează? Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Cum funcționează?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Descoperă-ți stilul</h3>
              <p className="text-muted-foreground">
                Completează testul nostru pentru a identifica stilul tău dominant de învățare.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Accesează lecții personalizate</h3>
              <p className="text-muted-foreground">
                Primești materiale și activități adaptate stilului tău, pentru o înțelegere mai profundă.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Progresează și învață</h3>
              <p className="text-muted-foreground">
                Urmărește-ți progresul, obține feedback și îmbunătățește-ți continuu abilitățile de învățare.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Beneficii</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Învățare eficientă</h3>
                <p className="text-muted-foreground">
                  Metodele noastre sunt bazate pe cercetări științifice în domeniul neuroștiinței cognitive.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ritm propriu</h3>
                <p className="text-muted-foreground">
                  Înveți în ritmul tău, fără presiune și cu posibilitatea de a reveni oricând la materiale.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Feedback personalizat</h3>
                <p className="text-muted-foreground">
                  Primești recomandări și sugestii adaptate stilului tău de învățare.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Comunitate activă</h3>
                <p className="text-muted-foreground">
                  Conectează-te cu alți cursanți și împărtășește experiențe de învățare.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="relative overflow-hidden rounded-lg border bg-background p-8">
          <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent/10" />
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Începe călătoria ta de învățare</h2>
              <p className="text-muted-foreground">
                Creează-ți un cont gratuit și descoperă o nouă modalitate de a învăța.
              </p>
            </div>
            <Link href="/register">
              <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                Înregistrează-te gratuit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
