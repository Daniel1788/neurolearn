"use client"

import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Star, Flame, BookOpen } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { calculateUserLevel } from "@/lib/utils/level-calculator"

interface LeaderboardEntry {
  userId: string
  name: string
  full_name?: string
  xp: number
  streak: number
  lessonsCompleted: number
}

interface GroupLeaderboardProps {
  leaderboard: LeaderboardEntry[]
  groupId?: string
}

export function GroupLeaderboard({ leaderboard, groupId }: GroupLeaderboardProps) {
  const [sortBy, setSortBy] = useState<"name" | "xp" | "streak" | "lessons" | "level">("xp")

  // Calculate levels for all users
  const leaderboardWithLevels = useMemo(() => {
    return leaderboard.map((entry) => {
      const { level } = calculateUserLevel(entry.xp || 0)
      return {
        ...entry,
        calculatedLevel: level,
      }
    })
  }, [leaderboard])

  // Sort the leaderboard data based on the selected criteria
  const getSortedData = useCallback(() => {
    if (!leaderboardWithLevels.length) return []

    return [...leaderboardWithLevels].sort((a, b) => {
      if (sortBy === "name") {
        return (a.full_name || a.name || "").localeCompare(b.full_name || b.name || "")
      } else if (sortBy === "xp") {
        return (b.xp || 0) - (a.xp || 0)
      } else if (sortBy === "streak") {
        return (b.streak || 0) - (a.streak || 0)
      } else if (sortBy === "lessons") {
        return (b.lessonsCompleted || 0) - (a.lessonsCompleted || 0)
      } else if (sortBy === "level") {
        return (b.calculatedLevel || 0) - (a.calculatedLevel || 0)
      }
      return 0
    })
  }, [leaderboardWithLevels, sortBy])

  const sortedData = getSortedData()

  // Calculate maximum values for progress bars
  const maxValues = useMemo(() => {
    if (!sortedData.length) return { xp: 1, streak: 1, lessons: 1, level: 1 }

    return {
      xp: Math.max(...sortedData.map((entry) => entry.xp || 0), 1),
      streak: Math.max(...sortedData.map((entry) => entry.streak || 0), 1),
      lessons: Math.max(...sortedData.map((entry) => entry.lessonsCompleted || 0), 1),
      level: Math.max(...sortedData.map((entry) => entry.calculatedLevel || 0), 1),
    }
  }, [sortedData])

  // Get medal icon based on rank
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />
      case 3:
        return <Medal className="h-4 w-4 text-amber-700" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Clasament</h3>
        <div className="flex gap-2">
          <select
            className="text-sm border rounded p-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="xp">Sortează după XP</option>
            <option value="level">Sortează după Nivel</option>
            <option value="streak">Sortează după Streak</option>
            <option value="lessons">Sortează după Lecții</option>
            <option value="name">Sortează după Nume</option>
          </select>
        </div>
      </div>

      {sortedData.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">Nu există date pentru clasament.</p>
      ) : (
        sortedData.map((entry, index) => {
          const rank = index + 1
          const medalIcon = getMedalIcon(rank)
          const displayName = entry.full_name || entry.name || "Utilizator"

          // Calculate percentages for progress bars
          const xpPercentage = Math.round(((entry.xp || 0) / maxValues.xp) * 100)
          const streakPercentage = Math.round(((entry.streak || 0) / maxValues.streak) * 100)
          const lessonsPercentage = Math.round(((entry.lessonsCompleted || 0) / maxValues.lessons) * 100)
          const levelPercentage = Math.round(((entry.calculatedLevel || 0) / maxValues.level) * 100)

          return (
            <div key={entry.userId} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    {medalIcon || <span className="font-medium">{rank}</span>}
                  </div>
                  <span className="font-medium">{displayName}</span>
                </div>
                <div className="bg-primary/10 px-2 py-1 rounded text-sm font-medium">
                  Nivel {entry.calculatedLevel || 0}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* XP Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" /> XP
                    </span>
                    <span>{entry.xp || 0}</span>
                  </div>
                  <Progress value={xpPercentage} className="h-2" />
                </div>

                {/* Streak Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" /> Streak
                    </span>
                    <span>{entry.streak || 0} zile</span>
                  </div>
                  <Progress value={streakPercentage} className="h-2" />
                </div>

                {/* Lessons Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-blue-500" /> Lecții
                    </span>
                    <span>{entry.lessonsCompleted || 0}</span>
                  </div>
                  <Progress value={lessonsPercentage} className="h-2" />
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
