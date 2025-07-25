"use client"

import { DialogFooter } from "@/components/ui/dialog"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { UserPlus, Globe, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function JoinGroupButton() {
  const [open, setOpen] = useState(false)
  const [inviteCode, setInviteCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!inviteCode.trim()) {
      setError("Codul de invitație este obligatoriu.")
      toast({
        title: "Eroare",
        description: "Codul de invitație este obligatoriu.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inviteCode,
        }),
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          // Try to parse JSON error
          const errorData = await response.json()
          throw new Error(errorData.error || "A apărut o eroare la alăturarea în grup.")
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

      if (!data.success) {
        throw new Error(data.error || "A apărut o eroare la alăturarea în grup.")
      }

      toast({
        title: "Succes!",
        description: "Te-ai alăturat grupului cu succes.",
      })

      setOpen(false)
      router.refresh()
      router.push(`/grupuri/${data.groupId}`)
    } catch (error: any) {
      console.error("Error joining group:", error)
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
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        <UserPlus className="mr-2 h-4 w-4" />
        Alătură-te unui grup
      </Button>

      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen)
          if (!newOpen) {
            setError(null)
            setInviteCode("")
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alătură-te unui grup</DialogTitle>
            <DialogDescription>Introdu codul de invitație pentru a te alătura unui grup existent.</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Eroare</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="inviteCode">Cod de invitație</Label>
              <Input
                id="inviteCode"
                placeholder="Ex: ABC123"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            </div>

            <div className="text-center pt-2">
              <div className="text-sm text-muted-foreground mb-2">sau</div>
              <Link href="/grupuri/publice" passHref>
                <Button variant="outline" className="w-full">
                  <Globe className="mr-2 h-4 w-4" />
                  Descoperă grupuri publice
                </Button>
              </Link>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Anulează
            </Button>
            <Button
              onClick={handleJoinGroup}
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se procesează...
                </>
              ) : (
                "Alătură-te"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
