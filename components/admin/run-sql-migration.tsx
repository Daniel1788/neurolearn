"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function RunSQLMigration() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRunMigration = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/run-sql-migration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to run SQL migration")
      }

      toast({
        title: "Success",
        description: "SQL migration executed successfully",
      })
    } catch (error: any) {
      console.error("Error running SQL migration:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to run SQL migration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleRunMigration} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Running migration...
        </>
      ) : (
        "Run SQL Migration"
      )}
    </Button>
  )
}
