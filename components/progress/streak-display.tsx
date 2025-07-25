import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Trophy } from "lucide-react"

interface StreakDisplayProps {
  currentStreak: number
  highestStreak: number
}

export function StreakDisplay({ currentStreak, highestStreak }: StreakDisplayProps) {
  return (
    <Card className="border-2 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>Serie de studiu</CardTitle>
        <CardDescription>Numărul de zile consecutive în care ai învățat</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <Flame className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm text-muted-foreground">Serie curentă</span>
            <span className="text-3xl font-bold">{currentStreak} zile</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="text-sm text-muted-foreground">Record personal</span>
            <span className="text-3xl font-bold">{highestStreak} zile</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-muted-foreground mb-1">Ultimele 7 zile</div>
          <div className="flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${i < currentStreak % 7 ? "bg-orange-500" : "bg-muted"}`}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
