"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Database, CheckCircle, XCircle } from "lucide-react"

interface SetupResult {
  file: string
  status: "success" | "error"
  error?: string
}

export function SetupDatabase() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SetupResult[]>([])
  const [message, setMessage] = useState("")

  const handleSetupDatabase = async () => {
    setIsLoading(true)
    setResults([])
    setMessage("")

    try {
      const response = await fetch("/api/admin/setup-database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResults(data.results || [])
        setMessage(data.message)
      } else {
        setMessage(`Eroare: ${data.error}`)
      }
    } catch (error) {
      console.error("Error setting up database:", error)
      setMessage("A apărut o eroare la configurarea bazei de date")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Configurare Bază de Date
        </CardTitle>
        <CardDescription>
          Configurează toate tabelele, politicile RLS, funcțiile și indexurile necesare pentru NeuroLearn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleSetupDatabase} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se configurează baza de date...
            </>
          ) : (
            "Configurează Baza de Date"
          )}
        </Button>

        {message && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Rezultate:</h4>
            {results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">{result.file}</span>
                <div className="flex items-center gap-2">
                  {result.status === "success" ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Succes
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <Badge variant="destructive">Eroare</Badge>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
