import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-bold mb-2">Termeni și Condiții</h1>
        <p className="text-muted-foreground mb-8">Ultima actualizare: 15 Mai 2023</p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Introducere</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Bine ați venit la NeuroLearn. Acești Termeni și Condiții guvernează utilizarea platformei NeuroLearn,
              inclusiv toate serviciile și funcționalitățile asociate. Prin accesarea sau utilizarea platformei noastre,
              sunteți de acord să respectați acești termeni. Vă rugăm să îi citiți cu atenție.
            </p>
            <p>
              NeuroLearn este o platformă educațională concepută pentru a ajuta utilizatorii să-și îmbunătățească
              abilitățile de învățare prin metode personalizate bazate pe stilurile individuale de învățare.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Eligibilitate</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Pentru a utiliza NeuroLearn, trebuie să aveți cel puțin 13 ani. Dacă aveți între 13 și 18 ani, trebuie să
              aveți permisiunea unui părinte sau tutore legal pentru a utiliza serviciile noastre.
            </p>
            <p>
              Prin crearea unui cont, confirmați că îndepliniți aceste cerințe de eligibilitate și că informațiile
              furnizate în timpul procesului de înregistrare sunt adevărate, exacte și complete.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Contul utilizatorului</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Pentru a accesa toate funcționalitățile platformei, trebuie să creați un cont. Sunteți responsabil pentru
              menținerea confidențialității informațiilor contului dvs., inclusiv a parolei, și pentru toate
              activitățile care au loc sub contul dvs.
            </p>
            <p>
              Vă angajați să ne notificați imediat cu privire la orice utilizare neautorizată a contului dvs. sau orice
              altă încălcare a securității. NeuroLearn nu va fi responsabilă pentru pierderile cauzate de utilizarea
              neautorizată a contului dvs.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Proprietate intelectuală</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Conținutul disponibil pe NeuroLearn, inclusiv dar fără a se limita la text, grafice, logo-uri, imagini,
              clipuri audio, videoclipuri, software și alte materiale, este proprietatea NeuroLearn sau a
              licențiatorilor săi și este protejat de legile privind drepturile de autor și alte legi privind
              proprietatea intelectuală.
            </p>
            <p>
              Vi se acordă o licență limitată, neexclusivă, netransferabilă și revocabilă pentru a accesa și utiliza
              conținutul exclusiv în scopuri personale, necomerciale și educaționale.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Conduita utilizatorului</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Când utilizați NeuroLearn, sunteți de acord să nu:</p>
            <ul>
              <li>Încălcați acești Termeni și Condiții sau orice legi aplicabile</li>
              <li>
                Utilizați serviciul în orice mod care ar putea interfera cu sau perturba integritatea sau performanța
                platformei
              </li>
              <li>Încercați să obțineți acces neautorizat la sistemele sau rețelele noastre</li>
              <li>Colectați informații despre alți utilizatori fără consimțământul lor</li>
              <li>
                Postați conținut care este ilegal, ofensator, defăimător, obscen sau care încalcă drepturile terților
              </li>
              <li>Utilizați platforma pentru a distribui materiale publicitare sau promoționale nesolicitate</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Limitarea răspunderii</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              În măsura maximă permisă de lege, NeuroLearn nu va fi responsabilă pentru daune indirecte, incidentale,
              speciale, consecvente sau punitive, inclusiv pierderea profitului, datelor sau utilizării, rezultate din
              sau în legătură cu utilizarea sau incapacitatea de a utiliza serviciul.
            </p>
            <p>
              Serviciul este furnizat "așa cum este" și "așa cum este disponibil", fără garanții de niciun fel, exprese
              sau implicite.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Modificări ale termenilor</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. Modificările vor intra în
              vigoare imediat după publicarea termenilor actualizați pe platformă. Utilizarea continuă a serviciului
              după astfel de modificări constituie acceptarea noilor termeni.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>8. Contact</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Dacă aveți întrebări sau preocupări cu privire la acești Termeni și Condiții, vă rugăm să ne contactați la
              adresa de email: legal@neurolearn.ro
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
