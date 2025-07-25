export function calculateUserLevel(xp: number) {
  const xpPerLevel = 150
  const level = Math.floor(xp / xpPerLevel)
  const currentLevelXP = xp % xpPerLevel
  const nextLevelXP = xpPerLevel

  return {
    level,
    currentLevelXP,
    nextLevelXP,
  }
}
