import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, CheckCircle, Brain } from "lucide-react"

interface LessonCardProps {
  lesson: {
    id: string
    title: string
    description?: string
    duration?: number
    estimated_duration?: number
    level?: string // may come from old data
    difficulty?: string // new field name in DB
    learning_style?: string
    category?: string
    xp_reward?: number
  }
  isCompleted: boolean
  index: number
}

export function LessonCard({ lesson, isCompleted, index }: LessonCardProps) {
  const isMatchingStyle = lesson.learning_style === "all"

  // Difficulty can be stored as `level` (old) or `difficulty` (new)
  const difficulty = lesson.level || lesson.difficulty || "beginner"

  const getLearningStyleName = (style: string | undefined) => {
    switch (style) {
      case "visual":
        return "Vizual"
      case "auditory":
        return "Auditiv"
      case "kinesthetic":
        return "Kinestezic"
      case "all":
        return "Universal"
      default:
        return "Universal"
    }
  }

  const getDifficultyColor = (lvl?: string) => {
    if (!lvl) {
      // generic muted color when difficulty is missing
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }

    switch (lvl.toLowerCase()) {
      case "începător":
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "intermediar":
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "avansat":
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-border ${
        isCompleted ? "border-green-500 shadow-green-500/20 shadow-md" : "hover:shadow-primary/10"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
              {lesson.title}
              {isCompleted && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1 line-clamp-2">{lesson.description}</CardDescription>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{lesson.estimated_duration} min</span>
          </div>

          <Badge variant="outline" className={`text-xs ${getDifficultyColor(difficulty)} border-0`}>
            <BookOpen className="h-3 w-3 mr-1" />
            {difficulty}
          </Badge>

          <Badge variant={isMatchingStyle ? "default" : "outline"} className="text-xs">
            <Brain className="h-3 w-3 mr-1" />
            {getLearningStyleName(lesson.category)}
          </Badge>

          {isCompleted && (
            <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
              Finalizat
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Link href={`/lectii/${lesson.id}`}>
          <Button
            className={`w-full transition-all duration-200 ${
              isCompleted ? "bg-green-600 hover:bg-green-700 text-white" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isCompleted ? "Revizuiește" : "Începe lecția"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
