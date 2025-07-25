"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface MarkLessonCompleteProps {
  lessonId: string
  userId: string
  isCompleted: boolean
  onComplete?: () => void
}

export function MarkLessonComplete({ lessonId, userId, isCompleted, onComplete }: MarkLessonCompleteProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClientSupabaseClient()
  const { toast } = useToast()

  const handleMarkComplete = async () => {
    if (isCompleted) return

    setLoading(true)
    try {
      // First, get the lesson details including xp_reward
      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select("title, xp_reward")
        .eq("id", lessonId)
        .single()

      if (lessonError) {
        console.error("Error fetching lesson:", lessonError)
        toast({
          title: "Eroare",
          description: "Nu am putut obține detaliile lecției.",
          variant: "destructive",
        })
        return
      }

      const xpReward = lessonData?.xp_reward || 50 // Default to 50 if not set
      const lessonTitle = lessonData?.title || "Lecție necunoscută"

      // Mark lesson as completed
      const { error: progressError } = await supabase.from("lesson_progress").upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      })

      if (progressError) {
        console.error("Error marking lesson complete:", progressError)
        toast({
          title: "Eroare",
          description: "Nu am putut marca lecția ca finalizată.",
          variant: "destructive",
        })
        return
      }

      // Update user XP
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("xp")
        .eq("id", userId)
        .single()

      if (!profileError && profileData) {
        const newXp = (profileData.xp || 0) + xpReward

        const { error: updateError } = await supabase.from("profiles").update({ xp: newXp }).eq("id", userId)

        if (updateError) {
          console.error("Error updating XP:", updateError)
        }
      }

      // Log the activity with lesson_id and lesson_title
      try {
        await supabase.from("activity_log").insert({
          user_id: userId,
          activity_type: "lesson_completion",
          details: {
            lesson_id: lessonId,
            lesson_title: lessonTitle,
            xp_earned: xpReward,
            xp_reward: xpReward,
          },
        })
      } catch (logError) {
        console.error("Error logging activity:", logError)
        // Don't fail the whole operation if logging fails
      }

      toast({
        title: "Felicitări! 🎉",
        description: `Ai finalizat lecția și ai câștigat ${xpReward} XP!`,
      })

      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      console.error("Error completing lesson:", error)
      toast({
        title: "Eroare",
        description: "A apărut o eroare neașteptată.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 text-green-600 text-sm font-medium"
      >
        <CheckCircle className="h-4 w-4" />
        Finalizat
      </motion.div>
    )
  }

  return (
    <Button
      onClick={handleMarkComplete}
      disabled={loading}
      size="sm"
      className="bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Se salvează...
        </>
      ) : (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          Marchează ca finalizat
        </>
      )}
    </Button>
  )
}
