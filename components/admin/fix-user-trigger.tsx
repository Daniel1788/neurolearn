"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function FixUserTrigger() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleFixTrigger = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/fix-user-trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message || "Trigger-ul a fost corectat cu succes!" })
      } else {
        setResult({ success: false, message: data.error || "A apărut o eroare" })
      }
    } catch (error) {
      console.error("Error fixing trigger:", error)
      setResult({ success: false, message: "A apărut o eroare de rețea" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="text-orange-600">Corectare Trigger Utilizatori</CardTitle>
        <CardDescription>
          Corectează trigger-ul pentru crearea automată a profilurilor utilizatorilor noi.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {result && (
          <Alert variant={result.success ? "default" : "destructive"}>
            {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleFixTrigger}
          disabled={isLoading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se corectează...
            </>
          ) : (
            "Corectează Trigger-ul"
          )}
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>Această operație va:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Șterge trigger-ul existent defect</li>
            <li>Creează un nou trigger cu permisiuni corecte</li>
            <li>Asigură crearea automată a profilurilor pentru utilizatorii noi</li>
            <li>Salvează corect numele și prenumele în tabelul profiles</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
