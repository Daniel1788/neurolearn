"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function SetupGroupPosts() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSetup = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/setup-group-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to set up group posts")
      }

      toast({
        title: "Success",
        description: "Group posts table and policies have been set up successfully.",
      })
    } catch (error: any) {
      console.error("Error setting up group posts:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred while setting up group posts.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Up Group Posts</CardTitle>
        <CardDescription>
          Create the necessary database tables and policies for group posts functionality.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This will create the group_posts table and set up the appropriate row-level security policies. This is
          required for the group posts feature to work properly.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSetup} disabled={isLoading}>
          {isLoading ? "Setting up..." : "Set Up Group Posts"}
        </Button>
      </CardFooter>
    </Card>
  )
}
