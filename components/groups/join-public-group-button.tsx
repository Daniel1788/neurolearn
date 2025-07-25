"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface JoinPublicGroupButtonProps {
  groupId: string
}

export default function JoinPublicGroupButton({ groupId }: JoinPublicGroupButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleJoinGroup = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Use JSON instead of FormData for more reliable parsing
      const response = await fetch("/api/groups/join-public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId }),
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          // Try to parse JSON error
          const errorData = await response.json()
          throw new Error(errorData.error || "Nu s-a putut alătura grupului")
        } else {
          // Handle non-JSON response (like HTML error pages)
          const text = await response.text()
          console.error("Non-JSON error response:", text.substring(0, 200) + "...")
          throw new Error(`Eroare server (${response.status}): Nu s-a putut alătura grupului`)
        }
      }

      // Safely parse JSON with error handling
      let data
      try {
        data = await response.json()
      } catch (e) {
        console.error("Error parsing JSON response:", e)
        throw new Error("Răspuns invalid de la server")
      }

      // Check if operation was successful
      if (data.success) {
        toast({
          title: "Succes!",
          description: data.alreadyMember ? "Ești deja membru al acestui grup." : "Te-ai alăturat grupului cu succes.",
        })

        // Navigate to group page
        router.refresh()
        router.push(`/grupuri/${data.groupId}`)
      } else {
        throw new Error(data.error || "Nu s-a putut alătura grupului")
      }
    } catch (error: any) {
      console.error("Error joining public group:", error)
      setError(error.message || "A apărut o eroare la alăturarea în grup.")
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la alăturarea în grup.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Eroare</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleJoinGroup} className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Se procesează...
          </>
        ) : (
          "Alătură-te grupului"
        )}
      </Button>
    </div>
  )
}
