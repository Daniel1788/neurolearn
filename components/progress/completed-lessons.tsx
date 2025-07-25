import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"
import { ro } from "date-fns/locale"
import { BookOpen, Clock } from "lucide-react"

interface CompletedLessonsProps {
  lessons: {
    completed_at: string
    lessons: {
      id: string
      title: string
      description: string
      duration: number
      level: string
      learning_style: string
    }
  }[]
}

export function CompletedLessons({ lessons }: CompletedLessonsProps) {
  return (
    <Card className="border-2 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>Lecții finalizate</CardTitle>
        <CardDescription>Toate lecțiile pe care le-ai finalizat până acum</CardDescription>
      </CardHeader>
      <CardContent>
        {lessons.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nu ai finalizat nicio lecție încă. Începe să înveți!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((item) => (
              <div key={item.lessons.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h3 className="font-medium">{item.lessons.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    Finalizat pe {format(parseISO(item.completed_at), "PPP", { locale: ro })}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.lessons.description}</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{item.lessons.duration} minute</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <BookOpen className="h-3 w-3" />
                    <span>{item.lessons.level}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.lessons.learning_style === "visual"
                      ? "Vizual"
                      : item.lessons.learning_style === "auditory"
                        ? "Auditiv"
                        : item.lessons.learning_style === "kinesthetic"
                          ? "Kinestezic"
                          : "Universal"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
