import type { SupabaseClient } from "@supabase/supabase-js"
import { differenceInDays, format, subDays } from "date-fns"

/**
 * Calculate user's current streak based on lesson completion dates
 */
export async function getUserStreak(supabase: SupabaseClient, userId: string): Promise<number> {
  try {
    // Get all completed lessons ordered by completion date
    const { data: completedLessons, error } = await supabase
      .from("lesson_progress")
      .select("completed_at")
      .eq("user_id", userId)
      .eq("completed", true)
      .order("completed_at", { ascending: false })

    if (error) {
      console.error("Error fetching completed lessons for streak:", error)
      return 0
    }

    if (!completedLessons || completedLessons.length === 0) {
      return 0
    }

    // Group lessons by date
    const lessonsByDate = new Map<string, number>()
    completedLessons.forEach((lesson) => {
      const date = format(new Date(lesson.completed_at), "yyyy-MM-dd")
      lessonsByDate.set(date, (lessonsByDate.get(date) || 0) + 1)
    })

    // Calculate streak
    let streak = 0
    let currentDate = new Date()

    // Check if user completed any lesson today
    const today = format(currentDate, "yyyy-MM-dd")
    const yesterday = format(subDays(currentDate, 1), "yyyy-MM-dd")

    // Start counting from today or yesterday
    if (lessonsByDate.has(today)) {
      streak = 1
      currentDate = subDays(currentDate, 1)
    } else if (lessonsByDate.has(yesterday)) {
      streak = 1
      currentDate = subDays(currentDate, 2)
    } else {
      // No recent activity, streak is 0
      return 0
    }

    // Count consecutive days backwards
    while (true) {
      const dateStr = format(currentDate, "yyyy-MM-dd")
      if (lessonsByDate.has(dateStr)) {
        streak++
        currentDate = subDays(currentDate, 1)
      } else {
        break
      }
    }

    return streak
  } catch (error) {
    console.error("Error calculating user streak:", error)
    return 0
  }
}

/**
 * Get user's highest streak ever
 */
export async function getHighestStreak(supabase: SupabaseClient, userId: string): Promise<number> {
  try {
    // Get all completed lessons ordered by completion date
    const { data: completedLessons, error } = await supabase
      .from("lesson_progress")
      .select("completed_at")
      .eq("user_id", userId)
      .eq("completed", true)
      .order("completed_at", { ascending: true })

    if (error) {
      console.error("Error fetching completed lessons for highest streak:", error)
      return 0
    }

    if (!completedLessons || completedLessons.length === 0) {
      return 0
    }

    // Group lessons by date
    const lessonsByDate = new Set<string>()
    completedLessons.forEach((lesson) => {
      const date = format(new Date(lesson.completed_at), "yyyy-MM-dd")
      lessonsByDate.add(date)
    })

    // Convert to sorted array of dates
    const sortedDates = Array.from(lessonsByDate).sort()

    // Calculate highest streak
    let maxStreak = 1
    let currentStreak = 1

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1])
      const currentDate = new Date(sortedDates[i])
      const daysDiff = differenceInDays(currentDate, prevDate)

      if (daysDiff === 1) {
        // Consecutive day
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        // Break in streak
        currentStreak = 1
      }
    }

    return maxStreak
  } catch (error) {
    console.error("Error calculating highest streak:", error)
    return 0
  }
}

/**
 * Get activity data for a specific number of days
 */
export async function getActivityData(
  supabase: SupabaseClient,
  userId: string,
  days: number,
): Promise<Record<string, number>> {
  try {
    const startDate = subDays(new Date(), days - 1)
    const { data: activities, error } = await supabase
      .from("lesson_progress")
      .select("completed_at")
      .eq("user_id", userId)
      .eq("completed", true)
      .gte("completed_at", startDate.toISOString())

    if (error) {
      console.error("Error fetching activity data:", error)
      return {}
    }

    const activityMap: Record<string, number> = {}
    activities?.forEach((activity) => {
      const date = format(new Date(activity.completed_at), "yyyy-MM-dd")
      activityMap[date] = (activityMap[date] || 0) + 1
    })

    return activityMap
  } catch (error) {
    console.error("Error getting activity data:", error)
    return {}
  }
}
