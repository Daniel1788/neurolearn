"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function SetupUserDeletion() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSetup = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/setup-user-deletion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to set up user deletion")
      }

      toast({
        title: "Configurare reușită",
        description: "Funcțiile pentru ștergerea utilizatorilor au fost configurate cu succes.",
      })
    } catch (error: any) {
      console.error("Error setting up user deletion:", error)
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la configurarea ștergerii utilizatorilor.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Configurare ștergere utilizatori</h3>
      <p className="text-sm text-muted-foreground">
        Configurează funcțiile necesare pentru ștergerea completă a utilizatorilor.
      </p>
      <Button onClick={handleSetup} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Se configurează...
          </>
        ) : (
          "Configurează funcții ștergere"
        )}
      </Button>
    </div>
  )
}
