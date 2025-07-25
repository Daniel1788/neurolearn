"use client"

import { Activity, BookOpen, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ro } from "date-fns/locale"
import { motion } from "framer-motion"

interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
  created_at: string
  lessons: {
    id: string
    title: string
    description: string
    content_path: string
    duration: number
    level: string
    learning_style: string
  }
}

interface RecentActivityProps {
  activities: LessonProgress[] | null
  userLearningStyle: string | null
}

export function RecentActivity({ activities, userLearningStyle }: RecentActivityProps) {
  // Filter activities to only show those matching the user's learning style
  const filteredActivities =
    activities?.filter(
      (activity) => activity.lessons.learning_style === userLearningStyle || activity.lessons.learning_style === "all",
    ) || []

  if (!filteredActivities || filteredActivities.length === 0) {
    return (
      <Card className="border-2 dark:border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Lecții recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">Nu ai nicio lecție recentă. Începe să înveți!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 dark:border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Lecții recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.slice(0, 4).map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="mt-1 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {activity.completed ? (
                      <>
                        <p className="text-sm text-muted-foreground">Lecție finalizată:</p>
                        <p className="font-medium">{activity.lessons.title}</p>
                      </>
                    ) : (
                      <p className="font-medium">{activity.lessons.title}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.completed_at
                      ? formatDistanceToNow(new Date(activity.completed_at), { addSuffix: true, locale: ro })
                      : formatDistanceToNow(new Date(activity.created_at), { addSuffix: true, locale: ro })}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {activity.completed && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-xs">Finalizat</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span className="text-xs">{activity.lessons.duration} min</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                      {activity.lessons.learning_style === "visual"
                        ? "Vizual"
                        : activity.lessons.learning_style === "auditory"
                          ? "Auditiv"
                          : activity.lessons.learning_style === "kinesthetic"
                            ? "Kinestezic"
                            : "Universal"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
